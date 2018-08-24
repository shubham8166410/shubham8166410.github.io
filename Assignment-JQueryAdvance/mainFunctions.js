//--------------------------------------------------------------------------------------------------------------
//this function is used to make an ajax call - as per input made by user in search box
//response data is sent in callback functions as per $param - dropdown selection of search bar
let getDataByAjaxCall=($link, $param)=>{
	console.log($link , $param);
	$.ajax({
		type:'GET',
		dataType:'json',
		url:$link,
		success:(data)=>{ //$param will decide which callback function to be called to show info
			//console.log(data);
			if($param === "id"){ //if you opted id			    
				if( data.Response === "True" ){ 
					$movie = data;					
					showMovieById($movie);					
				} else { //if response is false
					showErrorMessage(data.Error);
				}
			} else if($param==="title" || $param==="year" ){					
				if(data.Response === "True"){ //if response is true
					$movies = data.Search;
					showMoviesByTitle($movies);
				} else { //if response is false
					showErrorMessage(data.Error);
				}
			}								
		},
		error:(data)=>{
			console.log("There seems some error : check interent connection");			
		},
		beforeSend: ()=>{//before sending call
			console.log("You can spin loader here");
		},
		complete: ()=>{ //when call is complete
			console.log("data fetched . So stop loader");			
		}, 
		timeout:3000
	});
}

//---------------------------------------------------------------------------------------------------------------------------------
//callback function used in ajax call -  when input was an id and response was true
let showMovieById=($movie)=>{	
	
	$displayArea=$("#displayArea");
	$displayArea.empty();
	
	$container=$("<div>").addClass("container");
	$row=$("<div>").addClass("row");
	
	// one third space to image of movie / series
	$posterBox=$("<div>").addClass("col-xs-12 col-sm-12 col-md-4 col-lg-4 posterBox");
	$poster=$("<div>");
	$posterSrc=""; //declaration of var
	if($movie.Poster==="N/A"){ //if no image available
		$posterSrc="images/no-photo.jpg";
	} else {
		$posterSrc= $movie.Poster;
	}
	$poster.html('<img class="poster" src="'+$posterSrc+'" />').appendTo($posterBox);
	$posterBox.appendTo($row);
	
	// two third space to details  of movie / series
	$col=$("<div>").addClass("col-xs-12 col-sm-12 col-md-8 col-lg-8");
	$contentBox=$("<div>").addClass("content-box");
	//add all info got in data
	$('<p>').html('<span class="content-heading">'+$movie.Title+'</span><span>('+$movie.Year+')</span><span class="rating">Rating : '+$movie.imdbRating +'</span>').appendTo($contentBox);
	$('<p>').html('<span>'+$movie.Type+'</span><span> | '+$movie.Language+' </span><span> | '+$movie.Runtime+' </span>').appendTo($contentBox);
	$('<p>').addClass("plot").text($movie.Plot).appendTo($contentBox);		
	$('<p>').html('<span><b>Genre : </b>'+ $movie.Genre+'</span>').appendTo($contentBox);
	$('<p>').html('<span><b>Director : </b>'+$movie.Director+'</span>').appendTo($contentBox);
	$('<p>').html('<span><b>Actors : </b>'+$movie.Actors+'</span>').appendTo($contentBox);	
	$('<p>').html('<span><b>Writer : </b>'+$movie.Writer).appendTo($contentBox);	
	$('<p>').html('<span><b>Production : </b>'+ $movie.Production).appendTo($contentBox);
	$('<p>').html('<span><b>Released : </b>'+$movie.Released+'</span>').appendTo($contentBox);
	$('<p>').html('<span><b>ID : </b>'+$movie.imdbID+'</span>').appendTo($contentBox);	
	//console.log($movie.Ratings);	
	$('<p>').html('<h4><b>Ratings : </b></h4>').appendTo($contentBox);
	//if Ratings exist,  add it to page
	if($movie.Ratings && $movie.Ratings.length > 0){ //if ratings exist
		for($i=0; $i < $movie.Ratings.length; $i++){
			$('<p>').html('<span><b>Source : </b>'+ $movie.Ratings[$i].Source +'</span><span style="margin-left:20px;"><b>Value : </b>'+ $movie.Ratings[$i].Value +'</span>').appendTo($contentBox);
		}
	} else {//if ratings do not exist
		$('<p>').text("No Ratings Available").appendTo($contentBox);
	}
	//btn to go back to home page
	$('<p id="btnHolder">').html('<a class="backBtn" href="index.html">Back To Home Page</a>').appendTo($contentBox);
	$contentBox.appendTo($col);
	$col.appendTo($row);
	$row.appendTo($container);
	$container.appendTo($displayArea);	
}//end of function

//-----------------------------------------------------------------------------------------------------------------------------------------
//callback function used in ajax call - when input was title or title-year and response was true 
let showMoviesByTitle=($movies)=>{
	//console.log($movies);
	$displayArea=$("#displayArea");
	$displayArea.empty(); //remove contents if any exist earlier	
	
	if($.isArray($movies)){
		$container = $('<div>').addClass('container');
		$row=$('<div>').addClass('row');
		
		for($movie of $movies){
			// space for image and title			
			$col = $("<div>").addClass("col-xs-12 col-sm-6 col-md-4 col-lg-4 box");			
			$imgBox=$("<div>").addClass("img-box");
			createVerticalCard($movie, $imgBox);			
			$imgBox.appendTo($col); 
			$col.appendTo($row);			
		}
		//when loop is ended
		$row.appendTo($container);
		$container.appendTo($displayArea);
	}	
} //end of function
//----------------------------------------------------------------------------------------------------------------------------------------
//some functions called from other main functions
//----------------------------------------------------------------------------------------------------------------------------------------


//this function will create vertical cards containing image and movie info
let createVerticalCard=($movie, $imgBox)=>{//commonly used by appendImages and showMovieByTitle functions
		//console.log($movie);
		$movieID = $movie.imdbID;		
		if($movie.Poster === "N/A"){
			$($imgBox).html( '<a href="#" onclick="createLinkForAjaxCall(\'' + $movieID + '\')"><img src="images/no-photo.jpg" alt="photo not available " /></a>' );
		} else {					
			$($imgBox).html( '<a href="#" onclick="createLinkForAjaxCall(\'' + $movieID + '\')"><img src="'+ $movie.Poster +'" alt="movie poster " /></a>' );
		}		
		
		$titleBox = $('<div>').addClass('titleBox');		
		
		$($titleBox).append('<a href="javascript:void(0);" onclick="createLinkForAjaxCall(\'' + $movieID + '\')">'+
									'<p>'+$movie.Title +'<span>  ('+$movie.Year+')</span><p>'+
									'<p>'+ $movie.Type +'<span> - ID:'+ $movie.imdbID +'</span><p></a>');	
		
		$($titleBox).appendTo($imgBox);
}//end of function 


//this function prepares link when card is clicked , id is captured as argument 
let createLinkForAjaxCall=($id)=>{	
	//alert($id);
	$param="id";
	$link = 'https://www.omdbapi.com/?i='+$id+'&apikey=a437a6f6';
	getDataByAjaxCall($link, $param);	//ajax call	to link created as above
} //end of function
//This programme is to make ajax call to imdb api and present data as per input
$(document).ready(() => { //At start Home Page is created    
	createHomePage();
	makeSearchByInput();	
}); // end of document.ready()


//--------------------------------------------- createHomePage and related functions ---------------------------------------------------------------
//this function is to create home page - create page structure , create links and make ajax calls
let  createHomePage=()=>{
	//Three rows for home page and their headings 
	$rowHeadings = ["Recommended For You", "Coming Soon" , "Just Released"];
	for($i=0; $i < $rowHeadings.length; $i++){
		$heading =  $rowHeadings[$i];
		createRows($heading); //function to create rows
	}
	// array of some commonly used phrases in titles of movies to make an array of random titles 
	$titlesArray = ["man" , "woman", "day" , "night" ,  "moon" , "boy", "city", "friend", "love", "lady", "dance" , "game"];
	$randomTitles = randomizeArray($titlesArray);//randomized to give new page loading everytime 	
			
	$box = $(".img-box"); //array of class items
		
	for( $i=0; $i < $box.length; $i++){			
		$title = $randomTitles[$i];			
		$link = 'https://www.omdbapi.com/?s='+$title+'&y=2018&apikey=a437a6f6';
		createImageRow($link, $box[$i]); //function to make ajax call
	}
}

//this function will create rows
let createRows=($heading)=>{
	$displayArea=$("#displayArea"); //all rows to be shown in displayArea	
	$container = $("<div>").addClass("container");
	$row = $("<div>").addClass("row");
	//four col in a row
	$col1 = $("<div>").addClass("col-xs-12 col-sm-6 col-md-4 col-lg-4 box").appendTo($row);	
	$col2 = $("<div>").addClass("col-xs-12 col-sm-6 col-md-4 col-lg-4 box").appendTo($row);
	$col3 = $("<div>").addClass("hidden-xs hidden-sm col-md-4 col-lg-4 box").appendTo($row);
	
	$h3 = $("<h3>");
	$h3.html($heading); //heading text inserted
	$h3.appendTo($container);
	// a div in each col to hold img and title
	$("<div>").addClass("img-box").appendTo($col1);
	$("<div>").addClass("img-box").appendTo($col2);
	$("<div>").addClass("img-box").appendTo($col3);	
	
	$row.appendTo($container);
	$container.appendTo($displayArea);
}

//this function will make ajax call
let createImageRow =($link, $box)=> {
    //console.log("making request")
    $.ajax({
        type: 'GET', // request type GET, POST, PUT
        dataType: 'json', // requesting datatype
        url: $link , // URL of getting data
        success: (data) => { // in case of success response			
			$movies = data.Search;						
            appendImages($box, $movies);   //function			
        },
        error: (data) => { // in case of error response
            console.log("some error occured");
        },
        beforeSend: () => { // while request is processing.
            // you can use loader here.			
            console.log("request is being made. please wait");
        },
        complete: () => {
            // what you want to do while request is completed
            console.log("data fetched success");			
        },
        timeout:3000 // this is in milli seconds
    }); // end of AJAX request
} // end of createImageRow


//function - to create a vertical card of image and text
let appendImages=($box, $movies)=>{
		//pick randomly a movie / series to show on home page		
		$i=calculateRandomNumber(5);
		$movie=$movies[$i];
		$imgBox = $box;
		createVerticalCard($movie, $imgBox);			
}
//------------------------------------  makeSearchByInput and related functions -----------------------------------------
//this function will accept input from dropdown toggle
let makeSearchByInput=()=>{
	$('.search-panel .dropdown-menu').find('a').click(function(e){		
		e.preventDefault();
		$param = $(this).attr("href").replace("#","");
		resizeInputForm($param); //function
		console.log($param);
		$concept = $(this).text();
		$('.search-panel span#search_concept').text($concept);
		
		pressSearchBtn($param); //function
	});
}		

//this function will holds an event handler
let pressSearchBtn=($param)=>{
		$('.btn .glyphicon-search').unbind("click"); //to prevent repeat of previous clicks
		$('.btn .glyphicon-search').click((e)=>{ //when search button is clicked
		
			e.preventDefault(); //to prevent click of other clickable items
			
			if($param==="id"){ //if dropdown item is id
				$id=$("#search_param").val();
				$test = validateInput($id);
				console.log($id);
				if($test){
					$link = 'https://www.omdbapi.com/?i='+$id+'&apikey=a437a6f6';
					getDataByAjaxCall($link, $param);
				} else {
					showErrorMessage("Please provide valid input.");					
				}
				
			} else if($param==="title"){ //if dropdown item is title (movie)----
				$title=$("#search_param").val();
				$test = validateInput($title);
				if($test){
					$link = 'https://www.omdbapi.com/?s='+$title+'&apikey=a437a6f6';
					getDataByAjaxCall($link, $param);
				}  else {
					showErrorMessage("Please provide valid input.");
				}				
			}  else if($param==="year"){ //if dropdown item is title and year
				$title=$("#movieTitle").val();
				$year=$("#movieYear").val();
				$test1=validateInput($title);
				$test2=validateInput($year);
				if($test1 && $test2){
					$link = 'https://www.omdbapi.com/?s='+$title+'&y='+$year+'&apikey=a437a6f6';
					getDataByAjaxCall($link, $param);
				}  else {
					showErrorMessage("Please provide valid input.");
				}								
			}
			console.log($link , $param);
			$('.search-panel span#search_concept').text("Filter by");
			resizeInputForm("id");			
}); //end of search button function 
}

//this function is make changes in input-box as per need
let resizeInputForm=($param)=>{
	$inputDiv=$("#inputBoxes");
	if($param=="id" || $param ==="title"){
		$inputDiv.empty();
		$inputDiv.html('<input class="form-control" type="text" value="" id="search_param" placeholder="Input title or id...">');
	}  else if($param ==="year"){ //you select title and year - two input boxes required , hence created
		$inputDiv.empty();
		$inputDiv.html('<input class="form-control" type="text" value="" id="movieTitle" placeholder="Input title...">'+
		'<input class="form-control" type="text" value="" id="movieYear" placeholder="Enter Year...">');
	}
}

		
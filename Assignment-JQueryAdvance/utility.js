//a utility function to calculate random number 
let calculateRandomNumber=($number)=>{	
	$randomNumber = Math.floor(Math.random()* $number);
	return $randomNumber;	
}

//a utility function to randomize position of array values
let randomizeArray=($titlesArray)=>{
	$newArray =[];
	$len = $titlesArray.length;
	
	for( $i=0; $i < $titlesArray.length; $i++){
		$num = calculateRandomNumber($len);
		//push value only if it does not pre-exist in array
		if( $newArray.indexOf($titlesArray[$num]) === -1){
			$newArray.push($titlesArray[$num]);			
		} else { //if exists try again and not increment
			$i-=1;
		}		
	}//end of for loop	
	return $newArray;	
}//end of function


//this function will show error alert
let showErrorMessage=($error)=>{
	$modalArea=$("#modalArea");
	$myModal=$("<div>").addClass("myModal").appendTo($modalArea);
	$modalHeader = $("<div>").addClass("modalHeader").html('<h3>Error Message</h3>').appendTo($myModal);
	$modalBody = $("<div>").addClass("modalBody").html('<p>' + $error + '</p>').appendTo($myModal);	
	$modalFooter = $("<div>").addClass("modalFooter").html('<a class="backBtn" href="index.html">Back to Home Page</a>').appendTo($myModal);	
	$modalArea.slideDown(400);
	$myModal.slideDown(800);
} //end of function

//function to validate input make in input box
let validateInput=($input)=>{	
	if($input === undefined || $input=== null || $input==""){
		return false;
	} else {
		return true;
	}	
}


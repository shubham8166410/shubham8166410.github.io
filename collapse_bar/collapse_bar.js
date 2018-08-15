$(document).ready(()=>{
	$("#first-division").show();
	$("#second-division").hide();
	$("#third-division").hide();
let flag1=0;
let flag2=0;
let flag3=0;
		$("#first-collapse").click(()=>{
			if(flag1==0)
             {
             	$("#first-division").hide();
         		flag1=1;
 			 }
     			else{
     				$("#first-division").show();
     				flag1=0;
     				$("#second-division").hide();
					$("#third-division").hide();
					flag2=0;
					flag3=0;
     			}
            
		})

		$("#second-collapse").click(()=>{
            if(flag2==0)
             {
             	$("#second-division").show();
         		flag2=1;
         		$("#first-division").hide();
				$("#third-division").hide();
				flag1=1;
				flag3=0;
 			 }
     			else{
     				$("#second-division").hide();
     				flag2=0;
     			}
		})

		$("#third-collapse").click(()=>{
            if(flag3==0)
             {
             	$("#third-division").show();
         		flag3=1;
         		$("#first-division").hide();
				$("#second-division").hide();
				flag1=1;
				flag2=0;
 			 }
     			else{
     				$("#third-division").hide();
     				flag3=0;
     			}
		})

})


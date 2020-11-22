const Http = new XMLHttpRequest();
const userId = getCookie("userId");
const email_regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
var isFormValid = true;

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

function getUserInformation(){
  request = $.get(`http://localhost/webassignment/backend/user/GetUserInformation.php?userId=${userId}`,
      function(response) {
        if(response){
          console.log(response);
          let information = JSON.parse(response)['data'];
          // document.getElementById("profile_id").value = userId;
          document.getElementById("profile_username").value = information['UserName'];
          document.getElementById("profile_firstName").value = information['FirstName'];
          document.getElementById("profile_lastName").value = information['LastName'];
          document.getElementById("profile_email").value = information['Email'];
          document.getElementById("profile_address").value = information['Address'];
        }
    }
  );

  // Callback handler that will be called on failure
  request.fail(function (jqXHR, textStatus, errorThrown){
      // Log the error to the console
      console.error("The following error occurred: ", textStatus, errorThrown
);
  });
}

var request;

$(document).ready(function(){
  getUserInformation();
});

function checkFirstName(){
  if (document.getElementById("profile_firstName").value === ""){
    document.getElementById("profile_firstName_check").style.display = 'block';
    document.getElementById("profile_firstName").classList.add('warning');
    isFormValid = false;
  } 
  else{
    document.getElementById("profile_firstName_check").style.display = 'none';
  }
}

function checkLastName(){
  if (document.getElementById("profile_lastName").value === ""){
    document.getElementById("profile_lastName_check").style.display = 'block';
    document.getElementById("profile_lastName").classList.add('warning');
    isFormValid = false;
  } 
  else{
    document.getElementById("profile_lastName_check").style.display = 'none';
  }
}

function checkEmail(){
  if(document.getElementById("profile_email").value == ""){
    document.getElementById("profile_email_check").style.display = 'block';
    document.getElementById("profile_email_check").innerHTML = "Please fill this out!";
    document.getElementById("profile_email").classList.add('warning');
    isFormValid = false;
  }
  else if(!email_regex.test(String(profile_email.value).toLowerCase())){
    document.getElementById("profile_email_check").style.display = 'block';
    document.getElementById("profile_email_check").innerHTML = "Please provide a correct email address!";
    document.getElementById("profile_email").classList.add('warning');
    isFormValid = false;
  } 
  else{
    document.getElementById("profile_email_check").style.display = 'none';
  }
}

function checkAddress(){
  if( document.getElementById("profile_address").value == ""){
    document.getElementById("profile_address_check").style.display = 'block';
    document.getElementById("profile_address").classList.add('warning');
    isFormValid = false;
  }
  else{
    document.getElementById("profile_address_check").style.display = 'none';
  }  
}

function inputcheck(){
  checkFirstName();
  checkLastName();
  checkEmail();
	checkAddress();
	
	if (isFormValid){
      var sent_data = $('#form_user_profile_general').serializeArray();
      sent_data.push({name: "id", value: userId});   
      $.ajax({
        type: 'post',
        url: '../backend/user/UpdateUserInformation.php',
        data: sent_data      
      })
		  .done(function (response) {
        console.log(response);
        document.getElementById("inputcheck").innerHTML = "Success!";
        setTimeout(function(){
          document.getElementById("inputcheck").innerHTML = "&nbsp"
        },5000);
			});
	
	}
}
const Http = new XMLHttpRequest();
const userId = getCookie("userId");
const email_regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
var isFormValid = true;
var isFirstNameValid = isLastNameValid = isEmailValid = isAddressValid = false;
var isNewPasswordValid = isConfirmPasswordValid = false;

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
          document.getElementById('user_profile_avatar').src = '../frontend/' + information['Path'];
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
    isFirstNameValid = false;
  } 
  else{
    document.getElementById("profile_firstName_check").style.display = 'none';
    isFirstNameValid = true;
  }
}

function checkLastName(){
  if (document.getElementById("profile_lastName").value === ""){
    document.getElementById("profile_lastName_check").style.display = 'block';
    document.getElementById("profile_lastName").classList.add('warning');
    isLastNameValid = false;
  } 
  else{
    document.getElementById("profile_lastName_check").style.display = 'none';
    isLastNameValid = true;
  }
}

function checkEmail(){
  if(document.getElementById("profile_email").value == ""){
    document.getElementById("profile_email_check").style.display = 'block';
    document.getElementById("profile_email_check").innerHTML = "Please fill this out!";
    document.getElementById("profile_email").classList.add('warning');
    isEmailValid = false;
  }
  else if(!email_regex.test(String(profile_email.value).toLowerCase())){
    document.getElementById("profile_email_check").style.display = 'block';
    document.getElementById("profile_email_check").innerHTML = "Please provide a correct email address!";
    document.getElementById("profile_email").classList.add('warning');
    isEmailValid = false;
  } 
  else{
    document.getElementById("profile_email_check").style.display = 'none';
    isEmailValid = true;
  }
}

function checkAddress(){
  if( document.getElementById("profile_address").value == ""){
    document.getElementById("profile_address_check").style.display = 'block';
    document.getElementById("profile_address").classList.add('warning');
    isAddressValid = false;
  }
  else{
    document.getElementById("profile_address_check").style.display = 'none';
    isAddressValid = true;
  }  
}

function updateUserInformation(){
  checkFirstName();
  checkLastName();
  checkEmail();
	checkAddress();
	
	if (isFirstNameValid && isLastNameValid && isEmailValid && isAddressValid){
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

function checkPassword(){
  if (document.getElementById("profile_password").value == ""){
    document.getElementById("profile_password_check").innerHTML = "Please fill this out!";
    document.getElementById("profile_password_check").style.display = 'block';
    document.getElementById("profile_password").classList.add('warning');
    isNewPasswordValid = false;
  } else if(document.getElementById("profile_password").value.length < 8){
    document.getElementById("profile_password_check").innerHTML = "Must be at least 8 character"; //ADD MORE  PASSWORD CONSTRAINT HERE
    document.getElementById("profile_password_check").style.display = 'block';
    document.getElementById("profile_password").classList.add('warning');
    isNewPasswordValid = false;
  } else {
    document.getElementById("profile_password_check").style.display = 'none';
    document.getElementById("profile_password").classList.remove('warning');	
    isNewPasswordValid = true;
  }
}

function checkConfirmPassword(){
  if (document.getElementById("profile_password").value == "" && document.getElementById("profile_password_re").value == ""){
    document.getElementById("profile_password_re_check").innerHTML = "Please fill this out!";
    document.getElementById("profile_password_re_check").style.display = 'block';
    document.getElementById("profile_password_re").classList.add('warning')	
    isConfirmPasswordValid = false		
  }
  else if (document.getElementById("profile_password_re").value !== document.getElementById("profile_password").value){
    document.getElementById("profile_password_re_check").innerHTML = "Password does not match";
    document.getElementById("profile_password_re_check").style.display = 'block';
    document.getElementById("profile_password_re").classList.add('warning');		
    isConfirmPasswordValid = false;	
  } else {
    document.getElementById("profile_password_re_check").style.display = 'none';
    isConfirmPasswordValid = true;
  }	
}

function updatePassword(){
  checkPassword();
  checkConfirmPassword();
  if(isNewPasswordValid && isConfirmPasswordValid){
    var sent_data = $('#form_user_profile_password').serializeArray();
    sent_data.push({name: "id", value: userId});   
    $.ajax({
          type: 'post',
          url: '../backend/user/UpdateUserPassword.php',
          data: sent_data      
        })
    .done(function (response) {
      console.log("Update password", response);
      document.getElementById("passwordcheck").innerHTML = "Success!";
      setTimeout(function(){
      document.getElementById("passwordcheck").innerHTML = "&nbsp"
      },5000)
    });		
    document.getElementById("form_user_profile_password").reset();
  }
}

var loadFile = function(event) {
  var output = document.getElementById('output');
  output.src = URL.createObjectURL(event.target.files[0]);
  output.onload = function() {
    URL.revokeObjectURL(output.src) // free memory
  }
};

function uploadAvatar(){
  var formData = new FormData();
  formData.append('section', 'general');
  formData.append('action', 'previewImg');
  // Attach file
  formData.append('fileToUpload', $('#fileToUpload')[0].files[0]);
  formData.append('id', userId); 
  $.ajax({
    url: '../backend/user/UploadAvatar.php',
    data: formData,
    type: 'POST',
    contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
    processData: false, // NEEDED, DON'T OMIT THIS
    success: function(res){
      console.log(res);
    }
  });
}
const email_regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
var bool_firstName, bool_lastName, bool_email, bool_address;
function resetbool(){
	bool_firstName = false;
	bool_lastName = false;
	bool_email = false;
	bool_address = false;
	bool_password = false;
	bool_password_re = false;
}
function inputcheck(){
	resetbool();
	if (document.getElementById("profile_firstName").value == ""){
			document.getElementById("profile_firstName_check").innerHTML = "Please fill this out!";
			document.getElementById("profile_firstName").style.border = "1px solid red";
			bool_firstName = false;
			
	} else {
			document.getElementById("profile_firstName_check").innerHTML = "&nbsp";
			document.getElementById("profile_firstName").style.border = "none";	
			bool_firstName = true;
	}
	if (document.getElementById("profile_lastName").value == ""){
			document.getElementById("profile_lastName_check").innerHTML = "Please fill this out!";
			document.getElementById("profile_lastName").style.border = "1px solid red";	
			bool_lastName = false;

	} else {
			document.getElementById("profile_lastName_check").innerHTML = "&nbsp";
			document.getElementById("profile_lastName").style.border = "none";	
			bool_lastName = true;
	}
	
	if( document.getElementById("profile_address").value == ""){
			document.getElementById("profile_address_check").innerHTML = "Please fill this out!";
			document.getElementById("profile_address").style.border = "1px solid red";	
			bool_address = false;
	} else {
			document.getElementById("profile_address_check").innerHTML = "&nbsp";
			document.getElementById("profile_address").style.border = "none";	
			bool_address = true;
	}
	if(document.getElementById("profile_email").value == ""){
			document.getElementById("profile_email_check").innerHTML = "Please fill this out!";
			document.getElementById("profile_email").style.border = "1px solid red";
			bool_email = false;
	}
	else if(!email_regex.test(String(profile_email.value).toLowerCase())){
			document.getElementById("profile_email_check").innerHTML = "Please provide a correct email address!";
			document.getElementById("profile_email").style.border = "1px solid red";
			bool_email = false;	
	} else {
			document.getElementById("profile_email_check").innerHTML = "&nbsp";
			document.getElementById("profile_email").style.border = "none";		
			bool_email = true;
	}
	
	
	if (bool_address == true && bool_email == true && bool_firstName == true && bool_lastName == true){
          $.ajax({
            type: 'post',
            url: './user_profile_save.php',
            data: $('#form_user_profile_general').serialize()       
          })
		  .done(function () {
              document.getElementById("inputcheck").innerHTML = "Success!";
			  setTimeout(function(){
				document.getElementById("inputcheck").innerHTML = "&nbsp"
				},5000)
			});
	
	}
	resetbool();

}

var bool_password, bool_password_re;
function passwordcheck(){
	resetbool();
	if (document.getElementById("profile_password").value == ""){
			document.getElementById("profile_password_check").innerHTML = "Please fill this out!";
			document.getElementById("profile_password").style.border = "1px solid red";
			bool_password = false;
			
	} else if(document.getElementById("profile_password").value.length < 8){
			document.getElementById("profile_password_check").innerHTML = "Must be at least 8 character"; //ADD MORE  PASSWORD CONSTRAINT HERE
			document.getElementById("profile_password").style.border = "1px solid red";
			bool_password = false;
			
	} else {
			document.getElementById("profile_password_check").innerHTML = "&nbsp";
			document.getElementById("profile_password").style.border = "none";	
			bool_password = true;
	}
	if (document.getElementById("profile_password").value == "" && document.getElementById("profile_password_re").value == ""){
			document.getElementById("profile_password_re_check").innerHTML = "Please fill this out!";
			document.getElementById("profile_password_re").style.border = "1px solid red";			
	}
	else if (document.getElementById("profile_password_re").value !== document.getElementById("profile_password").value){
			document.getElementById("profile_password_re_check").innerHTML = "Password does not match";
			document.getElementById("profile_password_re").style.border = "1px solid red";		
			bool_password_re = false;	
	} else {
			document.getElementById("profile_password_re_check").innerHTML = "&nbsp";
			document.getElementById("profile_password_re").style.border = "none";	
			bool_password_re = true;
	}	
	if (bool_password == true && bool_password_re == true){
          $.ajax({
            type: 'post',
            url: './user_profile_save_password.php',
            data: $('#form_user_profile_password').serialize()       
          })
		  .done(function () {
              document.getElementById("passwordcheck").innerHTML = "Success!";
			  setTimeout(function(){
				document.getElementById("passwordcheck").innerHTML = "&nbsp"
				},5000)
			});		
			document.getElementById("form_user_profile_password").reset();
		}
	resetbool();		
}

function avatarcheck(){
    $.ajax({
		type: 'post',
        url: './user_profile_save_avatar.php',
        data: $('#form_user_profile_avatar').serialize()       
    })
	.done(function () {
		  var xhttp = new XMLHttpRequest();
		  xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
			document.getElementById("user_profile_avatar").src = this.responseText;
			}
		  };
		  xhttp.open("get", "user_profile_update_avatar.php?", true);
		  xhttp.send();
	});		
	document.getElementById("form_user_profile_avatar").reset();
}
	


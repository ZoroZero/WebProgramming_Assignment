const Http = new XMLHttpRequest();
const userId = getCookie("userId");
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
    const url='http://localhost/webassignment/backend/user/GetUserInformation.php?userId=' + userId;
    Http.open("GET", url);
    Http.send();
    Http.onreadystatechange = (e) => {
        if(Http.response){
            // console.log(Http.response);
            if(!Http.response['error']){
                console.log(JSON.parse(Http.response)['data']);
                let information = JSON.parse(Http.response)['data'];
                document.getElementById("profile_id").value = userId;
                document.getElementById("profile_username").value = information['FirstName'];
                document.getElementById("profile_firstName").value = information['FirstName'];
                document.getElementById("profile_lastName").value = information['LastName'];
                document.getElementById("profile_email").value = information['Email'];
                document.getElementById("profile_address").value = information['Address'];

            }
        }
    }
}

var request;
$(document).ready(function(){
  $("#form_user_profile_general").submit(function(event){
    event.preventDefault();

    if (request) {
      request.abort();
    }
    var values = $(this).serialize();

    request = $.post("http://localhost/webassignment/backend/user/UpdateUserInformation.php",
                      values,
                      function(response) {
                        if(response){
                          console.log("Response: "+response);
                          getUserInformation();
                        }
                        
                    }
    );

    // Callback handler that will be called on failure
    request.fail(function (jqXHR, textStatus, errorThrown){
        // Log the error to the console
        console.error(
            "The following error occurred: "+
            textStatus, errorThrown
        );
    });
  });
});


function ValidateEmail() 
{
  var email = document.getElementById("profile_email").value;
  if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
  {
    return true;
  }
  alert("You have entered an invalid email address!")
  return false;
}

getUserInformation();
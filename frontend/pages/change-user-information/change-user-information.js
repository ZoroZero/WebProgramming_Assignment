const Http = new XMLHttpRequest();

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
    var userId = getCookie("userId");
    const url='http://localhost/webassignment/backend/user/GetUserInformation.php?userId=' + userId;
    Http.open("GET", url);
    Http.send();
    Http.onreadystatechange = (e) => {
        if(Http.response){
            // console.log(Http.response);
            if(!Http.response['error']){
                console.log(JSON.parse(Http.response)['data']);
                let information = JSON.parse(Http.response)['data'];
                document.getElementById("profile_username").value = information['FirstName'];
                document.getElementById("profile_firstName").value = information['FirstName'];
                document.getElementById("profile_lastName").value = information['LastName'];
                document.getElementById("profile_email").value = information['Email'];
                document.getElementById("profile_address").value = information['Email'];

            }
        }
    }
}

getUserInformation();
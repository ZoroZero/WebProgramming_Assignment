const Http = new XMLHttpRequest();
const url='http://localhost/webassignment/backend/user/GetUserInformation.php';
Http.open("GET", url);
Http.send();

Http.onreadystatechange = (e) => {
    if(Http.response){
       
    }
}
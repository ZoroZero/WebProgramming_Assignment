function Validate() {
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("rePassword").value;
    if (password != confirmPassword) {
        rePassword.setCustomValidity("Passwords do not match.");
        return false;
    }
    rePassword.setCustomValidity("")
    return true;
}

function resetModal(){

}


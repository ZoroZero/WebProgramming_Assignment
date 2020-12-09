import { getCookie, closeAlert, openAlert, loadFile } from "../../index.js";

const userId = getCookie("userId");
window.checkDefaultValue = checkDefaultValue;
window.loadFile = loadFile;
window.uploadAvatar = uploadAvatar;
window.closeAlert = closeAlert;

var information;
$(document).ready(function(){
    getUserInformation();

    // user profile form
    $(function () {
        $("form[id='form_user_profile_general']").validate({
            invalidHandler: function(e) {
                e.stopPropagation()
            },
            submitHandler: function(form, e) {
                e.preventDefault();
                var sent_data = $(form).serializeArray();
                sent_data.push({name: "userId", value: userId});
                console.log(sent_data)   
                $.ajax({
                    type: 'post',
                    url: '../backend/user/UpdateUserInformation.php',
                    data: sent_data      
                })
                .done(function (response) {
                    console.log(response);
                    checkDefaultValue()
                    if(document.getElementById("inputcheck").style.display !== "none") {
                        closeAlert("inputcheck")
                        document.getElementById("loader").style.display = "block"
                        setTimeout(function(){
                            document.getElementById("loader").style.display = "none"
                            openAlert("inputcheck")
                            
                        },2000)
                    }
                    document.getElementById("loader").style.display = "block"
                    setTimeout(function(){
                        document.getElementById("loader").style.display = "none"
                        openAlert("inputcheck")
                    },2000)
                });
                return false;
            }
        });
    });

    // user password form
    $(function () {
        $("form[id='form_user_profile_password']").validate({
            rules:{
                profile_Oldpassword: {
                    required: true,
                    minlength: 8,
                },
                profile_password: {
                    required: true,
                    notEqual: "#profile_Oldpassword",
                    pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
                },
                profile_password_re: {
                    required: true,
                    equalTo: "#profile_password"
                }
            },
            messages: {
                profile_Oldpassword: {
                    required: "This field is required",
                    minlength: jQuery.validator.format("At least {0} characters required!"),
                },
                profile_password: {
                    required: "This field is required",
                    notEqual: "New password can not be the same as old password",
                    pattern: "The password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                },
                profile_password_re: {
                    required: "This field is required",
                    equalTo : "This has to be the same as new password"
                },
            },
            invalidHandler: function(e) {
                e.stopPropagation()
            },
            submitHandler: function(form, e) {
                e.preventDefault();
                var sent_data = $(form).serializeArray(); 
                var id = {
                    name: "id",
                    value: userId
                };
                sent_data.push(id);
                $.ajax({
                    type: 'post',
                    url: '../backend/user/UpdateUserPassword.php',
                    data: sent_data      
                    })
                .done(function (response) {
                    // console.log("Update password", response);
                    if(document.getElementById("inputcheck_password").style.display !== "none") {
                        closeAlert("inputcheck_password")
                        document.getElementById("loader2").style.display = "block"
                        setTimeout(function(){
                            document.getElementById("loader2").style.display = "none"
                            openAlert("inputcheck_password")
                            
                        },2000)
                    }
                    document.getElementById("loader2").style.display = "block"
                    setTimeout(function(){
                        document.getElementById("loader2").style.display = "none"
                        openAlert("inputcheck_password")
                    },2000)
                });		
                return false;
            }
        });
    });


})

function getUserInformation(){
    var request = $.get(`../backend/user/GetUserInformation.php?userId=${userId}`,
        function(response) {
            if(response) {
                information = JSON.parse(response)['data'];
                // document.getElementById("profile_id").value = userId;
                document.getElementById("profile_username").value = information['UserName'];
                document.getElementById("profile_firstName").value = information['FirstName'];
                document.getElementById("profile_lastName").value = information['LastName'];
                document.getElementById("profile_email").value = information['Email'];
                document.getElementById("profile_address").value = information['Address'];
                document.getElementById('user_profile_avatar').src = information['Path'] ? '../frontend/' + information['Path'] : './assets/imgs/users/avatar/default-avatar.png';
                document.getElementById('output').src = information['Path'] ? '../frontend/' + information['Path'] : './assets/imgs/users/avatar/default-avatar.png';
            }
        }
    );
  
    // Callback handler that will be called on failure
    request.fail(function (jqXHR, textStatus, errorThrown){
        // Log the error to the console
        console.error("The following error occurred: ", textStatus, errorThrown);
    });
}

function checkDefaultValue() {
    var firstname = document.getElementById("profile_firstName").value;
    var lastname = document.getElementById("profile_lastName").value;
    var email = document.getElementById("profile_email").value;
    var address = document.getElementById("profile_address").value;
    var request = $.get(`../backend/user/GetUserInformation.php?userId=${userId}`,
        function(response) {
            if(response){
                let information = JSON.parse(response)['data'];
                if (firstname !== information['FirstName'] ||
                    lastname !== information['LastName'] ||
                    email !== information['Email'] ||
                    address !== information['Address']) {   
                    document.getElementById("submit-info").removeAttribute("disabled")
                }
                if (firstname === information['FirstName'] &&
                    lastname === information['LastName'] &&
                    email === information['Email'] &&
                    address === information['Address']) {
                    document.getElementById("submit-info").setAttribute("disabled", true)
                }
                
            }
            
        }
    );
    
}

function uploadAvatar(){
    var formData = new FormData();
    formData.append('section', 'general');
    formData.append('action', 'previewImg');
    // Attach file
    formData.append('fileToUpload', $('#fileToUpload')[0].files[0]);
    formData.append('id', userId); 
    console.log( $('#fileToUpload')[0]);
    $.ajax({
        url: '../backend/user/UploadAvatar.php',
        data: formData,
        type: 'POST',
        contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
        processData: false, // NEEDED, DON'T OMIT THIS
        success: function(res){
            var data = JSON.parse(res)
            getUserInformation();
            if(data.error===true) {
                if(document.getElementById("inputcheck_upload_imgs_success")) {
                    closeAlert("inputcheck_upload_imgs_success");
                }
                openAlert("inputcheck_upload_imgs_danger");
                if(document.getElementById("inputcheck_upload_imgs_success")) {
                    document.getElementById("inputcheck_upload_imgs_danger").innerHTML= `${data.message}. Please try again!
                    <button type="button" class="close" onclick="closeAlert('inputcheck_upload_imgs_danger')">
                        <span aria-hidden="true">&times;</span>
                    </button>`;
                }
                
            }
            else {
                if(document.getElementById("inputcheck_upload_imgs_danger")) {
                    closeAlert("inputcheck_upload_imgs_danger");
                }
                openAlert("inputcheck_upload_imgs_success");
            }

        }
    });
}

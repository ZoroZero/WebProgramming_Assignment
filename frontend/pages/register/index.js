import {openAlert, closeAlert} from '../../index.js';
window.closeAlert = closeAlert;
window.openAlert = openAlert;
$(document).ready(function() {
    //check form register submission
    $(function () {
        $("form[id='register-form']").validate({
            rules:{
                inputFirstname: {
                    required: true,
                    minlength: 2,
                },
                inputLastname: {
                    required: true,
                    minlength: 2,
                },
                inputEmail: {
                    required: true,
                    email: true,
                },
                username: {
                    required: true,
                    minlength: 8,
                },
                password: {
                    required: true,
                    pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
                },
                rePassword: {
                    required: true,
                    equalTo: "#password"
                }
            },
            messages: {
                inputFirstname: {
                    required: "This field is required",
                    minlength: jQuery.validator.format("At least {0} characters required!"),
                },
                inputLastname: {
                    required: "This field is required",
                    minlength: jQuery.validator.format("At least {0} characters required!"),
                },
                inputEmail: {
                    required: "This field is required",
                    email: "Please check your email again",
                },
                password: {
                    required: "This field is required",
                    pattern: "The password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                },
                rePassword: {
                    required: "This field is required",
                    equalTo : "This has to be the same as the password"
                },
            },
            invalidHandler: function(e) {
                e.stopPropagation()
            },
            submitHandler: function(form, e) {
                var response = grecaptcha.getResponse();
                if (response.length === 0) {
                    alert("please verify you are human!"); 
                    return false;
                } 
                var sent_data = $(form).serializeArray();
                console.log(sent_data)
                $.ajax({
                    type: 'post',
                    url: '../backend/user/RegisterUser.php',
                    data: sent_data      
                })
                .done(function (response) {
                    response = JSON.parse(response);
                    console.log(response)
                    if(document.getElementById("inputcheck_success").style.display !== "none") {
                        closeAlert("inputcheck_success")
                    }
                    if(document.getElementById("inputcheck_error").style.display !== "none") {
                        closeAlert("inputcheck_error")
                    }
                    if(response.error) {
                        document.getElementById("loader3").style.display = "block"
                        setTimeout(function(){
                            document.getElementById("loader3").style.display = "none"
                            document.getElementById("inputcheck_error").innerHTML = `Error! ${response.message}
                                <button type="button" class="close" onclick="closeAlert('inputcheck_error')">
                                    <span aria-hidden="true">&times;</span>
                                </button>`
                            openAlert("inputcheck_error")
                            
                        },2000)
                    }
                    else {
                        document.getElementById("loader3").style.display = "block"
                        setTimeout(function(){
                            document.getElementById("loader3").style.display = "none"
                            document.getElementById("inputcheck_success").innerHTML = `${response.message}! Please go back to the login session.
                                <button type="button" class="close" onclick="closeAlert('inputcheck_success')">
                                    <span aria-hidden="true">&times;</span>
                                </button>`
                            openAlert("inputcheck_success")
                            
                        },2000)
                    }
                    
                });		
                return false;
            }
        });
    });
})
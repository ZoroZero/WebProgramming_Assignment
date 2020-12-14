import {openAlert, closeAlert } from '../../index.js';

$(document).ready(function() {
    //check form login submission
    $(function () {
        $("form[id='form-login']").validate({
            rules:{
                inputUsername: {
                    required: true,
                },
                inputPassword: {
                    required: true,
                },
            },
            messages: {
                inputUsername: {
                    required: "This field is required",
                },
                inputPassword: {
                    required: "This field is required",
                },
            },
            invalidHandler: function(e) {
                e.stopPropagation()
            },
            submitHandler: function(form, e) {
                var sent_data = $(form).serializeArray();
                $.ajax({
                    type: 'post',
                    url: '../backend/user/loginUser.php',
                    data: sent_data      
                })
                .done(function (response) {
                    console.log(response)
                    response = JSON.parse(response);
                    
                    
                    if(document.getElementById("inputcheck_success").style.display !== "none") {
                        closeAlert("inputcheck_success")
                    }
                    if(document.getElementById("inputcheck_error").style.display !== "none") {
                        closeAlert("inputcheck_error")
                    }
                    if(response.error) {
                        document.getElementById("loader4").style.display = "block";
                        document.getElementById("submit_login_btn").setAttribute("disabled", true)

                        setTimeout(function(){
                            document.getElementById("loader4").style.display = "none"
                            document.getElementById("inputcheck_error").innerHTML = `Error! ${response.message}
                                <button type="button" class="close" onclick="closeAlert('inputcheck_error')">
                                    <span aria-hidden="true">&times;</span>
                                </button>`
                            openAlert("inputcheck_error")
                            document.getElementById("submit_login_btn").removeAttribute("disabled")
                        },2000)
                    }
                    else {
                        document.getElementById("loader4").style.display = "block"
                        document.getElementById("submit_login_btn").setAttribute("disabled", true)
                        var timeleft = 2;
                        setTimeout(function(){
                            document.getElementById("loader4").style.display = "none"
                            var downloadTimer = setInterval(function() {
                                if (timeleft <= 0) {
                                    clearInterval(downloadTimer);
                                    if(response.role == 1){
                                        window.location.replace("../frontend/home");
                                    }
                                    else{
                                        window.location.replace("../frontend/staff");
                                    }
                                } else {
                                    document.getElementById("inputcheck_success").innerHTML = `${response.message}! Please wait for ${timeleft} seconds to redirect to homepage.`;
                                }
                                timeleft -= 1;
                            }, 1000);    
                            openAlert("inputcheck_success")
                        },1000)
                    }
                    
                });		
                return false;
            }
        });
    });
})
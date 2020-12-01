<!--start #register-section-->
<section id="register">
    <div class="container" style="min-height: 75vh;">
        <div class="row my-5">
            <div class="col-sm-9 col-md-8 mx-auto d-flex flex-column">
                <div class="card card-register">
                    <div class="card-body">
                        <h5 class="card-title text-center font-baloo">Register</h5>
                        <form class="form-register" id="register-form">
                            <div class="form-row">
                                <div class="form-group col-sm-12 col-md-6 my-2">
                                    <label for="inputFirstname">Firstname</label>
                                    <input id="inputFirstname" type="text" name="inputFirstname" class="form-control font-raleway" placeholder="Enter your firstname here..." autofocus>
                                </div>
                                <div class="form-group col-sm-12 col-md-6 my-2">
                                    <label for="inputLastname">Lastname</label>
                                    <input type="text" id="inputLastname" name="inputLastname" class="form-control font-raleway" placeholder="Enter your lastname here...">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputEmail">Email</label>
                                <input type="email" id="inputEmail" name="inputEmail" class="form-control font-raleway" placeholder="Enter your email here...">
                            </div>
                            <div class="form-group">
                                <label for="username">Username</label>
                                <input type="text" class="form-control font-raleway" name="username" id="username" placeholder="Enter your username here...">
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input type="password" class="form-control font-raleway" name="password" id="password" placeholder="Input your password here...">
                            </div>
                            <div class="form-group">
                                <label for="rePassword">Re-password</label>
                                <input type="password" class="form-control font-raleway" name="rePassword" id="rePassword" placeholder="Re-enter your password">
                            </div>

                            <div class="g-recaptcha my-3" data-sitekey="6LfXiekZAAAAAI-Yk6QMS9vGMhwP0DH1k6N59GfC"></div>
                            <button type="submit" class="btn color-primary-bg text-white btn-block font-size-18 mt-5">
                                <i class="fas fa-user-plus mr-2"></i>
                                Register
                            </button>
                        </form>
                        <div class="loader" id="loader3" style="display: none;"></div>
                        <div class="alert alert-danger alert-dismissible fade show mt-2" style="display: none;" id="inputcheck_error" role="alert">
                            Error!
                            <button type="button" class="close" onclick="closeAlert('inputcheck_error')">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="alert alert-success alert-dismissible fade show mt-2" style="display: none;" id="inputcheck_success" role="alert">
                            Success!
                            <button type="button" class="close" onclick="closeAlert('inputcheck_success')">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>
                </div>
                <a href="../frontend/?page=login" class="my-5 font-size-18 register-go-back">
                    <i class="fas fa-arrow-left mr-2"></i>
                    Go back to login
                </a>
            </div>
        </div>
    </div>
</section>
<!--end #register-section-->
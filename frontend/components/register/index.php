<!--start #register-section-->
<section id="register">
    <div class="container" style="min-height: 75vh;">
        <div class="row my-5">
            <div class="col-sm-9 col-md-8 mx-auto d-flex flex-column">
                <div class="card card-register">
                    <div class="card-body">
                        <h5 class="card-title text-center font-baloo">Register</h5>
                        <form class="form-register">
                            <div class="form-row">
                                <div class="col-sm-12 col-md-6 my-2">
                                    <input type="text" class="form-control font-raleway" placeholder="First name">
                                </div>
                                <div class="col-sm-12 col-md-6 my-2">
                                    <input type="text" class="form-control font-raleway" placeholder="Last name">
                                </div>
                            </div>
                            <input type="email" id="inputEmail" class="form-control mt-2 mb-3 font-raleway" placeholder="Enter your email" required autofocus>
                            <input type="text" class="form-control font-raleway" name="username" id="username" pattern="^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$" title="Username must be 8 to 20 characters long with no _ or . at the beginning, no __ or _. or ._ or .. inside and no _ or . at the end " placeholder="Username" required>
                            <small id="defaultRegisterFormPasswordHelpBlock" class="form-text text-muted mb-4">
                                Must be 8 to 20 characters long with no _ or . at the beginning, no __ or _. or ._ or .. inside and no _ or . at the end
                            </small>

                            <input type="password" class="form-control font-raleway" name="password" id="password" onchange="Validate()" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" placeholder="Password" minlength="8" required>
                            <small id="defaultRegisterFormPasswordHelpBlock" class="form-text text-muted mb-4">
                                Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters
                            </small>
                            <input type="password" class="form-control mb-2 font-raleway" id="rePassword" onkeyup="Validate()" placeholder="Re-enter Password" required>

                            <div class="g-recaptcha my-3" data-sitekey="6LfXiekZAAAAAI-Yk6QMS9vGMhwP0DH1k6N59GfC"></div>
                            <button type="submit" class="btn color-primary-bg text-white btn-block font-size-18 mt-5">
                                <i class="fas fa-user-plus"></i>
                                &nbsp;Register
                            </button>
                        </form>
                    </div>
                </div>
                <a href="#" class="my-5 font-size-18 register-go-back">
                    <i class="fas fa-arrow-left mr-2"></i>
                    Go back to login
                </a>
            </div>
        </div>
    </div>
</section>
<!--end #register-section-->
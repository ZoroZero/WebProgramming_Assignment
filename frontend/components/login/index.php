<!-- <div id="signIn" role="dialog">
    <div class="modal-dialog mb-auto">

        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title"><strong>Sign In</strong> </h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
                <form role="form" action="http://localhost/webassignment/backend/user/LoginUser.php" method="post">
                    <div class="form-group">
                        <input type="text" class="form-control mb-2" name="username" id="username" placeholder="Username" required>
                        <input type="password" class="form-control mb-2" name="password" id="password" placeholder="Password" minlength="8" required>
                    </div>
                    <input type="submit" class="btn btn-light btn-block"><span class="glyphicon glyphicon-off"></span> Login</input>
                </form>
            </div>
        </div>

    </div>
</div> -->

<!--login-->
<section id="login">
    <!-- <div class="container py-5">
        <h1 class="h3 mb-3 font-weight-normal" style="text-align: center"> Sign in</h1>
        <form role="form" action="http://localhost/webassignment/backend/user/LoginUser.php" method="post" class="form-signin">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" class="form-control mb-2 mx-auto w-50" name="username" id="username" placeholder="Enter your email" required>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control mb-2 w-50" name="password" id="password" placeholder="Enter your password" minlength="8" required>
            </div>
            <div class="g-recaptcha my-3" data-sitekey="6LfXiekZAAAAAI-Yk6QMS9vGMhwP0DH1k6N59GfC"></div>
            <button type="submit" class="btn btn-success btn-block w-25"><i class="fas fa-sign-in-alt"></i>&nbsp;Login</button>
        </form>
        <h1 class="h3 mb-3 font-weight-normal" style="text-align: center"> forgot password?</h1>
        <form action="/reset/password/" class="form-reset">
            <input type="email" id="resetEmail" class="form-control mb-2" placeholder="Email address" required="" autofocus="">
            <button class="btn btn-primary btn-block" type="submit">Reset Password</button>
        </form>
        <div class="row">
            <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div class="card card-signin my-5">

                </div>
            </div>
        </div>
    </div> -->
    <div class="container" style="min-height: 75vh;">
        <div class="row my-5">
            <div class="col-sm-9 col-md-7 col-lg-6 mx-auto">
                <div class="card card-signin">
                    <div class="card-body">
                        <h5 class="card-title text-center font-baloo">Sign In</h5>
                        <form class="form-signin" role="form" action="http://localhost/webassignment/backend/user/LoginUser.php" method="post">
                            <div class="form-label-group">
                                <label for="inputEmail" class="font-rubik font-size-16">Email address</label>
                                <input type="email" id="inputEmail" class="form-control font-raleway p-4 login-input" placeholder="Enter your email" required autofocus>
                            </div>

                            <div class="form-label-group mt-2">
                                <label for="inputPassword" class="font-rubik font-size-16">Password</label>
                                <input type="password" id="inputPassword" class="form-control font-raleway p-4 login-input" placeholder="Enter your password" minlength="8" required>
                            </div>

                            <div class="custom-control custom-checkbox my-3">
                                <input type="checkbox" class="custom-control-input" id="customCheck1">
                                <label class="custom-control-label font-rubik font-size-16" for="customCheck1">Remember password</label>
                            </div>
                            <div class="g-recaptcha my-3" data-sitekey="6LfXiekZAAAAAI-Yk6QMS9vGMhwP0DH1k6N59GfC"></div>
                            <button type="submit" class="btn color-primary-bg text-white btn-block font-size-16 mt-5">
                                <i class="fas fa-sign-in-alt"></i>
                                &nbsp;Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="row my-5">
            <div class="col-sm-9 col-md-7 col-lg-6 mx-auto d-flex flex-column">
                <div class="card card-signin">
                    <div class="card-body">
                        <h5 class="card-title text-center font-baloo">Forget Password?</h5>
                        <form class="form-reset" role="form" action="/reset/password/" method="post">
                            <div class="form-label-group">
                                <label for="inputEmail" class="font-rubik font-size-16">Email address</label>
                                <input type="email" id="inputEmail" class="form-control font-raleway p-4 login-input" placeholder="Enter your email" required>
                            </div>
                            <button type="submit" class="btn color-secondary-bg text-white btn-block font-size-16 mt-5">
                                <i class="fas fa-sign-in-alt"></i>
                                &nbsp;Submit
                            </button>
                        </form>
                    </div>
                </div>
                <a href="#" class="my-5 font-size-18 login-go-to ml-auto">
                    Go to register
                    <i class="fas fa-arrow-right ml-2"></i>
                </a>
            </div>
        </div>
    </div>
</section>
<!--!login-->
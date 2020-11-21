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
<section id="login" style="height:100vh">
    <div class="container py-5 text-center">
        <h1 class="h3 mb-3 font-weight-normal" style="text-align: center"> Sign in</h1>
        <form role="form" action="http://localhost/webassignment/backend/user/LoginUser.php" method="post" class="form-signin">
            <div class="form-group">
                <input type="text" class="form-control mb-2" name="username" id="username" placeholder="Username" required>
                <input type="password" class="form-control mb-2" name="password" id="password" placeholder="Password" minlength="8" required>
            </div>
            <button type="submit" class="btn btn-success btn-block"><i class="fas fa-sign-in-alt"></i>&nbsp;Login</button>
        </form>
        <h1 class="h3 mb-3 font-weight-normal" style="text-align: center"> forgot password?</h1>
        <form action="/reset/password/" class="form-reset">
            <input type="email" id="resetEmail" class="form-control mb-2" placeholder="Email address" required="" autofocus="">
            <button class="btn btn-primary btn-block" type="submit">Reset Password</button>
        </form>
    </div>
</section>
<!--!login-->
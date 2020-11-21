<div class="container my-5">
    <form action="http://localhost/webassignment/backend/user/RegisterUser.php" method="post">
        <div class="form-group">
            <input type="text" class="form-control mb-2" name="fName" id="fName" placeholder="Firstname" required>
            <input type="text" class="form-control mb-2" name="lName" id="lName" placeholder="Lastname" required>
            <input type="email" class="form-control mb-2" name="email" id="email" placeholder="E-mail" required>
            <input type="text" class="form-control mb-2" name="username" id="username" pattern="^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$" title="Username must be 8 to 20 characters long with no _ or . at the beginning, no __ or _. or ._ or .. inside and no _ or . at the end " placeholder="Username" required>
            <input type="password" class="form-control mb-2" name="password" id="password" onchange="Validate()" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" placeholder="Password" minlength="8" required>
            <input type="password" class="form-control mb-2" id="rePassword" onkeyup="Validate()" placeholder="Re-enter Password" required>
        </div>
        <input type="submit" class="btn btn-light btn-block" value="Confirm"> <span class="glyphicon glyphicon-off"></span> </input>
    </form>
</div>
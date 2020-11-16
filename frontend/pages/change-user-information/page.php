<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
    <script src="https://kit.fontawesome.com/c9d4cc6b24.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
    <script src="https://kit.fontawesome.com/c9d4cc6b24.js" crossorigin="anonymous"></script>
    <script>
    if ( window.history.replaceState ) {
            window.history.replaceState( null, null, window.location.href );
        }
    </script>
</head>
<body>
    <div class="col-lg-6">
        <div class="col-lg-4 user_profile_sidepanel"> <!-- required for floating -->
            <!-- Nav tabs -->
            <ul class="nav nav-tabs tabs-left sideways centered">
            <li class="active user_profile_sidepanel_tab">
                <a href="#tab_general" data-toggle="tab" class="user_profile_sidepanel_link">
                    <i class="fas fa-users-cog fa-lg"></i>	Genenal</a>
            </li>
            
            <li class="user_profile_sidepanel_tab">
                <a href="#tab_avatar" data-toggle="tab" class="user_profile_sidepanel_link">
                    <i class="far fa-user-circle fa-lg"></i>	Profile image</a>
            </li>
            
            <li class="user_profile_sidepanel_tab">	
                <a href="#tab_password" data-toggle="tab" class="user_profile_sidepanel_link">
                    <i class="fas fa-key"></i>	Password</a>
            </li>
            
            </ul>
        </div>

        <div class="col-lg-8 user_profile_main">
            <!-- Tab panes -->
            <div class="tab-content profile_tab">
            <div class="tab-pane active" id="tab_general">
                <h1 class="tab_title">Genenal</h1>
                <form id="form_user_profile_general" class="user_profile_form" action="" method="post">
                <?php include "user_profile_processing.php"; ?>
                    <p class="profile_edit">
                        <label for="profile_username" class="user_profile_label">Username</label>
                        <input  type="text" id="profile_username" name="profile[username]" search="false" image-upload="false" maxlength="50" class="form-input-input" placeholder="" spellcheck="false" disabled="disabled">
                        <!-- <?php 
                            echo '<input value="';
                            echo $profile_username;
                            echo '" type="text" id="profile_username" name="profile[username]" search="false" image-upload="false" maxlength="50" class="form-input-input" placeholder="" spellcheck="false" disabled="disabled">'; 
                        ?> -->
                    </p>
                    <br>

                    <p class="profile_edit">
                        <label for="profile_firstName" class="user_profile_label">First name</label>
                        <?php 
                            echo '<input value = "';
                            echo $profile_firstname;
                            echo '" type="text" id="profile_firstName" name="profile[firstName]" search="false" image-upload="false" maxlength="50" class="form-input-input" placeholder="" spellcheck="false" autocomplete="off">';
                        ?>	
                    </p>
                    <br>
                    
                    <p class="profile_edit">
                        <label for="profile_lastName" class="user_profile_label">Last name</label>
                        <?php 
                            echo '<input value = "';
                            echo $profile_lastname;
                            echo '" type="text" id="profile_lastName" name="profile[lastName]" search="false" image-upload="false" maxlength="50" class="form-input-input" placeholder="" spellcheck="false" autocomplete="off">';
                        ?>
                    </p>
                    <br>
                    
                    <p class="profile_edit">
                        <label for="profile_email" class="user_profile_label">Email</label>
                        <?php 
                            echo '<input value = "';
                            echo $profile_email;
                            echo '" type="text" id="profile_email" name="profile[email]" search="false" image-upload="false" maxlength="50" class="form-input-input" placeholder="" spellcheck="false" autocomplete="off">';
                        ?>
                    </p>
                    <br>
                    
                    <p class="profile_edit">
                        <label for="profile_address" class="user_profile_label">Address</label>
                        <?php 
                            echo '<input value = "';
                            echo $profile_address;
                            echo '" type="text" id="profile_address" name="profile[address]" search="false" image-upload="false" maxlength="100" class="form-input-input" placeholder="" spellcheck="false" autocomplete="off">';
                            ?>
                    </p>
                    <br>
                <button type="submit" form="form_user_profile_general" value="save" class="user_profile_button">Save</button>
                <div class="user_profile_check_result">
                    <p class="user_profile_check_result" id="inputcheck">  </p>
                </div>
                </form>
            </div>
            <div class="tab-pane" id="tab_avatar">
                <h1 class="tab_title">Profile image</h1>
            
                <?php 
                    echo '<img src="';
                    echo $profile_avatar;
                    echo '" class="profile_avatar">'
                ?>
                <br>
                <br>
                <button type="submit" value="save" class="user_profile_button">Change avatar</button>						
            </div>
            <div class="tab-pane" id="tab_password"> <!-- CALL A PHP FILE FROM AJAX TO CHECK PASSWORD-->
                <h1 class="tab_title">Change password</h1>
                <form id="form_user_profile_password" class="user_profile_form" action="" method="post">
                    <p class="profile_edit">
                        <label for="profile_password" class="user_profile_label">New </label>
                        <input type="password" id="profile_password" name="profile[password]" search="false" image-upload="false" maxlength="50" class="form-input-input" placeholder="" spellcheck="false" autocomplete="off">
                    </p>
                    <br>

                    <p class="profile_edit">
                        <label for="profile_password_re" class="user_profile_label">Confirm </label>
                        <input type="password" id="profile_password_re" name="profile[password_re]" search="false" image-upload="false" maxlength="50" class="form-input-input" placeholder="" spellcheck="false" autocomplete="off">
                    </p>	
                <button type="submit" form="form_user_profile_password" value="confirm" class="user_profile_button">Confirm</button>		
                    
                </form>
                <br>
                <br>
                <p class="user_profile_check_result" id="passwordcheck"><!--MESSAGE ON WARNING HERE--></p>
            </div>

            </div>
        </div>

        <div class="clearfix"></div>

    </div>
</body>
</html>
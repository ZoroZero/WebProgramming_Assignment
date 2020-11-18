<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
	<script src="https://kit.fontawesome.com/c9d4cc6b24.js" crossorigin="anonymous"></script>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.2/jquery.validate.js"></script>
	<script src="./user_profile_check.js"></script>
	<script>
    if ( window.history.replaceState ) {
			window.history.replaceState( null, null, window.location.href );
	}
	</script>
	<style>
		.user_profile_form  {
			display: table; 
		}
		
		.profile_edit {
			display: table-row;  
		}
		
		.user_profile_label { 
			display: table-cell; 
			padding-left:10px;
		}
		.user_profile_sidepanel{
			background-color:pink;
			text-align:center;
			padding-left:0;
			padding-right:0;
		}
		.tab_title{
			font-size:50px;
			margin:0;
			margin-bottom:50px;
			margin-left:10px;
			padding-top:10px;
		}
		.nav-tabs.centered > .user_profile_sidepanel_tab > .user_profile_sidepanel_link, 
		.nav-pills.centered > .user_profile_sidepanel_tab > .user_profile_sidepanel_link {
			background-color: transparent;
			color:black;
			font-size:18px;
			border:0;
			display:inline-block;
		}

		
		@media screen and (min-width:1200px){
			.profile_tab {
				background-color:grey;
				width:200%;
				display:inline-block;
			}
			.user_profile_input_form{ 
				display: table-cell;
				margin-left:200px;
				width:250px;
			}	
			.user_profile_sidepanel{
				position: sticky;
				top: 0;
				border-bottom: 1px solid black;
				border-left: 1px solid black;
				border-right: 1px solid black;
			}	
			.nav-tabs.centered > .user_profile_sidepanel_tab, 
			.nav-pills.centered > .user_profile_sidepanel_tab {
				float:none;
				display:flex;
				border-top:1px solid black;
				justify-content: center;
			}			
			.input_check{
				font-size:12px;
				padding-left:200px;
				color:red;
			}
		}
		@media screen and (max-width:991px){
			.profile_tab {
				background-color:grey;
				width:100%;
				display:inline-block;
			}
			.user_profile_input_form{ 
				display: table-cell;
				margin-left:10px;
				width:200px;
			}
			.user_profile_sidepanel{
				background-clip: content-box;
			}
			.user_profile_main{
				background-clip: border-box;
				background-color: grey;
			}	
			.nav-tabs.centered > .user_profile_sidepanel_tab, 
			.nav-pills.centered > .user_profile_sidepanel_tab {
				float:none;
				display:inline-block;
				background-color:pink ;
			}
			.input_check{
				font-size:12px;
				padding-left:12px;
				color:red;
			}			
			
		}
		@media screen and (min-width:992px) and (max-width:1199px){
			.profile_tab {
				background-color:grey;
				width:210%;
				display:inline-block;
				background-clip: content-box;

			}
			.user_profile_input_form{ 
				display: table-cell;
				margin-left:150px;
				width:250px;
			}	
			.user_profile_sidepanel{
				position: sticky;
				top: 0;
				border-bottom: 1px solid black;
				border-left: 1px solid black;
				border-right: 1px solid black;
			}	
			.nav-tabs.centered > .user_profile_sidepanel_tab, 
			.nav-pills.centered > .user_profile_sidepanel_tab {
				float:none;
				display:flex;
				border-top:1px solid black;
				justify-content: center;
			}			
			.input_check{
				font-size:12px;
				padding-left:150px;
				color:red;
			}
			.col-md-7{
				background-clip:content-box;
			}
			
		}		
		
		.user_profile_check_result{
			padding-left:10px;
			font-size:50px;
			color:red;
		}
		.user_profile_button{
			background-color:pink;
			border: none;
			color: white;
			padding: 10px 25px;
			text-align: center;
			display: inline-block;
			font-size: 16px;
			margin: 20px 10px;
			border-radius: 4px;
			float:left;
		}
		.user_profile_avatar{
			width:200px;
			height:200px;
			border-radius:50%;
			display:block;
			margin-left:auto;
			margin-right:auto;
		}
		/* RADIO AS IMAGE */
		.user_profile_avatar_radio { 
		  position: absolute;
		  opacity: 0;
		  width: 0;
		  height: 0;
		}

		.user_profile_avatar_radio + .user_profile_avatar_img {
		  cursor: pointer;
		}

		/* CHECKED STYLES, CHANGE OUTLINE COLOR IF NEEDED */
		.user_profile_avatar_radio:checked + .user_profile_avatar_img {
		  outline: 3px solid cyan;
		}
		
	</style>
</head>
<body>


 <div class="col-lg-6 col-md-6">
        <div class="col-lg-4 col-md-5 user_profile_sidepanel"> <!-- required for floating -->
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

        <div class="col-lg-8 col-md-7 user_profile_main">
          <!-- Tab panes -->
          <div class="tab-content profile_tab">
            <div class="tab-pane active" id="tab_general">
				<h1 class="tab_title">Genenal</h1>
				<form id="form_user_profile_general" name="form_user_profile_general" class="user_profile_form" autocomplete="off" action="./user_profile_save.php" method="post">
				<?php include "user_profile_processing.php"; ?>
				
				  <div class="profile_edit">
						<label for="profile_username" class="user_profile_label">Username</label>
						<?php 
							echo '<input value="'.
								$profile_username.
								'" type="text" id="profile_username" name="profile_username" search="false" image-upload="false" maxlength="50" class="form-control user_profile_input_form" placeholder="" spellcheck="false" readonly>'; 
						?>
						<div class="input_check"> &nbsp </div>
				  </div>
				  <br>

				  <div class="profile_edit">
						<label for="profile_firstName" class="user_profile_label">First name*</label>
						<?php 
							echo '<input value = "'.
								$profile_firstname.
								'" type="text" id="profile_firstName" name="profile_firstName" search="false" image-upload="false" maxlength="50" class="form-control user_profile_input_form" placeholder="" spellcheck="false">';
						?>	
						<div class="input_check" id="profile_firstName_check"> &nbsp </div>
				  </div>
						
				  <br>
				  
				  <div class="profile_edit">
						<label for="profile_lastName" class="user_profile_label">Last name*</label>
						<?php 
							echo '<input value = "'.
								$profile_lastname.
								'" type="text" id="profile_lastName" name="profile_lastName" search="false" image-upload="false" maxlength="50" class="form-control user_profile_input_form" placeholder="" spellcheck="false">';
						?>
						<div class="input_check" id="profile_lastName_check"> &nbsp </div>
				  </div>
						
				  <br>
				  
				  <div class="profile_edit">
						<label for="profile_email" class="user_profile_label">Email*</label>
						<?php 
							echo '<input value = "'.
								$profile_email.
								'" type="email" id="profile_email" name="profile_email" search="false" image-upload="false" maxlength="50" class="form-control user_profile_input_form" placeholder="" spellcheck="false">';
						?>
						<div class="input_check" id="profile_email_check"> &nbsp </div>
				  </div>
						
				  <br>
				  
				   <div class="profile_edit">
						<label for="profile_address" class="user_profile_label">Address*</label>
						<?php 
							echo '<input value = "'.
								$profile_address.
								'" type="text" id="profile_address" name="profile_address" search="false" image-upload="false" maxlength="200" class="form-control user_profile_input_form" placeholder="" spellcheck="false" >';
						?>
						<div class="input_check" id="profile_address_check"> &nbsp </div>
				  </div>
						
				  <br>
				  
				</form>
				<button value="save" class="user_profile_button" onclick="inputcheck()">Save</button>

				<div>
					<p class="user_profile_check_result" id="inputcheck"> 
						&nbsp
					</p>
				</div>	
				
			</div>
			
			
			
			
			<div class="tab-pane" id="tab_avatar">
				<h1 class="tab_title">Profile image</h1>
			
				<?php 
					echo '<img src="'.
						$profile_avatar.
						'" id="user_profile_avatar" class="user_profile_avatar">'
				?>
				<br>
				<br>
				<button value="save" class="user_profile_button" data-toggle="modal" data-target="#modal_avatar">Change avatar</button>
				<div id="modal_avatar" class="modal fade" role="dialog">
				  <div class="modal-dialog">
					<!-- Modal content-->
					<div class="modal-content">
					  <div class="modal-header">
						<h4 class="modal-title">Select an image</h4>
					  </div>
					  <div class="modal-body">
						<form id="form_user_profile_avatar" name="form_user_profile_avatar" class="user_profile_form" action="user_profile_save_avatar" method="post">
							<div class="row">
								<div class="column">
									<?php
										$dirname = "avatar/";
										$images = glob($dirname."*.jpg");
										foreach($images as $image) {
											echo '<label class="user_profile_avatar_label">'.
												'<input class="user_profile_avatar_radio" type="radio" name="profile_avatar" value="'.$image.'">'.
												'<img src="'.$image.'" class="user_profile_avatar_img" style="width:100px;height:100px;margin-bottom:5px;margin-left:10px;" />'.
												'</label>';
										}
									?>
								</div>
							</div>
						</form>
									
					  </div>
					  <div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal" onclick="avatarcheck()">Apply</button>
						<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>

					  </div>
					</div>

				  </div>
				</div>
			</div>
			
			
			
			
			
			
			
            <div class="tab-pane" id="tab_password"> <!-- CALL A PHP FILE FROM AJAX TO CHECK PASSWORD-->
				<h1 class="tab_title">Change password</h1>
				<form id="form_user_profile_password" name="form_user_profile_password" class="user_profile_form" action="./user_profile_save_password" method="post" autocomplete="off">
				  <div class="profile_edit">
						<label for="profile_password" class="user_profile_label">New</label>
						<input type="password" id="profile_password" name="profile_password" onPaste="return false" onCopy="return false"  search="false" image-upload="false" maxlength="32" class="form-control user_profile_input_form" placeholder="" spellcheck="false">
				  		<div class="input_check" id="profile_password_check"> &nbsp </div>

				  </div>
				  <br>

				  <div class="profile_edit">
						<label for="profile_password_re" class="user_profile_label">Confirm</label>
						<input type="password" id="profile_password_re" name="profile_password_re" onPaste="return false" onCopy="return false" search="false" image-upload="false" maxlength="32" class="form-control user_profile_input_form" placeholder="" spellcheck="false">
						<div class="input_check" id="profile_password_re_check"> &nbsp </div>
				  </div>					  
				</form>
				<button value="confirm" class="user_profile_button" onclick="passwordcheck()">Confirm</button>		
				<div>
					<p class="user_profile_check_result" id="passwordcheck"> 
						&nbsp
					</p>				
				</div>			
			</div>

          </div>
        </div>

        <div class="clearfix"></div>

  </div>
</body>
</html>


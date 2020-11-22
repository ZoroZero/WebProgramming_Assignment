<?php
	// SET EVERYTHING ACCORDINGLY
	if (empty($_POST["profile_password"]) || empty($_POST["profile_password_re"])){
		echo "<script type='text/javascript'>alert('error querying!');</script>";
		header ('Refresh: 0; user_profile.php');	
		// USE SESSION TO CREATE A WARNING MESSAGE
	}
	else {
		$server = "localhost:3307";
		$username = "root";
		$password = "";
		$database = "music";
		$mysqli = new mysqli($server, $username, $password, $database);
		
		if($mysqli->connect_error){
			exit('Could not connect');
			header ('Refresh: 0; user_profile.php');	
			// USE SESSION TO CREATE A WARNING MESSAGE
		}
		$profile_username = "dat"; //USE $_SESSION TO CHECK THIS INSTEAD
		$profile_password = $_POST["profile_password"];
		$profile_password_re = $_POST["profile_password_re"];
		if ($profile_password == $profile_password_re){ //BAD CONDITION
		$sql = "UPDATE `user` SET 
					`password` = '$profile_password'
				WHERE `username` = '$profile_username';";
				if (!mysqli_query($mysqli, $sql, MYSQLI_STORE_RESULT)){
					header ('Refresh: 0; user_profile.php');
					// USE SESSION TO CREATE A WARNING MESSAGE
				} else {
					header ('Refresh: 0; user_profile.php');
					// USE SESSION TO CREATE A SUCCESS MESSAGE
				}
		}
		mysqli_close($mysqli);
	}
?>
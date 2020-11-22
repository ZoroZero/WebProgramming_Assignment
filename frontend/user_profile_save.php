<?php
	// SET EVERYTHING ACCORDINGLY
	if (empty($_POST["profile_firstName"]) || empty($_POST["profile_lastName"]) 
			|| empty($_POST["profile_email"]) || empty($_POST["profile_address"])){
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
		$profile_firstName = $_POST["profile_firstName"];
		$profile_lastName = $_POST["profile_lastName"];
		$profile_email = $_POST["profile_email"];
		$profile_address = $_POST["profile_address"];
		$sql = "UPDATE `user` SET 
					`first_name` = '$profile_firstName',
					`last_name` = '$profile_lastName',
					`address` = '$profile_address',
					`email` =  '$profile_email'
				WHERE `username` = '$profile_username';";
				if (!mysqli_query($mysqli, $sql, MYSQLI_STORE_RESULT)){
					header ('Refresh: 0; user_profile.php');
					// USE SESSION TO CREATE A WARNING MESSAGE
				} else {
					header ('Refresh: 0; user_profile.php');
					// USE SESSION TO CREATE A SUCCESS MESSAGE
				}
		mysqli_close($mysqli);
	}
?>
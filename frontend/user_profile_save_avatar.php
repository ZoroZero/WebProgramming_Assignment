<?php
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
		$profile_avatar = $_POST["profile_avatar"];
		$sql = "UPDATE `user` SET 
					`avatar` = '$profile_avatar'
				WHERE `username` = '$profile_username';";
				if (!mysqli_query($mysqli, $sql, MYSQLI_STORE_RESULT)){
					header ('Refresh: 0; user_profile.php');
					// USE SESSION TO CREATE A WARNING MESSAGE
				} else {
					header ('Refresh: 0; user_profile.php');
					// USE SESSION TO CREATE A SUCCESS MESSAGE
				}
		mysqli_close($mysqli);
?>
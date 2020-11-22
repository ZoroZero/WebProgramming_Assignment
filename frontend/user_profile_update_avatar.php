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
		$sql = "SELECT avatar FROM `user`
				WHERE `username` = '$profile_username';";
		$result = mysqli_query($mysqli, $sql);
		while ($row = mysqli_fetch_assoc($result)){
			echo $row["avatar"];
		}
		mysqli_close($mysqli);
?>
<?php
	// SET EVERYTHING ACCORDINGLY
			$server = "localhost:3307";
			$username = "root";
			$password = "";
			$database = "music";
			$mysqli = new mysqli($server, $username, $password, $database);
			
			if($mysqli->connect_error){
			  exit('Could not connect');
			  //return somewhere?
			}
			//condition to display username using $_SESSION[]
			$sql = "SELECT * FROM user WHERE username = 'dat'";
			
			$result = mysqli_query($mysqli, $sql);
			if(mysqli_num_rows($result) == 1){	
				$row = mysqli_fetch_assoc($result);
				$profile_username = $row["username"];	
				$profile_firstname  = $row["first_name"];
				$profile_lastname  = $row["last_name"];
				$profile_address  = $row["address"];
				$profile_email  = $row["email"];
				$profile_avatar = $row["avatar"];
				
			}
			mysqli_close($mysqli);

			//JS TO CHECK EMAIL ADDRESS PATTERN
			//ADD PROFILE PICTURE
?>
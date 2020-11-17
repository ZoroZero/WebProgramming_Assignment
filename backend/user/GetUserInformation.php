<?php
	// SET EVERYTHING ACCORDINGLY

			// $server = "localhost:3307";
			// $username = "root";
			// $password = "";
			// $database = "music";
			// $mysqli = new mysqli($server, $username, $password, $database);
			
			// if($mysqli->connect_error){
			//   exit('Could not connect');
			//   //return somewhere?
			// }
			// //condition to display username using $_SESSION[]
			// $sql = "SELECT * FROM user WHERE username = 'dat'";
			
			// $result = mysqli_query($mysqli, $sql);
			// if(mysqli_num_rows($result) == 1){	
			// 	$row = mysqli_fetch_assoc($result);
			// 	$profile_username = $row["username"];	
			// 	$profile_firstname  = $row["first_name"];
			// 	$profile_lastname  = $row["last_name"];
			// 	$profile_address  = $row["address"];
			// 	$profile_email  = $row["email"];
			// 	$profile_avatar = $row["avatar"];
				
			// }
			// mysqli_close($mysqli);			
			//JS TO CHECK EMAIL ADDRESS PATTERN
			//ADD PROFILE PICTURE
	require_once "user.service.php";
	include_once("../environments/Constants.php");
	$response = array();
	if($_SERVER['REQUEST_METHOD'] == 'GET'){
		if(isset($_GET[USER_ID])){
			$service = new UserService();
			$service->__contruct();
			$result = $service->getUserInformation($_GET[USER_ID]);
			$response['data'] = $result;
			$response['error'] = false;
		}
		else{
			$response['error'] = true;
			$response['message'] = 'Missing parameter';
		}
	}
	else{
		$response['error'] = true;
	}
	echo json_encode($response);

?>
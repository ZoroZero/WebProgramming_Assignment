<?php
	// SET EVERYTHING ACCORDINGLY

	// if (empty($_POST["profile"]["firstName"]) || empty($_POST["profile"]["lastName"]) 
	// 		|| empty($_POST["profile"]["email"]) || empty($_POST["profile"]["address"])){
	// 	echo "<script type='text/javascript'>alert('error querying!');</script>";
	// 	header ('Refresh: 0; user_profile.php');	
	// 	// USE SESSION TO CREATE A WARNING MESSAGE
	// }
	// else {
	// 	$server = "localhost:3307";
	// 	$username = "root";
	// 	$password = "";
	// 	$database = "music";
	// 	$mysqli = new mysqli($server, $username, $password, $database);
		
	// 	if($mysqli->connect_error){
	// 		exit('Could not connect');
	// 		header ('Refresh: 0; user_profile.php');	
	// 		// USE SESSION TO CREATE A WARNING MESSAGE
	// 	}
	// 	$profile_username = "dat"; //USE $_SESSION TO CHECK THIS INSTEAD
	// 	$profile_firstName = $_POST["profile"]["firstName"];
	// 	$profile_lastName = $_POST["profile"]["lastName"];
	// 	$profile_email = $_POST["profile"]["email"];
	// 	$profile_address = $_POST["profile"]["address"];
	// 	$sql = "UPDATE `user` SET 
	// 				`first_name` = '$profile_firstName',
	// 				`last_name` = '$profile_lastName',
	// 				`address` = '$profile_address',
	// 				`email` =  '$profile_email'
	// 			WHERE `username` = '$profile_username';";
	// 			if (!mysqli_query($mysqli, $sql, MYSQLI_STORE_RESULT)){
	// 				header ('Refresh: 0; user_profile.php');
	// 				// USE SESSION TO CREATE A WARNING MESSAGE
	// 			} else {
	// 				header ('Refresh: 0; user_profile.php');
	// 				// USE SESSION TO CREATE A SUCCESS MESSAGE
	// 			}
	// 	mysqli_close($mysqli);
		
	// 		//JS TO CHECK EMAIL ADDRESS PATTERN
	// 		//ADD PROFILE PICTURE
	// }
	require_once "user.service.php";
	include_once("../environments/Constants.php");
	$response = array();
	if($_SERVER['REQUEST_METHOD'] == 'POST'){
		if(isset($_POST["FirstName"]) && isset($_POST["LastName"]) && isset($_POST['Email']) && isset($_POST['Address'])){
			$service = new UserService();
			$service->__contruct();
			echo json_encode($_POST);
			$result = $service->updateUserInformation($_POST);
			if($result){
				$response['error'] = false;
				$response['message'] = 'Success';
			}
			else{
				$response['error'] = true;
				$response['message'] = 'Failed';
			}
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
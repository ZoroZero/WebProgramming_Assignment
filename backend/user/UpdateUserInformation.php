<?php
	require_once "user.service.php";
	include_once("../environments/Constants.php");
	$response = array();
	if($_SERVER['REQUEST_METHOD'] == 'POST'){
		if(isset($_POST["firstName"]) && isset($_POST["lastName"]) && isset($_POST['email']) && isset($_POST['address']) && isset($_POST['id'])){
			$service = new UserService();
			$service->__contruct();
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
			echo json_encode($_POST);
			$response['error'] = true;
			$response['message'] = 'Missing parameter';
		}
	}
	else{
		$response['error'] = true;
	}
	echo json_encode($response);
?>
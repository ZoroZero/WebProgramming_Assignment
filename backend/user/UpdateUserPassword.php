<?php
require_once "user.service.php";
include_once("../environments/Constants.php");
$response = array();
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
	if (isset($_POST["profile_Oldpassword"]) && isset($_POST["profile_password"]) && isset($_POST["id"])) {
		$service = new UserService();
		$service->__contruct();
		$user = $service->getUserInformation($_POST["id"]);
		if ($user['HashedPassword'] != md5($_POST["profile_Oldpassword"])) {
			$response['error'] = true;
			$response['message'] = 'Wrong old pasword';
		} else {
			$result = $service->updateUserPassword($_POST);
			if ($result) {
				$response['error'] = false;
				$response['message'] = 'Success';
			} else {
				$response['error'] = true;
				$response['message'] = 'Failed';
			}
		}
	} else {
		$response['error'] = true;
		$response['message'] = 'Missing parameter';
	}
} else {
	$response['error'] = true;
}
echo json_encode($response);

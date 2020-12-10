<?php
require_once "user.service.php";
include_once("../environments/Constants.php");
$response = array();
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST["userFistname"]) && isset($_POST["userLastname"]) && isset($_POST['userEmail']) && isset($_POST['userAddress']) && isset($_POST['userId'])
        && isset($_POST["isActive"]) && isset($_POST["updatedBy"]) && isset($_POST["userRole"]) ) {
        
		$service = new UserService();
		$service->__contruct();
		$result = $service->adminUpdateUserInformation($_POST);
		if ($result) {
			$response['error'] = false;
			$response['message'] = 'Success';
		} else {
			$response['error'] = true;
			$response['message'] = 'Failed';
		}
	} else {
		echo json_encode($_POST);
		$response['error'] = true;
		$response['message'] = 'Missing parameter';
	}
} else {
	$response['error'] = true;
}
echo json_encode($response);

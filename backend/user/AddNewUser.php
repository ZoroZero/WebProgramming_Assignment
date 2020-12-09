<?php
require_once "user.service.php";
include_once("../environments/Constants.php");
$response = array();
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (
        isset($_POST['userFistname']) && isset($_POST['userLastname']) &&
        isset($_POST['username']) && isset($_POST['userEmail']) && isset($_POST['password']) && isset($_POST['userRole'])
    ) {
        $service = new UserService();
        $service->__contruct();
        $emailExist = $service->emailExist($_POST['userEmail']);
        if ($emailExist) {
            $response['error'] = true;
            $response['message'] = 'This email is already in use.';
        } else {
            $exist = $service->userExist($_POST['username']);
            if ($exist) {
                $response['error'] = true;
                $response['message'] = 'Username already exist on system.';
            } else {
                $result = $service->addNewUser($_POST);
                if ($result == -1) {
                    $response['error'] = true;
                    $response['message'] = 'Some error occur.';
                } else {
                    $response['error'] = false;
                    $response['message'] = 'Success';
                    $response['email'] = $emailExist;
                }
            }
        }
    } else {
        $response['error'] = true;
        $response['message'] = 'Missing parameter';
    }
}
else {
        $response['error'] = true;
        $response['message'] = 'Invalid Request';
}
echo json_encode($response);

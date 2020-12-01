<?php
require_once "user.service.php";
include_once("../environments/Constants.php");
$response = array();
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (
        isset($_POST['inputFirstname']) && isset($_POST['inputLastname']) &&
        isset($_POST['username']) && isset($_POST['inputEmail']) && isset($_POST['password'])
    ) {
        $service = new UserService();
        $service->__contruct();
        $emailExist = $service->emailExist($_POST['inputEmail']);
        if ($emailExist) {
            $response['error'] = true;
            $response['message'] = 'This email is already in use.';
        } else {
            $exist = $service->userExist($_POST['username']);
            if ($exist) {
                $response['error'] = true;
                $response['message'] = 'Username already exist on system.';
            } else {
                $result = $service->createUser($_POST);
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
        $response['message'] = 'Invalid Request';
    }
}
echo json_encode($response);

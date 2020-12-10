<?php
require_once "user.service.php";
$response = array();
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $service = new UserService();
    $service->__contruct();
    $result = $service->getAllUser();
    $response['data'] = $result;
} else {
    $response['error'] = true;
    $response['message'] = "Wrong request type";
}
echo json_encode($response);

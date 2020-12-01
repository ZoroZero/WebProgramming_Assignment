<?php
require_once "product.service.php";
$response = array();
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $service = new ProductService();
    $service->__contruct();
    $result = $service->buyProducts($_POST);
    if ($result) {
        $response['error'] = false;
        $response['message'] = "Successfully buy product";
    } else {
        $response['error'] = true;
        $response['message'] = "Failed";
    }
} else {
    $response['error'] = true;
    $response['message'] = "Wrong request type";
}
echo json_encode($response);

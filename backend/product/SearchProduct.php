<?php
require_once "product.service.php";
$response = array();
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if(isset($_GET['keyword'])){
        $service = new ProductService();
        $service->__contruct();
        $result = $service->searchProduct($_GET['keyword']);
        $response['data'] = $result;
        $response['error'] = false;
    }
    else{
        $response['error'] = true;
        $response['message'] = "Missing parameter";
    }
} else {
    $response['error'] = true;
    $response['message'] = "Wrong request type";
}
echo json_encode($response);

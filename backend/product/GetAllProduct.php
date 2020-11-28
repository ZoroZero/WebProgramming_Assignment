<?php
    require_once "product.service.php";
    $response = array();
    if($_SERVER['REQUEST_METHOD'] == 'GET'){
        $service = new ProductService();
        $service->__contruct();
        $result = $service->getAllProduct();
        $response['data'] = $result;
    }
    else{
        $response['error'] = true;
        $response['message'] = "Wrong request type";
    }
    echo json_encode($response);
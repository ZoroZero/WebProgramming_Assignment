<?php
    require_once "product.service.php";
    $response = array();
    if($_SERVER['REQUEST_METHOD'] == 'GET'){
        $service = new ProductService();
        $service->__contruct();
        $result = $service->getTopSales();
        $response['data'] = $result;
    }
    else{
        $response['error'] = true;
    }
    echo json_encode($response);
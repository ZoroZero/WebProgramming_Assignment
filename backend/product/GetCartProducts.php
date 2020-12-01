<?php
    require_once "product.service.php";
    $response = array();
    if($_SERVER['REQUEST_METHOD'] == 'GET'){
        if(isset($_GET['productIdList'])){
            $service = new ProductService();
            $service->__contruct();
            // echo json_encode($_GET);
            $result = $service->getCartProducts($_GET['productIdList']);
            $response['data'] = $result;
            $response['error'] = false;
        }
        else{
            $response['error'] = true;
            $response['message'] = "Missing fields";
        }
    }
    else{
        $response['error'] = true;
        $response['message'] = "Wrong request type";
    }
    echo json_encode($response);
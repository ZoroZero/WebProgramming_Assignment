<?php
    require_once "product.service.php";
    $response = array();
    if($_SERVER['REQUEST_METHOD'] == 'GET'){
        if(isset($_GET['productId'])){
            $service = new ProductService();
            $service->__contruct();
            $result = $service->getProductByProductId($_GET['productId']);
            $response['data'] = $result;
        }
        else{
            $response['error'] = true;
            $response['message'] = "Missing fields";
        }
    }
    else{
        $response['error'] = true;
    }
    echo json_encode($response);
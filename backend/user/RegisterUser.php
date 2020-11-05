<?php
    require_once "user.service.php";
    $response = array();
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        if(isset($_POST['fName']) && isset($_POST['lName']) && 
        isset($_POST['username']) && isset($_POST['email']) && isset($_POST['password'])){
            $service = new UserService();
            $service->__contruct();
            $result = $service->createUser($_POST);
            if($result == 1){
                $response['error'] = false;
                $response['message'] = 'Successfully register new user';
            }
            elseif($result == 2){
                $response['error'] = true;
                $response['message'] = 'Some error occur';
            }
            elseif($result == 0){
                $response['error'] = true;
                $response['message'] = 'Username already exist on system';
            }
        }
        else {
            $response['error'] = true;
            $response['message'] = 'Invalid Request';
        }
    }
    echo json_encode($response);
?>
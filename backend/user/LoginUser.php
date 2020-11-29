<?php
    require_once "user.service.php";
    include_once("../environments/Constants.php");
    $response = array();
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        if(isset($_POST['username']) && isset($_POST['password'])){
            $service = new UserService();
            $service->__contruct();
            $result = $service->loginUser($_POST);
            if($result == null){
                $response['error'] = true;
                $response['message'] = 'Incorrect username or password';
            }
            else{
                session_start();
                setcookie(USER_ID, $result['Id'], time() + (86400 * 30), "/"); // 86400 = 1 day
                setcookie(USER_NAME, $_POST['username'], time() + (86400 * 30), "/");
                $_SESSION[USER_ID] = $result['Id'];
                $_SESSION[ROLE_ID] = $result["roleId"];
                if(isset($_SESSION[USER_ID])) {
                    header("Location: ../../frontend?page=homepage");
                }
            }
                
        }
        else {
            $response['error'] = true;
            $response['message'] = 'Invalid Request';
        }
    }
    echo json_encode($response);
?>
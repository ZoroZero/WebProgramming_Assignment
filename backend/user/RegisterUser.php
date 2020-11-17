<?php
    require_once "user.service.php";
    include_once("../environments/Constants.php");
    $response = array();
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        if(isset($_POST['fName']) && isset($_POST['lName']) && 
        isset($_POST['username']) && isset($_POST['email']) && isset($_POST['password'])){
            $service = new UserService();
            $service->__contruct();
            $email = $_POST["email"];
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $response['error'] = true;
                $response['message'] = 'Email in wrong format';
            }
            else{
                $exist = $service->userExist($_POST['username']);
                if($exist){
                    $response['error'] = true;
                    $response['message'] = 'Username already exist on system';
                }
                else{
                    $result = $service->createUser($_POST);
                    if($result == -1){
                        $response['error'] = true;
                        $response['message'] = 'Some error occur';
                    }
                    else{
                        setcookie(USER_ID, $result['Id'], time() + (86400 * 30), "/"); // 86400 = 1 day
                        session_start();
                        $_SESSION[USER_ID] = $result['Id'];
                        if(isset($_SESSION[USER_ID])) {
                            header("Location: ../../frontend?page=homepage");
                        }
                    }
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
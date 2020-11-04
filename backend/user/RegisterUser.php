<?php
    require_once "user.service.php";
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        if(isset($_POST['fName']) && isset($_POST['lName']) && isset($_POST['username']) && isset($_POST['email']) && isset($_POST['password'])){
            $service = new UserService();
            $service->construct();
            $result = $service->createUser 
        }
    }
?>
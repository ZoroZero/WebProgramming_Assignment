<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
include_once("../backend/environments/Constants.php");
if (!isset($_SESSION[USER_ID])) {
    header("Location: /login");
} else {
    if(isset($_SESSION[ROLE_ID]) && $_SESSION[ROLE_ID] == 2){
        include_once('../frontend/components/header/header.php');
        include('../frontend/components/admin/index.php');
        require_once('../frontend/components/footer/footer.php');
    }
    else{
        header("Location: /homepage");
    }
}

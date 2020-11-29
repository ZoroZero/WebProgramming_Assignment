<?php
   if(session_status()==PHP_SESSION_NONE){
    session_start();
    }
    include_once("../backend/environments/Constants.php");
    if (isset($_SESSION[USER_ID])) {
        header("Location: ?page=homepage");
    } else {
        include_once('login.php');
    }

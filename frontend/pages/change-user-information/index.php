<?php
	session_start();
	include_once("../backend/environments/Constants.php");
    if(!isset($_SESSION[USER_ID])){
        header("Location: ?page=login");
    }
    else{
        include_once('index.html');
    }
?>
<?php
    if(!isset($_GET['page'])){
        include 'php/login.php'; 
    }
    else{
        $page = $_GET['page'];
        include "php/$page.php"; 
    }
?>

<?php

include_once("../backend/environments/Constants.php");
if (!isset($_SESSION[USER_ID]) || !isset($_SESSION[ROLE_ID])) {
    header("Location: ./login");
} else {
    if($_SESSION[ROLE_ID] == 2 || $_SESSION[ROLE_ID] == 3){
        include_once('../frontend/components/header/header.php');
        include('../frontend/components/staff/index.php');
        echo "<script type='module' src='../frontend/pages/staff/index.js'></script>";
        require_once('../frontend/components/footer/footer.php');
    }
    else{
        header("Location: ./home");
    }
}

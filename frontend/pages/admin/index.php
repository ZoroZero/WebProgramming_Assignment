<?php

include_once("../backend/environments/Constants.php");
if (!isset($_SESSION[USER_ID]) || !isset($_SESSION[ROLE_ID])) {
    header("Location: ./login");
} else {
    if($_SESSION[ROLE_ID] == 3){
        include_once('../frontend/components/header/header.php');
        include('../frontend/components/admin/index.php');
        require_once('../frontend/components/footer/footer.php');
    }
    else{
        header("Location: ./home");
    }
}

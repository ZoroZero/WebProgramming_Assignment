<?php
if(isset($_SESSION[ROLE_ID]) && $_SESSION[ROLE_ID] == 1){
    include_once("../backend/environments/Constants.php");
    require_once('../frontend/components/header/header.php');
    include('../frontend/components/cart/__cart.php');
    echo "<script type='module' src='../frontend/pages/cart/index.js'></script>";
    require_once('../frontend/components/footer/footer.php');
}
else{
    header("Location: ./staff");
}

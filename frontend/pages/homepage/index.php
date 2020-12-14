<?php

// include_once("../backend/environments/Constants.php");
if(!isset($_SESSION[ROLE_ID]) || $_SESSION[ROLE_ID] == 1){
    require_once('../frontend/components/header/header.php');
    include('../frontend/components/homepage/__banner_erea.php');
    include('../frontend/components/homepage/__top_sale.php');
    include('../frontend/components/homepage/__special_price.php');
    include('../frontend/components/homepage/__banner_ads.php');
    include('../frontend/components/homepage/__new_pc.php');
    include('../frontend/components/homepage/__blogs.php');
    echo "<script type='module' src='../frontend/pages/homepage/index.js'></script>";
    require_once('../frontend/components/footer/footer.php');
}
else{
    header("Location: ./staff");
}
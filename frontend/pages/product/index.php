<?php
if(!isset($_SESSION[ROLE_ID]) || $_SESSION[ROLE_ID] == 1){
    require_once('../frontend/components/header/header.php');
    include('../frontend/components/product/__product.php');
    echo "<script type='module' src='../../frontend/pages/product/index.js'></script>";
    require_once('../frontend/components/footer/footer.php');
}
else{
    header("Location: ../staff");
}



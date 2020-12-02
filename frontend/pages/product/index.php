<?php

include_once("../backend/environments/Constants.php");
if (!isset($_SESSION[USER_ID])) {
    header("Location: ../login");
} else {
    require_once('../frontend/components/header/header.php');
    include('../frontend/components/product/__product.php');
    echo "<script src='../../frontend/pages/product/index.js'></script>";
    require_once('../frontend/components/footer/footer.php');
}

<?php

include_once("../backend/environments/Constants.php");
if (isset($_SESSION[USER_ID])) {
    header("Location: /homepage");
} else {
    require_once('../frontend/components/header/header.php');
    include('../frontend/components/register/index.php');
    echo "<script type='module' src='../frontend/pages/register/index.js'></script>";
    require_once('../frontend/components/footer/footer.php');
}

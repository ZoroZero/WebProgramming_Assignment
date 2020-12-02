<?php
include_once("../backend/environments/Constants.php");


if (!isset($_SESSION[USER_ID])) {
    header("Location: ./login");
} else {
    require_once('../frontend/components/header/header.php');
    include('../frontend/components/setting/index.php');
    require_once('../frontend/components/footer/footer.php');
}

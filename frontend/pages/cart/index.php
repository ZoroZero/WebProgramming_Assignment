<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
include_once("../backend/environments/Constants.php");
if (!isset($_SESSION[USER_ID])) {
    header("Location: ?page=login");
} else {
    require_once('../frontend/components/header/header.php');
    include('../frontend/components/cart/__cart.php');
    require_once('../frontend/components/footer/footer.php');
}

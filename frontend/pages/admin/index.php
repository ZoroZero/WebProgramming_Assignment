<?php
session_start();
include_once("../backend/environments/Constants.php");
if (!isset($_SESSION[USER_ID])) {
    header("Location: ?page=login");
} else {
    include_once('../frontend/components/header/header.php');
    include('../frontend/components/admin/index.php');
    require_once('../frontend/components/footer/footer.php');
}

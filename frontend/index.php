<?php
include_once("../backend/environments/Constants.php");
if (!isset($_GET['page'])) {
    include 'pages/login/index.php';
} else {
    $page = $_GET['page'];
    include "pages/$page/index.php";
}

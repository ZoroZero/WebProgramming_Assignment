<?php

include_once("../backend/environments/Constants.php");
if (isset($_SESSION[USER_ID])) {
    header("Location: /homepage");
} else {
    require_once('../frontend/components/header/header.php');
    include('../frontend/components/register/index.php');
    require_once('../frontend/components/footer/footer.php');
}

<?php

include_once("../backend/environments/Constants.php");
if (!isset($_SESSION[USER_ID])) {
    header("Location: ./login");
} else {
    require_once('../frontend/components/header/header.php');
    include('../frontend/components/homepage/__banner_erea.php');
    include('../frontend/components/homepage/__top_sale.php');
    include('../frontend/components/homepage/__special_price.php');
    include('../frontend/components/homepage/__banner_ads.php');
    include('../frontend/components/homepage/__new_pc.php');
    include('../frontend/components/homepage/__blogs.php');
    require_once('../frontend/components/footer/footer.php');
    require_once('../frontend/components/footer/footer.php');
}

<?php

include_once("../backend/environments/Constants.php");
require_once('../frontend/components/header/header.php');
include('../frontend/components/cart/__cart.php');
echo "<script type='module' src='../frontend/pages/cart/index.js'></script>";
require_once('../frontend/components/footer/footer.php');

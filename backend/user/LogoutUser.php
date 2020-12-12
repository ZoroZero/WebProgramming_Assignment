<?php
include_once("../environments/Constants.php");
session_start();
unset($_SESSION[USER_ID]);
unset($_SESSION[ROLE_ID]);
unset($_COOKIE[USER_ID]);
setcookie(USER_ID, '', time() - 3600, '/');
// setcookie(CART_COOKIE_ID, '', time() - 3600, '/');
setcookie(USER_NAME, '', time() - 3600, '/');
session_destroy();
header("Location: ../../frontend/login");

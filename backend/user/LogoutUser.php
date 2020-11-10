<?php
    include_once("../environments/Constants.php");

    session_start();
    unset($_SESSION[USER_ID]);
    unset($_SESSION[ROLE_ID]);
    header("Location: ../../frontend?page=login");
?>
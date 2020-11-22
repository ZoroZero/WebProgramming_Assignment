<?php
    include_once("../backend/environments/Constants.php");
    if(isset($_SESSION[USER_ID])){
        header("Location: ?page=homepage");
    }
    else{
        include_once('index.html');
    }
?>

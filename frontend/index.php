<?php
define('PATH_ROOT', __DIR__);
include_once("../backend/environments/Constants.php");
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

spl_autoload_register(function (string $class_name) {
    include_once PATH_ROOT . '/' . $class_name . '.php';
});

$router = new Core\Http\Route();
include_once('app/routes.php');


$request_url = !empty($_GET['url']) ? '/' . $_GET['url'] : '/';

// Lấy phương thức hiện tại của url đang được gọi. (GET | POST). Mặc định là GET.
$method_url = !empty($_SERVER['REQUEST_METHOD']) ? $_SERVER['REQUEST_METHOD'] : 'GET';

$router->map($request_url, $method_url);

// if (!isset($_GET['page'])) {
//     include 'pages/login/index.php';
// } else {
//     $page = $_GET['page'];
//     include "pages/$page/index.php";
// } 


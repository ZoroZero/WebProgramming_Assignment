<?php 

// action là callback
$router->get('/home', function(){
    include "./pages/homepage/index.php";
});

$router->get('/cart', function(){
    include "./pages/cart/index.php";
});

$router->get('/settings', function(){
    include "./pages/settings/index.php";
});

$router->get('/login', function(){
    include "./pages/login/index.php";
});

$router->get('/register', function(){
    include "./pages/register/index.php";
});

$router->get('/staff', function(){
    include "./pages/staff/index.php";
});

$router->get('/admin', function(){
    include "./pages/admin/index.php";
});

$router->get('/product/{id}', function($id){
    include "./pages/product/index.php";
});

$router->get('/staff', function(){
    include "./pages/staff/index.php";
});

$router->get('/category', function(){
    include "./pages/category/index.php";
});

$router->get('/admin', function(){
    include "./pages/admin/index.php";
});






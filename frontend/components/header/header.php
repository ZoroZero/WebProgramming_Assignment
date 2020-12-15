<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PhuVinh</title>

    <!-- Bootstrap CDN -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous">
    </script>

    <!-- <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"> -->
    <!-- </script> -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous">
    </script>

    <!-- Owl-carousel CDN -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css" integrity="sha256-UhQQ4fxEeABh4JrcmAJ1+16id/1dnlOEVCFOxDef9Lw=" crossorigin="anonymous" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.min.css" integrity="sha256-kksNxjDRxd/5+jGurZUJd1sdR2v+ClrCl3svESBaJqw=" crossorigin="anonymous" />

    <!-- Owl Carousel Js file -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js" integrity="sha256-pTxD+DSzIwmwhOqTFN+DB+nHjO4iAsbgfyFq5K5bcE0=" crossorigin="anonymous">
    </script>

    <!-- font awesome icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" integrity="sha256-h20CPZ0QyXlBuAw7A+KluUYx/3pK+c7lYEpqLTlxjYQ=" crossorigin="anonymous" />

    <!-- Custom CSS file -->
    <?php
    echo "<link rel='stylesheet' href=" . SERVER_PATH . "style.css>";

    // <!-- Custom Javascript-->
    echo "<script type='module' src=" . SERVER_PATH . "index.js></script>";
    ?>
    <!--  isotope plugin cdn  -->
    <script src="https://unpkg.com/isotope-layout@3/dist/isotope.pkgd.min.js"></script>

    <!-- google Recaptcha api-->
    <script src='https://www.google.com/recaptcha/api.js'></script>

    <script defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyByz03P6b4K2TUDMD8DCWG_KNHe7MNdtSs&callback=initMap"></script>

    <script src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.11.1/jquery.validate.min.js"></script>

    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
</head>

<body class="d-flex flex-column" style="min-height: 100vh;">
    <!-- start #header -->
    <header id="header">
        <div class="strip d-flex justify-content-between px-4 py-1 bg-light">
            <p class="font-rale font-size-12 text-black-50 m-0">Phu Vinh Thang, 268 Lý Thường Kiệt, Phường 14, Quận 10, Thành phố Hồ Chí Minh (096) 709 1640</p>
            <div class="font-rale font-size-14 d-flex">
                <?php
                include_once("../backend/environments/Constants.php");
                if (isset($_SESSION['userId'])) {
                    echo "<p class='px-3 text-dark m-auto'>" . $_COOKIE[USER_NAME] . "</p>";
                    echo "<a href='" . SERVER_PATH . "settings' class='px-3 border-right m-auto border-left text-dark'>Setting</a>";
                    echo "<a href='../backend/user/LogoutUser.php' class='px-3 m-auto border-right border-left text-dark' id='login-btn'>Logout</a>";
                } else
                    echo "<a href='" . SERVER_PATH . "login' class='px-3 border-right m-auto border-left text-dark' id='logout-btn'>Login</a>"; ?>
            </div>
        </div>

        <!-- Primary Navigation -->
        <nav class="navbar navbar-expand-lg navbar-dark color-secondary-bg">
            <p class="navbar-brand mb-0 mr-2">Phu Vinh</p>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav font-rubik mr-auto">
                    <?php
                    if (!isset($_SESSION[ROLE_ID]) || $_SESSION[ROLE_ID] == 1) {
                        echo '<li class="nav-item" id="homepage">
                                    <a class="nav-link" href="' . SERVER_PATH . 'home">Homepage</a>
                                </li>';
                        echo '<li class="nav-item dropdown" id="category">
                                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Category
                                    </a>
                                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <a class="dropdown-item" href="' . SERVER_PATH . 'category" id="filter-windows">Windows</a>
                                        <a class="dropdown-item" href="' . SERVER_PATH . 'category">Linux</a>
                                        <a class="dropdown-item" href="' . SERVER_PATH . 'category">Mac</a>
                                    </div>
                                </li>';
                    }
                    ?>

                    <?php
                    if (isset($_SESSION[USER_ID]) && isset($_SESSION[ROLE_ID])) {
                        if ($_SESSION[ROLE_ID] == 2 || $_SESSION[ROLE_ID] == 3) {
                            echo '<li class="nav-item" id="staff">
                                    <a class="nav-link" href="' . SERVER_PATH . 'staff">Manage product</a>
                                </li>';
                        }
                        if ($_SESSION[ROLE_ID] == 3) {
                            echo '<li class="nav-item" id="admin">
                                    <a class="nav-link" href="' . SERVER_PATH . 'admin">Manage user</a>
                                </li>';
                        }
                    }
                    ?>
                </ul>
                <form class="form-inline my-lg-0 mx-lg-2 mx-sm-0 dropdown">
                    <?php
                    if (isset($_SESSION[USER_ID]) && isset($_SESSION[ROLE_ID])) {
                        if ($_SESSION[ROLE_ID] == 2 || $_SESSION[ROLE_ID] == 3) {
                            echo '';
                        } else {
                            echo '<input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onkeyup="showSearchResult(this.value)">
                            <div id="livesearch" class="dropdown-content"></div>';
                        }
                    } else {
                        echo '<input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onkeyup="showSearchResult(this.value)">
                        <div id="livesearch" class="dropdown-content"></div>';
                    }
                    ?>

                    <!-- <button class="btn btn-primary my-2 my-sm-0" type="submit">Search</button> -->
                </form>

                <form action="#" class="font-size-14 font-rale cartIcon">
                    <?php
                    // $pos = strpos($mystring, $findme);
                    // echo strpos('product', $_SERVER['REQUEST_URI']);
                    if (isset($_SESSION[USER_ID]) && isset($_SESSION[ROLE_ID])) {
                        if ($_SESSION[ROLE_ID] == 2 || $_SESSION[ROLE_ID] == 3) {
                            echo '';
                        } else {
                            echo '<a href="' . SERVER_PATH . 'cart" class="py-2 rounded-pill color-primary-bg">
                                        <span class="font-size-16 px-2 text-white"><i class="fas fa-shopping-cart"></i></span>
                                        <span class="px-3 py-2 rounded-pill text-dark bg-light" id="cart-count">0</span>
                            </a>';
                        }
                    } else {
                        echo '<a href="' . SERVER_PATH . 'cart" class="py-2 rounded-pill color-primary-bg">
                                    <span class="font-size-16 px-2 text-white"><i class="fas fa-shopping-cart"></i></span>
                                    <span class="px-3 py-2 rounded-pill text-dark bg-light" id="cart-count">0</span>
                        </a>';
                    }

                    ?>
                </form>
            </div>
        </nav>
        <!-- !Primary Navigation -->

    </header>
    <!-- !start #header -->

    <!-- start #main-site -->
    <main id="main-site" style="flex-grow: 1;">
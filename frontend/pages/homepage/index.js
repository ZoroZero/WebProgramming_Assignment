import {formatPrice, getProductCategory} from '../../index.js';

$(document).ready(function() {
    getTopSaleProduct();
    getSpecialPriceProduct();

    //banner owl carousel
    $("#banner-area .owl-carousel").owlCarousel({
        dots: true,
        autoplay: true,
        autoplaySpeed: 1000,
        dotsSpeed: 1000,
        loop: true,
        items: 1
    });

    //new pc owl carousel
    $("#new-pc .owl-carousel").owlCarousel({
        loop:true,
        nav: true,
        dots: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 5
            }
        }
    })

    // blogs owl carousel
    $("#blogs .owl-carousel").owlCarousel({
        loop: true,
        nav: false,
        dots: true,
        responsive : {
            0: {
                items: 1
            },
            600: {
                items: 3
            }
        }
    })
})

function getTopSaleProduct(){
    var request = $.get('../backend/product/GetTopSales.php',
      function(response) {
        if(response){
            if(!JSON.parse(response)['error']){
                let information = JSON.parse(response)['data'];
                console.log("Top sale", information);
                var list_product = information.map(function(element){
                    return `<div class="item py-2 px-2">
                                <div class="product font-rale">
                                    <a href="../frontend/product/${element['Id']}">
                                        <img src="../frontend/${element['Path']}" alt="product1" class="img-fluid">
                                    </a>
                                    <div class="text-center">
                                        <h6>
                                            ${element['Name']}
                                        </h6>
                                        <div class="rating text-warning font-size-12">
                                            <span>
                                                <i class="fas fa-star"></i>
                                                <i class="fas fa-star"></i>
                                                <i class="fas fa-star"></i>
                                                <i class="far fa-star"></i>
                                                <i class="far fa-star"></i>
                                            </span>
                                        </div>
                                        <div class="price py-2">
                                            <span>${formatPrice(element['Price'])}</span>
                                        </div>
                                        <button type="submit" class="btn btn-warning font-size-12" onclick="addtoCart(${element['Id']}, ${element['Amount']})">Add to cart</button>
                                    </div>
                                </div>
                            </div>`;
                });
                document.getElementById('top-sale-carousel').innerHTML = list_product.join(' ');
            }
            else{
                console.log("Error ", JSON.parse(response)['message']);
            }
            //top sale owl carousel
            $("#top-sale .owl-carousel").owlCarousel({
                loop:true,
                nav: true,
                dots: false,
                responsive: {
                    0: {
                        items: 1
                    },
                    600: {
                        items: 3
                    },
                    1000: {
                        items: 5
                    }
                }
            })
        }
    });

    // Callback handler that will be called on failure
    request.fail(function (jqXHR, textStatus, errorThrown){
        // Log the error to the console
        console.error("The following error occurred: ", textStatus, errorThrown);
    });
}

function getSpecialPriceProduct(){
    var request = $.get('../backend/product/GetSpecialPrice.php',
      function(response) {
        if(response){
            if(!response['error']){
                let information = JSON.parse(response)['data'];
                console.log('Special prices ', information);
                var list_product = information.map(function(element){
                    return `<div class="grid-item ${getProductCategory(element['CategoryId'])} border">
                                <div class="item py-2 px-2" style="width: 200px;">
                                    <div class="product font-rale">
                                        <a href="../frontend/product/${element['Id']}">
                                            <img src="../frontend/${element['Path']}" alt="product2" class="img-fluid">
                                        </a>
                                        <div class="text-center">
                                            <h6>
                                            ${element['Name']}
                                            </h6>
                                            <div class="rating text-warning font-size-12">
                                                <span>
                                                    <i class="fas fa-star"></i>
                                                    <i class="fas fa-star"></i>
                                                    <i class="fas fa-star"></i>
                                                    <i class="fas fa-star"></i>
                                                    <i class="fas fa-star-half-alt"></i>
                                                </span>
                                            </div>
                                            <div class="price py-2">
                                                <span>${formatPrice(element['Price'])}</span>
                                            </div>
                                            <button type="submit" class="btn btn-warning font-size-12" onclick="addtoCart(${element['Id']}, ${element['Amount']})">Add to cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
                });
                document.getElementById('special-price-grid').innerHTML = list_product.join(' ');
            }
            else {
                console.log("Error ", response['message']);
            }

            //isotope filter
            var $grid = $(".grid").isotope({
                itemSelector: '.grid-item',
                layoutMode: 'fitRows',
            })

            $(window).on('load', function(){
                $grid.isotope({filter: '*'})

                //filter items on button press
                $(".button-group").on("click", "button", function(){
                    var filterValue = $(this).attr('data-filter');
                    $grid.isotope({filter: filterValue});
                })
            })
        }
    });

    // Callback handler that will be called on failure
    request.fail(function (jqXHR, textStatus, errorThrown){
        // Log the error to the console
        console.error("The following error occurred: ", textStatus, errorThrown);
    });
}

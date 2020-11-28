$(document).ready(function() {
    if(window.location.href.includes('homepage')){
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

        // product qty section
        let $qty_up = $(".qty .qty-up");
        let $qty_down = $(".qty .qty-down");
        let $input = $(".qty .qty_input");

        // click on qty up button
        $qty_up.click(function(e){
            alert($input.val())
            //let $input = $(`.qty_input[data-id='${$(this).data("id")}']`);
            if($input.val() >= 1 && $input.val() <= 9){
                $input.val(function(i, oldval){
                    return ++oldval;
                });
            }
        });

        // click on qty down button
        $qty_down.click(function(e){
            //let $input = $(`.qty_input[data-id='${$(this).data("id")}']`);
            if($input.val() > 1 && $input.val() <= 10){
                $input.val(function(i, oldval){
                    return --oldval;
                });
            }
        });
    }
    
    if(window.location.href.includes('product')){
        getProductInformation();
    }
})


function getTopSaleProduct(){
    var request = $.get('../backend/product/GetTopSales.php',
      function(response) {
        if(response){
            let information = JSON.parse(response)['data'];
            console.log("Top sale", information);
            var list_product = information.map(function(element){
                return `<div class="item py-2 px-2">
                        <div class="product font-rale">
                            <a href="../frontend/?page=product&productId=${element['Id']}">
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
                                    <span>${element['Price']}</span>
                                </div>
                                <button type="submit" class="btn btn-warning font-size-12">Add to cart</button>
                            </div>
                        </div>
                    </div>`;
            });
            document.getElementById('top-sale-carousel').innerHTML = list_product.join(' ');
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
            let information = JSON.parse(response)['data'];
            console.log('Special prices ', information);
            var list_product = information.map(function(element){
                return `<div class="grid-item ${getProductCategory(element['CategoryId'])} border">
                            <div class="item py-2 px-2" style="width: 200px;">
                                <div class="product font-rale">
                                    <a href="../frontend/?page=product&productId=${element['Id']}">
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
                                            <span>${element['Price']}đ</span>
                                        </div>
                                        <button type="submit" class="btn btn-warning font-size-12">Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>`;
            });
            document.getElementById('special-price-grid').innerHTML = list_product.join(' ');
            
            //isotope filter
            var $grid = $(".grid").isotope({
                itemSelector: '.grid-item',
                layoutMode: 'fitRows',
            })
            $grid.isotope({filter: '*'})
            //filter items on button press
            $(".button-group").on("click", "button", function(){
                var filterValue = $(this).attr('data-filter');
                $grid.isotope({filter: filterValue});
            })
        }
    });

    // Callback handler that will be called on failure
    request.fail(function (jqXHR, textStatus, errorThrown){
        // Log the error to the console
        console.error("The following error occurred: ", textStatus, errorThrown);
    });
}


function getProductCategory(categoryId){
    switch(categoryId){
        case 1: return 'Windows';
        case 2: return 'Mac';
        case 3: return 'Linux';
    }
}


function getProductInformation(){
    var url_string = window.location.href;
    var url = new URL(url_string);
    var productId = url.searchParams.get("productId");
    console.log(productId);
    var request = $.get(`../backend/product/GetProductInformation.php?productId=${productId}`,
      function(response) {
        if(response){
            let productInformation = JSON.parse(response)['data'][0];
            console.log("Product: ", productInformation);
            if(productInformation){
                document.getElementById('product-name').innerHTML = productInformation.Name;
                document.getElementById('original-price').innerHTML = `${productInformation.Price}đ`;
                document.getElementById('discount').innerHTML = `${productInformation.Discount}%`;
                document.getElementById('current-price').innerHTML = `${productInformation.Price*(100-productInformation.Discount)/100}đ`;
                document.getElementById('mainboard-information').innerHTML = productInformation.Mainboard;
                document.getElementById('cpu-information').innerHTML = productInformation.Cpu;
                document.getElementById('ram-information').innerHTML = productInformation.Ram;
                document.getElementById('storage-information').innerHTML = productInformation.Storage;
                document.getElementById('gpu-information').innerHTML = productInformation.Gpu;
                document.getElementById('psu-information').innerHTML = productInformation.Psu;
                document.getElementById('case-information').innerHTML = productInformation.Case;
                document.getElementById('os-information').innerHTML = productInformation.Os;
                document.getElementById('product-image').src = `../frontend/${productInformation.Path}`

            }
        }
    });
}
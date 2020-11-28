const Http = new XMLHttpRequest();
const userId = getCookie("userId");
// Googlemap js
const address1 = { lat: 10.772713935537316, lng: 106.65967597467676 };
const address2 = { lat: 10.790040966516928, lng: 106.66139794610773 };
const address3 = { lat: 10.812376924038709, lng: 106.61820978330887 };
const center = { lat: 10.795532861871804, lng: 106.63649092163753 };

$(document).ready(function() {
    if(window.location.href.includes('homepage')){
        getTopSaleProduct();
        getSpecialPriceProduct();
        cartProductList = getCookie('cart-porducts');
        cartItemList = cartProductList && cartProductList!=""? cartProductList.split(','):[];
        $('#cart-count').html(cartItemList.length);
        console.log(cartItemList);
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
    }
    else if(window.location.href.includes('product')){
        getProductInformation();
    }
    else if(window.location.href.includes('settings')){
        getUserInformation();
        jQuery.validator.addMethod("notEqual", function(value, element, param) {
            return this.optional(element) || value != $(param).val();
        }, "This has to be different...");
    }
    else if(window.location.href.includes('cart')){
        getCartProductInformation();
    }

    // check form submission general settings
    $(function () {
        $("form[id='form_user_profile_general']").validate({
            invalidHandler: function(e) {
                e.stopPropagation()
            },
            submitHandler: function(form, e) {
                e.preventDefault();
                var sent_data = $(form).serializeArray();
                sent_data.push({name: "id", value: userId});   
                $.ajax({
                    type: 'post',
                    url: '../backend/user/UpdateUserInformation.php',
                    data: sent_data      
                })
                .done(function (response) {
                    checkDefaultValue()
                    if(document.getElementById("inputcheck").style.display !== "none") {
                        closeAlert("inputcheck")
                        document.getElementById("loader").style.display = "block"
                        setTimeout(function(){
                            document.getElementById("loader").style.display = "none"
                            openAlert("inputcheck")
                            
                        },2000)
                    }
                    document.getElementById("loader").style.display = "block"
                    setTimeout(function(){
                        document.getElementById("loader").style.display = "none"
                        openAlert("inputcheck")
                    },2000)
                });
                return false;
            }
        });
    });

    // check form submission password
    $(function () {
        $("form[id='form_user_profile_password']").validate({
            rules:{
                profile_Oldpassword: {
                    required: true,
                    minlength: 8,
                },
                profile_password: {
                    required: true,
                    minlength: 8,
                    notEqual: "#profile_Oldpassword"
                },
                profile_password_re: {
                    required: true,
                    minlength: 8,
                    equalTo: "#profile_password"
                }
            },
            messages: {
                profile_Oldpassword: {
                    required: "This field is required",
                    minlength: jQuery.validator.format("At least {0} characters required!"),
                },
                profile_password: {
                    required: "This field is required",
                    minlength: jQuery.validator.format("At least {0} characters required!"),
                    notEqual: "New password can not be the same as old password"
                },
                profile_password_re: {
                    required: "This field is required",
                    minlength: jQuery.validator.format("At least {0} characters required!"),
                    equalTo : "This has to be the same as new password"
                },
            },
            invalidHandler: function(e) {
                e.stopPropagation()
            },
            submitHandler: function(form, e) {
                e.preventDefault();
                var sent_data = $(form).serializeArray();
                sent_data.push({name: "id", value: userId});   
                $.ajax({
                    type: 'post',
                    url: '../backend/user/UpdateUserPassword.php',
                    data: sent_data      
                    })
                .done(function (response) {
                    console.log("Update password", response);
                    if(document.getElementById("inputcheck_password").style.display !== "none") {
                        closeAlert("inputcheck_password")
                        document.getElementById("loader2").style.display = "block"
                        setTimeout(function(){
                            document.getElementById("loader2").style.display = "none"
                            openAlert("inputcheck_password")
                            
                        },2000)
                    }
                    document.getElementById("loader2").style.display = "block"
                    setTimeout(function(){
                        document.getElementById("loader2").style.display = "none"
                        openAlert("inputcheck_password")
                    },2000)
                });		
                return false;
            }
        });
    });
        
})



function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function deleteCookie(name) { 
    setCookie(name, "", -1); 
}

function getUserInformation(){
    request = $.get(`../backend/user/GetUserInformation.php?userId=${userId}`,
        function(response) {
            if(response) {
                let information = JSON.parse(response)['data'];
                // document.getElementById("profile_id").value = userId;
                document.getElementById("profile_username").value = information['UserName'];
                document.getElementById("profile_firstName").value = information['FirstName'];
                document.getElementById("profile_lastName").value = information['LastName'];
                document.getElementById("profile_email").value = information['Email'];
                document.getElementById("profile_address").value = information['Address'];
                document.getElementById('user_profile_avatar').src = '../frontend/' + information['Path'];
                document.getElementById('output').src = '../frontend/' + information['Path'];
            }
        }
    );
  
    // Callback handler that will be called on failure
    request.fail(function (jqXHR, textStatus, errorThrown){
        // Log the error to the console
        console.error("The following error occurred: ", textStatus, errorThrown);
    });
}

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: center,
        zoom: 13,
        streetViewControl: false,
        mapTypeControl:false
    });

    //custom marker
    var map_icon = {
        url: 'https://www.flaticon.com/svg/static/icons/svg/25/25240.svg',
        scaledSize: new google.maps.Size(30, 30)
    }

    var marker = new google.maps.Marker({
        position: address1,
        icon:map_icon,		
        map: map,
    }); 
    
    marker = new google.maps.Marker({
        position: address2,
        icon:map_icon,		
        map: map,
    }); 
    
    marker = new google.maps.Marker({
        position: address3,
        icon:map_icon,		
        map: map,
    }); 	
}

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
                                        <span>${formatPrice(element['Price'])}</span>
                                    </div>
                                    <button type="submit" class="btn btn-warning font-size-12" onclick="addtoCart(${element['Id']})">Add to cart</button>
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
                                                <span>${formatPrice(element['Price'])}</span>
                                            </div>
                                            <button type="submit" class="btn btn-warning font-size-12">Add to cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
                });
                document.getElementById('special-price-grid').innerHTML = list_product.join(' ');
            }
            else{
                console.log("Error ", response['message']);
            }
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
                if(!response['error']){
                    let productInformation = JSON.parse(response)['data'][0];
                    if(productInformation){
                        document.getElementById('product-name').innerHTML = productInformation.Name;
                        document.getElementById('original-price').innerHTML = `${formatPrice(productInformation.Price)}`;
                        document.getElementById('discount').innerHTML = `${productInformation.Discount}%`;
                        document.getElementById('current-price').innerHTML = `${formatPrice(productInformation.Price*(100-productInformation.Discount)/100)}`;
                        document.getElementById('mainboard-information').innerHTML = productInformation.Mainboard;
                        document.getElementById('cpu-information').innerHTML = productInformation.Cpu;
                        document.getElementById('ram-information').innerHTML = productInformation.Ram;
                        document.getElementById('storage-information').innerHTML = productInformation.Storage;
                        document.getElementById('gpu-information').innerHTML = productInformation.Gpu;
                        document.getElementById('psu-information').innerHTML = productInformation.Psu !== "" ? productInformation.Psu : "(500W) SilverStone ST50F-ES230 80 Plus";
                        document.getElementById('case-information').innerHTML = productInformation.Case;
                        document.getElementById('os-information').innerHTML = productInformation.Os;
                        document.getElementById('product-image').src = `../frontend/${productInformation.Path}`
                    }
                }
                else{
                    console.log("Error: ", response['message']);
                }
            }
    });
}

function checkDefaultValue() {
    var firstname = document.getElementById("profile_firstName").value;
    var lastname = document.getElementById("profile_lastName").value;
    var email = document.getElementById("profile_email").value;
    var address = document.getElementById("profile_address").value;
    request = $.get(`../backend/user/GetUserInformation.php?userId=${userId}`,
        function(response) {
            if(response){
                let information = JSON.parse(response)['data'];
                if (firstname !== information['FirstName'] ||
                    lastname !== information['LastName'] ||
                    email !== information['Email'] ||
                    address !== information['Address']) {   
                    document.getElementById("submit-info").removeAttribute("disabled")
                }
                if (firstname === information['FirstName'] &&
                    lastname === information['LastName'] &&
                    email === information['Email'] &&
                    address === information['Address']) {
                    document.getElementById("submit-info").setAttribute("disabled", true)
                }
                
            }
            
        }
    );
    
}

var loadFile = function(event) {
    var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    document.getElementById("imgs-label").innerHTML = event.target.files[0].name;
    document.getElementById("imgs-label").setAttribute("title", event.target.files[0].name);
    output.style.display= 'inline';
    output.onload = function() {
        URL.revokeObjectURL(output.src) // free memory
    }
    console.log(event.target.files[0])
};

function uploadAvatar(){
    var formData = new FormData();
    formData.append('section', 'general');
    formData.append('action', 'previewImg');
    // Attach file
    formData.append('fileToUpload', $('#fileToUpload')[0].files[0]);
    formData.append('id', userId); 
    
    $.ajax({
        url: '../backend/user/UploadAvatar.php',
        data: formData,
        type: 'POST',
        contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
        processData: false, // NEEDED, DON'T OMIT THIS
        success: function(res){
            var data = JSON.parse(res)
            getUserInformation();
            if(data.error===true) {
                if(document.getElementById("inputcheck_upload_imgs_success")) {
                    closeAlert("inputcheck_upload_imgs_success");
                }
                openAlert("inputcheck_upload_imgs_danger");
                if(document.getElementById("inputcheck_upload_imgs_success")) {
                    document.getElementById("inputcheck_upload_imgs_danger").innerHTML= `${data.message}. Please try again!
                    <button type="button" class="close" onclick="closeAlert('inputcheck_upload_imgs_danger')">
                        <span aria-hidden="true">&times;</span>
                    </button>`;
                }
                
            }
            else {
                if(document.getElementById("inputcheck_upload_imgs_danger")) {
                    closeAlert("inputcheck_upload_imgs_danger");
                }
                openAlert("inputcheck_upload_imgs_success");
            }

        }
    });
}

function closeAlert(id) {
    $(`#${id}`).hide();
}

function openAlert(id) {
    $(`#${id}`).show()
}

function increment(id) {
    document.getElementById('demoInput').stepUp();
    total_price = productList.map(o => o.Price*o.BuyAmount).reduce((acc, cur) => cur + acc, 0)
    total_buy_amount = productList.map(o => o.BuyAmount).reduce((acc, cur) => cur + acc, 0)
}

function decrement(id) {
    document.getElementById('demoInput').stepDown();
}

function getQuantityValue() {
    console.log(document.getElementById('demoInput').value)
}

function formatPrice(price){
    return `${price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} vnđ`;
}

var cartItemList = [];
var productList = [];
var total_price;
var total_buy_amount;

function addtoCart(element){
    cartProductList = getCookie('cart-porducts');
    cartItemList = cartProductList && cartProductList!=""? cartProductList.split(','):[];
    console.log(cartItemList)
    if(cartItemList.filter(x => x === element.toString()).length === 0){
        cartItemList.push(element);
        $('#cart-count').html(cartItemList.length);
        var productIdList = cartItemList.join(',').toString();
        console.log(getCookie("cart-porducts"));
        
        if(getCookie("cart-porducts") !== ""){
            deleteCookie('cart-porducts');
        }
        setCookie('cart-porducts', productIdList, 1);
    }
}

function getCartProductInformation(){
    var productIdList = getCookie('cart-porducts')
    $.get(`../backend/product/GetCartProducts.php?productIdList=${productIdList}`,
      function(response) {
        if(response){
            console.log(response);
            if(!JSON.parse(response)['error']){
                productList = JSON.parse(response)['data'];
                console.log("Cart products: ",productIdList);
                total_price = productList.map(o => o.Price).reduce((acc, cur) => cur + acc, 0)
                total_buy_amount = productList.map(o => o.BuyAmount).reduce((acc, cur) => cur + acc, 0)
                var list_product = productList.map(function(element){
                    return `<div class="row border-top py-3">
                    <div class="col-12 col-sm-6 col-md-3 col-lg-3 col-xl-2 cart-img">
                        <img src="../frontend/${element['Path']}" alt="cart1" class="img-fluid">
                    </div>
                    <div class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-5">
                        <h5 class="font-baloo font-size-20 m-0">${element['Name']}</h5>
                        <!--    #policy -->
                        <div id="policy">
                            <div class="d-flex">
                                <div class="return mr-3 mr-lg-4 mr-xl-5">
                                    <div class="font-size-12 my-2 color-secondary">
                                        <span class="fas fa-retweet border p-2 rounded-pill"></span>
                                    </div>
                                    <a href="#" class="font-rale font-size-12">10 Days <br> Replacement</a>
                                </div>
                                <div class="return mr-3 mr-lg-4 mr-xl-5">
                                    <div class="font-size-12 my-2 color-secondary">
                                        <span class="fas fa-truck  border p-2 rounded-pill"></span>
                                    </div>
                                    <a href="#" class="font-rale font-size-12">Free <br> Shipping</a>
                                </div>
                                <div class="return mr-3 mr-lg-4 mr-xl-5">
                                    <div class="font-size-12 my-2 color-secondary">
                                        <span class="fas fa-check-double border p-2 rounded-pill"></span>
                                    </div>
                                    <a href="#" class="font-rale font-size-12">1 Year <br> Warranty</a>
                                </div>
                            </div>
                        </div>
                        <!--    !policy -->
                        <button onclick="removeFromCart(${element['Id']})" type="submit" class="btn font-baloo text-danger px-0 text-left">Delete item</button>
                    </div>
                    <div class="col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3">
                        <!-- product qty -->
                        <div class="qty">
                            <div class="d-flex font-rale">
                                <button class="border bg-light" onclick="decrement(${element["Id"]})"><i class="fas fa-angle-down"></i></button>
                                <input type="number" id="demoInput" class="border px-2 w-100 bg-light" min="1" max="5" value="1">
                                <button class="border bg-light" onclick="increment(${element["Id"]})"><i class="fas fa-angle-up"></i></button>
                            </div>
                        </div>
                        <!-- !product qty -->
                    </div>
                    <div class="col-6 col-sm-6 col-md-2 col-lg-2 col-xl -2 text-right">
                        <div class="font-size-20 text-danger font-baloo">
                            <span class="product_price">${formatPrice(element["Price"])}</span>
                        </div>
                    </div>
                </div>`});
                $('#product-list-container').html(list_product.join(' '));
                $('#deal-price').html(formatPrice(total_price))
                $('#deal-amount').html(`Subtotal (${total_buy_amount} items):`)
            }
            else{
                console.log("Error ", response['message']);
            }
        }
    });
}


function removeFromCart(productId){
    cartProductList = getCookie('cart-porducts');
    cartItemList = cartProductList && cartProductList!=""? cartProductList.split(','):[];
    console.log(cartItemList)
    if(cartItemList.filter(x => x === productId.toString()).length !== 0){
        cartItemList.remove(element);
        $('#cart-count').html(cartItemList.length);
        var productIdList = cartItemList.join(',').toString();
        console.log(getCookie("cart-porducts"));
        
        if(getCookie("cart-porducts") !== ""){
            deleteCookie('cart-porducts');
        }
        setCookie('cart-porducts', productIdList, 1);
    }
}

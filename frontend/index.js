const Http = new XMLHttpRequest();
const userId = getCookie("userId");
const cartCookie = 'cart-products';
// Googlemap js
const address1 = { lat: 10.772713935537316, lng: 106.65967597467676 };
const address2 = { lat: 10.790040966516928, lng: 106.66139794610773 };
const address3 = { lat: 10.812376924038709, lng: 106.61820978330887 };
const center = { lat: 10.795532861871804, lng: 106.63649092163753 };

$(document).ready(function() {
    cartProductList = getCookie(cartCookie);
    cartItemList = cartProductList && cartProductList!=""? cartProductList.split(','):[];
    $('#cart-count').html(cartItemList.length);

    if(window.location.href.includes('home')){
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
    }
    else if(window.location.href.includes('product')){
        getProductInformation();
    }
    else if(window.location.href.includes('settings')){
        getUserInformation();
    }
    else if(window.location.href.includes('cart')){
        getCartProductInformation();
    }

    if(window.location.href.includes('register')) {

    }

    $(function () {
        jQuery.validator.addMethod("notEqual", function(value, element, param) {
            return this.optional(element) || value != $(param).val();
        }, "This has to be different...");
        jQuery.validator.addMethod(
            "pattern",
            function(value, element, regexp) {
                var re = new RegExp(regexp);
                return this.optional(element) || re.test(value);
            },
            "Please check your input."
        );
    })

    //check form register submission
    $(function () {
        $("form[id='register-form']").validate({
            rules:{
                inputFirstname: {
                    required: true,
                    minlength: 2,
                },
                inputLastname: {
                    required: true,
                    minlength: 2,
                },
                inputEmail: {
                    required: true,
                    email: true,
                },
                username: {
                    required: true,
                    minlength: 8,
                },
                password: {
                    required: true,
                    pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
                },
                rePassword: {
                    required: true,
                    equalTo: "#password"
                }
            },
            messages: {
                inputFirstname: {
                    required: "This field is required",
                    minlength: jQuery.validator.format("At least {0} characters required!"),
                },
                inputLastname: {
                    required: "This field is required",
                    minlength: jQuery.validator.format("At least {0} characters required!"),
                },
                inputEmail: {
                    required: "This field is required",
                    email: "Please check your email again",
                },
                password: {
                    required: "This field is required",
                    pattern: "The password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                },
                rePassword: {
                    required: "This field is required",
                    equalTo : "This has to be the same as the password"
                },
            },
            invalidHandler: function(e) {
                e.stopPropagation()
            },
            submitHandler: function(form, e) {
                var response = grecaptcha.getResponse();
                if (response.length === 0) {
                    alert("please verify you are human!"); 
                    return false;
                } 
                var sent_data = $(form).serializeArray();
                console.log(sent_data)
                $.ajax({
                    type: 'post',
                    url: '../backend/user/RegisterUser.php',
                    data: sent_data      
                })
                .done(function (response) {
                    response = JSON.parse(response);
                    console.log(response)
                    if(document.getElementById("inputcheck_success").style.display !== "none") {
                        closeAlert("inputcheck_success")
                    }
                    if(document.getElementById("inputcheck_error").style.display !== "none") {
                        closeAlert("inputcheck_error")
                    }
                    if(response.error) {
                        document.getElementById("loader3").style.display = "block"
                        setTimeout(function(){
                            document.getElementById("loader3").style.display = "none"
                            document.getElementById("inputcheck_error").innerHTML = `Error! ${response.message}
                                <button type="button" class="close" onclick="closeAlert('inputcheck_error')">
                                    <span aria-hidden="true">&times;</span>
                                </button>`
                            openAlert("inputcheck_error")
                            
                        },2000)
                    }
                    else {
                        document.getElementById("loader3").style.display = "block"
                        setTimeout(function(){
                            document.getElementById("loader3").style.display = "none"
                            document.getElementById("inputcheck_success").innerHTML = `${response.message}! Please go back to the login session.
                                <button type="button" class="close" onclick="closeAlert('inputcheck_success')">
                                    <span aria-hidden="true">&times;</span>
                                </button>`
                            openAlert("inputcheck_success")
                            
                        },2000)
                    }
                    
                });		
                return false;
            }
        });
    });

    //check form login submission
    $(function () {
        $("form[id='form-login']").validate({
            rules:{
                inputUsername: {
                    required: true,
                },
                inputPassword: {
                    required: true,
                },
            },
            messages: {
                inputUsername: {
                    required: "This field is required",
                },
                inputPassword: {
                    required: "This field is required",
                },
            },
            invalidHandler: function(e) {
                e.stopPropagation()
            },
            submitHandler: function(form, e) {
                var sent_data = $(form).serializeArray();
                $.ajax({
                    type: 'post',
                    url: '../backend/user/loginUser.php',
                    data: sent_data      
                })
                .done(function (response) {
                    console.log(response)
                    response = JSON.parse(response);
                    
                    
                    if(document.getElementById("inputcheck_success").style.display !== "none") {
                        closeAlert("inputcheck_success")
                    }
                    if(document.getElementById("inputcheck_error").style.display !== "none") {
                        closeAlert("inputcheck_error")
                    }
                    if(response.error) {
                        document.getElementById("loader4").style.display = "block";
                        document.getElementById("submit_login_btn").setAttribute("disabled", true)

                        setTimeout(function(){
                            document.getElementById("loader4").style.display = "none"
                            document.getElementById("inputcheck_error").innerHTML = `Error! ${response.message}
                                <button type="button" class="close" onclick="closeAlert('inputcheck_error')">
                                    <span aria-hidden="true">&times;</span>
                                </button>`
                            openAlert("inputcheck_error")
                            document.getElementById("submit_login_btn").removeAttribute("disabled")
                        },2000)
                    }
                    else {
                        document.getElementById("loader4").style.display = "block"
                        document.getElementById("submit_login_btn").setAttribute("disabled", true)
                        var timeleft = 2;
                        setTimeout(function(){
                            document.getElementById("loader4").style.display = "none"
                            var downloadTimer = setInterval(function() {
                                if (timeleft <= 0) {
                                    clearInterval(downloadTimer);
                                    window.location.replace("../frontend/home");
                                } else {
                                    document.getElementById("inputcheck_success").innerHTML = `${response.message}! Please wait for ${timeleft} seconds to redirect to homepage.`;
                                }
                                timeleft -= 1;
                            }, 1000);    
                            openAlert("inputcheck_success")
                        },1000)
                    }
                    
                });		
                return false;
            }
        });
    });

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
                console.log(sent_data)   
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
                    notEqual: "#profile_Oldpassword",
                    pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
                },
                profile_password_re: {
                    required: true,
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
                    notEqual: "New password can not be the same as old password",
                    pattern: "The password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                },
                profile_password_re: {
                    required: "This field is required",
                    equalTo : "This has to be the same as new password"
                },
            },
            invalidHandler: function(e) {
                e.stopPropagation()
            },
            submitHandler: function(form, e) {
                e.preventDefault();
                var sent_data = $(form).serializeArray(); 
                var id = {
                    name: "id",
                    value: userId
                };
                sent_data.push(id);
                $.ajax({
                    type: 'post',
                    url: '../backend/user/UpdateUserPassword.php',
                    data: sent_data      
                    })
                .done(function (response) {
                    // console.log("Update password", response);
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
        

    var x = document.cookie;
        console.log(x) 
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
                document.getElementById('user_profile_avatar').src = information['Path'] ? '../frontend/' + information['Path'] : './assets/imgs/users/avatar/default-avatar.png';
                document.getElementById('output').src = information['Path'] ? '../frontend/' + information['Path'] : './assets/imgs/users/avatar/default-avatar.png';
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
                        document.getElementById('product-image').src = `../frontend/${productInformation.Path}`;
                        $('#add-product-to-cart').click(function(){
                            addtoCart(productInformation.Id);
                        });
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
    
    var product = productList.find(o => o.Id === id);
    if(product.Amount > parseInt(document.getElementById(`amount-${id}`).value)){
        document.getElementById(`amount-${id}`).stepUp();
        product.BuyAmount = parseInt(document.getElementById(`amount-${id}`).value);
        total_price = productList.map(o => o.Price*o.BuyAmount).reduce((acc, cur) => cur + acc, 0);
        total_buy_amount = productList.map(o => o.BuyAmount).reduce((acc, cur) => cur + acc, 0);
        $('#deal-price').html(formatPrice(total_price));
        $('#deal-amount').html(`Subtotal (${total_buy_amount} items):`);
    }
}

function decrement(id) {
    document.getElementById(`amount-${id}`).stepDown();
    productList.find(o => o.Id === id).BuyAmount = parseInt(document.getElementById(`amount-${id}`).value);
    total_price = productList.map(o => o.Price*o.BuyAmount).reduce((acc, cur) => cur + acc, 0);
    total_buy_amount = productList.map(o => o.BuyAmount).reduce((acc, cur) => cur + acc, 0);
    $('#deal-price').html(formatPrice(total_price))
    $('#deal-amount').html(`Subtotal (${total_buy_amount} items):`)
}

function getQuantityValue() {
    console.log(document.getElementById('amount-${id}').value);
}

function formatPrice(price){
    return `${price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} vnđ`;
}

var cartItemList = [];
var productList = [];
var total_price;
var total_buy_amount;

function addtoCart(element){
    cartProductList = getCookie(cartCookie);
    cartItemList = cartProductList && cartProductList!=""? cartProductList.split(','):[];
    console.log(cartItemList)
    if(cartItemList.filter(x => x === element.toString()).length === 0){
        cartItemList.push(element);
        $('#cart-count').html(cartItemList.length);
        var productIdList = cartItemList.join(',').toString();        
        if(getCookie(cartCookie) !== ""){
            deleteCookie(cartCookie);
        }
        setCookie(cartCookie, productIdList, 1);
    }
}

function getCartProductInformation(){
    var productIdList = getCookie(cartCookie)
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
                        <a href="../frontend/product/${element.Id}">
                            <img  src="../frontend/${element.Path}" alt="cart1" class="img-fluid">
                        </a>
                    </div>
                    <div class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-5">
                        <h5 class="font-baloo font-size-20 m-0">${element.Name}</h5>
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
                        <button onclick="removeFromCart(${element.Id})" type="submit" class="btn font-baloo text-danger px-0 text-left">Delete item</button>
                    </div>
                    <div class="col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3">
                        <!-- product qty -->
                        <div class="qty">
                            <div class="d-flex font-rale">
                                <button class="border bg-light" onclick="decrement(${element.Id})"><i class="fas fa-angle-down"></i></button>
                                <input type="number" id="amount-${element.Id}" class="border px-2 w-100 bg-light" min="1" max="5" value="${element.Amount >= 1 ? 1: 0}">
                                <button class="border bg-light" onclick="increment(${element.Id})"><i class="fas fa-angle-up"></i></button>
                            </div>
                        </div>
                        <!-- !product qty -->
                    </div>
                    <div class="col-6 col-sm-6 col-md-2 col-lg-2 col-xl -2 text-right">
                        <div class="font-size-20 text-danger font-baloo">
                            <span class="product_price">${formatPrice(element.Price)}</span>
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
    cartProductList = getCookie(cartCookie);
    cartItemList = cartProductList && cartProductList!=""? cartProductList.split(','):[];
    if(cartItemList.filter(x => x === productId.toString()).length !== 0){
        cartItemList = cartItemList.filter(element => element !== productId.toString());
        $('#cart-count').html(cartItemList.length);
        var productIdList = cartItemList.join(',').toString();
        
        if(getCookie(cartCookie) !== ""){
            deleteCookie(cartCookie);
        }
        setCookie(cartCookie, productIdList, 1);
        getCartProductInformation();
    }
}


function buyProduct(){
    var userId = getCookie('userId');
    var buyList = productList.map(function(element){
        return {id: element.Id, buyAmount: element.BuyAmount}
    }); 
    console.log("Buy list", buyList);
    if(userId){
        $.ajax({
            type: 'POST',
            url: '../backend/product/BuyProducts.php',
            data: { 'userId': userId, 'buyList': buyList},
            success: function (response) {          
                console.log(response);
                deleteCookie(cartCookie);
            },
            failure: function (response) {          
                console.log("Error ", response);
            }
        }); 
    }
    else{
        window.location = '../frontend/login';
    }
}

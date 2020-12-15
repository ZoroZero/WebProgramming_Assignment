import { getCookie, setCookie, deleteCookie, cartCookie, formatPrice } from "../../index.js";

var cartItemList = [];
var productList = [];
var total_price;
var total_buy_amount;
window.increment = increment;
window.decrement = decrement;
window.removeFromCart = removeFromCart;
window.buyProduct = buyProduct;
window.reloadPage = reloadPage;
$(document).ready(function() {
    getCartProductInformation();
})



function getCartProductInformation(){
    var productIdList = getCookie(cartCookie)
    $.get(`../backend/product/GetCartProducts.php?productIdList=${productIdList}`,
      function(response) {
        if(response){
            console.log(response);
            if(!JSON.parse(response)['error']){
                productList = JSON.parse(response)['data'];
                if(productList.length === 0) {
                    document.getElementById('buy-button').setAttribute("disabled", true)
                }
                console.log("Cart products: ",productList);
                total_price = productList.map(o => (o.Price*(100-o.Discount)/100)).reduce((acc, cur) => cur + acc, 0)
                total_buy_amount = productList.map(o => o.BuyAmount).reduce((acc, cur) => cur + acc, 0)
                var list_product = productList.map(function(element){
                    return `
                    <div class="row border-top py-3">
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
                                        <p class="font-rale text-info font-size-12">10 Days <br> Replacement</p>
                                    </div>
                                    <div class="return mr-3 mr-lg-4 mr-xl-5">
                                        <div class="font-size-12 my-2 color-secondary">
                                            <span class="fas fa-truck  border p-2 rounded-pill"></span>
                                        </div>
                                        <p class="font-rale text-info font-size-12">Free <br> Shipping</p>
                                    </div>
                                    <div class="return mr-3 mr-lg-4 mr-xl-5">
                                        <div class="font-size-12 my-2 color-secondary">
                                            <span class="fas fa-check-double border p-2 rounded-pill"></span>
                                        </div>
                                        <p class="font-rale text-info font-size-12">1 Year <br> Warranty</p>
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
                                    <input disabled type="number" id="amount-${element.Id}" class="border px-2 w-100 bg-light" min="1" max="${element.Amount}" value="${element.Amount >= 1 ? 1: 0}">
                                    <button class="border bg-light" onclick="increment(${element.Id})"><i class="fas fa-angle-up"></i></button>
                                </div>
                            </div>
                            <!-- !product qty -->
                            <!-- product qty left -->
                            <div class="qtyleft text-center mt-3">
                                <p class="font-baloo text-muted"> There are only <span style="font-weight: bold">${element.Amount>= 1 ? element.Amount : 0}</span> items left</p>
                            </div>
                            <!-- !product qty left -->
                        </div>
                    </div>
                    <div class="col-6 col-sm-6 col-md-2 col-lg-2 col-xl -2 text-right">
                        <div class="font-size-20 text-danger font-baloo">
                            <span class="product_price" id="product-price-${element.Id}">${formatPrice(element.Price*(100-element.Discount)/100)}</span>
                        </div>
                    </div>`
                });
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
    var cartProductList = getCookie(cartCookie);
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

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function buyProduct(){
    var userId = getCookie('userId');
    var date = new Date().addDays(7);
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
                $('#myModal').modal('show')
                document.getElementById('paymentShipment').innerHTML = `The shipment is estimated to be delivered in <span style="font-weight: bold"> ${date.getDay() === 0 ? 'Sunday' : 
                                                                                                                        date.getDay() === 1 ? 'Monday' :
                                                                                                                        date.getDay() === 2 ? 'Tuesday' :
                                                                                                                        date.getDay() === 3 ? 'Wendnesday' :
                                                                                                                        date.getDay() === 4 ? 'Thurday' :
                                                                                                                        date.getDay() === 5 ? 'Friday' : 'Saturday'}, ${date.getDate()}/${date.getUTCMonth()+1}/${date.getFullYear()} </span>`;
                console.log(date.getDate())
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

function reloadPage() {
    location.reload()
}


function increment(id) {
    var product = productList.find(o => o.Id === id);
    var price = (product.Price*(100-product.Discount)/100);
    if(product.Amount > parseInt(document.getElementById(`amount-${id}`).value)){
        document.getElementById(`amount-${id}`).stepUp();
        console.log(parseInt(document.getElementById(`amount-${id}`).value))
        document.getElementById(`product-price-${id}`).innerHTML = formatPrice(parseInt(document.getElementById(`amount-${id}`).value) * price)
        product.BuyAmount = parseInt(document.getElementById(`amount-${id}`).value);
        total_price = productList.map(o => (o.Price*(100-o.Discount)/100)*o.BuyAmount).reduce((acc, cur) => cur + acc, 0);
        total_buy_amount = productList.map(o => o.BuyAmount).reduce((acc, cur) => cur + acc, 0);
        $('#deal-price').html(formatPrice(total_price));
        $('#deal-amount').html(`Subtotal (${total_buy_amount} items):`);
    }
}

function decrement(id) {
    var product = productList.find(o => o.Id === id);
    var price = (product.Price*(100-product.Discount)/100);
    document.getElementById(`amount-${id}`).stepDown();
    document.getElementById(`product-price-${id}`).innerHTML = formatPrice(parseInt(document.getElementById(`amount-${id}`).value) * price)
    productList.find(o => o.Id === id).BuyAmount = parseInt(document.getElementById(`amount-${id}`).value);
    total_price = productList.map(o => (o.Price*(100-o.Discount)/100)*o.BuyAmount).reduce((acc, cur) => cur + acc, 0);
    total_buy_amount = productList.map(o => o.BuyAmount).reduce((acc, cur) => cur + acc, 0);
    $('#deal-price').html(formatPrice(total_price))
    $('#deal-amount').html(`Subtotal (${total_buy_amount} items):`)
}
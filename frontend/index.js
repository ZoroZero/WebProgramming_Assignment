const Http = new XMLHttpRequest();
const userId = getCookie("userId");
export const cartCookie = 'cart-products';
// Googlemap js
const address1 = { lat: 10.772713935537316, lng: 106.65967597467676 };
const address2 = { lat: 10.790040966516928, lng: 106.66139794610773 };
const address3 = { lat: 10.812376924038709, lng: 106.61820978330887 };
const center = { lat: 10.795532861871804, lng: 106.63649092163753 };

var cartItemList = [];
export var productList = [];
export var total_price;
export var total_buy_amount;
window.addtoCart = addtoCart;
$(document).ready(function() {
    var cartProductList = getCookie(cartCookie);
    cartItemList = cartProductList && cartProductList!=""? cartProductList.split(','):[];
    $('#cart-count').html(cartItemList.length);

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
})

function addtoCart(element){
    var cartProductList = getCookie(cartCookie);
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

export function getCookie(cname) {
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

export function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function deleteCookie(name) { 
    setCookie(name, "", -1); 
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

export function closeAlert(id) {
    $(`#${id}`).hide();
}

export function openAlert(id) {
    $(`#${id}`).show()
}

function getQuantityValue() {
    console.log(document.getElementById('amount-${id}').value);
}

export function formatPrice(price){
    return `${price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} vnđ`;
}

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
window.initMap = initMap;
window.showSearchResult = showSearchResult;

window.onclick = function(event){
    if(!event.target.matches('.dropdown-content')){
        var myDropdown = document.getElementById("livesearch");
        if (myDropdown.classList.contains('show')) {
          myDropdown.classList.remove('show');
          myDropdown.innerHTML = "";
        }
    }
}

$(document).ready(function() {
    var cartProductList = getCookie(cartCookie);
    cartItemList = cartProductList && cartProductList!=""? cartProductList.split(','):[];
    $('#cart-count').html(cartItemList.length);

    $(function () {
        jQuery.validator.addMethod("notEqual", function(value, element, param) {
            return this.optional(element) || value != $(param).val(); 
            }, 
            "This has to be different..."
        );
        jQuery.validator.addMethod(
            "pattern",
            function(value, element, regexp) {
                var re = new RegExp(regexp);
                return this.optional(element) || re.test(value);
            },
            "Please check your input."
        );
        jQuery.validator.addMethod("greater", function(value, element, param) {
            return this.optional(element) || parseInt(value) < parseInt($(param).val()); 
            }, 
            "The amount must be greater than quantity sold"
        );
        jQuery.validator.addMethod("greaterThan100", function(value, element, param) {
            return this.optional(element) || parseInt(value) <= param; 
            }, 
            "The amount must be greater than quantity sold"
        );
        jQuery.validator.addMethod("intValue", function(value, element, regexp) {
            var re = new RegExp(regexp);
            return this.optional(element) || re.test(value); 
            }, 
            "Please put an integer value"
        );
    })
})


function addtoCart(element, amount){
    console.log(amount)
    var cartProductList = getCookie(cartCookie);
    cartItemList = cartProductList && cartProductList!=""? cartProductList.split(','):[];
    console.log(cartItemList)
    if(amount <= 0) {
        var x = document.getElementById("snackbar");
        x.innerHTML = '<span class="material-icons mr-1">error</span> This item is out of stock. Please select other items'
        x.className = "show error";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }
    else {
        if(cartItemList.filter(x => x === element.toString()).length === 0){
            var x = document.getElementById("snackbar");
            x.className = "show";
            x.innerHTML = '<span class="material-icons mr-1"> done </span> Successfully added to cart.'
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
            cartItemList.push(element);
            $('#cart-count').html(cartItemList.length);
            var productIdList = cartItemList.join(',').toString();        
            if(getCookie(cartCookie) !== ""){
                deleteCookie(cartCookie);
            }
            setCookie(cartCookie, productIdList, 1);
        }
        else {
            var x = document.getElementById("snackbar");
            x.innerHTML = '<span class="material-icons mr-1">error</span> This item is already in cart.'
            x.className = "show error";
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
        }
    }
}

export function loadFile(event, imgId, id) {
    var output = document.getElementById(imgId);
    output.src = URL.createObjectURL(event.target.files[0]);
    document.getElementById(id).innerHTML = event.target.files[0].name;
    document.getElementById(id).setAttribute("title", event.target.files[0].name);
    if(imgId === 'output' || imgId === 'change-product-setting-img') {
        output.style.display= 'block';
    }
    output.onload = function() {
        URL.revokeObjectURL(output.src) // free memory
    }
    // console.log(event.target.files[0])
};

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
    var map = new google.maps.Map(document.getElementById("map"), {
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

export function getProductCategory(categoryId){
    switch(categoryId){
        case 1: return 'Windows';
        case 2: return 'Mac';
        case 3: return 'Linux';
    }
}

function showSearchResult(str) {
    if (str.length==0) {
      $("#livesearch").innerHTML="";
      document.getElementById("livesearch").style.border="0px";
      return;
    }
    $.get(`../backend/product/SearchProduct.php?keyword=${str}`,
      function(response) {
        if(response){
            if(!JSON.parse(response)['error']){
                let information = JSON.parse(response)['data'];
                console.log("Search", information);
                var list_product = information.map(function(element){
                    return `<a href='./product/${element.Id}'>
                                ${element.Name}
                            </a>`
                })
                let liveSearch = document.getElementById('livesearch'); 
                liveSearch.innerHTML = list_product.join(' ');
                if (!liveSearch.classList.contains('show')) {
                    liveSearch.classList.add('show');
                }
            }
            else{
                console.log("Error ", JSON.parse(response)['message']);
            }
    }
    })
}
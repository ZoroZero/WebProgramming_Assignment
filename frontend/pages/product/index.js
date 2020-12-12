import { formatPrice } from '../../index.js';

$(document).ready(function() {
    getProductInformation();
});


function getProductInformation(){
    var url_string = window.location.href;
    var url = new URL(url_string);
    var productId = url.href.substring(url.href.lastIndexOf('/') + 1);
    console.log(productId);
    var request = $.get(`../../backend/product/GetProductInformation.php?productId=${productId}`,
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
                        document.getElementById('product-image').src = `../../frontend/${productInformation.Path}`;
                        $('#add-product-to-cart').click(function(){
                            addtoCart(productInformation.Id, productInformation.Amount);
                        });
                    }
                }
                else{
                    console.log("Error: ", response['message']);
                }
            }
    });
}
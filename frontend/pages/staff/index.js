import {formatPrice, getCookie} from '../../index.js';
var tableProductList = [];

const userId = getCookie("userId");

$(document).ready(function() {
    getAllProduct();
})
window.updateProduct = updateProduct;
window.initUpdateProductForm = initUpdateProductForm;
function getAllProduct(){
    $.get(`../backend/product/GetAllProduct.php`,
      function(response) {
        if(response){
            if(!JSON.parse(response)['error']){
                tableProductList = JSON.parse(response)['data'];
                console.log("Cart products: ",tableProductList);
                var list_product = tableProductList.map(function(element){
                    return `<tr>
                                <th scope="row">${element.Id}</th>
                                <td>${element.CategoryId}</td>
                                <td>${element.Name}</td>
                                <td>${formatPrice(element.Price)}</td>
                                <td>${element.Amount}</td>
                                <td>${element.Discount}</td>
                                <td>${element.QuantitySold}</td>
                                <td> 
                                    <button type="button" class="btn btn-primary" onclick=initUpdateProductForm(${element.Id})
                                    data-toggle="modal" data-target="#productModal" data-whatever="@mdo">Update</button>
                                </td>
                            </tr>`});
                $('#manage-product-table-body').html(list_product.join(' '));
            }
            else{
                console.log("Error ", response['message']);
            }
        }
    });
}

function initUpdateProductForm(id){
    var product = tableProductList.filter(element => element.Id === id)[0];
    $('#productId').val(id);
    $('#productName').val(product.Name);
    $('#productDescription').val(product.Description);
    $('#productPrice').val(product.Price);
    $('#productOs').val(product.Os);
    $('#productRam').val(product.Ram);
    $('#productMonitor').val(product.Monitor);
    $('#productMouse').val(product.Mouse);
    $('#productStorage').val(product.Storage);
    $('#productGpu').val(product.Gpu);
    $('#productCpu').val(product.Cpu);
    $('#productPsu').val(product.Psu);
    $('#productAmount').val(product.Amount);
    $('#productDiscount').val(product.Discount);
    $('#productQuantitySold').val(product.QuantitySold);

    document.getElementById('change-product-setting-img').src = '../frontend/' + product["Path"];
}

function updateProduct(){
    var sent_data = $('#update-product-form').serializeArray();
    sent_data.push({name: "userId", value: userId});  
    console.log(sent_data);

    $.post({
        url: '../backend/product/UpdateProductInformation.php',
        data: sent_data      
    })
    .done(function (response) {
        if(response && !response.error){
            $('#productModal').modal('hide');
        }
    });
}
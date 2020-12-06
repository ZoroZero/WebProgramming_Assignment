import {formatPrice, getCookie} from '../../index.js';
window.initUpdateProductForm = initUpdateProductForm;
window.checkDefaultValueUpdateProduct = checkDefaultValueUpdateProduct;

var tableProductList = [];
var product = {};
const userId = getCookie("userId");

$(document).ready(function() {
    getAllProduct();

    $("form[id='form-update-product']").validate({
        rules:{
            productName: {
                required: true,
            },
            productDescription: {
                required: true,
            },
            productPrice: {
                required: true,
            },
            productOs: {
                required: true,
            },
            productRam: {
                required: true,
            },
            productMonitor: {
                required: true,
            },
            productMouse: {
                required: true,
            },
            productStorage: {
                required: true,
            },
            productGpu: {
                required: true,
            },
            productCpu: {
                required: true,
            },
            productPsu: {
                required: true,
            },
            productAmount: {
                required: true,
                intValue: /^[0-9]*$/,
            },
            productDiscount: {
                required: true,
                greaterThan100: 100,
            },
            productQuantitySold: {
                required: true,
                intValue: /^[0-9]*$/,
                greater: "#productAmount"
            },
        },
        messages: {
            productName: {
                required: "This field is required...",
            },
            productDescription: {
                required: "This field is required...",
            },
            productPrice: {
                required: "This field is required...",
            },
            productOs: {
                required: "This field is required...",
            },
            productRam: {
                required: "This field is required...",
            },
            productMonitor: {
                required: "This field is required...",
            },
            productMouse: {
                required: "This field is required...",
            },
            productStorage: {
                required: "This field is required...",
            },
            productGpu: {
                required: "This field is required...",
            },
            productCpu: {
                required: "This field is required...",
            },
            productPsu: {
                required: "This field is required...",
            },
            productAmount: {
                required: "This field is required...",
                intValue: "Please type an integer value",
            },
            productDiscount: {
                required: "This field is required...",
                greaterThan100: "This value can not be greater than 100",
            },
            productQuantitySold: {
                required: "This field is required...",
                intValue: "Please type an integer value",
                greater: "This can not be larger than the amount value"
            },
        },
    });

    $('#btn-submit-update').click(function() {
        if($("#form-update-product").valid()){   // test for validity
            var sent_data = $('#form-update-product').serializeArray();
            sent_data.push({name: "userId", value: userId});  

            $.post({
                url: '../backend/product/UpdateProductInformation.php',
                data: sent_data      
            })
            .done(function (response) {
                if(response && !response.error){
                    $('#productModal').modal('hide');
                }
            });
            getAllProduct();
            return false;
        } else {
            console.log("Invalid update form");
        }
    })
})



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
    product = tableProductList.filter(element => element.Id === id)[0];
    document.getElementById('btn-submit-update').setAttribute("disabled", true)
    document.getElementById("productName").value = product.Name;
    $('#productId').val(id);
    // $('#productName').val(product.Name);
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

function checkDefaultValueUpdateProduct() {
    var productName = document.getElementById("productName").value;
    var productDescription = document.getElementById("productDescription").value;
    var productPrice = document.getElementById("productPrice").value;
    var productOs = document.getElementById("productOs").value;
    var productRam = document.getElementById("productRam").value;
    var productMonitor = document.getElementById("productMonitor").value;
    var productMouse = document.getElementById("productMouse").value;
    var productStorage = document.getElementById("productStorage").value;
    var productGpu = document.getElementById("productGpu").value;
    var productCpu = document.getElementById("productCpu").value;
    var productPsu = document.getElementById("productPsu").value;
    var productAmount = document.getElementById("productAmount").value;
    var productDiscount = document.getElementById("productDiscount").value;
    var productQuantitySold = document.getElementById("productQuantitySold").value;

    if(product.Name !== productName ||
        product.Description !== productDescription ||
        product.Price !== productPrice ||
        product.Os !== productOs ||
        product.Ram !== productRam ||
        product.Monitor !== productMonitor ||
        product.Mouse !== productMouse ||
        product.Storage !== productStorage ||
        product.Gpu !== productGpu ||
        product.Cpu !== productCpu ||
        product.Psu !== productPsu ||
        product.Amount !== productAmount ||
        product.Discount !== productDiscount ||
        product.QuantitySold !== productQuantitySold) {
            document.getElementById('btn-submit-update').removeAttribute("disabled")
    }

    if(product.Name === productName &&
        product.Description === productDescription &&
        product.Price === parseInt(productPrice) &&
        product.Os === productOs &&
        product.Ram === productRam &&
        product.Monitor === productMonitor &&
        product.Mouse === productMouse &&
        product.Storage === productStorage &&
        product.Gpu === productGpu &&
        product.Cpu === productCpu &&
        product.Psu === productPsu &&
        product.Amount === parseInt(productAmount) &&
        product.Discount === parseInt(productDiscount) &&
        product.QuantitySold === parseInt(productQuantitySold)) {
            document.getElementById('btn-submit-update').setAttribute("disabled", true)
    }
}
var tableProductList = [];

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
                                <td>${element.Price}</td>
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
    var product = tableProductList.filter(element => element.Id === id);
    $('#productId').val(id);
    console.log(product);
}

function updateProduct(){
    var data = $('#update-product-form').serializeArray();
    console.log("Update product: ", data);
}
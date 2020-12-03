$(document).ready(function() {
    getAllProduct();
})


function getAllProduct(){
    $.get(`../backend/product/GetAllProduct.php`,
      function(response) {
        if(response){
            if(!JSON.parse(response)['error']){
                var productList = JSON.parse(response)['data'];
                console.log("Cart products: ",productList);
                var list_product = productList.map(function(element){
                    return `<tr>
                                <th scope="row">${element.Id}</th>
                                <td>${element.CategoryId}</td>
                                <td>${element.Name}</td>
                                <td>${element.Price}</td>
                                <td>${element.Amount}</td>
                                <td>${element.Discount}</td>
                                <td>${element.QuantitySold}</td>
                                <td> 
                                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#productModal" data-whatever="@mdo">Update</button>
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
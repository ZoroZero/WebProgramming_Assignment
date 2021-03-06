import {formatPrice, getProductCategory, getCookie} from '../../index.js';

$(document).ready(function() {
  fetchProduct();
});

function fetchProduct(){
  $.get(`../backend/product/GetActiveProducts.php`,
      function(response) {
        if(response){
          if(!JSON.parse(response)['error']){
            var tableProductList = JSON.parse(response)['data'];
            console.log("Cart products: ",tableProductList);
            var list_product = tableProductList.map(function(product){
              return `<div class="grid-item ${getProductCategory(product.CategoryId)} border">
                        <div class="item py-2 px-2" style="width: 200px;">
                            <div class="product font-rale">
                                <a href="../frontend/product/${product.Id}">
                                    <img src="${'../frontend/' + product.Path}" id="product-img" alt="product10" class="img-fluid">
                                </a>
                                <div class="text-center">
                                    <h6 class="product-name">
                                        ${product.Name}
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
                                    <div class="price py-2 d-flex flex-column">
                                        <p style="display: none" class="product-price">${product.Price- product.Price*product.Discount/100}</p>
                                        ${product.Discount > 0 ? `
                                            <small><strike>${formatPrice(product.Price)}</strike></small>
                                            <span>${formatPrice(product.Price- product.Price*product.Discount/100)}</span>` : `
                                            <span>${formatPrice(product.Price)}
                                        `}    
                                    </div>
                                    <button type="submit" class="btn btn-warning font-size-12" onclick="addtoCart(${product.Id}, ${product.Amount})">Add to cart</button>
                                </div>
                            </div>
                        </div>
                    </div>`
            });
            $('#products-grid').html(list_product.join(' '));
          }
          else{
              console.log("Error ", response['message']);
          }
          var $grid = $(".grid").isotope({
            itemSelector: '.grid-item',
            layoutMode: 'fitRows',
            getSortData: {
                productname: '.product-name',
                productprice: '.product-price parseInt'
            },
          })
          $(window).on('load', function(){
            $grid.isotope({filter: '*'})
              //filter items on button press
            $(".button-group").on("click", "button", function(){
              var filterValue = $(this).attr('data-filter');
              $grid.isotope({filter: filterValue});
            })

            $(".button-group-sort").on("click", "button", function(){
              var filterValue = $(this).attr('data-filter');
              console.log(filterValue)

              var direction = $(this).attr('direction');

              /* convert it to a boolean */
              var isAscending = (direction === 'asc');
              /* pass it to isotope */
              $grid.isotope({ sortBy: filterValue, sortAscending: isAscending });
            })
          });
        }
    });
}
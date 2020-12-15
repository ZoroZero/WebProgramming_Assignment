<!--start #cart-->
<section id="cart" class="py-4">
    <div class="container-fluid w-75 px-0">
        <h1 class="font-baloo font-size-20">Shopping Cart</h1>
        <div id='product-list-container'>
        </div>
        <!-- subtotal section-->
        <div class="row">
            <div class="sub-total border text-center mt-2 container-fluid col-sm-7 col-md-5 col-lg-4 col-12">
                <h6 class="font-size-14 font-rale text-danger py-3 m-0" id="cart-status"><i class="fas fa-check"></i> Your order is eligible for FREE Delivery.</h6>
                <div class="border-top py-4">
                    <h5 class="font-baloo font-size-20"><span id="deal-amount">No item in cart</span>&nbsp; <span class="text-danger"><span class="text-danger" id="deal-price">0.00</span> </span> </h5>
                    <button type="submit" id="buy-button" class="btn btn-warning mt-3" onclick="buyProduct()">Proceed to Buy</button>
                </div>
            </div>
        </div>
        <!-- !subtotal section-->
    </div>
    <!-- Modal -->
    <div id="myModal" class="modal fade">
        <div class="modal-dialog modal-dialog-centered modal-confirm">
            <div class="modal-content">
                <div class="modal-header justify-content-center">
                    <div class="icon-box">
                        <i class="material-icons">&#xE876;</i>
                    </div>
                    <button onclick="reloadPage()" type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                </div>
                <div class="modal-body text-center">
                    <h4>Great!</h4>
                    <p>The transaction is successfully completed.</p>
                    <p id="paymentShipment"></p>
                    <a href="./homepage" class="btn d-flex justify-content-center align-items-center m-auto w-50"><span>Back to homepage</span> <i class="material-icons">&#xE5C8;</i></a>
                </div>
            </div>
        </div>
    </div>
</section>
<!--end #cart-->
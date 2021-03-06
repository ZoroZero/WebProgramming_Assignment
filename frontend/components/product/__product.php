<!--product-->
<section id="product" class="py-3">
    <div class="container">
        <div class="row">
            <div class="col-sm-6">
                <img id='product-image' alt="product" class="img-fluid">
            </div>
            <div class="col-sm-6 mt-4">
                <h5 class="font-baloo font-size-20" id='product-name'></h5>
                <small></small>
                <div class="d-flex">
                    <div class="rating text-warning font-size-12">
                        <span>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star-half-alt"></i>
                        </span>
                    </div>
                    <p class="px-2 font-rale font-size-14"></p>
                </div>
                <hr class="m-0">

                <!--Product Price-->
                <table class="my-3">
                    <tr class="font-rale font-size-14">
                        <td>Original price: </td>
                        <td id='original-price'></td>
                    </tr>
                    <tr class="font-rale font-size-14">
                        <td>Discount: </td>
                        <td class="font-size-20 text-danger">
                            <span id='discount'></span>
                            <small class="text-dark font-size-12"></small>
                        </td>
                    </tr>
                    <tr class="font-rale font-size-14">
                        <td>Current price: </td>
                        <td>
                            <span class="font-size-20 text-danger" id='current-price'></span>
                        </td>
                    </tr>
                </table>
                <!--!Product Price-->

                <!--    #policy -->
                <div id="policy">
                    <div class="d-flex">
                        <div class="return text-center mr-5">
                            <div class="font-size-20 my-2 color-secondary">
                                <span class="fas fa-retweet border p-3 rounded-pill"></span>
                            </div>
                            <a href="#" class="font-rale font-size-12">10 Days <br> Replacement</a>
                        </div>
                        <div class="return text-center mr-5">
                            <div class="font-size-20 my-2 color-secondary">
                                <span class="fas fa-truck  border p-3 rounded-pill"></span>
                            </div>
                            <a href="#" class="font-rale font-size-12">Free<br>Shipping</a>
                        </div>
                        <div class="return text-center mr-5">
                            <div class="font-size-20 my-2 color-secondary">
                                <span class="fas fa-check-double border p-3 rounded-pill"></span>
                            </div>
                            <a href="#" class="font-rale font-size-12">1 Year <br>Warranty</a>
                        </div>
                    </div>
                </div>
                <!--    !policy -->

                <!-- product qty section -->
                <!-- <div class="qty d-flex mt-4 justify-content-center align-items-center">
                    <h6 class="font-baloo mb-0">Quantities: </h6>
                    <div class="px-4 d-flex font-rale">
                        <button class="qty-down border bg-light"><i class="fas fa-angle-down" onclick="decrement()"></i></button>
                        <input type="number" id="demoInput" class="qty_input border px-2 w-50 bg-light" min="1" max="5" disabled value="1">
                        <button class="qty-up border bg-light" onclick="increment()"><i class="fas fa-angle-up"></i></button>
                    </div>
                </div> -->
                <!-- !product qty section -->

                <div class="form-row pt-4 font-size-16 font-baloo">
                    <div class="col">
                        <button type="submit" class="btn btn-danger w-100" id='add-product-to-cart'>Add to cart</button>
                    </div>
                </div>
                <div id="amount-display" class="text-center">

                </div>
            </div>

            <!-- product description section -->
            <div class="col-12 my-4">
                <h4 class="font-rubik font-size-20">Product Description</h4>
                <hr>
                <div class="table-responsive border">
                    <table class="table table-hover m-0">
                        <thead class="color-secondary-bg">
                            <tr>
                                <th scope="col">PC parts</th>
                                <th scope="col" class="text-center">Part's Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">CPU </th>
                                <td id='cpu-information'>Intel Pentium G6400 / 4MB / 4.0GHz / 2 Nhân 4 Luồng / LGA 1200</td>
                            </tr>
                            <tr>
                                <th scope="row">RAM </th>
                                <td id='ram-information'>G.SKILL Ripjaws V 1x8GB 2800</td>
                            </tr>
                            <tr>
                                <th scope="row">Storage </th>
                                <td id='storage-information'>PNY SSD CS900 120G 2.5" Sata 3</td>
                            </tr>
                            <tr>
                                <th scope="row">GPU </th>
                                <td id='gpu-information'>ASUS TUF Gaming GeForce GTX 1650 4GB GDDR6</td>
                            </tr>
                            <tr>
                                <th scope="row">PSU </th>
                                <td id='psu-information'>Deepcool DN450 80 Plus</td>
                            </tr>
                            <tr>
                                <th scope="row">OS </th>
                                <td id='os-information'>Windows</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
            <!-- product description section -->

        </div>
        <div id="snackbar">Successfully added to cart..</div>
    </div>
</section>
<!--product-->
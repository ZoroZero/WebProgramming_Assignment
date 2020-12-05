<div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="productModalLabel" aria-hidden="true">
    <div class="modal-dialog" style="max-width: 700px !important;" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="productModalLabel">Change Product Information</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <img id="change-product-setting-img" alt="" class="img-fluid">
                <form id='update-product-form'>
                    <div class="form-group col-md-6">
                        <input type="hidden" class="form-control" id="productId" name='productId'>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="productName" class="col-form-label">Product Name:</label>
                            <input type="text" class="form-control" id="productName" name='productName'>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="productDescription" class="col-form-label">Description:</label>
                            <input type="text" class="form-control" id="productDescription" name='productDescription'>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="productPrice" class="col-form-label">Price:</label>
                            <input type="number" class="form-control" id="productPrice" name='productPrice'>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="productOs" class="col-form-label">Operating System:</label>
                            <input type="text" class="form-control" id="productOs" name='productOs'>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="productRam" class="col-form-label">Message:</label>
                            <input type="text" class="form-control" id="productRam" name='productRam'>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="productMonitor" class="col-form-label">Monitor:</label>
                            <input type="text" class="form-control" id="productMonitor" name='productMonitor'>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="productMouse" class="col-form-label">Mouse:</label>
                            <input type="text" class="form-control" id="productMouse" name='productMouse'>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="productStorage" class="col-form-label">Storage:</label>
                            <input type="text" class="form-control" id="productStorage" name='productStorage'>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="productCpu" class="col-form-label">Cpu:</label>
                            <input type="text" class="form-control" id="productCpu" name='productCpu'>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="productGpu" class="col-form-label">Gpu:</label>
                            <input type="text" class="form-control" id="productGpu" name='productGpu'>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="productPsu" class="col-form-label">Psu:</label>
                            <input type="text" class="form-control" id="productPsu" name='productPsu'>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="productAmount" class="col-form-label">Amount:</label>
                            <input type="text" class="form-control" id="productAmount" name='productAmount'>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="productDiscount" class="col-form-label">Discount:</label>
                            <input type="text" class="form-control" id="productDiscount" name='productDiscount'>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="productQuantitySold" class="col-form-label">QuantitySold:</label>
                            <input type="text" class="form-control" id="productQuantitySold" name='productQuantitySold'>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" onclick="updateProduct()">Update</button>
            </div>
        </div>
    </div>
</div>
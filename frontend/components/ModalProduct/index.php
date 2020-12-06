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
                <img id="change-product-setting-img" alt="" class="img-fluid" style="max-width: 300px; margin: auto; display: block" />
                <form id="form-update-product" name="form-update-product" method="" action="">
                    <input type="hidden" class="form-control" id="productId" name='productId'>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="productName" class="col-form-label">Product Name:</label>
                            <input type="text" class="form-control" id="productName" name="productName" onchange="checkDefaultValueUpdateProduct()">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="productDescription" class="col-form-label">Description:</label>
                            <input type="text" class="form-control" id="productDescription" name="productDescription" onchange="checkDefaultValueUpdateProduct()">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="productPrice" class="col-form-label">Price:</label>
                            <input type="number" class="form-control" id="productPrice" name="productPrice" onchange="checkDefaultValueUpdateProduct()">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="productOs" class="col-form-label">Operating System:</label>
                            <input type="text" class="form-control" id="productOs" name="productOs" onchange="checkDefaultValueUpdateProduct()">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="productRam" class="col-form-label">Ram:</label>
                            <input type="text" class="form-control" id="productRam" name="productRam" onchange="checkDefaultValueUpdateProduct()">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="productMonitor" class="col-form-label">Monitor:</label>
                            <input type="text" class="form-control" id="productMonitor" name="productMonitor" onchange="checkDefaultValueUpdateProduct()">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="productMouse" class="col-form-label">Mouse:</label>
                            <input type="text" class="form-control" id="productMouse" name="productMouse" onchange="checkDefaultValueUpdateProduct()">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="productStorage" class="col-form-label">Storage:</label>
                            <input type="text" class="form-control" id="productStorage" name="productStorage" onchange="checkDefaultValueUpdateProduct()">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="productCpu" class="col-form-label">Cpu:</label>
                            <input type="text" class="form-control" id="productCpu" name="productCpu" onchange="checkDefaultValueUpdateProduct()">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="productGpu" class="col-form-label">Gpu:</label>
                            <input type="text" class="form-control" id="productGpu" name="productGpu" onchange="checkDefaultValueUpdateProduct()">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="productPsu" class="col-form-label">Psu:</label>
                            <input type="text" class="form-control" id="productPsu" name="productPsu" onchange="checkDefaultValueUpdateProduct()">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="productAmount" class="col-form-label">Amount:</label>
                            <input type="number" class="form-control" id="productAmount" name="productAmount" onchange="checkDefaultValueUpdateProduct()">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="productDiscount" class="col-form-label">Discount:</label>
                            <input type="number" class="form-control" id="productDiscount" name="productDiscount" onchange="checkDefaultValueUpdateProduct()">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="productQuantitySold" class="col-form-label">QuantitySold:</label>
                            <input type="number" class="form-control" id="productQuantitySold" name="productQuantitySold" onchange="checkDefaultValueUpdateProduct()">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="inputState">Deactivate product:</label>
                        <select id="inputState" class="form-control">
                            <option value='1' selected>NO</option>
                            <option value='2'>YES</option>
                        </select>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" id="btn-submit-update">Update</button>
            </div>
        </div>
    </div>
</div>
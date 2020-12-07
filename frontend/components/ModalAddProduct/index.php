<button type="button" class="btn btn-primary w-25 my-5" data-toggle="modal" data-target="#addProduct" data-whatever="@mdo">Add new product</button>
<div class="modal fade" id="addProduct" tabindex="-1" role="dialog" aria-labelledby="addProductLabel" aria-hidden="true">
  <div class="modal-dialog" style="max-width: 700px !important;" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="addProductLabel">Add Product Information</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <img src ='' id="output" class="img-fluid" style="max-width: 300px; margin: auto; display: none" />
        <form id="add-new-product-form" name="add-new-product-form" action="../backend/product/AddNewProduct.php" method="post" enctype="multipart/form-data">
          <div class="input-group mt-3">
            <div class="custom-file">
              <input type="file" class="custom-file-input font-size-16 font-rubik" name="fileToUploadAddProduct" id="fileToUploadAddProduct" accept="image/*" onchange="loadFile(event, 'output', 'imgs-label-add')">
              <label class="custom-file-label imgs-label-add font-size-16 font-rubik" id="imgs-label-add" for="fileToUploadAddProduct">Choose file</label>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="productAddName" class="col-form-label">Product Name:</label>
              <input type="text" class="form-control" id="productAddName" name="productName">
            </div>
            <div class="form-group col-md-6">
              <label for="productAddDiscount" class="col-form-label">Discount:</label>
              <input type="text" class="form-control" id="productAddDiscount" name="productDiscount">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="productAddPrice" class="col-form-label">Price:</label>
              <input type="number" class="form-control" id="productAddPrice" name="productPrice">
            </div>
            <div class="form-group col-md-6">
              <label for="productAddOs" class="col-form-label">Operating System:</label>
              <input type="text" class="form-control" id="productAddOs" name="productOs">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="productAddRam" class="col-form-label">Ram:</label>
              <input type="text" class="form-control" id="productAddRam" name="productRam">
            </div>
            <div class="form-group col-md-6">
              <label for="productAddMonitor" class="col-form-label">Monitor:</label>
              <input type="text" class="form-control" id="productAddMonitor" name="productMonitor">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="productAddMouse" class="col-form-label">Mouse:</label>
              <input type="text" class="form-control" id="productAddMouse" name="productMouse">
            </div>
            <div class="form-group col-md-6">
              <label for="productAddStorage" class="col-form-label">Storage:</label>
              <input type="text" class="form-control" id="productAddStorage" name="productStorage">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="productAddCpu" class="col-form-label">Cpu:</label>
              <input type="text" class="form-control" id="productAddCpu" name="productCpu">
            </div>
            <div class="form-group col-md-6">
              <label for="productAddGpu" class="col-form-label">Gpu:</label>
              <input type="text" class="form-control" id="productAddGpu" name="productGpu">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="productAddPsu" class="col-form-label">Psu:</label>
              <input type="text" class="form-control" id="productAddPsu" name="productPsu">
            </div>
            <div class="form-group col-md-6">
              <label for="productAddAmount" class="col-form-label">Amount:</label>
              <input type="text" class="form-control" id="productAddAmount" name="productAmount">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="productAddDescription" class="col-form-label">Description:</label>
              <input type="text" class="form-control" id="productAddDescription" name="productDescription">
            </div>
            <div class="form-group col-md-6">
              <label for="inputState" class="col-form-label">Category:</label>
              <select id="inputState" class="form-control" name="category">
                <option value=1 selected>Windows</option>
                <option value=2>Mac</option>
                <option value=3>Linux</option>

              </select>
            </div>
          </div>

        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onclick="addProduct()">Add</button>
      </div>
    </div>
  </div>
</div>
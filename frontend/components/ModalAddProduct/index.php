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
        <form>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="productAddName" class="col-form-label">Product Name:</label>
              <input type="text" class="form-control" id="productAddName">
            </div>
            <div class="form-group col-md-6">
              <label for="productAddDiscount" class="col-form-label">Discount:</label>
              <input type="text" class="form-control" id="productAddDiscount">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="productAddPrice" class="col-form-label">Price:</label>
              <input type="number" class="form-control" id="productAddPrice">
            </div>
            <div class="form-group col-md-6">
              <label for="productAddOs" class="col-form-label">Operating System:</label>
              <input type="text" class="form-control" id="productAddOs">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="productAddRam" class="col-form-label">Ram:</label>
              <input type="text" class="form-control" id="productAddRam">
            </div>
            <div class="form-group col-md-6">
              <label for="productAddMonitor" class="col-form-label">Monitor:</label>
              <input type="text" class="form-control" id="productAddMonitor">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="productAddMouse" class="col-form-label">Mouse:</label>
              <input type="text" class="form-control" id="productAddMouse">
            </div>
            <div class="form-group col-md-6">
              <label for="productAddStorage" class="col-form-label">Storage:</label>
              <input type="text" class="form-control" id="productAddStorage">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="productAddCpu" class="col-form-label">Cpu:</label>
              <input type="text" class="form-control" id="productAddCpu">
            </div>
            <div class="form-group col-md-6">
              <label for="productAddGpu" class="col-form-label">Gpu:</label>
              <input type="text" class="form-control" id="productAddGpu">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="productAddPsu" class="col-form-label">Psu:</label>
              <input type="text" class="form-control" id="productAddPsu">
            </div>
            <div class="form-group col-md-6">
              <label for="productAddAmount" class="col-form-label">Amount:</label>
              <input type="text" class="form-control" id="productAddAmount">
            </div>
          </div>
          <div class="form-group">
            <label for="productAddDescription" class="col-form-label">Description:</label>
            <input type="text" class="form-control" id="productAddDescription">
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Add</button>
      </div>
    </div>
  </div>
</div>
<!-- user form modal -->
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#userModal" data-whatever="@mdo">Update</button>
<div class="modal fade" id="userModal" tabindex="-1" role="dialog" aria-labelledby="userModalLabel" aria-hidden="true">
    <div class="modal-dialog" style="max-width: 700px !important;" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="userModalLabel">Change User Information</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="userFistname" class="col-form-label">First Name:</label>
                            <input type="text" class="form-control" id="userFistname">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="userLastname" class="col-form-label">Last Name:</label>
                            <input type="text" class="form-control" id="userLastname">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="userEmail" class="col-form-label">Email:</label>
                            <input type="email" class="form-control" id="userEmail">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="userRole" class="col-form-label">Role:</label>
                            <input type="text" class="form-control" id="userRole">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="userAddress" class="col-form-label">Address:</label>
                        <input type="text" class="form-control" id="userAddress">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Update</button>
            </div>
        </div>
    </div>
</div>
<!-- user form modal -->
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
                <form id="update-user-information-form">
                    <input type="hidden" class="form-control" id="userId" name='userId'>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="userFistname" class="col-form-label">First Name:</label>
                            <input type="text" class="form-control" id="userFistname" name="userFistname">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="userLastname" class="col-form-label">Last Name:</label>
                            <input type="text" class="form-control" id="userLastname" name="userLastname">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="userEmail" class="col-form-label">Email:</label>
                            <input type="email" class="form-control" id="userEmail" name="userEmail">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="userRole" class="col-form-label">Role:</label>
                            <select id="inputState" class="form-control" id="userRole" name="userRole">
                            <option value=1>User</option>
                            <option value=2>Staff</option>
                            <option value=3>Admin</option>
                        </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="userAddress" class="col-form-label">Address:</label>
                        <input type="text" class="form-control" id="userAddress" name="userAddress">
                    </div>
                    <div class="form-group">
                        <label for="inputState">Status:</label>
                        <select id="inputState" class="form-control" name="isActive">
                            <option value=1>Active</option>
                            <option value=0>Unactive</option>
                        </select>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" id='btn-submit-user-update'>Update</button>
            </div>
        </div>
    </div>
</div>
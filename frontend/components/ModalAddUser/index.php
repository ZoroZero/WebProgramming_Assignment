<!-- user form modal -->
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#AddUserModal" data-whatever="@mdo">Add user</button>
<div class="modal fade" id="AddUserModal" tabindex="-1" role="dialog" aria-labelledby="AddUserModalLabel" aria-hidden="true">
  <div class="modal-dialog" style="max-width: 700px !important;" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="AddUserModalLabel">Add New User</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form class="form-register" id="register-form">
          <div class="form-row">
            <div class="form-group col-sm-12 col-md-6 my-2">
              <label for="inputFirstname">Firstname</label>
              <input id="inputFirstname" type="text" name="inputFirstname" class="form-control font-raleway" placeholder="Enter the firstname here..." autofocus>
            </div>
            <div class="form-group col-sm-12 col-md-6 my-2">
              <label for="inputLastname">Lastname</label>
              <input type="text" id="inputLastname" name="inputLastname" class="form-control font-raleway" placeholder="Enter the lastname here...">
            </div>
          </div>
          <div class="form-group">
            <label for="inputEmail">Email</label>
            <input type="email" id="inputEmail" name="inputEmail" class="form-control font-raleway" placeholder="Enter the email here...">
          </div>
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" class="form-control font-raleway" name="username" id="username" placeholder="Enter the username here...">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control font-raleway" name="password" id="password" placeholder="Input the password here...">
          </div>
          <div class="form-group">
            <label for="rePassword">Re-password</label>
            <input type="password" class="form-control font-raleway" name="rePassword" id="rePassword" placeholder="Re-enter the password here...">
          </div>
          <div class="form-group">
            <label for="inputState">User type:</label>
            <select id="inputState" class="form-control font-raleway">
              <option value='0' selected>Choose user type...</option>
              <option value='1'>Normal User</option>
              <option value='2'>Staff</option>
              <option value='2'>Admin</option>
            </select>
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
<!-- /*start admin page */ -->
<section id="admin">
    <div class="container-fluid w-75 my-5">
        <nav>
            <div class="nav nav-tabs nav-justified" id="nav-tab" role="tablist">
                <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">User Table</a>
            </div>
        </nav>
        <div class="tab-content" id="nav-tabContent">
            <div class="tab-pane fade show active py-4" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                <table class="table table-responsive-md table-hover">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Role</th>
                            <th scope="col">Email</th>
                            <th scope="col">Status</th>
                            <th scope="col">Update</th>
                        </tr>
                    </thead>
                    <tbody id="manage-user-table-body">
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                        </tr>
                    </tbody>
                </table>
                <?php include('./components/ModalUser/index.php') ?>
                <?php include('./components/ModalAddUser/index.php') ?>
            </div>
        </div>


    </div>
</section>
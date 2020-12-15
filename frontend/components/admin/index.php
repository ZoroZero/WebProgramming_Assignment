<!-- /*start admin page */ -->
<section id="admin">
    <div class="container-fluid w-75 my-5">
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
</section>
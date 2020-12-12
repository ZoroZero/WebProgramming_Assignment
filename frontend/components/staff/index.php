<!-- start staff section -->
<section id="staff">
    <div class="container-fluid w-75 my-4 d-flex flex-column justify-content-between align-items-center">
        <table class="table table-responsive-md table-hover mb-0">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Category</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Discount (%)</th>
                    <th scope="col">Quanlity Sold</th>
                    <th scope="col">Update</th>
                </tr>
            </thead>
            <tbody id="manage-product-table-body">
                <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                    <td></td>
                </tr>
            </tbody>
        </table>
        <?php include('./components/ModalProduct/index.php') ?>
        <?php include('./components/ModalAddProduct/index.php') ?>
    </div>
</section>
<!-- end staff section -->
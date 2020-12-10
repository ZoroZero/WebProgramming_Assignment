<!--start setting-->
<section id="setting" class="py-5">
    <div class="container-fluid">
        <div class="col-lg-6 col-xl-5 col-md-8 m-auto user_profile_main">
            <!-- Nav tabs -->
            <div class="user_profile_sidepanel">
                <ul class="nav nav-tabs justify-content-center" id="myTab" role="tablist">
                    <li class="nav-item">
                        <a href="#tab_general" data-toggle="tab" class="nav-link active font-raleway font-weight-bold font-size-16 side_panel_tab" role="tab" aria-controls="tab_general" aria-selected="true">
                            <i class="fas fa-users-cog fa-lg mr-2"></i>
                            Genenal
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="#tab_avatar" data-toggle="tab" class="nav-link font-raleway font-weight-bold font-size-16 side_panel_tab" role="tab" aria-controls="tab_avatar" aria-selected="false">
                            <i class="far fa-user-circle fa-lg mr-2"></i>
                            Profile image
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="#tab_password" data-toggle="tab" class="nav-link font-raleway font-weight-bold font-size-16 side_panel_tab" role="tab" aria-controls="tab_password" aria-selected="false">
                            <i class="fas fa-key fa-lg mr-2"></i>
                            Password
                        </a>
                    </li>
                </ul>
            </div>
            <!-- Tab panes -->
            <div class="tab-content profile_tab">
                <!--Tab General-->
                <div class="tab-pane active" id="tab_general">
                    <h1 class="font-baloo font-weight-bold mt-2">General</h1>
                    <form class="needs-validation" method="" action="" id="form_user_profile_general" name="form_user_profile_general" autocomplete="off">
                        <div class="profile_edit mb-3">
                            <label for="profile_username" class="font-raleway font-italic font-weight-bold">Username</label>
                            <input type="text" id="profile_username" name="profile_username" class="form-control font-rubik" placeholder="" readonly>
                            <!-- <div class="input_check"> &nbsp </div> -->
                        </div>

                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="profile_firstName" class="font-raleway font-italic font-weight-bold">First name*</label>
                                <input type="text" id="profile_firstName" name="userFistname" search="false" image-upload="false" maxlength="50" 
                                class="form-control font-rubik" placeholder="" spellcheck="false" onchange="checkDefaultValue()" required>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="profile_lastName" class="font-raleway font-italic font-weight-bold">Last name*</label>
                                <input type="text" id="profile_lastName" name="userLastname" search="false" image-upload="false" maxlength="50" 
                                class="form-control font-rubik" placeholder="" spellcheck="false" onchange="checkDefaultValue()" required>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="profile_email" class="font-raleway font-italic font-weight-bold">Email*</label>
                            <input type="email" id="profile_email" name="userEmail" search="false" image-upload="false" maxlength="50" 
                            class="form-control font-rubik" placeholder="" spellcheck="false" onchange="checkDefaultValue()" required>
                        </div>

                        <div class="form-group">
                            <label for="profile_address" class="font-raleway font-italic font-weight-bold">Address*</label>
                            <input type="text" id="profile_address" name="userAddress" search="false" image-upload="false" maxlength="200" 
                            class="form-control user_profile_input_form" placeholder="" spellcheck="false" onchange="checkDefaultValue()" required>
                        </div>
                        
                        <div>
                            <button type="submit" value="save" disabled class="btn btn-info d-block w-25 mx-auto" id="submit-info">Save</button>
                            <div class="loader" id="loader" style="display: none;"></div>
                            <div class="alert alert-success alert-dismissible fade show mt-2" style="display: none;" id="inputcheck" role="alert">
                                Success!
                                <button type="button" class="close" onclick="closeAlert('inputcheck')">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        </div>
                    </form>

                </div>

                <!--Tab Profile Image-->
                <div class="tab-pane" id="tab_avatar">
                    <h1 class="font-baloo font-weight-bold mt-2">Profile image</h1>
                    <div class="row">
                        <img src="" id="user_profile_avatar" class="avt-modal mx-auto">
                    </div>
                    <div class="row">
                        <button value="save" class="btn btn-info font-raleway font-size-16 mx-auto mt-2" data-toggle="modal" data-target="#modal_avatar">Change avatar</button>
                    </div>
                    <div class="row">
                        <div class="alert alert-danger alert-dismissible fade show mt-2 w-100" style="display: none;" id="inputcheck_upload_imgs_danger" role="alert">
                            Success!
                            <button type="button" class="close" onclick="closeAlert('inputcheck_upload_imgs_danger')">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="alert alert-success alert-dismissible fade show mt-2 w-100" style="display: none;" id="inputcheck_upload_imgs_success" role="alert">
                            Success!
                            <button type="button" class="close" onclick="closeAlert('inputcheck_upload_imgs_success')">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>
                    <div id="modal_avatar" class="modal fade" role="dialog">
                        <div class="modal-dialog">
                            <!-- Modal content-->
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title">Select an image</h4>
                                </div>
                                <div class="modal-body">
                                    <img src="" id='output' class='avt-modal mx-auto d-block'>
                                    <form id="form_user_profile_avatar" name="form_user_profile_avatar" class="user_profile_form" action="../backend/user/UploadAvatar.php" method="post" enctype="multipart/form-data">
                                        <!-- <input type="file" name="fileToUpload" class="input_imgs font-size-16 color-primary-bg text-white font-rubik" accept="image/*" id="fileToUpload" onchange="loadFile(event)"> -->
                                        <!-- <input type="submit" value="Upload Image" name="submit"> -->
                                        <!-- <div class="row">
                                                    <div class="column">
                                                        <label class="user_profile_avatar_label">
                                                        <input class="user_profile_avatar_radio" type="radio" name="profile_avatar">
                                                        <img class="user_profile_avatar_img" 
                                                        style="width:100px;height:100px;margin-bottom:5px;margin-left:10px;"/>
                                                        </label>
                                                    </div>
                                                </div> -->
                                        <div class="input-group mt-3">
                                            <div class="custom-file">
                                                <input type="file" class="custom-file-input font-size-16 font-rubik" name="fileToUpload" id="fileToUpload" accept="image/*" onchange="loadFile(event, 'output', 'imgs-label')">
                                                <label class="custom-file-label imgs-label font-size-16 font-rubik" id="imgs-label" for="fileToUpload">Choose file</label>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default" data-dismiss="modal" onclick="uploadAvatar()">Apply</button>
                                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!--Tab Change Password-->
                <div class="tab-pane" id="tab_password">
                    <!-- CALL A PHP FILE FROM AJAX TO CHECK PASSWORD-->
                    <h1 class="font-baloo font-weight-bold mt-2">Change password</h1>
                    <form id="form_user_profile_password" name="form_user_profile_password" class="needs-validation2" novalidate method="post" autocomplete="off">
                        <div class="form-group">
                            <label for="profile_Oldpassword" class="font-raleway font-italic font-weight-bold">Old</label>
                            <input type="password" id="profile_Oldpassword" name="profile_Oldpassword" onPaste="return false" onCopy="return false" search="false" maxlength="32" class="form-control font-rubik" spellcheck="false">
                        </div>

                        <div class="form-group">
                            <label for="profile_password" class="font-raleway font-italic font-weight-bold">New</label>
                            <input type="password" id="profile_password" name="newPassword" onPaste="return false" onCopy="return false" search="false" maxlength="32" class="form-control font-rubik" spellcheck="false">
                        </div>

                        <div class="form-group">
                            <label for="profile_password_re" class="font-raleway font-italic font-weight-bold">Confirm</label>
                            <input type="password" id="profile_password_re" name="newPassword_re" onPaste="return false" onCopy="return false" search="false" maxlength="32" class="form-control font-rubik" spellcheck="false">
                        </div>
                        <button value="confirm" class="btn btn-info d-block w-25 mx-auto">Confirm</button>
                        <div class="loader" id="loader2" style="display: none;"></div>
                        <div class="alert alert-success alert-dismissible fade show mt-2" style="display: none;" id="inputcheck_password" role="alert">
                            Success!
                            <button type="button" class="close" onclick="closeAlert('inputcheck_password')">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="clearfix"></div>
        </div>
</section>
<!--end setting-->
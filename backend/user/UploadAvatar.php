<?php
require_once "user.service.php";
include_once("../environments/Constants.php");
$target_dir = "../../frontend/assets/imgs/users/avatar/";
$response = array();
$uploadOk = 1;
if (isset($_POST['id'])) {
    $target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
    $target_file = $target_dir . $_POST['id'] . '.' . $imageFileType;
    // Check if image file is a actual image or fake image
    if (isset($_POST["submit"])) {
        $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
        if ($check !== false) {
            $uploadOk = 1;
        } else {
            $response['error'] = true;
            $response['message'] = 'File is not an image';
            $uploadOk = 0;
        }
    }

    // Check file size
    if ($_FILES["fileToUpload"]["size"] > 5000000) {
        $response['error'] = true;
        $response['message'] = 'File is too large';
        $uploadOk = 0;
    }

    // Allow certain file formats
    if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg") {
        $response['error'] = true;
        $response['message'] = 'File is not in correct format';
        $uploadOk = 0;
    }

    // Check if $uploadOk is set to 0 by an error
    if ($uploadOk != 0) {
        if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
            $service = new UserService();
            $service->__contruct();
            $result = $service->updateUserAvatar($_POST, $imageFileType, trim($target_file, '\.\./\.\./frontend/'));
            if ($result) {
                $response['error'] = false;
                $response['message'] = 'Success';
            } else {
                $response['error'] = true;
                $response['message'] = 'Failed';
            }
        } else {
            $response['error'] = true;
            $response['message'] = 'There was an error';
            // echo "Sorry, there was an error uploading your file.";
        }
    }
} else {
    $response['error'] = true;
    $response['message'] = 'Missing fields';
}
echo json_encode($response);

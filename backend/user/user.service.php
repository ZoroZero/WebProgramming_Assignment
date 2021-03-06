<?php
class UserService
{
    private $con;

    function __contruct()
    {
        require_once('../dbconnector/DbConnector.php');
        $db = new DbConnector();
        $this->con = $db->connect();
    }

    function createUser($params)
    {
        $fname = $params['inputFirstname'];
        $lname = $params['inputLastname'];
        $username = $params['username'];
        $email = $params['inputEmail'];
        $password = $params['password'];
        $roleId = 1;

        $hashedPass = md5($password);
        // $stmt =$this->con->prepare("INSERT INTO user(`UserName`,`HashedPassword`,`Email`,`FirstName`,`LastName`,`RoleId`) VALUES (?, ?, ?, ?, ?, ?);");
        //$stmt->bind_param("sssssi", $username, $hashedPass, $email, $fname, $lname, $roleId);
        $stmt = $this->con->prepare("CALL CreateUser(?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sssssi", $username, $hashedPass, $fname, $lname, $email, $roleId);

        if ($stmt->execute()) {
            return $stmt->get_result()->fetch_assoc();
        } else
            return -1;
    }

    // Check if user already exist in DB
    function userExist($username)
    {
        $stmt = $this->con->prepare("SELECT Id from account WHERE UserName = ? ");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $stmt->store_result();
        return $stmt->num_rows > 0;
    }

    // Check if user's email already exist in DB
    function emailExist($email)
    {
        $stmt = $this->con->prepare("SELECT Id from user WHERE Email = ? ");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->store_result();
        return $stmt->num_rows > 0;
    }


    // Login user 
    function loginUser($params)
    {
        $hashedPass = md5($params["inputPassword"]);
        $stmt = $this->con->prepare("CALL LoginUser(?, ?)");
        $stmt->bind_param("ss", $params['inputUsername'], $hashedPass);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }


    // Get user information
    function getUserInformation($userId)
    {
        $convert_userId = (int)$userId;
        $stmt = $this->con->prepare("CALL GetUserInformation(?) ");
        $stmt->bind_param("i", $convert_userId);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

    // Get user information
    function updateUserInformation($params)
    {
        $convert_userId = (int)$params["userId"];
        $fname = $params["userFistname"];
        $lname = $params["userLastname"];
        $email = $params["userEmail"];
        $address = $params["userAddress"];
        $stmt = $this->con->prepare("CALL UpdateUserInformation(?, ?, ?, ?, ?)");
        $stmt->bind_param("issss", $convert_userId, $fname, $lname, $email, $address);
        if ($stmt->execute()) {
            return true;
        } else
            return false;
    }

    // Update user password
    function updateUserPassword($params)
    {
        $convert_userId = (int)$params["id"];
        $newPassword = $params['profile_password'];
        $newHashedPass = md5($newPassword);
        $stmt = $this->con->prepare("CALL UpdateUserPassword(?, ?)");
        $stmt->bind_param("is", $convert_userId, $newHashedPass);
        if ($stmt->execute()) {
            return true;
        } else
            return false;
    }

    // Update user avatar
    function updateUserAvatar($params, $newFileType, $newFilePath)
    {
        $convert_userId = (int)$params["id"];
        $fileName = $params["id"];
        $stmt = $this->con->prepare("CALL UpdateAvatar(?, ?, ?, ?)");
        $stmt->bind_param("isss", $convert_userId, $fileName, $newFileType, $newFilePath);
        if ($stmt->execute()) {
            return true;
        } else
            return false;
    }


    function getAllUser()
    {
        $stmt = $this->con->prepare("CALL GetAllUser()");
        $stmt->execute();
        return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }


    function adminUpdateUserInformation($params)
    {
        $convert_userId = (int)$params["userId"];
        $fname = $params["userFistname"];
        $lname = $params["userLastname"];
        $email = $params["userEmail"];
        $address = $params["userAddress"];
        $isActive = (int)$params["isActive"];
        $updatedBy = (int)$params["updatedBy"];
        $roleId = (int)$params["userRole"];
        $stmt = $this->con->prepare("CALL AdminUpdateUserInformation(?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("issssiii", $convert_userId, $fname, $lname, $email, $address, $isActive, $roleId, $updatedBy);
        if ($stmt->execute()) {
            return true;
        } else
            return false;
    }


    function addNewUser($params)
    {
        $fname = $params["userFistname"];
        $lname = $params["userLastname"];
        $email = $params["userEmail"];
        $username = $params["username"];
        $password = $params["password"];
        $updatedBy = (int)$params['updatedBy'];
        $roleId = (int)$params['userRole'];
        $hashedPass = md5($password);

        $stmt = $this->con->prepare("CALL AddNewUser(?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sssssii", $username, $hashedPass, $fname, $lname, $email, $roleId, $updatedBy);

        if ($stmt->execute()) {
            return $stmt->get_result()->fetch_assoc();
        } else
            return -1;
    }
}

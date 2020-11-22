<?php
    class UserService{
        private $con;

        function __contruct(){
            require_once('../dbconnector/DbConnector.php');

            $db = new DbConnector();

            $this->con = $db->connect();
        }

        function createUser($params){
            $fname = $params['fName'];
            $lname = $params['lName'];
            $username = $params['username']; 
            $email = $params['email']; 
            $password = $params['password'];
            $roleId = 1;

            $hashedPass = md5($password);
            // $stmt =$this->con->prepare("INSERT INTO user(`UserName`,`HashedPassword`,`Email`,`FirstName`,`LastName`,`RoleId`) VALUES (?, ?, ?, ?, ?, ?);");
            //$stmt->bind_param("sssssi", $username, $hashedPass, $email, $fname, $lname, $roleId);
            $stmt =$this->con->prepare("CALL CreateUser(?, ?, ?, ?, ?, ?)");
            $stmt->bind_param("sssssi", $username, $hashedPass, $fname, $lname, $email, $roleId);

            if($stmt->execute()){
                return $stmt->get_result()->fetch_assoc();
            }
            else
                return -1;
        }

        // Check if user already exist in DB
        function userExist($username){
            $stmt =$this->con->prepare("SELECT Id from account WHERE UserName = ? ");
            $stmt->bind_param("s", $username);
            $stmt->execute();
            $stmt->store_result();
            return $stmt->num_rows > 0;
        }


        // Login user 
        function loginUser($params){
            $hashedPass = md5($params["password"]);
            $stmt =$this->con->prepare("CALL LoginUser(?, ?)");
            $stmt->bind_param("ss", $params['username'], $hashedPass);
            $stmt->execute();
            return $stmt->get_result()->fetch_assoc();
        }


        // Get user information
        function getUserInformation($userId){
            $convert_userId = (int)$userId;
            $stmt = $this->con->prepare("SELECT * from user WHERE Id = ? ");
            $stmt->bind_param("i", $convert_userId);
            $stmt->execute();
            return $stmt->get_result()->fetch_assoc();
        }

        // Get user information
        function updateUserInformation($params){
            $convert_userId = (int)$params["id"];
            $fname = $params["firstName"];
            $lname = $params["lastName"];
            $email = $params["email"];
            $address = $params["address"];
            $isActive = isset($params["IsActive"])? int($params["IsActive"]): 1;
            $stmt = $this->con->prepare("CALL UpdateUserInformation(?, ?, ?, ?, ?, ?)");
            $stmt->bind_param("issssi", $convert_userId, $fname, $lname, $email, $address, $isActive);
            if($stmt->execute()){
                return true;
            }
            else
                return false;
        }
    }
?>
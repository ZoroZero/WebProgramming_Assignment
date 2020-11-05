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
            if($this->userExist($username)){
                return 0;
            }
            else{
                $hashedPass = md5($password);
                $stmt =$this->con->prepare("INSERT INTO user(`UserName`,`HashedPassword`,`Email`,`FirstName`,`LastName`,`RoleId`) VALUES (?, ?, ?, ?, ?, ?);");
                $stmt->bind_param("sssssi", $username, $hashedPass, $email, $fname, $lname, $roleId);

                if($stmt->execute()){
                    return 1;
                }
                else
                    return 2;
            }
        }

        // Check if user already exist in DB
        private function userExist($username){
            $stmt =$this->con->prepare("SELECT Id from user WHERE UserName = ? ");
            $stmt->bind_param("s", $username);
            $stmt->execute();
            $stmt->store_result();
            return $stmt->num_rows > 0;
        }
    }
?>
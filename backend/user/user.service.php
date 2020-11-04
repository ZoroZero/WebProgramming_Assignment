<?php
    class UserService{
        private $con;

        function __contruct(){
            require_once('../dbconnector/DbConnector.php');

            $db = new DbConnector();

            $this->con = $db->connect();
        }

        function createUser($fname, $lname, $username, $email, $password){
            if(accountExist($username)){
                return false;
            }
            else{
                $stmt =$this->con->prepare("SELECT user_ID from user WHERE username = ? AND password = ?");
                $stmt->bind_param("ss", $username, $pass);
            }
        }

        function getUserById($userId){

        }

        function createAccount($$username, $password, $userId){
            $stmt =$this->con->prepare("SELECT user_ID from user WHERE username = ? ");
            $stmt->bind_param("s", $username);
            $stmt->execute();
            $stmt->store_result();
            return $stmt->num_rows > 0;
        }

        // Check if user already exist in DB
        private function accountExist($username){
            $stmt =$this->con->prepare("SELECT user_ID from account WHERE username = ? ");
            $stmt->bind_param("s", $username);
            $stmt->execute();
            $stmt->store_result();
            return $stmt->num_rows > 0;
        }
    }
?>
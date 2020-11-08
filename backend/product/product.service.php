<?php
    class ProductService{
        private $con;

        function __contruct(){
            require_once('../dbconnector/DbConnector.php');

            $db = new DbConnector();

            $this->con = $db->connect();
        }

        function getAllProduct(){
            $stmt =$this->con->prepare("CALL GetAllProduct()");
            $stmt->execute();
            return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        }
    }

?>
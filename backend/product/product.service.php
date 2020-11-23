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

        // Get top sales products
        function getTopSales(){
            $stmt =$this->con->prepare("CALL GetTopSaleProducts()");
            $stmt->execute();
            return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        }

        // Get special price products
        function getSpecialPriceProducts(){
            $stmt =$this->con->prepare("CALL GetSpecialPriceProducts()");
            $stmt->execute();
            return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
        }
    }

?>
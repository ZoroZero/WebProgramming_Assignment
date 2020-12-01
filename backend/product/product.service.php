<?php
class ProductService
{
    private $con;

    function __contruct()
    {
        require_once('../dbconnector/DbConnector.php');

        $db = new DbConnector();

        $this->con = $db->connect();
    }

    function getAllProduct()
    {
        $stmt = $this->con->prepare("CALL GetAllProduct()");
        $stmt->execute();
        return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }

    // Get top sales products
    function getTopSales()
    {
        $stmt = $this->con->prepare("CALL GetTopSaleProducts()");
        $stmt->execute();
        return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }
    // Get products in a cart
    function getCartProducts($productIdList)
    {
        $stmt = $this->con->prepare("CALL GetCartProducts(?)");
        $stmt->bind_param("s", $productIdList);
        $stmt->execute();
        return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }

    function buyProducts($params)
    {
        $userId = $params['userId'];
        $buyList = $params['buyList'];
        $buyProducts = join(',', array_map(function ($element) {
            return strval($element['id']);
        }, $buyList));
        $buyAmounts = join(',', array_map(function ($element) {
            return $element['buyAmount'];
        }, $buyList));
        $stmt = $this->con->prepare("CALL UpdateMultipleProducts(?, ?)");
        $stmt->bind_param("ss", $buyProducts, $buyAmounts);
        $stmt->execute();
        return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }

    // Get special price products
    function getSpecialPriceProducts()
    {
        $stmt = $this->con->prepare("CALL GetSpecialPriceProducts()");
        $stmt->execute();
        return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }

    function getProductByProductId($productId)
    {
        $convert_Id = (int)$productId;
        $stmt = $this->con->prepare("CALL GetProductByProductId(?)");
        $stmt->bind_param("i", $convert_Id);
        $stmt->execute();
        return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }
}

  
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

    // Add new product
    function addNewProduct($params, $imageFileName, $imageType, $imageFilePath)
    {
        $userId = (int)$params['userId'];
        $category = (int)$params['category'];
        $productName = $params['productAddName'];
        $productDescription = $params['productAddDescription'];
        $productPrice = (int)$params['productAddPrice'];
        $productOs = $params['productAddOs'];
        $productRam = $params['productAddRam'];
        $productMonitor = $params['productAddMonitor'];
        $productMouse = $params['productAddMouse'];
        $productStorage = $params['productAddStorage'];
        $productGpu = $params['productAddGpu'];
        $productCpu = $params['productAddCpu'];
        $productPsu = $params['productAddPsu'];
        $productAmount = (int)$params['productAddAmount'];
        $productDiscount = (int)$params['productAddDiscount'];
        $productQuantitySold = 0;

        $stmt = $this->con->prepare("CALL AddNewProduct(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param(
            "iississssssssiisss",
            $userId,
            $category,
            $productName,
            $productDescription,
            $productPrice,
            $productOs,
            $productRam,
            $productMonitor,
            $productMouse,
            $productStorage,
            $productGpu,
            $productCpu,
            $productPsu,
            $productAmount,
            $productDiscount,
            $imageFileName,
            $imageType,
            $imageFilePath
        );
        if ($stmt->execute()) {
            return true;
        } else
            return false;
    }

    // Update product information
    function updateProductInformation($params)
    {
        $userId = (int)$params['userId'];
        $productId = (int)$params['productId'];
        $productName = $params['productName'];
        $productDescription = $params['productDescription'];
        $productPrice = (int)$params['productPrice'];
        $productOs = $params['productOs'];
        $productRam = $params['productRam'];
        $productMonitor = $params['productMonitor'];
        $productMouse = $params['productMouse'];
        $productStorage = $params['productStorage'];
        $productGpu = $params['productGpu'];
        $productCpu = $params['productCpu'];
        $productPsu = $params['productPsu'];
        $productAmount = (int)$params['productAmount'];
        $productDiscount = (int)$params['productDiscount'];
        $productQuantitySold = (int)$params['productQuantitySold'];
        $isDeleted = (int)$params['inputState'];

        $stmt = $this->con->prepare("CALL UpdateProductInformation(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param(
            "iississssssssiiii",
            $userId,
            $productId,
            $productName,
            $productDescription,
            $productPrice,
            $productOs,
            $productRam,
            $productMonitor,
            $productMouse,
            $productStorage,
            $productGpu,
            $productCpu,
            $productPsu,
            $productAmount,
            $productDiscount,
            $productQuantitySold,
            $isDeleted
        );
        $stmt->execute();
        return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }

    // Update product image
    function updateProductImage($params, $fileName, $newFileType, $newFilePath)
    {
        $convert_userId = (int)$params["userId"];
        $convert_productId = (int)$params["productId"];
        $stmt = $this->con->prepare("CALL UpdateProductImage(?, ?, ?, ?, ?)");
        $stmt->bind_param("iisss", $convert_userId, $convert_productId, $fileName, $newFileType, $newFilePath);
        if ($stmt->execute()) {
            return true;
        } else
            return false;
    }

    function getActiveProduct()
    {
        $stmt = $this->con->prepare("CALL GetActiveProduct()");
        $stmt->execute();
        return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }

    function searchProduct($keyword)
    {
        $stmt = $this->con->prepare("CALL SearchProduct(?)");
        $stmt->bind_param("s", $keyword);
        $stmt->execute();
        return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }
}

?>
-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 14, 2020 at 03:19 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pc`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `AddNewProduct` (IN `iUserId` INT, IN `iCategory` INT, IN `iProductName` VARCHAR(100), IN `iProductDescription` VARCHAR(200), IN `iProductPrice` INT, IN `iProductOs` VARCHAR(100), IN `iProductRam` VARCHAR(50), IN `iProductMonitor` VARCHAR(50), IN `iProductMouse` VARCHAR(50), IN `iProductStorage` VARCHAR(50), IN `iProductGpu` VARCHAR(50), IN `iProductCpu` VARCHAR(50), IN `iProductPsu` VARCHAR(50), IN `iProductAmount` INT, IN `iProductDiscount` INT, IN `iNewFileName` VARCHAR(50), IN `iNewFileExtension` VARCHAR(10), IN `iNewFilePath` VARCHAR(100))  NO SQL
BEGIN
	START TRANSACTION;
    INSERT INTO fileinstance(`Name`,`Extension`,`Path`, `FileType`) 
    VALUES(iNewFileName, iNewFileExtension, iNewFilePath, 1);
    
    SELECT LAST_INSERT_ID() INTO @FileId;
    INSERT INTO `product`(
        `CategoryId`, 
        `ImageFile`, 
        `Name`, 
        `Description`, 
        `Price`, 
        `Os`, 
        `Ram`, 
        `Monitor`, 
        `Mouse`, 
        `Storage`, 
        `Cpu`, 
        `Gpu`, 
        `Psu`, 
        `Amount`, 
        `UpdatedDate`, 
        `UpdatedBy`, 
        `IsDeleted`, 
        `Discount`, 
        `QuantitySold`)
        VALUES (
            1,
            @FileId,
            iProductName,
            iProductDescription,
            iProductPrice,
            iProductOs,
            iProductRam,
            iProductMonitor,
            iProductMouse,
            iProductStorage,
            iProductGpu,
            iProductCpu,
            iProductPsu,
            iProductAmount,
           	CURRENT_DATE(),
            iUserId,
            0,
            iProductDiscount,
            0
        );
    COMMIT;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `AddNewUser` (IN `iUserName` VARCHAR(20), IN `iHashedPassword` VARCHAR(256), IN `iFirstName` VARCHAR(50), IN `iLastName` VARCHAR(50), IN `iEmail` VARCHAR(100), IN `iRoleId` INT, IN `iUpdatedBy` INT)  NO SQL
BEGIN
	START TRANSACTION;
	INSERT INTO `user`(`FirstName`, `LastName`, `Email`, `RoleId`, `UpdatedBy`, `UpdatedDate`) 
    VALUES (iFirstName, iLastName, iEmail, iRoleId, iUpdatedBy, curdate());
    SELECT LAST_INSERT_ID() INTO @Id;
    
    INSERT INTO `account`(`UserName`, `HashedPassword`, `UserId`)
    VALUES (iUserName, iHashedPassword, @Id);
    SELECT @Id ;
    COMMIT;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `AdminUpdateUserInformation` (IN `iUserId` INT, IN `iFirstName` VARCHAR(50), IN `iLastName` VARCHAR(50), IN `iEmail` VARCHAR(50), IN `iAddress` VARCHAR(100), IN `iActive` BOOLEAN, IN `iRoleId` INT, IN `iUpdatedBy` INT)  NO SQL
BEGIN
    start transaction;
	UPDATE user SET
    	FirstName = iFirstName,
        LastName = iLastName,
        Email = iEmail,
        Address = iAddress,
        UpdatedBy = iUpdatedBy,
        UpdatedDate = curdate(),
        IsActive = iActive,
        RoleId = iRoleId
    WHERE Id = iUserId;
    COMMIT;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `CreateUser` (IN `iUserName` VARCHAR(20), IN `iPassword` VARCHAR(256), IN `iFirstName` VARCHAR(50), IN `iLastName` VARCHAR(50), IN `iEmail` VARCHAR(50), IN `iRoleId` INT)  NO SQL
BEGIN
	INSERT INTO `user`(`FirstName`, `LastName`, `Email`, `RoleId`) 
    VALUES (iFirstName, iLastName, iEmail, iRoleId);
    SELECT LAST_INSERT_ID() INTO @Id;
    
    INSERT INTO `account`(`UserName`, `HashedPassword`, `UserId`)
    VALUES (iUserName, iPassword, @Id);
    SELECT @Id AS Id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetActiveProduct` ()  NO SQL
BEGIN
	SELECT 	p.*,
    		file.Path 
    FROM product p JOIN fileinstance file 
    ON p.ImageFile = file.Id
    WHERE !p.IsDeleted;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetAllProduct` ()  NO SQL
BEGIN
	SELECT 	p.*,
    		file.Path 
    FROM product p JOIN fileinstance file 
    ON p.ImageFile = file.Id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetAllUser` ()  NO SQL
BEGIN 
	SELECT Id, FirstName, LastName, RoleId, Email, Address, IsActive
    FROM user;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetCartProducts` (IN `iProductIdList` VARCHAR(100))  NO SQL
BEGIN 
	
    CALL SplitString(iProductIdList, ',');
	SELECT 	p.Id,
    		p.CategoryId,
            p.Name,
            p.Description,
            p.Price,
            p.Amount,
            1 as BuyAmount,
    		file.Path 
    FROM (product p JOIN fileinstance file 
    ON p.ImageFile = file.Id) JOIN
  	items ON items.item = p.Id
    WHERE !p.IsDeleted;
    
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetProductByProductId` (IN `iProductId` INT)  NO SQL
BEGIN
	SELECT 	p.*,
    		file.Path 
    FROM product p JOIN fileinstance file 
    ON p.ImageFile = file.Id 
    WHERE p.Id = iProductId;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetSpecialPriceProducts` ()  NO SQL
BEGIN
	SELECT 	p.Id,
    		p.CategoryId,
            p.Name,
            p.Description,
            p.Price,
            p.Amount,
    		file.Path 
    FROM product p JOIN fileinstance file 
    ON p.ImageFile = file.Id 
    WHERE p.Discount > 0 AND !p.IsDeleted
    ORDER BY p.Discount
    LIMIT 15;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetTopSaleProducts` ()  NO SQL
BEGIN
	SELECT 	p.Id,
    		p.CategoryId,
            p.Name,
            p.Description,
            p.Price,
            p.Amount,
    		file.Path 
    FROM product p JOIN fileinstance file 
    ON p.ImageFile = file.Id 
    WHERE !p.IsDeleted
    ORDER BY p.QuantitySold
    LIMIT 7; 
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetUserInformation` (IN `iUserId` INT)  NO SQL
BEGIN 
	
	SELECT 
    	user_infor.FirstName, 
    	user_infor.LastName, 
        user_infor.Email, 
        user_infor.Address, 
        user_infor.UserName, 
        user_infor.Avatar, 
        user_infor.IsActive,
        user_infor.RoleId,
        file.Path, 
        user_infor.HashedPassword
    FROM 
    	(SELECT u.FirstName, 
    	u.LastName, 
        u.Email, 
        u.Address,
        u.RoleId,
        u.IsActive,
        a.UserName, 
        u.Avatar, 
        a.HashedPassword
        FROM `user`u JOIN `account` a ON u.Id = a.UserId 					WHERE u.Id = iUserId AND u.IsActive) user_infor 
    	LEFT JOIN fileinstance file on user_infor.Avatar = file.Id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `LoginUser` (IN `iUserName` VARCHAR(20), IN `iHashedPassword` VARCHAR(256))  NO SQL
BEGIN
	SELECT u.Id, u.roleId 
    FROM user u JOIN account a ON u.Id = a.UserId
    WHERE a.Username = iUserName AND a.HashedPassword = 		iHashedPassword AND u.IsActive;
    
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SearchProduct` (IN `iKeyword` VARCHAR(20))  NO SQL
BEGIN
	SELECT Id, Name
    FROM product
    WHERE Name LIKE CONCAT (iKeyword, '%');
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `SplitString` (IN `inputstr` VARCHAR(100), IN `iDelimiter` CHAR)  NO SQL
BEGIN 
    
    CREATE TEMPORARY TABLE Items(item VARCHAR(50)); 
    WHILE LOCATE(iDelimiter,inputstr) > 1 DO
    INSERT INTO Items SELECT SUBSTRING_INDEX(inputstr,iDelimiter,1);
    SET inputstr = REPLACE (inputstr, (SELECT LEFT(inputstr,LOCATE(iDelimiter,inputstr))),'');
    END WHILE;
    INSERT INTO Items(item) VALUES(inputstr);
    
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateAvatar` (IN `iUserId` INT, IN `iNewFileName` VARCHAR(50), IN `iNewFileExtension` VARCHAR(50), IN `iNewFilePath` VARCHAR(100))  NO SQL
BEGIN
	START TRANSACTION;
    INSERT INTO fileinstance(`Name`,`Extension`,`Path`, `FileType`) 
    VALUES(iNewFileName, iNewFileExtension, iNewFilePath, 0);
    
    SELECT LAST_INSERT_ID() INTO @AvatarId;
    UPDATE user 
    SET Avatar = @AvatarId,
    	UpdatedBy = iUserId,
        UpdatedDate = CURRENT_TIME()
    WHERE Id = iUserId;
    COMMIT;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateMultipleProducts` (IN `iProductIdList` VARCHAR(100), IN `iBuyAmountList` VARCHAR(100))  NO SQL
BEGIN
    CREATE TEMPORARY TABLE Items(item int NOT NULL AUTO_INCREMENT PRIMARY KEY, amount VARCHAR(50)); 
    CREATE TEMPORARY TABLE Items1(item int NOT NULL AUTO_INCREMENT PRIMARY KEY, amount VARCHAR(50)); 
    CREATE TEMPORARY TABLE Items2(item int, amount int); 

    WHILE LOCATE(',',iProductIdList) > 1 DO
    INSERT INTO Items(amount) SELECT SUBSTRING_INDEX(iProductIdList,',',1);
    SET iProductIdList = REPLACE (iProductIdList, (SELECT LEFT(iProductIdList,LOCATE(',',iProductIdList))),'');
    END WHILE;
    INSERT INTO Items(amount) VALUES(iProductIdList);

   	WHILE LOCATE(',',iBuyAmountList) > 1 DO
    INSERT INTO Items1(amount) SELECT SUBSTRING_INDEX(iBuyAmountList,',',1); 
    SET iBuyAmountList = REPLACE (iBuyAmountList, (SELECT LEFT(iBuyAmountList,LOCATE(',',iBuyAmountList))),'');
    END WHILE;
    INSERT INTO Items1(amount) VALUES(iBuyAmountList);
    
	INSERT INTO Items2(item, amount) SELECT Items.amount as Id, Items1.amount as Amount FROM Items JOIN Items1 ON Items.item = Items1.item ;

    START TRANSACTION;
   	UPDATE product
    inner join Items2 on product.Id= Items2.item
    SET product.Amount = product.Amount - Items2.amount,
    	product.QuantitySold = product.QuantitySold + Items2.amount;
    COMMIT;
    SELECT 1 as Result;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateProductImage` (IN `iUserId` INT, IN `iProductId` INT, IN `iFileName` VARCHAR(50), IN `iFileExtension` VARCHAR(10), IN `iFilePath` VARCHAR(100))  NO SQL
BEGIN
	START TRANSACTION;
    INSERT INTO fileinstance(`Name`,`Extension`,`Path`, `FileType`) 
    VALUES(iFileName, iFileExtension, iFilePath, 1);
    
    SELECT LAST_INSERT_ID() INTO @AvatarId;
    UPDATE product 
    SET ImageFile = @AvatarId,
    	UpdatedBy = iUserId,
        UpdatedDate = CURRENT_TIME()
    WHERE Id = iProductId;
    COMMIT;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateProductInformation` (IN `iUserId` INT, IN `iProductId` INT, IN `iName` VARCHAR(100), IN `iDescription` VARCHAR(200), IN `iPrice` INT, IN `iOs` VARCHAR(100), IN `iRam` VARCHAR(100), IN `iMonitor` VARCHAR(100), IN `iMouse` VARCHAR(100), IN `iStorage` VARCHAR(100), IN `iGpu` VARCHAR(100), IN `iCpu` VARCHAR(100), IN `iPsu` VARCHAR(100), IN `iAmount` INT, IN `iDiscount` INT, IN `iQuantitySold` INT, IN `iIsDeleted` BIT)  NO SQL
BEGIN 
	UPDATE product 
    SET Name = iName,
    	Description = iDescription,
        Price = iPrice,
        Os = iOs,
        Ram = iRam,
        Monitor = iMonitor,
        Mouse = iMouse,
        Storage = iStorage,
        Gpu = iGpu,
        Cpu = iCpu,
        Psu = iPsu,
        Amount = iAmount, 
        Discount = iDiscount,
        QuantitySold = iQuantitySold,
        IsDeleted = iIsDeleted,
        UpdatedBy = iUserId,
        UpdatedDate = curdate()
        WHERE Id = iProductId;
       
        SELECT 1 AS Result;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateUserInformation` (IN `iUserId` INT, IN `iFirstName` VARCHAR(50), IN `iLastName` VARCHAR(50), IN `iEmail` VARCHAR(100), IN `iAddress` VARCHAR(100))  NO SQL
BEGIN
    start transaction;
	UPDATE user SET
    	FirstName = iFirstName,
        LastName = iLastName,
        Email = iEmail,
        Address = iAddress,
        UpdatedBy = iUserId,
        UpdatedDate = curdate()
    WHERE Id = iUserId;
    COMMIT;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateUserPassword` (IN `iUserId` INT, IN `iHashedPassword` VARCHAR(256))  NO SQL
BEGIN
	START TRANSACTION;
        UPDATE account 
        SET HashedPassword = iHashedPassword
        WHERE UserId = iUserId;
        
        UPDATE user
        SET UpdatedBy = iUserId,
        	UpdatedDate = curdate()
        WHERE Id = iUserId;
	COMMIT;
END$$

--
-- Functions
--
CREATE DEFINER=`root`@`localhost` FUNCTION `SPLIT_STRING` (`delim` VARCHAR(12), `str` VARCHAR(255), `pos` INT) RETURNS VARCHAR(255) CHARSET utf8mb4 RETURN
    REPLACE(
        SUBSTRING(
            SUBSTRING_INDEX(str, delim, pos),
            LENGTH(SUBSTRING_INDEX(str, delim, pos-1)) + 1
        ),
        delim, ''
    )$$

CREATE DEFINER=`root`@`localhost` FUNCTION `split_string_into_rows` (`split_string_into_rows` BLOB) RETURNS BLOB NO SQL
    DETERMINISTIC
RETURN IF(split_string_into_rows IS NULL, IFNULL(@split_string_into_rows,""), "1"|@split_string_into_rows:=split_string_into_rows)$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `Id` int(11) NOT NULL,
  `Username` varchar(50) NOT NULL,
  `HashedPassword` varchar(256) NOT NULL,
  `UserId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`Id`, `Username`, `HashedPassword`, `UserId`) VALUES
(14, 'dung1234', '953c7473ab875044cddef4440cce3a4d', 25),
(15, 'tri123456', '139b088e71b3226eeb4db1812d3981f5', 26),
(16, 'an123456', '191b07a7d7e78f29744cc0ad884cfea8', 27),
(17, 'duy123456', 'd18e1c723c8049dbe9eed6978a5b1258', 28),
(18, 'dat123456', 'f33d26ca9f2ea8a96f45a0170b13ff5c', 29),
(19, 'dung123456', '3a88fb64780cd8b317ca73890a448592', 30);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `Id` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`Id`, `Name`) VALUES
(1, 'Window'),
(2, 'Mac'),
(3, 'Linux');

-- --------------------------------------------------------

--
-- Table structure for table `fileinstance`
--

CREATE TABLE `fileinstance` (
  `Id` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Extension` varchar(10) NOT NULL,
  `Path` varchar(100) NOT NULL,
  `FileType` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `fileinstance`
--

INSERT INTO `fileinstance` (`Id`, `Name`, `Extension`, `Path`, `FileType`) VALUES
(4, 'pc1', 'png', 'assets/imgs/homepage/windows/product1.png', 1),
(5, '1', 'png', 'assets/imgs/users/avatar/1.png', 0),
(6, '5', 'jpg', '../../frontend/assets/imgs/users/avatar/5.jpg', 0),
(7, '5', 'jpg', 'assets/imgs/users/avatar/5.jpg', 0),
(8, '5', 'jpg', 'assets/imgs/users/avatar/5.jpg', 0),
(9, '5', 'jpg', 'assets/imgs/users/avatar/5.jpg', 0),
(10, '5', 'jpg', 'assets/imgs/users/avatar/5.jpg', 0),
(11, '5', 'jpg', 'assets/imgs/users/avatar/5.jpg', 0),
(12, '5', 'jpg', 'assets/imgs/users/avatar/5.jpg', 0),
(13, '5', 'gif', 'assets/imgs/users/avatar/5.gi', 0),
(14, '5', 'png', 'assets/imgs/users/avatar/5.png', 0),
(15, '5', 'png', 'assets/imgs/users/avatar/5.png', 0),
(16, '5', 'png', 'assets/imgs/users/avatar/5.png', 0),
(17, 'product2', 'png', 'assets/imgs/homepage/windows/product2.png', 1),
(18, 'product3', 'png', 'assets/imgs/homepage/windows/product3.png', 1),
(19, 'product4', 'png', 'assets/imgs/homepage/windows/product4.png', 1),
(20, 'product5', 'png', 'assets/imgs/homepage/windows/product5.png', 1),
(21, '5', 'png', 'assets/imgs/users/avatar/5.png', 0),
(22, '5', 'png', 'assets/imgs/users/avatar/5.png', 0),
(23, '5', 'png', 'assets/imgs/users/avatar/5.png', 0),
(24, '5', 'png', 'assets/imgs/users/avatar/5.png', 0),
(25, '5', 'png', 'assets/imgs/users/avatar/5.png', 0),
(26, '5', 'png', 'assets/imgs/users/avatar/5.png', 0),
(27, '7', 'png', 'assets/imgs/users/avatar/7.png', 0),
(28, '8', 'png', 'assets/imgs/users/avatar/8.png', 0),
(29, '8', 'png', 'assets/imgs/users/avatar/8.png', 0),
(30, '8', 'png', 'assets/imgs/users/avatar/8.png', 0),
(31, '8', 'png', 'assets/imgs/users/avatar/8.png', 0),
(32, '8', 'png', 'assets/imgs/users/avatar/8.png', 0),
(33, '8', 'png', 'assets/imgs/users/avatar/8.png', 0),
(34, '8', 'png', 'assets/imgs/users/avatar/8.png', 0),
(35, '1', 'png', 'assets/imgs/product/1.png', 1),
(36, 'product-5fcebbbe3fb96', 'png', 'assets/imgs/product/product-5fcebbbe3fb96.png', 1),
(37, 'product-5fcf53a2dd8d3', 'png', 'assets/imgs/product/product-5fcf53a2dd8d3.png', 1),
(38, 'product-5fcf58d435529', 'png', 'assets/imgs/product/product-5fcf58d435529.png', 1),
(39, 'product-5fcf59c174eac', 'png', 'assets/imgs/product/product-5fcf59c174eac.png', 1),
(40, 'product-5fcf59ef9c436', 'png', 'assets/imgs/product/product-5fcf59ef9c436.png', 1),
(41, 'product-5fcf5ac330801', 'png', 'assets/imgs/product/product-5fcf5ac330801.png', 1),
(42, 'product-5fcf5acca3663', 'png', 'assets/imgs/product/product-5fcf5acca3663.png', 1),
(43, 'product-5fcf75a168a5b', 'png', 'assets/imgs/product/product-5fcf75a168a5b.png', 1),
(44, 'product-5fcf75a7b52fd', 'png', 'assets/imgs/product/product-5fcf75a7b52fd.png', 1),
(45, 'product-5fcf75ba0403a', 'png', 'assets/imgs/product/product-5fcf75ba0403a.png', 1),
(46, '8', 'png', 'assets/imgs/users/avatar/8.png', 0),
(47, 'product-5fd0c15ab02d4', 'png', 'assets/imgs/product/product-5fd0c15ab02d4.png', 1),
(48, 'product-5fd0c2feac088', 'png', 'assets/imgs/product/product-5fd0c2feac088.png', 1);

-- --------------------------------------------------------

--
-- Table structure for table `orderproduct`
--

CREATE TABLE `orderproduct` (
  `OrderId` int(11) NOT NULL,
  `ProductId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `Id` int(11) NOT NULL,
  `PaymentId` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  `Total` float NOT NULL,
  `IsDeleted` tinyint(1) NOT NULL DEFAULT 1,
  `UpdatedBy` int(11) DEFAULT NULL,
  `UpdatedDate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `paymentmethod`
--

CREATE TABLE `paymentmethod` (
  `Id` int(11) NOT NULL,
  `Type` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `Id` int(11) NOT NULL,
  `CategoryId` int(11) NOT NULL,
  `ImageFile` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Description` longtext NOT NULL,
  `Price` float NOT NULL,
  `Os` varchar(20) NOT NULL,
  `Ram` varchar(100) NOT NULL,
  `Monitor` varchar(100) NOT NULL,
  `Mouse` varchar(100) NOT NULL,
  `Storage` varchar(100) NOT NULL,
  `Cpu` varchar(100) NOT NULL,
  `Gpu` varchar(100) NOT NULL,
  `Psu` varchar(30) NOT NULL,
  `Amount` int(11) NOT NULL,
  `UpdatedDate` datetime DEFAULT NULL,
  `UpdatedBy` int(11) DEFAULT NULL,
  `IsDeleted` tinyint(1) NOT NULL DEFAULT 1,
  `Discount` int(11) NOT NULL,
  `QuantitySold` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`Id`, `CategoryId`, `ImageFile`, `Name`, `Description`, `Price`, `Os`, `Ram`, `Monitor`, `Mouse`, `Storage`, `Cpu`, `Gpu`, `Psu`, `Amount`, `UpdatedDate`, `UpdatedBy`, `IsDeleted`, `Discount`, `QuantitySold`) VALUES
(1, 1, 4, 'PC HP 280 Pro G5 Microtower ', 'PC HP 280 Pro G5 Microtower (9GD36PA) (i5-9400/4GB/1TB HDD/UHD 630/Free DOS)', 11890000, 'Windows', '1 x 4GB DDR4 2666MHz ( 2 Khe cắm Hỗ trợ tối đa 32GB )', 'Màn hình Acer 21.5\" HA220QA (1920 x 1080/IPS/86Hz/4 ms)', 'Chuột máy tính gaming Logitech G Pro Hero (910-005442)', '1TB HDD 7200RPM', 'Intel Core i5-9400 ( 2.90 GHz - 4.10 GHz / 9MB / 6 nhân, 6 luồng )', ' Intel UHD Graphics 630', '', 1, '2020-12-14 20:59:07', 30, 0, 5, 0),
(2, 1, 4, 'PC HP 280 Pro G5 Microtower ', 'PC HP 280 Pro G5 Microtower (9MS50PA) (i5-9400/8GB/1TB HDD/UHD 630/Free DOS)', 12490000, 'Linux', '1 x 8GB DDR4 2666MHz ( 2 Khe cắm Hỗ trợ tối đa 32GB )', 'Màn hình Acer 21.5\" HA220QA (1920 x 1080/IPS/86Hz/4 ms)', 'Chuột máy tính gaming Logitech G Pro Hero (910-005442)', '1TB HDD 7200RPM', 'Intel Core i5-9400 ( 2..90 GHz - 4.10 GHz / 9MB / 6 nhân, 6 luồng )', 'Intel UHD Graphics 630', '', 2, '2020-12-09 21:00:02', 27, 0, 10, 0),
(3, 2, 4, 'PC ASUS ROG Huracan G21CN', 'PC ASUS ROG Huracan G21CN (G21CN-D-VN001T) (i5-9400F/8GB/256GB SSD/GeForce RTX 2060/Win10)', 29990000, 'Windows', '1 x 8GB DDR4 2666MHz ( 2 Khe cắm Hỗ trợ tối đa 16GB )', 'Màn hình Acer 21.5\" HA220QA (1920 x 1080/IPS/86Hz/4 ms)', 'Chuột máy tính gaming Logitech G Pro Hero (910-005442)', '256GB M.2 NVMe SSD', 'Intel Core i5-9400F ( 2.90GHz up to 4.10GHz / 9MB / 6 nhân, 6 luồng )', 'GeForce RTX 2060 6GB GDDR6', '', 3, '2020-12-06 21:00:15', 27, 0, 15, 0),
(4, 2, 4, 'PC ASUS ROG Strix GL10CS-VN023T', 'PC ASUS ROG Strix GL10CS-VN023T (i5-9400/8GB/512GB SSD/GeForce RTX 2060/Win10)', 24490000, 'Window', '1 x 8GB DDR4 2666MHz ( 2 Khe cắm Hỗ trợ tối đa 32GB )', 'Màn hình Acer 21.5\" HA220QA (1920 x 1080/IPS/86Hz/4 ms)', 'Chuột máy tính gaming Logitech G Pro Hero (910-005442)', '512GB M.2 NVMe SSD', 'Intel Core i5-9400 ( 2.90 GHz - 4.10 GHz / 9MB / 6 nhân, 6 luồng )', 'Intel UHD Graphics 630 / GeForce RTX 2060 6GB GDDR6', '', 2, '2020-12-10 21:00:51', 27, 0, 20, 0),
(5, 2, 4, 'PC ASUS VivoMini VC66-CB5243MN', 'PC ASUS VivoMini VC66-CB5243MN (i5-8400/8GB/128GB SSD/UHD 630/Free DOS)', 16290000, 'Linux', '1 x 8GB DDR4 2400MHz (2 Khe cắm, Hỗ trợ tối đa 32GB)', 'Màn hình Acer 21.5\" HA220QA (1920 x 1080/IPS/86Hz/4 ms)', 'Chuột máy tính gaming Logitech G Pro Hero (910-005442)', '128GB M.2 SATA SSD', 'Intel Core i5-8400 ( 2.80 GHz up to 4.00 GHz / 9MB / 6 nhân, 6 luồng )', 'Intel UHD Graphics 630', '', 0, '2020-12-14 21:00:54', 25, 0, 25, 0),
(6, 2, 4, 'ROG 10 X', 'ROG 10 X', 96990000, 'Windows', 'G.SKILL Trident Z RGB 2x8G Bus 3000', 'Màn hình Asus ROG Swift PG65UQ 65\" VA 4K 144Hz G-Sync', 'Chuột không dây Razer Naga Pro', 'Samsung 970 Evo Plus 500G M.2 NVMe 500GB', 'Intel Core i7-10700KA Avengers Edition / 16MB / 3.8GHz / 8 Nhân 16 Luồng / LGA 1200', 'Asus ROG STRIX RTX 3090 24G GAMING', 'ASUS ROG Thor 850W Platinum', 2, '2020-11-10 21:00:41', 25, 0, 0, 0),
(7, 1, 4, 'PC HP 280 Pro G6 Microtower ', 'PC HP 280 Pro G6 Microtower (9GD36PA) (i5-9400/4GB/1TB HDD/UHD 630/Free DOS)', 11890000, 'Windows', '1 x 4GB DDR4 2666MHz ( 2 Khe cắm Hỗ trợ tối đa 32GB )', 'Màn hình Acer 21.5\" HA220QA (1920 x 1080/IPS/86Hz/4 ms)', 'Chuột máy tính gaming Logitech G Pro Hero (910-005442)', '1TB HDD 7200RPM', 'Intel Core i5-9400 ( 2.90 GHz - 4.10 GHz / 9MB / 6 nhân, 6 luồng )', ' Intel UHD Graphics 630', '', 1, '2020-12-06 21:00:38', 25, 0, 0, 0),
(8, 1, 4, 'PC HP 280 Pro G7 Microtower ', 'PC HP 280 Pro G7 Microtower (9MS50PA) (i5-9400/8GB/1TB HDD/UHD 630/Free DOS)', 12490000, 'Linux', '1 x 8GB DDR4 2666MHz ( 2 Khe cắm Hỗ trợ tối đa 32GB )', 'Màn hình Acer 21.5\" HA220QA (1920 x 1080/IPS/86Hz/4 ms)', 'Chuột máy tính gaming Logitech G Pro Hero (910-005442)', '1TB HDD 7200RPM', 'Intel Core i5-9400 ( 2..90 GHz - 4.10 GHz / 9MB / 6 nhân, 6 luồng )', 'Intel UHD Graphics 630', '', 2, '2020-12-03 21:00:35', 28, 0, 0, 0),
(9, 2, 4, 'PC ASUS ROG Huracan G22CN', 'PC ASUS ROG Huracan G22CN (G21CN-D-VN001T) (i5-9400F/8GB/256GB SSD/GeForce RTX 2060/Win10)', 29990000, 'Windows', '1 x 8GB DDR4 2666MHz ( 2 Khe cắm Hỗ trợ tối đa 16GB )', 'Màn hình Acer 21.5\" HA220QA (1920 x 1080/IPS/86Hz/4 ms)', 'Chuột máy tính gaming Logitech G Pro Hero (910-005442)', '256GB M.2 NVMe SSD', 'Intel Core i5-9400F ( 2.90GHz up to 4.10GHz / 9MB / 6 nhân, 6 luồng )', 'GeForce RTX 2060 6GB GDDR6', '', 3, '2020-12-01 21:00:31', 29, 0, 0, 0),
(10, 2, 4, 'MÁY TÍNH ĐỂ BÀN APPLE IMAC 21.5\" Core i3 Radeon Pro 555X MRT32SA/A', 'Công nghệ màn hình: 21.5\" Retina 5K\r\nTốc độ: 3.6GHz \r\nLoại CPU: quad-core\r\nCông nghệ CPU: Core i3\r\nBộ nhớ / Ram: 8GB 2666MHz / DDR4 memory\r\nIntel HD Graphics: Radeon Pro 555X_2GB', 29990000, 'Mac OS', '8GB 2666MHz / DDR4 memory', '21.5\" Retina 5K', '', '1TB', 'quad-core', 'Core i3', '', 3, '2020-12-14 21:03:30', 25, 1, 10, 0),
(11, 2, 4, 'iMac 21.5 inch 2017 MMQA2', '2.3 GHz Intel Core i5 Dual-Core\r\n8GB of DDR4 RAM | 1TB Hard Drive\r\n21.5 ” 1920 x 1080 IPS Display\r\nIntegrated Intel Iris Plus Graphics 640\r\nUHS-II SDXC Card Reader\r\nThunderbolt 3 | USB 3.0 Type-A\r\n802.11ac Wi-Fi | Bluetooth 4.2\r\n1 x Gigabit Ethernet Port\r\nmacOS Sierra\r\nTình trạng: mới 99%\r\nBảo hành 6 tháng. Bao test 1 tuần.\r\nHổ trợ kỹ thuật và vệ sinh máy suốt đời.', 19500000, 'Mac OS', '8GB of DDR4 RAM', '21.5 ” 1920 x 1080 IPS Display', '', '1TB Hard Drive', '2.3 GHz Intel Core i5 Dual-Core', 'Integrated Intel Iris Plus Graphics 640', '', 5, '2020-12-14 21:10:20', 30, 1, 50, 2),
(12, 2, 4, 'MNEA2 Option – iMac 27 inch Retina 5K 2017 i5/32GB/1TB', '3.5 GHz Intel Core i5 Quad-Core\r\n32GB of DDR4 RAM | 1TB Fusion Drive\r\n27″ 5120 x 2880 IPS Retina 5K Display\r\nAMD Radeon Pro 575 Graphics Card (4GB)\r\nUHS-II SDXC Card Reader\r\nThunderbolt 3 | USB 3.0 Type-A\r\n802.11ac Wi-Fi | Bluetooth 4.2\r\n1 x Gigabit Ethernet Port\r\nMagic Keyboard & Magic Mouse 2 Included\r\nmacOS Sierra', 48000000, 'Mac OS', '32GB of DDR4 RAM', '27″ 5120 x 2880 IPS Retina 5K Display', 'Magic Keyboard & Magic Mouse 2 Included', '1TB Fusion Drive', '3.5 GHz Intel Core i5 Quad-Core', 'AMD Radeon Pro 575 Graphics Card (4GB)', '', 2, '2020-12-01 21:13:12', 28, 1, 5, 0),
(13, 2, 4, 'CTO/BTO – iMac 2020 5K 27 inch – 3.8Ghz/Core i7/32GB/1TB/Pro 5700XT', 'Tình trạng: Mới 100%, Nguyên SealBox\r\nCPU: 3.8GHz 8‑core 10th-generation Intel Core i7, Turbo Boost up to 5.0GHz\r\nRam: 32GB of 2666MHz DDR4 memory (Max 128GB)\r\nStorage: 1TB SSD\r\nCard đồ hoạ: Radeon Pro 5700 XT with 16GB of GDDR6 memory\r\nMàn hình: 27 inch Retina 5K display display (5120 x 2880), 500 nits, True Tone\r\nKết nối: 4x USB 3.0, 2 Thunderbolt 3, LAN, 1x SDXC card, Jack 3.5mm\r\nPhụ Kiện: Body, Dây nguồn, Keyboard 2, Mouse 2', 85000000, 'Mac OS', '32GB of 2666MHz DDR4 memory (Max 128GB)', '27 inch Retina 5K display display (5120 x 2880), 500 nits, True Tone', 'Body, Dây nguồn, Keyboard 2, Mouse 2', '1TB SSD', '3.8GHz 8‑core 10th-generation Intel Core i7, Turbo Boost up to 5.0GHz', 'Radeon Pro 5700 XT with 16GB of GDDR6 memory', '', 6, '2020-12-04 21:16:47', 27, 1, 6, 1);

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `Id` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`Id`, `Name`) VALUES
(1, 'Normal user'),
(2, 'Staff'),
(3, 'Admin');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `Id` int(11) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `FirstName` varchar(50) NOT NULL,
  `LastName` varchar(50) NOT NULL,
  `RoleId` int(11) NOT NULL,
  `UpdatedDate` datetime DEFAULT NULL,
  `UpdatedBy` int(11) DEFAULT NULL,
  `IsActive` tinyint(1) NOT NULL DEFAULT 1,
  `Avatar` int(11) DEFAULT NULL,
  `Address` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`Id`, `Email`, `FirstName`, `LastName`, `RoleId`, `UpdatedDate`, `UpdatedBy`, `IsActive`, `Avatar`, `Address`) VALUES
(25, 'dung.hoang190699@hcmut.edu.vn', 'Dung', 'Hoang', 3, '2020-12-14 00:00:00', 25, 1, NULL, '56, T5, Tay Thanh, Tan Phu, TP.HCM'),
(26, 'tri@gmail.com', 'Tri', 'Vo', 2, '2020-12-14 00:00:00', 25, 1, NULL, 'Benh vien Tu Du'),
(27, 'an@gmail.com', 'An', 'Ngo', 2, '2020-12-14 00:00:00', 25, 1, NULL, 'Benh vien Tam Than TP.HCM'),
(28, 'duy@gmail.com', 'Duy', 'Trinh', 1, NULL, NULL, 1, NULL, ''),
(29, 'dat@gmail.com', 'Dat', 'Vu', 1, NULL, NULL, 1, NULL, ''),
(30, 'dung@gmail.com', 'Dung', 'Hoang Ha Tuan', 3, '2020-12-14 00:00:00', 25, 1, NULL, '57, T5, Tay Thanh, Tan Phu, TPHCM');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `UserId` (`UserId`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `fileinstance`
--
ALTER TABLE `fileinstance`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `orderproduct`
--
ALTER TABLE `orderproduct`
  ADD PRIMARY KEY (`OrderId`,`ProductId`),
  ADD KEY `PRODUCT_FK` (`ProductId`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `PaymentId` (`PaymentId`),
  ADD KEY `UserId` (`UserId`);

--
-- Indexes for table `paymentmethod`
--
ALTER TABLE `paymentmethod`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `CategoryId` (`CategoryId`),
  ADD KEY `UpdatedBy` (`UpdatedBy`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `RoleId` (`RoleId`),
  ADD KEY `UpdatedBy` (`UpdatedBy`),
  ADD KEY `Avatar` (`Avatar`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `fileinstance`
--
ALTER TABLE `fileinstance`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `paymentmethod`
--
ALTER TABLE `paymentmethod`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `account`
--
ALTER TABLE `account`
  ADD CONSTRAINT `USER_ACCOUNT_FK` FOREIGN KEY (`UserId`) REFERENCES `user` (`Id`);

--
-- Constraints for table `orderproduct`
--
ALTER TABLE `orderproduct`
  ADD CONSTRAINT `ORDER_FK` FOREIGN KEY (`OrderId`) REFERENCES `orders` (`Id`),
  ADD CONSTRAINT `PRODUCT_FK` FOREIGN KEY (`ProductId`) REFERENCES `product` (`Id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `ORDER_PAYMENT_FK` FOREIGN KEY (`PaymentId`) REFERENCES `paymentmethod` (`Id`),
  ADD CONSTRAINT `USER_ORDER_FK` FOREIGN KEY (`UserId`) REFERENCES `user` (`Id`);

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `PRODUCT_CATEGORY_FK` FOREIGN KEY (`CategoryId`) REFERENCES `category` (`Id`),
  ADD CONSTRAINT `PRODUCT_UPDATED_BY_FK` FOREIGN KEY (`UpdatedBy`) REFERENCES `user` (`Id`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `AVATAR_ID_FK` FOREIGN KEY (`Avatar`) REFERENCES `fileinstance` (`Id`),
  ADD CONSTRAINT `USER_ROLE_FK` FOREIGN KEY (`RoleId`) REFERENCES `role` (`Id`),
  ADD CONSTRAINT `USER_UPDATED_BY_FK` FOREIGN KEY (`UpdatedBy`) REFERENCES `user` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

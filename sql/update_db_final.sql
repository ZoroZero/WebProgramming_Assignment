-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 15, 2020 at 02:50 PM
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
            iCategory,
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
    SELECT     p.Id,
            p.CategoryId,
            p.Name,
            p.Description,
            p.Price,
            p.Amount,
            1 as BuyAmount,
            file.Path,
            p.Discount
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
            p.Discount,
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
            p.Discount,
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
    WHERE Name LIKE CONCAT (iKeyword, '%') AND !IsDeleted;
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
(19, 'dung123456', '3a88fb64780cd8b317ca73890a448592', 30),
(20, 'thoai123', '4594d70bbf81f6fb0b817988efca38ed', 31),
(21, 'thoai1234', '4594d70bbf81f6fb0b817988efca38ed', 32),
(22, 'an123456789', '50ef0431f48ee9d7752cab1a14540660', 33);

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
(48, 'product-5fd0c2feac088', 'png', 'assets/imgs/product/product-5fd0c2feac088.png', 1),
(49, 'product-5fd778947c614', 'png', 'assets/imgs/product/product-5fd778947c614.png', 1),
(50, 'product-5fd778bfa1c6d', 'png', 'assets/imgs/product/product-5fd778bfa1c6d.png', 1),
(51, 'product-5fd77aa2de73d', 'png', 'assets/imgs/product/product-5fd77aa2de73d.png', 1),
(52, 'product-5fd77aacd705e', 'png', 'assets/imgs/product/product-5fd77aacd705e.png', 1),
(53, 'product-5fd77ab4c6e17', 'png', 'assets/imgs/product/product-5fd77ab4c6e17.png', 1),
(54, 'product-5fd77abb90e30', 'png', 'assets/imgs/product/product-5fd77abb90e30.png', 1),
(55, 'product-5fd77ac113ca5', 'png', 'assets/imgs/product/product-5fd77ac113ca5.png', 1),
(56, 'product-5fd77ac7b6f57', 'png', 'assets/imgs/product/product-5fd77ac7b6f57.png', 1),
(57, 'product-5fd77ad24e195', 'png', 'assets/imgs/product/product-5fd77ad24e195.png', 1),
(58, 'product-5fd77adb7da16', 'png', 'assets/imgs/product/product-5fd77adb7da16.png', 1),
(59, 'product-5fd77ae79c753', 'png', 'assets/imgs/product/product-5fd77ae79c753.png', 1),
(60, 'product-5fd77af41fe4f', 'png', 'assets/imgs/product/product-5fd77af41fe4f.png', 1),
(61, 'product-5fd77b0887be1', 'png', 'assets/imgs/product/product-5fd77b0887be1.png', 1),
(62, '31', 'jpg', 'assets/imgs/users/avatar/31.jpg', 0),
(63, '31', 'png', 'assets/imgs/users/avatar/31.png', 0),
(64, '32', 'png', 'assets/imgs/users/avatar/32.png', 0),
(65, '33', 'jpg', 'assets/imgs/users/avatar/33.jpg', 0),
(66, 'product-5fd8b53bb1b91', 'png', 'assets/imgs/product/product-5fd8b53bb1b91.png', 1),
(67, 'product-5fd8b5555ea15', 'png', 'assets/imgs/product/product-5fd8b5555ea15.png', 1),
(68, 'product-5fd8b55a6d4ad', 'png', 'assets/imgs/product/product-5fd8b55a6d4ad.png', 1),
(69, 'product-5fd8b55f07ef4', 'png', 'assets/imgs/product/product-5fd8b55f07ef4.png', 1),
(70, 'product-5fd8b56bf1044', 'png', 'assets/imgs/product/product-5fd8b56bf1044.png', 1),
(71, 'product-5fd8b5729ff2c', 'png', 'assets/imgs/product/product-5fd8b5729ff2c.png', 1),
(72, 'product-5fd8b579a06dc', 'png', 'assets/imgs/product/product-5fd8b579a06dc.png', 1),
(73, 'product-5fd8b5f77c068', 'png', 'assets/imgs/product/product-5fd8b5f77c068.png', 1),
(74, 'product-5fd8b68785325', 'png', 'assets/imgs/product/product-5fd8b68785325.png', 1),
(75, 'product-5fd8b69aa12b5', 'png', 'assets/imgs/product/product-5fd8b69aa12b5.png', 1),
(76, 'product-5fd8b746c053f', 'png', 'assets/imgs/product/product-5fd8b746c053f.png', 1),
(77, 'product-5fd8b874f3cb1', 'png', 'assets/imgs/product/product-5fd8b874f3cb1.png', 1),
(78, 'product-5fd8b8f2b8a53', 'png', 'assets/imgs/product/product-5fd8b8f2b8a53.png', 1),
(79, 'product-5fd8b9a7c2a49', 'png', 'assets/imgs/product/product-5fd8b9a7c2a49.png', 1);

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
(1, 1, 66, 'PC HP 280 Pro G5 Microtower ', 'PC HP 280 Pro G5 Microtower (9GD36PA) (i5-9400/4GB/1TB HDD/UHD 630/Free DOS)', 11890000, 'Windows', '1 x 4GB DDR4 2666MHz ( 2 Khe cắm Hỗ trợ tối đa 32GB )', 'Màn hình Acer 21.5\" HA220QA (1920 x 1080/IPS/86Hz/4 ms)', 'Chuột máy tính gaming Logitech G Pro Hero (910-005442)', '1TB HDD 7200RPM', 'Intel Core i5-9400 ( 2.90 GHz - 4.10 GHz / 9MB / 6 nhân, 6 luồng )', ' Intel UHD Graphics 630', 'ABCs', 1, '2020-12-15 20:08:11', 30, 0, 5, 0),
(2, 3, 4, 'PC HP 280 Pro G5 Microtower ', 'PC HP 280 Pro G5 Microtower (9MS50PA) (i5-9400/8GB/1TB HDD/UHD 630/Free DOS)', 12490000, 'Linux', '1 x 8GB DDR4 2666MHz ( 2 Khe cắm Hỗ trợ tối đa 32GB )', 'Màn hình Acer 21.5\" HA220QA (1920 x 1080/IPS/86Hz/4 ms)', 'Chuột máy tính gaming Logitech G Pro Hero (910-005442)', '1TB HDD 7200RPM', 'Intel Core i5-9400 ( 2..90 GHz - 4.10 GHz / 9MB / 6 nhân, 6 luồng )', 'Intel UHD Graphics 630', 'sadasdwq', 1, '2020-12-15 00:00:00', 30, 0, 10, 0),
(3, 2, 72, 'PC ASUS ROG Huracan G21CN', 'PC ASUS ROG Huracan G21CN (G21CN-D-VN001T) (i5-9400F/8GB/256GB SSD/GeForce RTX 2060/Win10)', 29990000, 'Mac OS', '1 x 8GB DDR4 2666MHz ( 2 Khe cắm Hỗ trợ tối đa 16GB )', 'Màn hình Acer 21.5\" HA220QA (1920 x 1080/IPS/86Hz/4 ms)', 'Chuột máy tính gaming Logitech G Pro Hero (910-005442)', '256GB M.2 NVMe SSD', 'Intel Core i5-9400F ( 2.90GHz up to 4.10GHz / 9MB / 6 nhân, 6 luồng )', 'GeForce RTX 2060 6GB GDDR6', 'dsadwqdsa', 3, '2020-12-15 20:09:13', 30, 0, 15, 0),
(4, 2, 71, 'PC ASUS ROG Strix GL10CS-VN023T', 'PC ASUS ROG Strix GL10CS-VN023T (i5-9400/8GB/512GB SSD/GeForce RTX 2060/Win10)', 24490000, 'Mac OS', '1 x 8GB DDR4 2666MHz ( 2 Khe cắm Hỗ trợ tối đa 32GB )', 'Màn hình Acer 21.5\" HA220QA (1920 x 1080/IPS/86Hz/4 ms)', 'Chuột máy tính gaming Logitech G Pro Hero (910-005442)', '512GB M.2 NVMe SSD', 'Intel Core i5-9400 ( 2.90 GHz - 4.10 GHz / 9MB / 6 nhân, 6 luồng )', 'Intel UHD Graphics 630 / GeForce RTX 2060 6GB GDDR6', '', 2, '2020-12-15 20:09:06', 30, 0, 20, 0),
(5, 3, 53, 'PC ASUS VivoMini VC66-CB5243MN', 'PC ASUS VivoMini VC66-CB5243MN (i5-8400/8GB/128GB SSD/UHD 630/Free DOS)', 16290000, 'Linux', '1 x 8GB DDR4 2400MHz (2 Khe cắm, Hỗ trợ tối đa 32GB)', 'Màn hình Acer 21.5\" HA220QA (1920 x 1080/IPS/86Hz/4 ms)', 'Chuột máy tính gaming Logitech G Pro Hero (910-005442)', '128GB M.2 SATA SSD', 'Intel Core i5-8400 ( 2.80 GHz up to 4.00 GHz / 9MB / 6 nhân, 6 luồng )', 'Intel UHD Graphics 630', 'sadasdasd', 1, '2020-12-15 00:00:00', 30, 0, 25, 0),
(6, 2, 70, 'ROG 10 X', 'ROG 10 X', 96990000, 'Mac OS', 'G.SKILL Trident Z RGB 2x8G Bus 3000', 'Màn hình Asus ROG Swift PG65UQ 65\" VA 4K 144Hz G-Sync', 'Chuột không dây Razer Naga Pro', 'Samsung 970 Evo Plus 500G M.2 NVMe 500GB', 'Intel Core i7-10700KA Avengers Edition / 16MB / 3.8GHz / 8 Nhân 16 Luồng / LGA 1200', 'Asus ROG STRIX RTX 3090 24G GAMING', 'ASUS ROG Thor 850W Platinum', 2, '2020-12-15 20:08:59', 30, 0, 0, 0),
(7, 1, 55, 'PC HP 280 Pro G6 Microtower ', 'PC HP 280 Pro G6 Microtower (9GD36PA) (i5-9400/4GB/1TB HDD/UHD 630/Free DOS)', 11890000, 'Windows', '1 x 4GB DDR4 2666MHz ( 2 Khe cắm Hỗ trợ tối đa 32GB )', 'Màn hình Acer 21.5\" HA220QA (1920 x 1080/IPS/86Hz/4 ms)', 'Chuột máy tính gaming Logitech G Pro Hero (910-005442)', '1TB HDD 7200RPM', 'Intel Core i5-9400 ( 2.90 GHz - 4.10 GHz / 9MB / 6 nhân, 6 luồng )', ' Intel UHD Graphics 630', 'dsadwqd', 1, '2020-12-15 00:00:00', 30, 0, 0, 0),
(8, 3, 4, 'PC HP 280 Pro G7 Microtower ', 'PC HP 280 Pro G7 Microtower (9MS50PA) (i5-9400/8GB/1TB HDD/UHD 630/Free DOS)', 12490000, 'Linux', '1 x 8GB DDR4 2666MHz ( 2 Khe cắm Hỗ trợ tối đa 32GB )', 'Màn hình Acer 21.5\" HA220QA (1920 x 1080/IPS/86Hz/4 ms)', 'Chuột máy tính gaming Logitech G Pro Hero (910-005442)', '1TB HDD 7200RPM', 'Intel Core i5-9400 ( 2..90 GHz - 4.10 GHz / 9MB / 6 nhân, 6 luồng )', 'Intel UHD Graphics 630', 'sdadwqsad', 2, '2020-12-15 00:00:00', 30, 0, 0, 0),
(9, 2, 69, 'PC ASUS ROG Huracan G22CN', 'PC ASUS ROG Huracan G22CN (G21CN-D-VN001T) (i5-9400F/8GB/256GB SSD/GeForce RTX 2060/Win10)', 29990000, 'Mac OS', '1 x 8GB DDR4 2666MHz ( 2 Khe cắm Hỗ trợ tối đa 16GB )', 'Màn hình Acer 21.5\" HA220QA (1920 x 1080/IPS/86Hz/4 ms)', 'Chuột máy tính gaming Logitech G Pro Hero (910-005442)', '256GB M.2 NVMe SSD', 'Intel Core i5-9400F ( 2.90GHz up to 4.10GHz / 9MB / 6 nhân, 6 luồng )', 'GeForce RTX 2060 6GB GDDR6', 'swadadw', 3, '2020-12-15 20:08:47', 30, 0, 0, 0),
(10, 2, 58, 'MÁY TÍNH ĐỂ BÀN APPLE IMAC 21.5\" Core i3 Radeon Pro 555X MRT32SA/A', 'Công nghệ màn hình: 21.5\" Retina 5KTốc độ: 3.6GHz Loại CPU: quad-coreCông nghệ CPU: Core i3Bộ nhớ / Ram: 8GB 2666MHz / DDR4 memoryIntel HD Graphics: Radeon Pro 555X_2GB', 29990000, 'Mac OS', '8GB 2666MHz / DDR4 memory', '21.5\" Retina 5K', 'Chuột máy tính gaming Logitech G Pro Hero (910-005442)', '1TB', 'quad-core', 'Core i3', 'ABCs', 3, '2020-12-15 00:00:00', 30, 0, 10, 0),
(11, 2, 4, 'iMac 21.5 inch 2017 MMQA2', '2.3 GHz Intel Core i5 Dual-Core8GB of DDR4 RAM | 1TB Hard Drive21.5 ” 1920 x 1080 IPS DisplayIntegrated Intel Iris Plus Graphics 640UHS-II SDXC Card ReaderThunderbolt 3 | USB 3.0 Type-A802.11ac Wi-Fi ', 19500000, 'Mac OS', '8GB of DDR4 RAM', '21.5 ” 1920 x 1080 IPS Display', 'Chuột máy tính gaming Logitech G Pro Hero (910-005442)', '1TB Hard Drive', '2.3 GHz Intel Core i5 Dual-Core', 'Integrated Intel Iris Plus Graphics 640', 'ABCs', 5, '2020-12-15 00:00:00', 30, 0, 50, 2),
(12, 2, 67, 'MNEA2 Option – iMac 27 inch Retina 5K 2017 i5/32GB/1TB', '3.5 GHz Intel Core i5 Quad-Core32GB of DDR4 RAM | 1TB Fusion Drive27″ 5120 x 2880 IPS Retina 5K DisplayAMD Radeon Pro 575 Graphics Card (4GB)UHS-II SDXC Card ReaderThunderbolt 3 | USB 3.0 Type-A802.11', 48000000, 'Mac OS', '32GB of DDR4 RAM', '27″ 5120 x 2880 IPS Retina 5K Display', 'Magic Keyboard & Magic Mouse 2 Included', '1TB Fusion Drive', '3.5 GHz Intel Core i5 Quad-Core', 'AMD Radeon Pro 575 Graphics Card (4GB)', '500W', 2, '2020-12-15 20:08:37', 30, 0, 5, 0),
(13, 2, 60, 'CTO/BTO – iMac 2020 5K 27 inch – 3.8Ghz/Core i7/32GB/1TB/Pro 5700XT', 'Tình trạng: Mới 100%, Nguyên SealBoxCPU: 3.8GHz 8‑core 10th-generation Intel Core i7, Turbo Boost up to 5.0GHzRam: 32GB of 2666MHz DDR4 memory (Max 128GB)Storage: 1TB SSDCard đồ hoạ: Radeon Pro 5700 X', 85000000, 'Mac OS', '32GB of 2666MHz DDR4 memory (Max 128GB)', '27 inch Retina 5K display display (5120 x 2880), 500 nits, True Tone', 'Body, Dây nguồn, Keyboard 2, Mouse 2', '1TB SSD', '3.8GHz 8‑core 10th-generation Intel Core i7, Turbo Boost up to 5.0GHz', 'Radeon Pro 5700 XT with 16GB of GDDR6 memory', '300W', 6, '2020-12-15 00:00:00', 30, 1, 6, 1),
(14, 1, 59, 'sadsad', 'sad', 213, 'Windows', 'sda', 'sad', 'dasd', 'dasdasd', 'dsad', 'asdas', 'sadas', 1, '2020-12-15 00:00:00', 30, 1, 2, 0),
(20, 2, 79, 'dasd', 'The best', 34433400, 'Mac Os', '8gb', '144hz', 'g pro', '500gb', '3090', '5ghz', '800w gold', 1, '2020-12-15 00:00:00', 30, 0, 11, 0);

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
(25, 'dung.hoang190699@hcmut.edu.vn', 'Dung', 'Hoang', 1, '2020-12-14 00:00:00', 30, 1, NULL, '56, T5, Tay Thanh, Tan Phu, TP.HCM'),
(26, 'tri@gmail.com', 'Tri', 'Vo', 2, '2020-12-14 00:00:00', 25, 1, NULL, 'Benh vien Tu Du'),
(27, 'an@gmail.com', 'An', 'Ngo', 2, '2020-12-14 00:00:00', 25, 1, NULL, 'Benh vien Tam Than TP.HCM'),
(28, 'duy@gmail.com', 'Duy', 'Trinh', 1, '2020-12-15 00:00:00', 30, 1, NULL, ''),
(29, 'dat@gmail.com', 'Dat', 'Vu', 1, '2020-12-15 00:00:00', 30, 1, NULL, '123 DT5, tay thanh, tan phu'),
(30, 'dung@gmail.com', 'Dung', 'Hoang Ha Tuan', 3, '2020-12-14 00:00:00', 25, 1, NULL, '57, T5, Tay Thanh, Tan Phu, TPHCM'),
(31, 'hoangtrivo.199233@gmail.com', 'Vo', 'adasd', 1, '2020-12-15 00:00:00', 30, 1, 63, 'ho chi minh city'),
(32, 'hoangtrivo.19967@gmail.com', 'Vo', 'Tri', 1, '2020-12-15 00:00:00', 30, 0, 64, '269 Ly Thuong Kiet'),
(33, 'hoangtrivo.199321312@gmail.com', 'Vo', 'Tri', 1, '2020-12-15 00:00:00', 30, 0, 65, '269 Ly Thuong Kiet');

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
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `fileinstance`
--
ALTER TABLE `fileinstance`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

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
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

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

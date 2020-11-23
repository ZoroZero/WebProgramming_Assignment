-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 23, 2020 at 01:43 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.5

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
CREATE DEFINER=`root`@`localhost` PROCEDURE `CreateUser` (IN `iUserName` VARCHAR(20), IN `iPassword` VARCHAR(256), IN `iFirstName` VARCHAR(50), IN `iLastName` VARCHAR(50), IN `iEmail` VARCHAR(50), IN `iRoleId` INT)  NO SQL
BEGIN
	INSERT INTO `user`(`FirstName`, `LastName`, `Email`, `RoleId`) 
    VALUES (iFirstName, iLastName, iEmail, iRoleId);
    SELECT LAST_INSERT_ID() INTO @Id;
    
    INSERT INTO `account`(`UserName`, `HashedPassword`, `UserId`)
    VALUES (iUserName, iPassword, @Id);
    SELECT @Id AS Id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetAllProduct` ()  NO SQL
BEGIN
	SELECT 	p.Id,
    		p.CategoryId,
            p.Name,
            p.Description,
            p.Price,
            p.Amount,
    		file.Path 
    FROM product p JOIN fileinstance file 
    ON p.ImageFile = file.Id ;
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
    WHERE p.Discount > 0
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
        file.Path, 
        user_infor.HashedPassword
    FROM 
    	(SELECT u.FirstName, 
    	u.LastName, 
        u.Email, 
        u.Address, 
        a.UserName, 
        u.Avatar, 
        a.HashedPassword
        FROM `user`u JOIN `account` a ON u.Id = a.UserId 					WHERE u.Id = iUserId) user_infor 
    	LEFT JOIN fileinstance file on user_infor.Avatar = file.Id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `LoginUser` (IN `iUserName` VARCHAR(20), IN `iHashedPassword` VARCHAR(256))  NO SQL
BEGIN
	SELECT u.Id, u.roleId 
    FROM user u JOIN account a ON u.Id = a.UserId
    WHERE a.Username = iUserName AND a.HashedPassword = 		iHashedPassword;
    
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateAvatar` (IN `iUserId` INT, IN `iNewFileName` VARCHAR(50), IN `iNewFileExtension` VARCHAR(50), IN `iNewFilePath` VARCHAR(100))  NO SQL
BEGIN
	START TRANSACTION;
    INSERT INTO fileinstance(`Name`,`Extension`,`Path`) 
    VALUES(iNewFileName, iNewFileExtension, iNewFilePath);
    
    SELECT LAST_INSERT_ID() INTO @AvatarId ;
    UPDATE user 
    SET Avatar = @AvatarId,
    	UpdatedDate = iUserId,
        UpdatedDate = CURRENT_TIME()
    WHERE Id = iUserId;
    COMMIT;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateUserInformation` (IN `iUserId` INT, IN `iFirstName` VARCHAR(50), IN `iLastName` VARCHAR(50), IN `iEmail` VARCHAR(100), IN `iAddress` VARCHAR(100), IN `iActive` BOOLEAN)  NO SQL
BEGIN
    start transaction;
	UPDATE user SET
    	FirstName = iFirstName,
        LastName = iLastName,
        Email = iEmail,
        Address = iAddress,
        UpdatedBy = iUserId,
        UpdatedDate = curdate(),
        IsActive = iActive
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
        WHERE UserId = iUserId;
	COMMIT;
END$$

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
(1, 'An1', '123456', 4),
(2, 'an.ngo1998', '4594d70bbf81f6fb0b817988efca38ed', 5),
(4, 'an.ngo1997', '4594d70bbf81f6fb0b817988efca38ed', 7),
(5, 'an.ngo1996', '4594d70bbf81f6fb0b817988efca38ed', 8),
(6, 'an.ngo1995', '4594d70bbf81f6fb0b817988efca38ed', 9),
(7, 'an.ngo1994', '4594d70bbf81f6fb0b817988efca38ed', 10),
(8, 'duyan1999', '4594d70bbf81f6fb0b817988efca38ed', 11),
(9, 'duyan1998', '4594d70bbf81f6fb0b817988efca38ed', 12);

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
(14, '5', 'png', 'assets/imgs/users/avatar/5.png', 0);

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
(1, 1, 4, 'PC HP 280 Pro G5 Microtower ', 'PC HP 280 Pro G5 Microtower (9GD36PA) (i5-9400/4GB/1TB HDD/UHD 630/Free DOS)', 11890000, 'Windows', '1 x 4GB DDR4 2666MHz ( 2 Khe cắm Hỗ trợ tối đa 32GB )', 'Màn hình Acer 21.5\" HA220QA (1920 x 1080/IPS/86Hz/4 ms)', 'Chuột máy tính gaming Logitech G Pro Hero (910-005442)', '1TB HDD 7200RPM', 'Intel Core i5-9400 ( 2.90 GHz - 4.10 GHz / 9MB / 6 nhân, 6 luồng )', ' Intel UHD Graphics 630', '', 1, '0000-00-00 00:00:00', NULL, 0, 5, 0),
(2, 1, 4, 'PC HP 280 Pro G5 Microtower ', 'PC HP 280 Pro G5 Microtower (9MS50PA) (i5-9400/8GB/1TB HDD/UHD 630/Free DOS)', 12490000, 'Linux', '1 x 8GB DDR4 2666MHz ( 2 Khe cắm Hỗ trợ tối đa 32GB )', 'Màn hình Acer 21.5\" HA220QA (1920 x 1080/IPS/86Hz/4 ms)', 'Chuột máy tính gaming Logitech G Pro Hero (910-005442)', '1TB HDD 7200RPM', 'Intel Core i5-9400 ( 2..90 GHz - 4.10 GHz / 9MB / 6 nhân, 6 luồng )', 'Intel UHD Graphics 630', '', 2, '0000-00-00 00:00:00', NULL, 0, 10, 0),
(3, 2, 4, 'PC ASUS ROG Huracan G21CN', 'PC ASUS ROG Huracan G21CN (G21CN-D-VN001T) (i5-9400F/8GB/256GB SSD/GeForce RTX 2060/Win10)', 29990000, 'Windows', '1 x 8GB DDR4 2666MHz ( 2 Khe cắm Hỗ trợ tối đa 16GB )', 'Màn hình Acer 21.5\" HA220QA (1920 x 1080/IPS/86Hz/4 ms)', 'Chuột máy tính gaming Logitech G Pro Hero (910-005442)', '256GB M.2 NVMe SSD', 'Intel Core i5-9400F ( 2.90GHz up to 4.10GHz / 9MB / 6 nhân, 6 luồng )', 'GeForce RTX 2060 6GB GDDR6', '', 3, '0000-00-00 00:00:00', NULL, 0, 15, 0),
(4, 2, 4, 'PC ASUS ROG Strix GL10CS-VN023T', 'PC ASUS ROG Strix GL10CS-VN023T (i5-9400/8GB/512GB SSD/GeForce RTX 2060/Win10)', 24490000, 'Window', '1 x 8GB DDR4 2666MHz ( 2 Khe cắm Hỗ trợ tối đa 32GB )', 'Màn hình Acer 21.5\" HA220QA (1920 x 1080/IPS/86Hz/4 ms)', 'Chuột máy tính gaming Logitech G Pro Hero (910-005442)', '512GB M.2 NVMe SSD', 'Intel Core i5-9400 ( 2.90 GHz - 4.10 GHz / 9MB / 6 nhân, 6 luồng )', 'Intel UHD Graphics 630 / GeForce RTX 2060 6GB GDDR6', '', 2, '0000-00-00 00:00:00', NULL, 0, 20, 0),
(5, 2, 4, 'PC ASUS VivoMini VC66-CB5243MN', 'PC ASUS VivoMini VC66-CB5243MN (i5-8400/8GB/128GB SSD/UHD 630/Free DOS)', 16290000, 'Linux', '1 x 8GB DDR4 2400MHz (2 Khe cắm, Hỗ trợ tối đa 32GB)', 'Màn hình Acer 21.5\" HA220QA (1920 x 1080/IPS/86Hz/4 ms)', 'Chuột máy tính gaming Logitech G Pro Hero (910-005442)', '128GB M.2 SATA SSD', 'Intel Core i5-8400 ( 2.80 GHz up to 4.00 GHz / 9MB / 6 nhân, 6 luồng )', 'Intel UHD Graphics 630', '', 0, '0000-00-00 00:00:00', NULL, 0, 25, 0),
(6, 2, 4, 'ROG 10 X', 'ROG 10 X', 96990000, 'Windows', 'G.SKILL Trident Z RGB 2x8G Bus 3000', 'Màn hình Asus ROG Swift PG65UQ 65\" VA 4K 144Hz G-Sync', 'Chuột không dây Razer Naga Pro', 'Samsung 970 Evo Plus 500G M.2 NVMe 500GB', 'Intel Core i7-10700KA Avengers Edition / 16MB / 3.8GHz / 8 Nhân 16 Luồng / LGA 1200', 'Asus ROG STRIX RTX 3090 24G GAMING', 'ASUS ROG Thor 850W Platinum', 2, '0000-00-00 00:00:00', NULL, 0, 0, 0),
(7, 1, 4, 'PC HP 280 Pro G6 Microtower ', 'PC HP 280 Pro G6 Microtower (9GD36PA) (i5-9400/4GB/1TB HDD/UHD 630/Free DOS)', 11890000, 'Windows', '1 x 4GB DDR4 2666MHz ( 2 Khe cắm Hỗ trợ tối đa 32GB )', 'Màn hình Acer 21.5\" HA220QA (1920 x 1080/IPS/86Hz/4 ms)', 'Chuột máy tính gaming Logitech G Pro Hero (910-005442)', '1TB HDD 7200RPM', 'Intel Core i5-9400 ( 2.90 GHz - 4.10 GHz / 9MB / 6 nhân, 6 luồng )', ' Intel UHD Graphics 630', '', 1, '0000-00-00 00:00:00', NULL, 0, 0, 0),
(8, 1, 4, 'PC HP 280 Pro G7 Microtower ', 'PC HP 280 Pro G7 Microtower (9MS50PA) (i5-9400/8GB/1TB HDD/UHD 630/Free DOS)', 12490000, 'Linux', '1 x 8GB DDR4 2666MHz ( 2 Khe cắm Hỗ trợ tối đa 32GB )', 'Màn hình Acer 21.5\" HA220QA (1920 x 1080/IPS/86Hz/4 ms)', 'Chuột máy tính gaming Logitech G Pro Hero (910-005442)', '1TB HDD 7200RPM', 'Intel Core i5-9400 ( 2..90 GHz - 4.10 GHz / 9MB / 6 nhân, 6 luồng )', 'Intel UHD Graphics 630', '', 2, '0000-00-00 00:00:00', NULL, 0, 0, 0),
(9, 2, 4, 'PC ASUS ROG Huracan G22CN', 'PC ASUS ROG Huracan G22CN (G21CN-D-VN001T) (i5-9400F/8GB/256GB SSD/GeForce RTX 2060/Win10)', 29990000, 'Windows', '1 x 8GB DDR4 2666MHz ( 2 Khe cắm Hỗ trợ tối đa 16GB )', 'Màn hình Acer 21.5\" HA220QA (1920 x 1080/IPS/86Hz/4 ms)', 'Chuột máy tính gaming Logitech G Pro Hero (910-005442)', '256GB M.2 NVMe SSD', 'Intel Core i5-9400F ( 2.90GHz up to 4.10GHz / 9MB / 6 nhân, 6 luồng )', 'GeForce RTX 2060 6GB GDDR6', '', 3, '0000-00-00 00:00:00', NULL, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `productfile`
--

CREATE TABLE `productfile` (
  `ProductId` int(11) NOT NULL,
  `FileId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
(2, 'Admin');

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
(3, 'szero449@gmail.com', '123', '1234', 1, NULL, NULL, 0, NULL, ''),
(4, 'asdada', 'An', 'Duy', 1, NULL, NULL, 0, NULL, ''),
(5, 'an.ngo@netpower.no', 'Duy', 'An', 1, '2020-11-23 15:13:39', 5, 1, 14, 'Nha loz Tri'),
(6, '1234', 'szero449@gmail.com', '123', 1, NULL, NULL, 0, NULL, ''),
(7, 'an.ngo@netpower.no', 'An', 'Duy', 1, '2020-11-22 00:00:00', 7, 1, NULL, 'aaaaa'),
(8, 'AN', 'duy.an18041999@gmail.com', 'Duy', 1, NULL, NULL, 0, NULL, ''),
(9, 'AN', 'duy.an18041999@gmail.com', 'Duy', 1, NULL, NULL, 0, NULL, ''),
(10, 'AN', 'duy.an18041999@gmail.com', 'UserName', 1, NULL, NULL, 0, NULL, ''),
(11, 'Duy', 'an.ngo@netpower.no', 'An', 1, NULL, NULL, 1, NULL, ''),
(12, 'an.ngo@netpower.no', 'Mai', 'Duy', 1, NULL, NULL, 1, NULL, '');

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
-- Indexes for table `productfile`
--
ALTER TABLE `productfile`
  ADD PRIMARY KEY (`FileId`),
  ADD KEY `ProductId` (`ProductId`);

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
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `fileinstance`
--
ALTER TABLE `fileinstance`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

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
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

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
-- Constraints for table `productfile`
--
ALTER TABLE `productfile`
  ADD CONSTRAINT `FILEID_FK` FOREIGN KEY (`FileId`) REFERENCES `fileinstance` (`Id`),
  ADD CONSTRAINT `PRODUCT_ID_FILE_FK` FOREIGN KEY (`ProductId`) REFERENCES `product` (`Id`);

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

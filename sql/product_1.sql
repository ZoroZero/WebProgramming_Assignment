-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 14, 2020 at 03:30 PM
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
(2, 3, 4, 'PC HP 280 Pro G5 Microtower ', 'PC HP 280 Pro G5 Microtower (9MS50PA) (i5-9400/8GB/1TB HDD/UHD 630/Free DOS)', 12490000, 'Linux', '1 x 8GB DDR4 2666MHz ( 2 Khe cắm Hỗ trợ tối đa 32GB )', 'Màn hình Acer 21.5\" HA220QA (1920 x 1080/IPS/86Hz/4 ms)', 'Chuột máy tính gaming Logitech G Pro Hero (910-005442)', '1TB HDD 7200RPM', 'Intel Core i5-9400 ( 2..90 GHz - 4.10 GHz / 9MB / 6 nhân, 6 luồng )', 'Intel UHD Graphics 630', '', 2, '2020-12-09 21:00:02', 27, 0, 10, 0),
(3, 2, 4, 'PC ASUS ROG Huracan G21CN', 'PC ASUS ROG Huracan G21CN (G21CN-D-VN001T) (i5-9400F/8GB/256GB SSD/GeForce RTX 2060/Win10)', 29990000, 'Windows', '1 x 8GB DDR4 2666MHz ( 2 Khe cắm Hỗ trợ tối đa 16GB )', 'Màn hình Acer 21.5\" HA220QA (1920 x 1080/IPS/86Hz/4 ms)', 'Chuột máy tính gaming Logitech G Pro Hero (910-005442)', '256GB M.2 NVMe SSD', 'Intel Core i5-9400F ( 2.90GHz up to 4.10GHz / 9MB / 6 nhân, 6 luồng )', 'GeForce RTX 2060 6GB GDDR6', '', 3, '2020-12-06 21:00:15', 27, 0, 15, 0),
(4, 2, 4, 'PC ASUS ROG Strix GL10CS-VN023T', 'PC ASUS ROG Strix GL10CS-VN023T (i5-9400/8GB/512GB SSD/GeForce RTX 2060/Win10)', 24490000, 'Window', '1 x 8GB DDR4 2666MHz ( 2 Khe cắm Hỗ trợ tối đa 32GB )', 'Màn hình Acer 21.5\" HA220QA (1920 x 1080/IPS/86Hz/4 ms)', 'Chuột máy tính gaming Logitech G Pro Hero (910-005442)', '512GB M.2 NVMe SSD', 'Intel Core i5-9400 ( 2.90 GHz - 4.10 GHz / 9MB / 6 nhân, 6 luồng )', 'Intel UHD Graphics 630 / GeForce RTX 2060 6GB GDDR6', '', 2, '2020-12-10 21:00:51', 27, 0, 20, 0),
(5, 3, 4, 'PC ASUS VivoMini VC66-CB5243MN', 'PC ASUS VivoMini VC66-CB5243MN (i5-8400/8GB/128GB SSD/UHD 630/Free DOS)', 16290000, 'Linux', '1 x 8GB DDR4 2400MHz (2 Khe cắm, Hỗ trợ tối đa 32GB)', 'Màn hình Acer 21.5\" HA220QA (1920 x 1080/IPS/86Hz/4 ms)', 'Chuột máy tính gaming Logitech G Pro Hero (910-005442)', '128GB M.2 SATA SSD', 'Intel Core i5-8400 ( 2.80 GHz up to 4.00 GHz / 9MB / 6 nhân, 6 luồng )', 'Intel UHD Graphics 630', '', 0, '2020-12-14 21:00:54', 25, 0, 25, 0),
(6, 2, 4, 'ROG 10 X', 'ROG 10 X', 96990000, 'Windows', 'G.SKILL Trident Z RGB 2x8G Bus 3000', 'Màn hình Asus ROG Swift PG65UQ 65\" VA 4K 144Hz G-Sync', 'Chuột không dây Razer Naga Pro', 'Samsung 970 Evo Plus 500G M.2 NVMe 500GB', 'Intel Core i7-10700KA Avengers Edition / 16MB / 3.8GHz / 8 Nhân 16 Luồng / LGA 1200', 'Asus ROG STRIX RTX 3090 24G GAMING', 'ASUS ROG Thor 850W Platinum', 2, '2020-11-10 21:00:41', 25, 0, 0, 0),
(7, 1, 4, 'PC HP 280 Pro G6 Microtower ', 'PC HP 280 Pro G6 Microtower (9GD36PA) (i5-9400/4GB/1TB HDD/UHD 630/Free DOS)', 11890000, 'Windows', '1 x 4GB DDR4 2666MHz ( 2 Khe cắm Hỗ trợ tối đa 32GB )', 'Màn hình Acer 21.5\" HA220QA (1920 x 1080/IPS/86Hz/4 ms)', 'Chuột máy tính gaming Logitech G Pro Hero (910-005442)', '1TB HDD 7200RPM', 'Intel Core i5-9400 ( 2.90 GHz - 4.10 GHz / 9MB / 6 nhân, 6 luồng )', ' Intel UHD Graphics 630', '', 1, '2020-12-06 21:00:38', 25, 0, 0, 0),
(8, 3, 4, 'PC HP 280 Pro G7 Microtower ', 'PC HP 280 Pro G7 Microtower (9MS50PA) (i5-9400/8GB/1TB HDD/UHD 630/Free DOS)', 12490000, 'Linux', '1 x 8GB DDR4 2666MHz ( 2 Khe cắm Hỗ trợ tối đa 32GB )', 'Màn hình Acer 21.5\" HA220QA (1920 x 1080/IPS/86Hz/4 ms)', 'Chuột máy tính gaming Logitech G Pro Hero (910-005442)', '1TB HDD 7200RPM', 'Intel Core i5-9400 ( 2..90 GHz - 4.10 GHz / 9MB / 6 nhân, 6 luồng )', 'Intel UHD Graphics 630', '', 2, '2020-12-03 21:00:35', 28, 0, 0, 0),
(9, 2, 4, 'PC ASUS ROG Huracan G22CN', 'PC ASUS ROG Huracan G22CN (G21CN-D-VN001T) (i5-9400F/8GB/256GB SSD/GeForce RTX 2060/Win10)', 29990000, 'Windows', '1 x 8GB DDR4 2666MHz ( 2 Khe cắm Hỗ trợ tối đa 16GB )', 'Màn hình Acer 21.5\" HA220QA (1920 x 1080/IPS/86Hz/4 ms)', 'Chuột máy tính gaming Logitech G Pro Hero (910-005442)', '256GB M.2 NVMe SSD', 'Intel Core i5-9400F ( 2.90GHz up to 4.10GHz / 9MB / 6 nhân, 6 luồng )', 'GeForce RTX 2060 6GB GDDR6', '', 3, '2020-12-01 21:00:31', 29, 0, 0, 0),
(10, 2, 4, 'MÁY TÍNH ĐỂ BÀN APPLE IMAC 21.5\" Core i3 Radeon Pro 555X MRT32SA/A', 'Công nghệ màn hình: 21.5\" Retina 5K\r\nTốc độ: 3.6GHz \r\nLoại CPU: quad-core\r\nCông nghệ CPU: Core i3\r\nBộ nhớ / Ram: 8GB 2666MHz / DDR4 memory\r\nIntel HD Graphics: Radeon Pro 555X_2GB', 29990000, 'Mac OS', '8GB 2666MHz / DDR4 memory', '21.5\" Retina 5K', '', '1TB', 'quad-core', 'Core i3', '', 3, '2020-12-14 21:03:30', 25, 1, 10, 0),
(11, 2, 4, 'iMac 21.5 inch 2017 MMQA2', '2.3 GHz Intel Core i5 Dual-Core\r\n8GB of DDR4 RAM | 1TB Hard Drive\r\n21.5 ” 1920 x 1080 IPS Display\r\nIntegrated Intel Iris Plus Graphics 640\r\nUHS-II SDXC Card Reader\r\nThunderbolt 3 | USB 3.0 Type-A\r\n802.11ac Wi-Fi | Bluetooth 4.2\r\n1 x Gigabit Ethernet Port\r\nmacOS Sierra\r\nTình trạng: mới 99%\r\nBảo hành 6 tháng. Bao test 1 tuần.\r\nHổ trợ kỹ thuật và vệ sinh máy suốt đời.', 19500000, 'Mac OS', '8GB of DDR4 RAM', '21.5 ” 1920 x 1080 IPS Display', '', '1TB Hard Drive', '2.3 GHz Intel Core i5 Dual-Core', 'Integrated Intel Iris Plus Graphics 640', '', 5, '2020-12-14 21:10:20', 30, 1, 50, 2),
(12, 2, 4, 'MNEA2 Option – iMac 27 inch Retina 5K 2017 i5/32GB/1TB', '3.5 GHz Intel Core i5 Quad-Core\r\n32GB of DDR4 RAM | 1TB Fusion Drive\r\n27″ 5120 x 2880 IPS Retina 5K Display\r\nAMD Radeon Pro 575 Graphics Card (4GB)\r\nUHS-II SDXC Card Reader\r\nThunderbolt 3 | USB 3.0 Type-A\r\n802.11ac Wi-Fi | Bluetooth 4.2\r\n1 x Gigabit Ethernet Port\r\nMagic Keyboard & Magic Mouse 2 Included\r\nmacOS Sierra', 48000000, 'Mac OS', '32GB of DDR4 RAM', '27″ 5120 x 2880 IPS Retina 5K Display', 'Magic Keyboard & Magic Mouse 2 Included', '1TB Fusion Drive', '3.5 GHz Intel Core i5 Quad-Core', 'AMD Radeon Pro 575 Graphics Card (4GB)', '', 2, '2020-12-01 21:13:12', 28, 1, 5, 0),
(13, 2, 4, 'CTO/BTO – iMac 2020 5K 27 inch – 3.8Ghz/Core i7/32GB/1TB/Pro 5700XT', 'Tình trạng: Mới 100%, Nguyên SealBox\r\nCPU: 3.8GHz 8‑core 10th-generation Intel Core i7, Turbo Boost up to 5.0GHz\r\nRam: 32GB of 2666MHz DDR4 memory (Max 128GB)\r\nStorage: 1TB SSD\r\nCard đồ hoạ: Radeon Pro 5700 XT with 16GB of GDDR6 memory\r\nMàn hình: 27 inch Retina 5K display display (5120 x 2880), 500 nits, True Tone\r\nKết nối: 4x USB 3.0, 2 Thunderbolt 3, LAN, 1x SDXC card, Jack 3.5mm\r\nPhụ Kiện: Body, Dây nguồn, Keyboard 2, Mouse 2', 85000000, 'Mac OS', '32GB of 2666MHz DDR4 memory (Max 128GB)', '27 inch Retina 5K display display (5120 x 2880), 500 nits, True Tone', 'Body, Dây nguồn, Keyboard 2, Mouse 2', '1TB SSD', '3.8GHz 8‑core 10th-generation Intel Core i7, Turbo Boost up to 5.0GHz', 'Radeon Pro 5700 XT with 16GB of GDDR6 memory', '', 6, '2020-12-04 21:16:47', 27, 1, 6, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `CategoryId` (`CategoryId`),
  ADD KEY `UpdatedBy` (`UpdatedBy`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `PRODUCT_CATEGORY_FK` FOREIGN KEY (`CategoryId`) REFERENCES `category` (`Id`),
  ADD CONSTRAINT `PRODUCT_UPDATED_BY_FK` FOREIGN KEY (`UpdatedBy`) REFERENCES `user` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

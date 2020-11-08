-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 07, 2020 at 03:28 PM
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
-- Database: `dungdepchaiqua`
--

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `Id` varchar(100) NOT NULL,
  `CategoryId` varchar(100) NOT NULL,
  `Description` varchar(100) NOT NULL,
  `Price` varchar(100) NOT NULL,
  `Ram` varchar(100) NOT NULL,
  `Os` varchar(100) NOT NULL,
  `Monitor` varchar(100) NOT NULL,
  `Mouse` varchar(100) NOT NULL,
  `Cpu` varchar(100) NOT NULL,
  `Psu` varchar(100) NOT NULL,
  `Gpu` varchar(100) NOT NULL,
  `Storage` varchar(100) NOT NULL,
  `Amount` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`Id`, `CategoryId`, `Description`, `Price`, `Ram`, `Os`, `Monitor`, `Mouse`, `Cpu`, `Psu`, `Gpu`, `Storage`, `Amount`) VALUES
('1', '1', 'PC HP 280 Pro G5 Microtower (9GD36PA) (i5-9400/4GB/1TB HDD/UHD 630/Free DOS)', '11.890.000', '1 x 4GB DDR4 2666MHz ( 2 Khe cắm Hỗ trợ tối đa 32GB )', 'Windows', 'Màn hình Acer 21.5\" HA220QA (1920 x 1080/IPS/86Hz/4 ms)', 'Chuột máy tính gaming Logitech G Pro Hero (910-005442)', 'Intel Core i5-9400 ( 2.90 GHz - 4.10 GHz / 9MB / 6 nhân, 6 luồng )', '', ' Intel UHD Graphics 630', '1TB HDD 7200RPM', 1),
('2', '2', 'PC HP 280 Pro G5 Microtower (9MS50PA) (i5-9400/8GB/1TB HDD/UHD 630/Free DOS)', '12.490.000', '1 x 8GB DDR4 2666MHz ( 2 Khe cắm Hỗ trợ tối đa 32GB )', 'Linux', 'Màn hình Acer 21.5\" HA220QA (1920 x 1080/IPS/86Hz/4 ms)', 'Chuột máy tính gaming Logitech G Pro Hero (910-005442)', 'Intel Core i5-9400 ( 2..90 GHz - 4.10 GHz / 9MB / 6 nhân, 6 luồng )', '', 'Intel UHD Graphics 630', '1TB HDD 7200RPM', 2),
('3', '3', 'PC ASUS ROG Huracan G21CN (G21CN-D-VN001T) (i5-9400F/8GB/256GB SSD/GeForce RTX 2060/Win10)', '29.990.000', '1 x 8GB DDR4 2666MHz ( 2 Khe cắm Hỗ trợ tối đa 16GB )', 'Windows', 'Màn hình Acer 21.5\" HA220QA (1920 x 1080/IPS/86Hz/4 ms)', 'Chuột máy tính gaming Logitech G Pro Hero (910-005442)', 'Intel Core i5-9400F ( 2.90GHz up to 4.10GHz / 9MB / 6 nhân, 6 luồng )', '', 'GeForce RTX 2060 6GB GDDR6', '256GB M.2 NVMe SSD', 3),
('4', '3', 'PC ASUS ROG Strix GL10CS-VN023T (i5-9400/8GB/512GB SSD/GeForce RTX 2060/Win10)', '24.490.000', '1 x 8GB DDR4 2666MHz ( 2 Khe cắm Hỗ trợ tối đa 32GB )', 'Window', 'Màn hình Acer 21.5\" HA220QA (1920 x 1080/IPS/86Hz/4 ms)', 'Chuột máy tính gaming Logitech G Pro Hero (910-005442)', 'Intel Core i5-9400 ( 2.90 GHz - 4.10 GHz / 9MB / 6 nhân, 6 luồng )', '', 'Intel UHD Graphics 630 / GeForce RTX 2060 6GB GDDR6', '512GB M.2 NVMe SSD', 2),
('5', '2', 'PC ASUS VivoMini VC66-CB5243MN (i5-8400/8GB/128GB SSD/UHD 630/Free DOS)', '16.290.000', '1 x 8GB DDR4 2400MHz (2 Khe cắm, Hỗ trợ tối đa 32GB)', 'Linux', 'Màn hình Acer 21.5\" HA220QA (1920 x 1080/IPS/86Hz/4 ms)', 'Chuột máy tính gaming Logitech G Pro Hero (910-005442)', 'Intel Core i5-8400 ( 2.80 GHz up to 4.00 GHz / 9MB / 6 nhân, 6 luồng )', '', 'Intel UHD Graphics 630', '128GB M.2 SATA SSD', 0),
('6', '4', 'ROG 10 X', '96,990,000', 'G.SKILL Trident Z RGB 2x8G Bus 3000', 'Windows', 'Màn hình Asus ROG Swift PG65UQ 65\" VA 4K 144Hz G-Sync', 'Chuột không dây Razer Naga Pro', 'Intel Core i7-10700KA Avengers Edition / 16MB / 3.8GHz / 8 Nhân 16 Luồng / LGA 1200', 'ASUS ROG Thor 850W Platinum', 'Asus ROG STRIX RTX 3090 24G GAMING', 'Samsung 970 Evo Plus 500G M.2 NVMe 500GB', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

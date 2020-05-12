-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 12, 2020 at 06:55 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.2.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cityhardware`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `category_code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_Name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `category_code`, `category_Name`, `created_at`, `updated_at`) VALUES
(1, 'COB', 'Steels', '2020-04-05 12:46:10', '2020-04-05 12:46:10'),
(2, 'HAR', 'Hardwares', '2020-04-05 12:47:14', '2020-04-05 12:47:14'),
(3, 'WIR', 'Wiring', '2020-04-05 12:51:14', '2020-04-05 12:51:14'),
(4, 'LMP', 'Lamps', '2020-04-05 12:52:11', '2020-04-05 12:52:11'),
(5, 'CUR', 'Motors', '2020-04-06 07:04:48', '2020-04-06 07:04:48'),
(6, 'TJ', 'Teejay', '2020-04-06 08:38:05', '2020-04-06 08:38:05'),
(7, 'SAR', 'SARANYA', '2020-04-07 09:42:25', '2020-04-07 09:42:25');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `customer_code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `customer_code`, `customer_name`, `address`, `contact`, `created_at`, `updated_at`) VALUES
(2, 'C001', 'Tharjalan Jeyaradnam', 'Atchuvely, North. Jaffna', '0773014681', '2020-04-04 06:08:09', '2020-04-04 06:08:09'),
(3, 'C002', 'Saranya Selvanesan', 'Navakuli ,Jaffna', '0773014681', '2020-04-04 06:10:09', '2020-04-04 06:10:09'),
(4, 'c003', 'xxx', 'colombo', '0775463214', '2020-04-16 09:35:00', '2020-04-16 09:35:00');

-- --------------------------------------------------------

--
-- Table structure for table `doc_settings`
--

CREATE TABLE `doc_settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `Prefix` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Next_No` int(11) NOT NULL,
  `Length` int(11) NOT NULL,
  `Code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `expences`
--

CREATE TABLE `expences` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `expence_type` bigint(20) UNSIGNED NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` double NOT NULL,
  `dated` date NOT NULL,
  `customer` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `expences`
--

INSERT INTO `expences` (`id`, `expence_type`, `description`, `amount`, `dated`, `customer`, `user_id`, `created_at`, `updated_at`) VALUES
(1, 1, 'This is for testing', 1000, '2020-01-09', 'Teejay', 1, '2020-05-02 11:14:53', '2020-05-02 11:14:53'),
(2, 2, 'tj', 500, '2020-01-22', 'Saran', 1, '2020-05-03 07:04:13', '2020-05-03 07:04:13'),
(3, 3, 'This is for testing', 1000, '2020-01-21', 'Saran', 1, '2020-05-03 07:04:29', '2020-05-03 07:04:29'),
(4, 2, 'Test', 500, '2020-01-31', 'robot', 1, '2020-05-03 07:43:04', '2020-05-03 07:43:04');

-- --------------------------------------------------------

--
-- Table structure for table `expences_types`
--

CREATE TABLE `expences_types` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `Types` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `expences_types`
--

INSERT INTO `expences_types` (`id`, `Types`, `created_at`, `updated_at`) VALUES
(1, 'Free of charge', NULL, NULL),
(2, 'Petty Cash', NULL, NULL),
(3, 'Service Charge', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `grn_details`
--

CREATE TABLE `grn_details` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `Quantity` double NOT NULL,
  `Unit_Price` double NOT NULL,
  `Net_Amount` double NOT NULL,
  `Discount` double NOT NULL,
  `Gross_Amount` double NOT NULL,
  `Item` bigint(20) UNSIGNED NOT NULL,
  `Grn_Header` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `grn_details`
--

INSERT INTO `grn_details` (`id`, `Quantity`, `Unit_Price`, `Net_Amount`, `Discount`, `Gross_Amount`, `Item`, `Grn_Header`, `created_at`, `updated_at`) VALUES
(1, 10, 80000, 800000, 0, 800000, 2, 2, '2020-05-10 09:05:06', '2020-05-10 09:05:06'),
(2, 20, 1500, 30000, 0, 30000, 4, 2, '2020-05-10 09:05:06', '2020-05-10 09:05:06'),
(3, 10, 11111, 111110, 10, 99999, 1, 3, '2020-05-10 10:11:12', '2020-05-10 10:11:12'),
(4, 10, 11111, 111110, 10, 99999, 1, 4, '2020-05-10 10:13:35', '2020-05-10 10:13:35'),
(5, 10, 11111, 111110, 10, 99999, 1, 5, '2020-05-10 10:18:53', '2020-05-10 10:18:53'),
(6, 10, 11111, 111110, 10, 99999, 1, 6, '2020-05-10 10:21:10', '2020-05-10 10:21:10'),
(7, 10, 11111, 111110, 10, 99999, 1, 7, '2020-05-10 10:22:25', '2020-05-10 10:22:25'),
(8, 10, 11111, 111110, 10, 99999, 1, 8, '2020-05-10 10:24:14', '2020-05-10 10:24:14'),
(9, 10, 11111, 111110, 10, 99999, 1, 9, '2020-05-10 10:26:49', '2020-05-10 10:26:49'),
(10, 10, 11111, 111110, 10, 99999, 1, 10, '2020-05-10 10:27:01', '2020-05-10 10:27:01'),
(11, 10, 11111, 111110, 10, 99999, 1, 11, '2020-05-10 10:27:08', '2020-05-10 10:27:08'),
(12, 10, 11111, 111110, 10, 99999, 1, 12, '2020-05-10 10:32:39', '2020-05-10 10:32:39'),
(13, 10, 11111, 111110, 10, 99999, 1, 13, '2020-05-10 10:38:26', '2020-05-10 10:38:26'),
(14, 10, 11111, 111110, 10, 99999, 1, 14, '2020-05-10 10:47:01', '2020-05-10 10:47:01'),
(15, 10, 11111, 111110, 10, 99999, 1, 15, '2020-05-10 10:47:28', '2020-05-10 10:47:28'),
(16, 10, 11111, 111110, 10, 99999, 1, 16, '2020-05-10 11:13:47', '2020-05-10 11:13:47'),
(17, 10, 11111, 111110, 10, 99999, 1, 17, '2020-05-10 11:14:57', '2020-05-10 11:14:57'),
(18, 10, 900, 9000, 1, 8910, 3, 18, '2020-05-10 11:15:57', '2020-05-10 11:15:57'),
(19, 10, 900, 9000, 1, 8910, 3, 19, '2020-05-10 11:20:22', '2020-05-10 11:20:22'),
(20, 10, 900, 9000, 1, 8910, 3, 20, '2020-05-10 11:20:46', '2020-05-10 11:20:46'),
(21, 10, 900, 9000, 1, 8910, 3, 21, '2020-05-10 11:27:14', '2020-05-10 11:27:14'),
(22, 10, 900, 9000, 1, 8910, 3, 22, '2020-05-10 11:34:58', '2020-05-10 11:34:58'),
(23, 20, 900, 18000, 0, 18000, 3, 23, '2020-05-10 11:37:35', '2020-05-10 11:37:35'),
(24, 20, 900, 18000, 0, 18000, 3, 24, '2020-05-11 06:11:29', '2020-05-11 06:11:29'),
(25, 20, 900, 18000, 0, 18000, 3, 25, '2020-05-11 06:11:59', '2020-05-11 06:11:59'),
(26, 20, 900, 18000, 0, 18000, 3, 26, '2020-05-11 06:13:34', '2020-05-11 06:13:34'),
(27, 20, 900, 18000, 0, 18000, 3, 27, '2020-05-11 06:14:02', '2020-05-11 06:14:02'),
(28, 10, 11111, 111110, 10, 99999, 1, 28, '2020-05-12 08:47:18', '2020-05-12 08:47:18'),
(29, 10, 11111, 111110, 10, 99999, 1, 29, '2020-05-12 08:48:46', '2020-05-12 08:48:46'),
(30, 10, 11111, 111110, 10, 99999, 1, 30, '2020-05-12 08:51:40', '2020-05-12 08:51:40'),
(31, 10, 11111, 111110, 10, 99999, 1, 31, '2020-05-12 08:54:28', '2020-05-12 08:54:28'),
(32, 10, 11111, 111110, 10, 99999, 1, 32, '2020-05-12 08:55:31', '2020-05-12 08:55:31'),
(33, 10, 11111, 111110, 10, 99999, 1, 33, '2020-05-12 08:59:22', '2020-05-12 08:59:22'),
(34, 10, 11111, 111110, 10, 99999, 1, 34, '2020-05-12 09:00:49', '2020-05-12 09:00:49'),
(35, 10, 11111, 111110, 10, 99999, 1, 35, '2020-05-12 09:23:27', '2020-05-12 09:23:27'),
(36, 10, 11111, 111110, 10, 99999, 1, 36, '2020-05-12 09:25:10', '2020-05-12 09:25:10'),
(37, 10, 11111, 111110, 10, 99999, 1, 37, '2020-05-12 09:25:41', '2020-05-12 09:25:41'),
(38, 10, 11111, 111110, 10, 99999, 1, 38, '2020-05-12 09:27:17', '2020-05-12 09:27:17'),
(39, 10, 11111, 111110, 10, 99999, 1, 39, '2020-05-12 09:31:01', '2020-05-12 09:31:01'),
(40, 10, 11111, 111110, 10, 99999, 1, 40, '2020-05-12 09:32:15', '2020-05-12 09:32:15'),
(41, 10, 11111, 111110, 10, 99999, 1, 41, '2020-05-12 09:33:06', '2020-05-12 09:33:06'),
(42, 10, 11111, 111110, 10, 99999, 1, 42, '2020-05-12 09:48:28', '2020-05-12 09:48:28'),
(43, 20, 11111, 222220, 10, 199998, 1, 43, '2020-05-12 09:50:58', '2020-05-12 09:50:58'),
(44, 20, 11111, 222220, 10, 199998, 1, 43, '2020-05-12 09:50:58', '2020-05-12 09:50:58');

-- --------------------------------------------------------

--
-- Table structure for table `grn_header`
--

CREATE TABLE `grn_header` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `Grn_Code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Grn_Invoice_Code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Due_Date` date NOT NULL,
  `Net_Amount` double NOT NULL,
  `Total_Discount` double NOT NULL,
  `Gross_Amount` double NOT NULL,
  `Payment_Type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Payment` double NOT NULL,
  `Balance` double NOT NULL,
  `Location` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `supplier_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `grn_header`
--

INSERT INTO `grn_header` (`id`, `Grn_Code`, `Grn_Invoice_Code`, `Due_Date`, `Net_Amount`, `Total_Discount`, `Gross_Amount`, `Payment_Type`, `Payment`, `Balance`, `Location`, `supplier_id`, `user_id`, `created_at`, `updated_at`) VALUES
(1, 'GRN000012', 'INV005', '2020-05-21', 27, 0, 27, 'CA', 0, 27, 'W', 1, 1, '2020-05-10 08:46:18', '2020-05-10 08:46:18'),
(2, 'GRN000012', 'INV007', '2020-05-13', 830000, 0, 830000, '', 0, 830000, 'W', 2, 1, '2020-05-10 09:05:06', '2020-05-10 09:05:06'),
(3, 'GRN000012', 'INV0007', '2020-05-07', 99999, 0, 99999, 'CA', 0, 99999, 'W', 3, 1, '2020-05-10 10:11:12', '2020-05-10 10:11:12'),
(4, 'GRN000012', 'INV0007', '2020-05-07', 99999, 0, 99999, 'CA', 0, 99999, 'W', 3, 1, '2020-05-10 10:13:35', '2020-05-10 10:13:35'),
(5, 'GRN000012', 'INV0007', '2020-05-07', 99999, 0, 99999, 'CA', 0, 99999, 'W', 3, 1, '2020-05-10 10:18:53', '2020-05-10 10:18:53'),
(6, 'GRN000012', 'INV0007', '2020-05-07', 99999, 0, 99999, 'CA', 0, 99999, 'W', 3, 1, '2020-05-10 10:21:10', '2020-05-10 10:21:10'),
(7, 'GRN000012', 'INV0007', '2020-05-07', 99999, 0, 99999, 'CA', 0, 99999, 'W', 3, 1, '2020-05-10 10:22:25', '2020-05-10 10:22:25'),
(8, 'GRN000012', 'INV0007', '2020-05-07', 99999, 0, 99999, 'CA', 0, 99999, 'W', 3, 1, '2020-05-10 10:24:14', '2020-05-10 10:24:14'),
(9, 'GRN000012', 'INV0007', '2020-05-07', 99999, 0, 99999, 'CA', 0, 99999, 'W', 3, 1, '2020-05-10 10:26:49', '2020-05-10 10:26:49'),
(10, 'GRN000012', 'INV0007', '2020-05-07', 99999, 0, 99999, 'CA', 0, 99999, 'W', 3, 1, '2020-05-10 10:27:01', '2020-05-10 10:27:01'),
(11, 'GRN000012', 'INV0007', '2020-05-07', 99999, 0, 99999, 'CA', 0, 99999, 'W', 3, 1, '2020-05-10 10:27:08', '2020-05-10 10:27:08'),
(12, 'GRN000012', 'INV0007', '2020-05-07', 99999, 0, 99999, 'CA', 0, 99999, 'W', 3, 1, '2020-05-10 10:32:39', '2020-05-10 10:32:39'),
(13, 'GRN000012', 'INV0007', '2020-05-07', 99999, 0, 99999, 'CA', 0, 99999, 'W', 3, 1, '2020-05-10 10:38:26', '2020-05-10 10:38:26'),
(14, 'GRN000012', 'INV0007', '2020-05-07', 99999, 0, 99999, 'CA', 0, 99999, 'W', 3, 1, '2020-05-10 10:47:01', '2020-05-10 10:47:01'),
(15, 'GRN000012', 'INV0007', '2020-05-07', 99999, 0, 99999, 'CA', 0, 99999, 'W', 3, 1, '2020-05-10 10:47:28', '2020-05-10 10:47:28'),
(16, 'GRN000012', 'INV0007', '2020-05-07', 99999, 0, 99999, 'CA', 0, 99999, 'W', 3, 1, '2020-05-10 11:13:47', '2020-05-10 11:13:47'),
(17, 'GRN000012', 'INV0007', '2020-05-07', 99999, 0, 99999, 'CA', 0, 99999, 'W', 3, 1, '2020-05-10 11:14:56', '2020-05-10 11:14:56'),
(18, 'GRN000012', 'INV005', '2020-05-06', 8910, 0, 8910, '', 0, 8910, 'W', 1, 1, '2020-05-10 11:15:57', '2020-05-10 11:15:57'),
(19, 'GRN000012', 'INV005', '2020-05-06', 8910, 0, 8910, '', 0, 8910, 'W', 1, 1, '2020-05-10 11:20:22', '2020-05-10 11:20:22'),
(20, 'GRN000012', 'INV005', '2020-05-06', 8910, 0, 8910, '', 0, 8910, 'W', 1, 1, '2020-05-10 11:20:45', '2020-05-10 11:20:45'),
(21, 'GRN000012', 'INV005', '2020-05-06', 8910, 0, 8910, '', 0, 8910, 'W', 1, 1, '2020-05-10 11:27:14', '2020-05-10 11:27:14'),
(22, 'GRN000012', 'INV005', '2020-05-06', 8910, 0, 8910, '', 0, 8910, 'W', 1, 1, '2020-05-10 11:34:58', '2020-05-10 11:34:58'),
(23, 'GRN000012', 'INV005', '2020-05-06', 18000, 0, 18000, 'CA', 0, 18000, 'W', 1, 1, '2020-05-10 11:37:34', '2020-05-10 11:37:34'),
(24, 'GRN000012', 'INV0005', '2020-05-06', 18000, 0, 18000, 'CA', 0, 18000, 'W', 2, 1, '2020-05-11 06:11:29', '2020-05-11 06:11:29'),
(25, 'GRN000012', 'INV0005', '2020-05-06', 18000, 0, 18000, 'CA', 0, 18000, 'W', 2, 1, '2020-05-11 06:11:59', '2020-05-11 06:11:59'),
(26, 'GRN000012', 'INV0005', '2020-05-06', 18000, 0, 18000, 'CA', 0, 18000, 'W', 2, 1, '2020-05-11 06:13:34', '2020-05-11 06:13:34'),
(27, 'GRN000012', 'INV0005', '2020-05-06', 18000, 0, 18000, 'CA', 0, 18000, 'W', 2, 1, '2020-05-11 06:14:02', '2020-05-11 06:14:02'),
(28, 'GRN000012', '', '2020-05-13', 99999, 0, 99999, 'CA', 10000, 89999, 'W', 2, 1, '2020-05-12 08:47:18', '2020-05-12 08:47:18'),
(29, 'GRN000012', '', '2020-05-13', 99999, 0, 99999, 'CA', 10000, 89999, 'W', 2, 1, '2020-05-12 08:48:45', '2020-05-12 08:48:45'),
(30, 'GRN000012', '', '2020-05-13', 99999, 0, 99999, 'CA', 10000, 89999, 'W', 2, 1, '2020-05-12 08:51:40', '2020-05-12 08:51:40'),
(31, 'GRN000012', 'INV005', '2020-05-13', 99999, 0, 99999, 'CA', 10000, 89999, 'W', 2, 1, '2020-05-12 08:54:28', '2020-05-12 08:54:28'),
(32, 'GRN000012', 'INV005', '2020-05-13', 99999, 0, 99999, 'CA', 10000, 89999, 'W', 2, 1, '2020-05-12 08:55:31', '2020-05-12 08:55:31'),
(33, 'GRN000012', 'INV005', '2020-05-13', 99999, 0, 99999, 'CA', 10000, 89999, 'W', 2, 1, '2020-05-12 08:59:22', '2020-05-12 08:59:22'),
(34, 'GRN000012', 'INV005', '2020-05-13', 99999, 0, 99999, 'CA', 10000, 89999, 'W', 2, 1, '2020-05-12 09:00:48', '2020-05-12 09:00:48'),
(35, 'GRN000012', 'INV005', '2020-05-13', 99999, 0, 99999, 'CA', 10000, 89999, 'W', 2, 1, '2020-05-12 09:23:27', '2020-05-12 09:23:27'),
(36, 'GRN000012', 'INV005', '2020-05-13', 99999, 0, 99999, 'CA', 10000, 89999, 'W', 2, 1, '2020-05-12 09:25:10', '2020-05-12 09:25:10'),
(37, 'GRN000012', 'INV005', '2020-05-13', 99999, 0, 99999, 'CA', 10000, 89999, 'W', 2, 1, '2020-05-12 09:25:41', '2020-05-12 09:25:41'),
(38, 'GRN000012', 'INV005', '2020-05-13', 99999, 0, 99999, 'CA', 10000, 89999, 'W', 2, 1, '2020-05-12 09:27:17', '2020-05-12 09:27:17'),
(39, 'GRN000012', 'INV005', '2020-05-13', 99999, 0, 99999, 'CA', 10000, 89999, 'W', 2, 1, '2020-05-12 09:31:00', '2020-05-12 09:31:00'),
(40, 'GRN000012', 'INV005', '2020-05-13', 99999, 0, 99999, 'CA', 10000, 89999, 'W', 2, 1, '2020-05-12 09:32:15', '2020-05-12 09:32:15'),
(41, 'GRN000012', 'INV005', '2020-05-13', 99999, 0, 99999, 'CA', 10000, 89999, 'W', 2, 1, '2020-05-12 09:33:06', '2020-05-12 09:33:06'),
(42, 'GRN000012', 'INV005', '2020-05-13', 99999, 0, 99999, 'CA', 10000, 89999, 'W', 2, 1, '2020-05-12 09:48:28', '2020-05-12 09:48:28'),
(43, 'GRN000012', 'INV005', '2020-05-06', 399996, 0, 399996, 'CA', 0, 399996, 'W', 2, 1, '2020-05-12 09:50:58', '2020-05-12 09:50:58');

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `item_code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `item_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `re_order_level` double NOT NULL,
  `selling_price` double NOT NULL,
  `label_price` double NOT NULL,
  `category` int(11) NOT NULL,
  `measure_unit` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `item_code`, `item_name`, `re_order_level`, `selling_price`, `label_price`, `category`, `measure_unit`, `created_at`, `updated_at`) VALUES
(1, 'I001', 'paint', 2, 22222, 11111, 5, 2, '2020-04-03 12:07:18', '2020-04-03 12:07:18'),
(2, 'I002', 'Sant', 2, 10000, 80000, 5, 1, '2020-04-03 12:09:34', '2020-04-03 12:09:34'),
(3, 'I003', 'Steel', 2, 1000, 900, 6, 1, '2020-04-04 04:16:56', '2020-04-04 04:16:56'),
(4, 'I004', 'Rod', 2, 2000, 1500, 6, 2, '2020-04-04 05:53:04', '2020-04-04 05:53:04'),
(5, 'cm', 'cm', 3, 3, 3, 6, 3, '2020-04-05 05:46:33', '2020-04-05 05:46:33'),
(6, 'tj001', 'paithyam', 100, 0, 0, 6, 1, '2020-04-07 09:41:32', '2020-04-07 09:41:32'),
(7, 'i007', 'ffhgjgjhuuu', 7, 123, 345, 1, 2, '2020-04-16 09:37:35', '2020-04-16 09:37:35');

-- --------------------------------------------------------

--
-- Table structure for table `locations`
--

CREATE TABLE `locations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `loc_code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `loc_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `locations`
--

INSERT INTO `locations` (`id`, `loc_code`, `loc_name`, `created_at`, `updated_at`) VALUES
(1, 'B1', 'Branch01', NULL, NULL),
(2, 'B2', 'Branch02', NULL, NULL),
(3, 'B3', 'Branch03', NULL, NULL),
(4, 'W', 'Warehouse', NULL, NULL),
(5, 'G', 'Goods', '2020-04-25 12:23:16', '2020-04-25 12:23:16'),
(6, 'H', 'Hats', '2020-04-25 12:24:30', '2020-04-25 12:24:30');

-- --------------------------------------------------------

--
-- Table structure for table `measurements`
--

CREATE TABLE `measurements` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `measurement_Name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `measurements`
--

INSERT INTO `measurements` (`id`, `measurement_Name`, `created_at`, `updated_at`) VALUES
(1, 'Liter', '2020-04-06 08:53:00', '2020-04-06 08:53:00'),
(2, 'metre', '2020-04-07 09:43:34', '2020-04-07 09:43:34'),
(3, 'kg', '2020-04-07 09:43:56', '2020-04-07 09:43:56');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2020_04_02_122413_create_permission_tables', 1),
(5, '2020_04_03_184908_create_items_table', 2),
(6, '2020_04_04_122616_create_customers_table', 3),
(7, '2020_04_04_190801_create_suppliers_table', 4),
(8, '2020_04_04_192035_create_suppliers_table', 5),
(9, '2020_04_05_193410_create_categories_table', 6),
(10, '2020_04_06_154700_create_measurements_table', 7),
(12, '2020_04_25_161828_create_locations_table', 8),
(16, '2020_05_01_181614_create_expences_types_table', 9),
(17, '2020_05_01_150227_create_expences_table', 10),
(25, '2020_05_08_174757_create_stocks_table', 12),
(26, '2020_05_08_180018_create_doc_settings_table', 13),
(27, '2020_05_08_181650_create_system_status_table', 14),
(28, '2020_05_08_151303_create_payments_table', 15),
(29, '2020_05_04_104717_create_grn_header_table', 16),
(30, '2020_05_04_120437_create__grn_details_table', 16);

-- --------------------------------------------------------

--
-- Table structure for table `model_has_permissions`
--

CREATE TABLE `model_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `model_has_roles`
--

CREATE TABLE `model_has_roles` (
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `model_has_roles`
--

INSERT INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
(1, 'App\\User', 1),
(3, 'App\\User', 4);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `password_resets`
--

INSERT INTO `password_resets` (`email`, `token`, `created_at`) VALUES
('saran@gmail.com', '$2y$10$VNHKwnvCP6cyjev59KhabuEeuJi7aEIXiMorTUGwNbU1NzVsWpp0m', '2020-04-23 06:14:51');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `Doc_Type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Doc_No` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Due_Amount` double NOT NULL,
  `Total_Discount` double NOT NULL,
  `Gross_Amount` double NOT NULL,
  `payement_Date` date NOT NULL,
  `System_Date` date NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `status` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'web', '2020-04-03 05:31:54', '2020-04-03 05:31:54'),
(2, 'Administer roles & permissions', 'web', '2020-04-03 05:32:01', '2020-04-03 05:32:01');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'web', '2020-04-03 05:32:19', '2020-04-03 05:32:19'),
(2, 'cashier', 'web', '2020-04-03 05:32:33', '2020-04-03 05:32:33'),
(3, 'wh_keeper', 'web', '2020-04-03 05:33:06', '2020-04-03 05:33:06');

-- --------------------------------------------------------

--
-- Table structure for table `role_has_permissions`
--

CREATE TABLE `role_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `role_has_permissions`
--

INSERT INTO `role_has_permissions` (`permission_id`, `role_id`) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `stocks`
--

CREATE TABLE `stocks` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `Quantity` double NOT NULL,
  `Average_Price` double NOT NULL,
  `Location` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Item` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `stocks`
--

INSERT INTO `stocks` (`id`, `Quantity`, `Average_Price`, `Location`, `Item`, `created_at`, `updated_at`) VALUES
(1, 20, 900, 'W', 3, '2020-05-10 11:34:58', '2020-05-11 06:14:02'),
(3, 20, 9999.9, 'W', 1, '2020-05-12 09:48:28', '2020-05-12 09:50:58');

-- --------------------------------------------------------

--
-- Table structure for table `suppliers`
--

CREATE TABLE `suppliers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `supplier_code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `supplier_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `suppliers`
--

INSERT INTO `suppliers` (`id`, `supplier_code`, `supplier_name`, `address`, `contact`, `created_at`, `updated_at`) VALUES
(1, 'S001', 'Saranya', 'Mars', '0774038291', '2020-04-04 12:24:51', '2020-04-04 12:24:51'),
(2, 'S002', 'TEEJAY', 'Jaffna', '0773014681', '2020-04-04 12:25:54', '2020-04-04 12:25:54'),
(3, 'Soo3', 'xxx', 'somewhare on earth', '0775463214', '2020-04-16 09:24:55', '2020-04-16 09:24:55');

-- --------------------------------------------------------

--
-- Table structure for table `system_status`
--

CREATE TABLE `system_status` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `Name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'saran', 'saran@gmail.com', NULL, '$2y$10$ezQEQLP.OQhi2EW05pcY3ukqjWcXG3xzbGTuocvuPGwtrY.r8uVXu', 'pf8wUYaSTGKoz96vKXPOp97GLwEEpBO2Ef2DqbUVAJyoLBYOjUQR6oUzNaX8', '2020-04-03 05:30:54', '2020-04-03 05:33:36'),
(3, 'Normal user', 'normal@gmail.com', NULL, '$2y$10$h2i3JITtuvXI8Up.lb6oge7HBzt39ZmCfn6nvvFQ51V8J0DLJPuBm', NULL, '2020-04-03 05:34:25', '2020-04-03 05:34:25'),
(4, 'tharju', 'tharju@gmail.com', NULL, '$2y$10$2F72POlj3I6fKTilF9vJFOp4oPQz4/tvWeofyMNTYCLvuNJKisbxa', NULL, '2020-04-07 09:50:04', '2020-04-07 09:50:04'),
(5, 'sathu', 'sathu@gmail.com', NULL, '$2y$10$465HVr0W1IF2oyDNI9GgheZrOU0pe5.jL2VFXPgbLkjpHKmL9iCVa', NULL, '2020-04-19 04:45:03', '2020-04-19 04:45:03');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `doc_settings`
--
ALTER TABLE `doc_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `expences`
--
ALTER TABLE `expences`
  ADD PRIMARY KEY (`id`),
  ADD KEY `expences_user_id_foreign` (`user_id`),
  ADD KEY `expences_expence_type_foreign` (`expence_type`);

--
-- Indexes for table `expences_types`
--
ALTER TABLE `expences_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `grn_details`
--
ALTER TABLE `grn_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `grn_details_item_foreign` (`Item`),
  ADD KEY `grn_details_grn_header_foreign` (`Grn_Header`);

--
-- Indexes for table `grn_header`
--
ALTER TABLE `grn_header`
  ADD PRIMARY KEY (`id`),
  ADD KEY `grn_header_user_id_foreign` (`user_id`),
  ADD KEY `grn_header_supplier_id_foreign` (`supplier_id`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `measurements`
--
ALTER TABLE `measurements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  ADD KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  ADD KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `payments_user_id_foreign` (`user_id`),
  ADD KEY `payments_status_foreign` (`status`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `role_has_permissions_role_id_foreign` (`role_id`);

--
-- Indexes for table `stocks`
--
ALTER TABLE `stocks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `stocks_item_foreign` (`Item`);

--
-- Indexes for table `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `system_status`
--
ALTER TABLE `system_status`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `doc_settings`
--
ALTER TABLE `doc_settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `expences`
--
ALTER TABLE `expences`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `expences_types`
--
ALTER TABLE `expences_types`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `grn_details`
--
ALTER TABLE `grn_details`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `grn_header`
--
ALTER TABLE `grn_header`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `locations`
--
ALTER TABLE `locations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `measurements`
--
ALTER TABLE `measurements`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `stocks`
--
ALTER TABLE `stocks`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `system_status`
--
ALTER TABLE `system_status`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `expences`
--
ALTER TABLE `expences`
  ADD CONSTRAINT `expences_expence_type_foreign` FOREIGN KEY (`expence_type`) REFERENCES `expences_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `expences_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `grn_details`
--
ALTER TABLE `grn_details`
  ADD CONSTRAINT `grn_details_grn_header_foreign` FOREIGN KEY (`Grn_Header`) REFERENCES `grn_header` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `grn_details_item_foreign` FOREIGN KEY (`Item`) REFERENCES `items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `grn_header`
--
ALTER TABLE `grn_header`
  ADD CONSTRAINT `grn_header_supplier_id_foreign` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `grn_header_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_status_foreign` FOREIGN KEY (`status`) REFERENCES `system_status` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `payments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `stocks`
--
ALTER TABLE `stocks`
  ADD CONSTRAINT `stocks_item_foreign` FOREIGN KEY (`Item`) REFERENCES `items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

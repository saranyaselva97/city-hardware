-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 10, 2020 at 08:10 AM
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
-- Table structure for table `cash_credit_acoount`
--

CREATE TABLE `cash_credit_acoount` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `Doc_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Doc_Id` int(11) NOT NULL,
  `Amount` double NOT NULL,
  `status` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cash_credit_acoount`
--

INSERT INTO `cash_credit_acoount` (`id`, `Doc_type`, `Doc_Id`, `Amount`, `status`, `user_id`, `created_at`, `updated_at`) VALUES
(1, 'GRN', 88, 111110, 2, 1, '2020-06-05 06:05:56', '2020-06-05 06:05:56'),
(2, 'GRN', 103, 9000, 2, 1, '2020-06-05 12:53:35', '2020-06-05 12:53:35'),
(3, 'GRN', 104, 9000, 2, 1, '2020-06-05 12:55:01', '2020-06-05 12:55:01'),
(4, 'GRN', 105, 9000, 2, 1, '2020-06-05 12:55:39', '2020-06-05 12:55:39'),
(5, 'GRN', 106, 9000, 2, 1, '2020-06-05 12:56:02', '2020-06-05 12:56:02'),
(6, 'GRN', 107, 9000, 2, 1, '2020-06-05 12:59:19', '2020-06-05 12:59:19'),
(7, 'GRN', 108, 9000, 2, 1, '2020-06-05 13:00:09', '2020-06-05 13:00:09'),
(8, 'GRN', 109, 9000, 2, 1, '2020-06-05 13:02:28', '2020-06-05 13:02:28'),
(9, 'GRN', 110, 9000, 2, 1, '2020-06-05 13:02:48', '2020-06-05 13:02:48'),
(10, 'INV', 32, 1800, 2, 1, '2020-06-06 07:42:07', '2020-06-06 07:42:07'),
(11, 'GRN', 111, 720000, 2, 1, '2020-06-06 07:52:14', '2020-06-06 07:52:14'),
(12, 'GRN', 112, 720000, 2, 1, '2020-06-06 07:52:48', '2020-06-06 07:52:48'),
(13, 'GRN', 113, 720000, 2, 1, '2020-06-06 07:53:38', '2020-06-06 07:53:38'),
(14, 'GRN', 114, 720000, 2, 1, '2020-06-06 07:54:16', '2020-06-06 07:54:16'),
(15, 'GRN', 115, 720000, 2, 1, '2020-06-06 08:31:07', '2020-06-06 08:31:07'),
(16, 'GRN', 116, 89999.1, 2, 1, '2020-06-10 05:25:50', '2020-06-10 05:25:50'),
(17, 'GRN', 117, 111110, 2, 1, '2020-06-10 06:23:03', '2020-06-10 06:23:03'),
(18, 'GRN', 118, 800000, 2, 1, '2020-06-10 08:01:23', '2020-06-10 08:01:23'),
(19, 'GRN', 119, 9000, 2, 1, '2020-06-10 08:45:30', '2020-06-10 08:45:30'),
(20, 'GRN', 120, 9000, 2, 1, '2020-06-10 08:46:55', '2020-06-10 08:46:55'),
(21, 'GRN', 121, 9000, 2, 1, '2020-06-10 08:53:39', '2020-06-10 08:53:39'),
(22, 'GRN', 122, 800000, 2, 1, '2020-06-11 00:59:41', '2020-06-11 00:59:41'),
(23, 'GRN', 123, 800000, 2, 1, '2020-06-11 01:00:15', '2020-06-11 01:00:15'),
(24, 'GRN', 124, 111110, 2, 1, '2020-06-11 01:38:21', '2020-06-11 01:38:21'),
(25, 'GRN', 125, 111110, 2, 1, '2020-06-11 01:41:13', '2020-06-11 01:41:13'),
(26, 'GRN', 126, 111110, 2, 1, '2020-06-11 01:43:12', '2020-06-11 01:43:12'),
(27, 'GRN', 127, 111110, 2, 1, '2020-06-11 01:45:13', '2020-06-11 01:45:13'),
(28, 'GRN', 128, 800000, 2, 1, '2020-06-11 01:45:51', '2020-06-11 01:45:51'),
(29, 'GRN', 129, 9000, 2, 1, '2020-06-11 01:56:24', '2020-06-11 01:56:24'),
(30, 'GRN', 130, 111110, 2, 1, '2020-06-11 01:58:37', '2020-06-11 01:58:37'),
(31, 'GRN', 131, 111110, 2, 1, '2020-06-11 02:00:58', '2020-06-11 02:00:58'),
(32, 'GRN', 132, 111110, 2, 1, '2020-06-11 02:04:21', '2020-06-11 02:04:21'),
(33, 'GRN', 133, 111110, 2, 1, '2020-06-11 02:25:53', '2020-06-11 02:25:53'),
(34, 'GRN', 134, 111110, 2, 1, '2020-06-11 02:45:26', '2020-06-11 02:45:26'),
(35, 'GRN', 135, 800000, 2, 1, '2020-06-11 02:59:30', '2020-06-11 02:59:30'),
(36, 'GRN', 136, 9000, 2, 1, '2020-06-11 03:00:36', '2020-06-11 03:00:36'),
(37, 'GRN', 137, 9000, 2, 1, '2020-06-11 03:01:22', '2020-06-11 03:01:22'),
(38, 'GRN', 138, 9000, 2, 1, '2020-06-11 03:01:48', '2020-06-11 03:01:48'),
(39, 'GRN', 139, 9000, 2, 1, '2020-06-11 03:17:40', '2020-06-11 03:17:40'),
(40, 'GRN', 140, 9000, 2, 1, '2020-06-11 04:20:30', '2020-06-11 04:20:30'),
(41, 'GRN', 141, 9000, 2, 1, '2020-06-11 04:22:56', '2020-06-11 04:22:56'),
(42, 'GRN', 142, 9000, 2, 1, '2020-06-11 04:24:46', '2020-06-11 04:24:46'),
(43, 'GRN', 143, 9000, 2, 1, '2020-06-11 04:26:28', '2020-06-11 04:26:28'),
(44, 'GRN', 144, 9000, 2, 1, '2020-06-11 04:27:30', '2020-06-11 04:27:30'),
(45, 'GRN', 145, 9000, 2, 1, '2020-06-11 04:36:44', '2020-06-11 04:36:44'),
(46, 'GRN', 146, 9000, 2, 1, '2020-06-11 04:58:11', '2020-06-11 04:58:11'),
(47, 'GRN', 147, 9000, 2, 1, '2020-06-11 04:58:57', '2020-06-11 04:58:57'),
(48, 'GRN', 148, 9000, 2, 1, '2020-06-11 05:01:21', '2020-06-11 05:01:21'),
(49, 'GRN', 149, 9000, 2, 1, '2020-06-11 05:02:58', '2020-06-11 05:02:58'),
(50, 'GRN', 150, 9000, 2, 1, '2020-06-11 05:03:19', '2020-06-11 05:03:19'),
(51, 'GRN', 151, 9000, 2, 1, '2020-06-11 05:04:04', '2020-06-11 05:04:04'),
(52, 'GRN', 152, 9000, 2, 1, '2020-06-11 05:19:42', '2020-06-11 05:19:42'),
(53, 'GRN', 153, 9000, 2, 1, '2020-06-11 05:23:09', '2020-06-11 05:23:09'),
(54, 'GRN', 154, 9000, 2, 1, '2020-06-11 05:23:34', '2020-06-11 05:23:34'),
(55, 'GRN', 155, 9000, 2, 1, '2020-06-11 05:27:00', '2020-06-11 05:27:00'),
(56, 'GRN', 156, 9000, 2, 1, '2020-06-11 05:27:39', '2020-06-11 05:27:39'),
(57, 'GRN', 157, 9000, 2, 1, '2020-06-11 05:28:04', '2020-06-11 05:28:04'),
(58, 'GRN', 158, 9000, 2, 1, '2020-06-11 05:28:43', '2020-06-11 05:28:43'),
(59, 'GRN', 159, 9000, 2, 1, '2020-06-11 05:39:01', '2020-06-11 05:39:01'),
(60, 'GRN', 160, 9000, 2, 1, '2020-06-11 05:39:27', '2020-06-11 05:39:27'),
(61, 'GRN', 161, 9000, 2, 1, '2020-06-11 05:39:54', '2020-06-11 05:39:54'),
(62, 'GRN', 162, 9000, 2, 1, '2020-06-11 05:40:07', '2020-06-11 05:40:07'),
(63, 'GRN', 163, 9000, 2, 1, '2020-06-11 05:40:34', '2020-06-11 05:40:34'),
(64, 'GRN', 164, 9000, 2, 1, '2020-06-11 05:41:12', '2020-06-11 05:41:12'),
(65, 'GRN', 165, 9000, 2, 1, '2020-06-11 05:44:17', '2020-06-11 05:44:17'),
(66, 'GRN', 166, 9000, 2, 1, '2020-06-11 05:46:57', '2020-06-11 05:46:57'),
(67, 'GRN', 167, 9000, 2, 1, '2020-06-11 05:48:19', '2020-06-11 05:48:19'),
(68, 'GRN', 168, 9000, 2, 1, '2020-06-11 05:49:40', '2020-06-11 05:49:40'),
(69, 'GRN', 169, 9000, 2, 1, '2020-06-11 05:50:11', '2020-06-11 05:50:11'),
(70, 'GRN', 170, 9000, 2, 1, '2020-06-11 05:51:34', '2020-06-11 05:51:34'),
(71, 'GRN', 171, 9000, 2, 1, '2020-06-11 05:52:56', '2020-06-11 05:52:56'),
(72, 'GRN', 172, 9000, 2, 1, '2020-06-11 05:55:38', '2020-06-11 05:55:38'),
(73, 'GRN', 173, 9000, 2, 1, '2020-06-11 05:56:36', '2020-06-11 05:56:36'),
(74, 'GRN', 174, 9000, 2, 1, '2020-06-11 05:58:00', '2020-06-11 05:58:00'),
(75, 'GRN', 175, 9000, 2, 1, '2020-06-11 05:58:11', '2020-06-11 05:58:11'),
(76, 'GRN', 176, 9000, 2, 1, '2020-06-11 05:58:29', '2020-06-11 05:58:29'),
(77, 'GRN', 177, 9000, 2, 1, '2020-06-11 05:58:49', '2020-06-11 05:58:49'),
(78, 'GRN', 178, 9000, 2, 1, '2020-06-11 06:01:18', '2020-06-11 06:01:18'),
(79, 'GRN', 179, 9000, 2, 1, '2020-06-11 06:04:52', '2020-06-11 06:04:52'),
(80, 'GRN', 180, 9000, 2, 1, '2020-06-11 06:05:28', '2020-06-11 06:05:28'),
(81, 'GRN', 181, 9000, 2, 1, '2020-06-11 06:05:50', '2020-06-11 06:05:50'),
(82, 'GRN', 182, 9000, 2, 1, '2020-06-11 06:07:23', '2020-06-11 06:07:23'),
(83, 'GRN', 183, 9000, 2, 1, '2020-06-11 06:08:25', '2020-06-11 06:08:25'),
(84, 'GRN', 184, 9000, 2, 1, '2020-06-11 06:09:44', '2020-06-11 06:09:44'),
(85, 'GRN', 185, 9000, 2, 1, '2020-06-11 06:11:45', '2020-06-11 06:11:45'),
(86, 'GRN', 186, 9000, 2, 1, '2020-06-11 06:12:49', '2020-06-11 06:12:49'),
(87, 'GRN', 187, 9000, 2, 1, '2020-06-11 06:13:00', '2020-06-11 06:13:00'),
(88, 'GRN', 188, 9000, 2, 1, '2020-06-11 06:13:33', '2020-06-11 06:13:33'),
(89, 'GRN', 189, 9000, 2, 1, '2020-06-11 06:13:47', '2020-06-11 06:13:47'),
(90, 'GRN', 190, 9000, 2, 1, '2020-06-11 06:17:18', '2020-06-11 06:17:18'),
(91, 'GRN', 191, 9000, 2, 1, '2020-06-11 06:21:38', '2020-06-11 06:21:38'),
(92, 'GRN', 192, 9000, 2, 1, '2020-06-11 06:21:59', '2020-06-11 06:21:59'),
(93, 'GRN', 193, 9000, 2, 1, '2020-06-11 06:22:35', '2020-06-11 06:22:35'),
(94, 'GRN', 194, 9000, 2, 1, '2020-06-11 06:22:55', '2020-06-11 06:22:55'),
(95, 'GRN', 195, 9000, 2, 1, '2020-06-11 06:23:22', '2020-06-11 06:23:22'),
(96, 'GRN', 215, 648000, 2, 1, '2020-06-11 07:01:40', '2020-06-11 07:01:40'),
(97, 'GRN', 216, 800000, 2, 1, '2020-06-28 05:45:47', '2020-06-28 05:45:47'),
(98, 'GRN', 217, 720000, 2, 1, '2020-06-28 05:51:07', '2020-06-28 05:51:07'),
(99, 'INV', 87, 9000, 2, 1, '2020-07-08 04:41:50', '2020-07-08 04:41:50'),
(100, 'GRN', 218, 111110, 2, 1, '2020-07-08 04:44:55', '2020-07-08 04:44:55'),
(101, 'INV', 89, 15000, 2, 1, '2020-07-08 05:12:37', '2020-07-08 05:12:37'),
(102, 'INV', 125, 8100, 2, 1, '2020-07-09 04:04:23', '2020-07-09 04:04:23'),
(103, 'INV', 126, 8100, 2, 1, '2020-07-09 04:04:27', '2020-07-09 04:04:27'),
(104, 'INV', 127, 8100, 2, 1, '2020-07-09 04:04:39', '2020-07-09 04:04:39'),
(105, 'INV', 128, 8100, 2, 1, '2020-07-09 04:05:39', '2020-07-09 04:05:39'),
(106, 'INV', 129, 8100, 2, 1, '2020-07-09 04:06:58', '2020-07-09 04:06:58'),
(107, 'INV', 130, 8100, 2, 1, '2020-07-09 04:17:31', '2020-07-09 04:17:31'),
(108, 'INV', 131, 8100, 2, 1, '2020-07-09 04:17:59', '2020-07-09 04:17:59'),
(109, 'INV', 132, 8100, 2, 1, '2020-07-09 04:18:50', '2020-07-09 04:18:50');

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
-- Table structure for table `cheques`
--

CREATE TABLE `cheques` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `Chq_Number` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Chq_Date` date NOT NULL,
  `Bank` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Amount` double NOT NULL,
  `Payment` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `status` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cheques`
--

INSERT INTO `cheques` (`id`, `Chq_Number`, `Chq_Date`, `Bank`, `Amount`, `Payment`, `user_id`, `status`, `created_at`, `updated_at`) VALUES
(1, '57373', '2020-06-24', 'Bank of Ceylon', 9000, 1, 1, 2, '2020-06-05 07:44:34', '2020-06-05 07:44:34'),
(2, '4727272', '2020-06-10', 'Bank of Ceylon', 0, 20, 1, 2, '2020-06-06 07:37:38', '2020-06-06 07:37:38'),
(3, '36161', '2020-06-18', 'Bank of Ceylon', 1620, 21, 1, 2, '2020-06-06 07:40:07', '2020-06-06 07:40:07');

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
(4, 'c003', 'xxx', 'colombo', '0775463214', '2020-04-16 09:35:00', '2020-04-16 09:35:00'),
(5, 'ueue', 'ueuee', 'eue', '585555', '2020-06-11 06:57:58', '2020-06-11 06:57:58');

-- --------------------------------------------------------

--
-- Table structure for table `doc_settings`
--

CREATE TABLE `doc_settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `Prefix` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Next_No` int(11) NOT NULL,
  `Length` int(11) NOT NULL,
  `Code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `doc_settings`
--

INSERT INTO `doc_settings` (`id`, `Prefix`, `Next_No`, `Length`, `Code`, `created_at`, `updated_at`) VALUES
(1, 'GRN', 23, 6, 'GRN', NULL, '2020-07-08 04:44:55'),
(2, 'INVB1', 9, 6, 'INVB1', NULL, '2020-07-09 04:18:50'),
(3, 'INVB2', 0, 6, 'INVB2', NULL, NULL),
(4, 'INVB3', 0, 6, 'INVB3', NULL, NULL),
(5, 'INVW', 1, 6, 'INVW', NULL, '2020-07-08 05:12:37'),
(6, 'FOC', 1, 6, 'FOC', NULL, '2020-06-06 07:45:18'),
(7, 'TNN', 1, 6, 'TNN', '2020-07-09 17:00:00', '2020-07-08 05:18:52'),
(8, 'SOR', 10, 6, 'SOR', NULL, '2020-07-09 04:06:37');

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
(4, 2, 'Test', 500, '2020-01-31', 'robot', 1, '2020-05-03 07:43:04', '2020-05-03 07:43:04'),
(5, 1, 'tj', 1000, '2020-01-05', 'Saran', 1, '2020-06-06 19:53:09', '2020-06-06 19:53:09');

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
(199, 10, 11111, 111110, 0, 111110, 1, 196, '2020-06-11 06:25:28', '2020-06-11 06:25:28'),
(200, 10, 1500, 15000, 0, 15000, 4, 196, '2020-06-11 06:25:29', '2020-06-11 06:25:29'),
(201, 10, 11111, 111110, 0, 111110, 1, 197, '2020-06-11 06:26:39', '2020-06-11 06:26:39'),
(202, 10, 1500, 15000, 0, 15000, 4, 197, '2020-06-11 06:26:39', '2020-06-11 06:26:39'),
(203, 10, 11111, 111110, 0, 111110, 1, 198, '2020-06-11 06:27:16', '2020-06-11 06:27:16'),
(204, 10, 1500, 15000, 0, 15000, 4, 198, '2020-06-11 06:27:17', '2020-06-11 06:27:17'),
(205, 10, 11111, 111110, 0, 111110, 1, 199, '2020-06-11 06:30:55', '2020-06-11 06:30:55'),
(206, 10, 1500, 15000, 0, 15000, 4, 199, '2020-06-11 06:30:55', '2020-06-11 06:30:55'),
(207, 10, 11111, 111110, 0, 111110, 1, 200, '2020-06-11 06:32:07', '2020-06-11 06:32:07'),
(208, 10, 1500, 15000, 0, 15000, 4, 200, '2020-06-11 06:32:07', '2020-06-11 06:32:07'),
(209, 10, 11111, 111110, 0, 111110, 1, 201, '2020-06-11 06:32:32', '2020-06-11 06:32:32'),
(210, 10, 1500, 15000, 0, 15000, 4, 201, '2020-06-11 06:32:32', '2020-06-11 06:32:32'),
(211, 10, 11111, 111110, 0, 111110, 1, 202, '2020-06-11 06:33:05', '2020-06-11 06:33:05'),
(212, 10, 1500, 15000, 0, 15000, 4, 202, '2020-06-11 06:33:06', '2020-06-11 06:33:06'),
(213, 10, 11111, 111110, 0, 111110, 1, 203, '2020-06-11 06:39:23', '2020-06-11 06:39:23'),
(214, 10, 1500, 15000, 0, 15000, 4, 203, '2020-06-11 06:39:23', '2020-06-11 06:39:23'),
(215, 10, 11111, 111110, 0, 111110, 1, 204, '2020-06-11 06:40:29', '2020-06-11 06:40:29'),
(216, 10, 1500, 15000, 0, 15000, 4, 204, '2020-06-11 06:40:29', '2020-06-11 06:40:29'),
(217, 10, 11111, 111110, 0, 111110, 1, 205, '2020-06-11 06:41:32', '2020-06-11 06:41:32'),
(218, 10, 1500, 15000, 0, 15000, 4, 205, '2020-06-11 06:41:32', '2020-06-11 06:41:32'),
(219, 10, 11111, 111110, 0, 111110, 1, 206, '2020-06-11 06:44:41', '2020-06-11 06:44:41'),
(220, 10, 1500, 15000, 0, 15000, 4, 206, '2020-06-11 06:44:41', '2020-06-11 06:44:41'),
(221, 10, 11111, 111110, 0, 111110, 1, 207, '2020-06-11 06:46:07', '2020-06-11 06:46:07'),
(222, 10, 1500, 15000, 0, 15000, 4, 207, '2020-06-11 06:46:07', '2020-06-11 06:46:07'),
(223, 10, 11111, 111110, 0, 111110, 1, 208, '2020-06-11 06:47:07', '2020-06-11 06:47:07'),
(224, 10, 1500, 15000, 0, 15000, 4, 208, '2020-06-11 06:47:07', '2020-06-11 06:47:07'),
(225, 10, 11111, 111110, 0, 111110, 1, 209, '2020-06-11 06:47:30', '2020-06-11 06:47:30'),
(226, 10, 1500, 15000, 0, 15000, 4, 209, '2020-06-11 06:47:30', '2020-06-11 06:47:30'),
(227, 10, 11111, 111110, 0, 111110, 1, 210, '2020-06-11 06:49:56', '2020-06-11 06:49:56'),
(228, 10, 1500, 15000, 0, 15000, 4, 210, '2020-06-11 06:49:56', '2020-06-11 06:49:56'),
(229, 10, 11111, 111110, 0, 111110, 1, 211, '2020-06-11 06:52:20', '2020-06-11 06:52:20'),
(230, 10, 1500, 15000, 0, 15000, 4, 211, '2020-06-11 06:52:21', '2020-06-11 06:52:21'),
(231, 10, 11111, 111110, 0, 111110, 1, 212, '2020-06-11 06:53:15', '2020-06-11 06:53:15'),
(232, 10, 1500, 15000, 0, 15000, 4, 212, '2020-06-11 06:53:15', '2020-06-11 06:53:15'),
(233, 10, 11111, 111110, 0, 111110, 1, 213, '2020-06-11 06:53:25', '2020-06-11 06:53:25'),
(234, 10, 1500, 15000, 0, 15000, 4, 213, '2020-06-11 06:53:26', '2020-06-11 06:53:26'),
(235, 10, 11111, 111110, 0, 111110, 1, 214, '2020-06-11 06:53:43', '2020-06-11 06:53:43'),
(236, 10, 1500, 15000, 0, 15000, 4, 214, '2020-06-11 06:53:43', '2020-06-11 06:53:43'),
(237, 10, 80000, 800000, 10, 720000, 2, 215, '2020-06-11 07:01:39', '2020-06-11 07:01:39'),
(238, 10, 80000, 800000, 0, 800000, 2, 216, '2020-06-28 05:45:46', '2020-06-28 05:45:46'),
(239, 10, 80000, 800000, 10, 720000, 2, 217, '2020-06-28 05:51:07', '2020-06-28 05:51:07'),
(240, 10, 11111, 111110, 0, 111110, 1, 218, '2020-07-08 04:44:55', '2020-07-08 04:44:55');

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
(196, 'GRN000001', 'INV005', '2020-06-03', 126110, 0, 126110, 'CA', 126110, 0, 'W', 1, 1, '2020-06-11 06:25:28', '2020-06-11 06:25:28'),
(197, 'GRN000001', 'INV005', '2020-06-03', 126110, 0, 126110, 'CA', 126110, 0, 'W', 1, 1, '2020-06-11 06:26:39', '2020-06-11 06:26:39'),
(198, 'GRN000001', 'INV005', '2020-06-03', 126110, 0, 126110, 'CA', 126110, 0, 'W', 1, 1, '2020-06-11 06:27:16', '2020-06-11 06:27:16'),
(199, 'GRN000001', 'INV005', '2020-06-03', 126110, 0, 126110, 'CA', 126110, 0, 'W', 1, 1, '2020-06-11 06:30:55', '2020-06-11 06:30:55'),
(200, 'GRN000001', 'INV005', '2020-06-03', 126110, 0, 126110, 'CA', 126110, 0, 'W', 1, 1, '2020-06-11 06:32:07', '2020-06-11 06:32:07'),
(201, 'GRN000001', 'INV005', '2020-06-03', 126110, 0, 126110, 'CA', 126110, 0, 'W', 1, 1, '2020-06-11 06:32:32', '2020-06-11 06:32:32'),
(202, 'GRN000001', 'INV005', '2020-06-03', 126110, 0, 126110, 'CA', 126110, 0, 'W', 1, 1, '2020-06-11 06:33:05', '2020-06-11 06:33:05'),
(203, 'GRN000001', 'INV005', '2020-06-03', 126110, 0, 126110, 'CA', 126110, 0, 'W', 1, 1, '2020-06-11 06:39:23', '2020-06-11 06:39:23'),
(204, 'GRN000001', 'INV005', '2020-06-03', 126110, 0, 126110, 'CA', 126110, 0, 'W', 1, 1, '2020-06-11 06:40:29', '2020-06-11 06:40:29'),
(205, 'GRN000001', 'INV005', '2020-06-03', 126110, 0, 126110, 'CA', 126110, 0, 'W', 1, 1, '2020-06-11 06:41:32', '2020-06-11 06:41:32'),
(206, 'GRN000001', 'INV005', '2020-06-03', 126110, 0, 126110, 'CA', 126110, 0, 'W', 1, 1, '2020-06-11 06:44:41', '2020-06-11 06:44:41'),
(207, 'GRN000001', 'INV005', '2020-06-03', 126110, 0, 126110, 'CA', 126110, 0, 'W', 1, 1, '2020-06-11 06:46:06', '2020-06-11 06:46:06'),
(208, 'GRN000001', 'INV005', '2020-06-03', 126110, 0, 126110, 'CA', 126110, 0, 'W', 1, 1, '2020-06-11 06:47:07', '2020-06-11 06:47:07'),
(209, 'GRN000001', 'INV005', '2020-06-03', 126110, 0, 126110, 'CA', 126110, 0, 'W', 1, 1, '2020-06-11 06:47:30', '2020-06-11 06:47:30'),
(210, 'GRN000001', 'INV005', '2020-06-03', 126110, 0, 126110, 'CA', 126110, 0, 'W', 1, 1, '2020-06-11 06:49:56', '2020-06-11 06:49:56'),
(211, 'GRN000001', 'INV005', '2020-06-03', 126110, 0, 126110, 'CA', 126110, 0, 'W', 1, 1, '2020-06-11 06:52:20', '2020-06-11 06:52:20'),
(212, 'GRN000001', 'INV005', '2020-06-03', 126110, 0, 126110, 'CA', 126110, 0, 'W', 1, 1, '2020-06-11 06:53:15', '2020-06-11 06:53:15'),
(213, 'GRN000001', 'INV005', '2020-06-03', 126110, 0, 126110, 'CA', 126110, 0, 'W', 1, 1, '2020-06-11 06:53:24', '2020-06-11 06:53:24'),
(214, 'GRN000001', 'INV005', '2020-06-03', 126110, 0, 126110, 'CA', 126110, 0, 'W', 1, 1, '2020-06-11 06:53:42', '2020-06-11 06:53:42'),
(215, 'GRN000020', 'inv003', '2020-06-11', 720000, 10, 648000, 'CA', 100000, 548000, 'W', 1, 1, '2020-06-11 07:01:39', '2020-06-11 07:01:39'),
(216, 'GRN000021', 'inv25252', '2020-06-05', 800000, 0, 800000, 'CA', 0, 800000, 'W', 1, 1, '2020-06-28 05:45:44', '2020-06-28 05:45:44'),
(217, 'GRN000022', 'nv003', '2020-06-10', 720000, 0, 720000, 'CA', 0, 720000, 'W', 1, 1, '2020-06-28 05:51:07', '2020-06-28 05:51:07'),
(218, 'GRN000023', 'in444', '2020-07-03', 111110, 0, 111110, 'CR', 0, 111110, 'W', 1, 1, '2020-07-08 04:44:54', '2020-07-08 04:44:54');

-- --------------------------------------------------------

--
-- Table structure for table `invoice_details`
--

CREATE TABLE `invoice_details` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `Quantity` double NOT NULL,
  `Unit_Price` double NOT NULL,
  `Net_Amount` double NOT NULL,
  `Discount` double NOT NULL,
  `Discount_Price` double NOT NULL,
  `Gross_Amount` double NOT NULL,
  `Profit` double NOT NULL,
  `Item` bigint(20) UNSIGNED NOT NULL,
  `Invoice_Header` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `invoice_details`
--

INSERT INTO `invoice_details` (`id`, `Quantity`, `Unit_Price`, `Net_Amount`, `Discount`, `Discount_Price`, `Gross_Amount`, `Profit`, `Item`, `Invoice_Header`, `created_at`, `updated_at`) VALUES
(91, 10, 900, 9000, 10, 900, 8100, 7100, 3, 129, '2020-07-09 04:06:57', '2020-07-09 04:06:57'),
(92, 10, 900, 9000, 10, 900, 8100, 7100, 3, 130, '2020-07-09 04:17:31', '2020-07-09 04:17:31'),
(93, 10, 900, 9000, 10, 900, 8100, 7100, 3, 131, '2020-07-09 04:17:59', '2020-07-09 04:17:59'),
(94, 10, 900, 9000, 10, 900, 8100, 7100, 3, 132, '2020-07-09 04:18:49', '2020-07-09 04:18:49');

-- --------------------------------------------------------

--
-- Table structure for table `invoice_header`
--

CREATE TABLE `invoice_header` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `Invoice_Number` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Invoice_Date` date NOT NULL,
  `Net_Amount` double NOT NULL,
  `Total_Discount` double NOT NULL,
  `Gross_Amount` double NOT NULL,
  `Payment_Type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Payment` double NOT NULL,
  `Balance` double NOT NULL,
  `Location` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `status` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `invoice_header`
--

INSERT INTO `invoice_header` (`id`, `Invoice_Number`, `Invoice_Date`, `Net_Amount`, `Total_Discount`, `Gross_Amount`, `Payment_Type`, `Payment`, `Balance`, `Location`, `customer_id`, `user_id`, `status`, `created_at`, `updated_at`) VALUES
(129, 'INVB1000006', '2020-03-29', 8100, 0, 8100, 'CR', 0, 8100, 'B1', 3, 1, 2, '2020-07-09 04:06:57', '2020-07-09 04:06:57'),
(130, 'INVB1000006', '2020-03-29', 8100, 0, 8100, 'CR', 0, 8100, 'B1', 3, 1, 2, '2020-07-09 04:17:31', '2020-07-09 04:17:31'),
(131, 'INVB1000006', '2020-03-29', 8100, 0, 8100, 'CR', 0, 8100, 'B1', 3, 1, 2, '2020-07-09 04:17:58', '2020-07-09 04:17:58'),
(132, 'INVB1000006', '2020-03-29', 8100, 0, 8100, 'CR', 0, 8100, 'B1', 3, 1, 2, '2020-07-09 04:18:49', '2020-07-09 04:18:49');

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
-- Table structure for table `item_transfer_historys`
--

CREATE TABLE `item_transfer_historys` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `Transfer_Number` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `From_location` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `To_location` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Quantity` double NOT NULL,
  `Item` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `item_transfer_historys`
--

INSERT INTO `item_transfer_historys` (`id`, `Transfer_Number`, `From_location`, `To_location`, `Quantity`, `Item`, `user_id`, `created_at`, `updated_at`) VALUES
(3, 'TNN000001', 'W', 'B1', 3, 4, 1, '2020-07-03 10:28:17', '2020-07-03 10:28:17'),
(4, 'TNN000001', 'W', 'B1', 10, 3, 1, '2020-07-03 11:36:30', '2020-07-03 11:36:30'),
(5, 'TNN000001', 'W', 'B1', 10, 3, 1, '2020-07-03 11:37:14', '2020-07-03 11:37:14'),
(6, 'TNN000001', 'W', 'B1', 10, 3, 1, '2020-07-03 11:37:53', '2020-07-03 11:37:53'),
(7, 'TNN000001', 'W', 'B1', 10, 3, 1, '2020-07-03 11:41:14', '2020-07-03 11:41:14'),
(8, 'TNN000002', 'W', 'B1', 10, 2, 1, '2020-07-08 04:48:22', '2020-07-08 04:48:22'),
(9, 'TNN000002', 'W', 'B3', 10, 2, 1, '2020-07-08 04:48:44', '2020-07-08 04:48:44'),
(10, 'TNN000002', 'W', 'B1', 122, 2, 1, '2020-07-08 04:49:46', '2020-07-08 04:49:46'),
(11, 'TNN000002', 'W', 'B1', 122, 2, 1, '2020-07-08 04:51:54', '2020-07-08 04:51:54'),
(12, 'TNN000002', 'W', 'B1', 122, 2, 1, '2020-07-08 04:52:03', '2020-07-08 04:52:03'),
(13, 'TNN000002', 'W', 'B2', 10, 3, 1, '2020-07-08 04:52:36', '2020-07-08 04:52:36'),
(14, 'TNN000002', 'W', 'B2', 10, 3, 1, '2020-07-08 04:57:47', '2020-07-08 04:57:47'),
(15, 'TNN000002', 'W', 'B2', 10, 3, 1, '2020-07-08 04:59:19', '2020-07-08 04:59:19'),
(16, 'TNN000002', 'W', 'B2', 10, 3, 1, '2020-07-08 05:00:51', '2020-07-08 05:00:51'),
(17, 'TNN000002', 'W', 'B2', 10, 3, 1, '2020-07-08 05:02:24', '2020-07-08 05:02:24'),
(18, 'TNN000002', 'W', 'B1', 10, 3, 1, '2020-07-08 05:17:55', '2020-07-08 05:17:55'),
(19, 'TNN000002', 'W', 'B1', 10, 3, 1, '2020-07-08 05:18:52', '2020-07-08 05:18:52');

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
(4, 'W', 'Warehouse', NULL, NULL);

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
(27, '2020_05_08_181650_create_system_status_table', 14),
(29, '2020_05_04_104717_create_grn_header_table', 16),
(30, '2020_05_04_120437_create__grn_details_table', 16),
(31, '2020_05_08_180018_create_doc_settings_table', 17),
(32, '2020_05_25_113209_create_invoice_header_table', 18),
(33, '2020_05_25_114108_create_invoice_details_table', 18),
(36, '2020_05_25_142029_create_transactions_table', 19),
(38, '2020_06_05_100911_create_cash_credit_acoount_table', 20),
(41, '2020_05_08_151303_create_payments_table', 21),
(42, '2020_06_02_125334_create_cheques_table', 21),
(43, '2020_07_03_163340_create_item_transfer_historys_table', 22),
(44, '2020_07_08_065350_create_sales_order_header_table', 23),
(45, '2020_07_08_072811_create_sales_order_details_table', 23);

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
  `Payment_Amount` double NOT NULL,
  `Balance` double NOT NULL,
  `Payment_Type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Payment_Date` date NOT NULL,
  `System_Date` date NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `status` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `Doc_Type`, `Doc_No`, `Due_Amount`, `Payment_Amount`, `Balance`, `Payment_Type`, `Payment_Date`, `System_Date`, `user_id`, `status`, `created_at`, `updated_at`) VALUES
(1, 'GRN', 'GRN000018', 9000, 9000, 0, 'CA', '2020-06-05', '2020-06-05', 1, 2, '2020-06-05 07:44:34', '2020-06-05 07:44:34'),
(2, 'GRN', 'GRN000019', 9000, 0, 9000, 'CA', '2020-06-05', '2020-06-05', 1, 2, '2020-06-05 12:53:35', '2020-06-05 12:53:35'),
(3, 'GRN', 'GRN000019', 9000, 0, 9000, 'CA', '2020-06-05', '2020-06-05', 1, 2, '2020-06-05 12:55:01', '2020-06-05 12:55:01'),
(4, 'GRN', 'GRN000019', 9000, 0, 9000, 'CA', '2020-06-05', '2020-06-05', 1, 2, '2020-06-05 12:55:39', '2020-06-05 12:55:39'),
(5, 'GRN', 'GRN000019', 9000, 0, 9000, 'CA', '2020-06-05', '2020-06-05', 1, 2, '2020-06-05 12:56:01', '2020-06-05 12:56:01'),
(6, 'GRN', 'GRN000019', 9000, 0, 9000, 'CA', '2020-06-05', '2020-06-05', 1, 2, '2020-06-05 12:59:19', '2020-06-05 12:59:19'),
(7, 'GRN', 'GRN000019', 9000, 0, 9000, 'CA', '2020-06-05', '2020-06-05', 1, 2, '2020-06-05 13:00:09', '2020-06-05 13:00:09'),
(8, 'GRN', 'GRN000019', 9000, 0, 9000, 'CA', '2020-06-05', '2020-06-05', 1, 2, '2020-06-05 13:02:27', '2020-06-05 13:02:27'),
(9, 'GRN', 'GRN000019', 9000, 0, 9000, 'CA', '2020-06-05', '2020-06-05', 1, 2, '2020-06-05 13:02:48', '2020-06-05 13:02:48'),
(10, 'GRN', 'INVB1000001', 8100, 8100, 0, 'CA', '2020-06-06', '2020-06-06', 1, 2, '2020-06-06 06:47:35', '2020-06-06 06:47:35'),
(11, 'INV', 'INVB1000002', 2430, 2430, 0, 'CA', '2020-06-06', '2020-06-06', 1, 2, '2020-06-06 06:50:04', '2020-06-06 06:50:04'),
(12, 'INV', 'INVB1000002', 2430, 2430, 0, 'CA', '2020-06-06', '2020-06-06', 1, 2, '2020-06-06 06:58:56', '2020-06-06 06:58:56'),
(13, 'INV', 'INVB1000002', 9000, 9000, 0, 'CA', '2020-06-06', '2020-06-06', 1, 2, '2020-06-06 07:06:37', '2020-06-06 07:06:37'),
(14, 'INV', 'INVB1000002', 9000, 9000, 0, 'CA', '2020-06-06', '2020-06-06', 1, 2, '2020-06-06 07:11:13', '2020-06-06 07:11:13'),
(15, 'INV', 'INVB1000002', 9000, 9000, 0, 'CA', '2020-06-06', '2020-06-06', 1, 2, '2020-06-06 07:12:59', '2020-06-06 07:12:59'),
(16, 'INV', 'INVB1000002', 9000, 9000, 0, 'CA', '2020-06-06', '2020-06-06', 1, 2, '2020-06-06 07:20:51', '2020-06-06 07:20:51'),
(17, 'INV', 'INVB1000002', 9000, 9000, 0, 'CA', '2020-06-06', '2020-06-06', 1, 2, '2020-06-06 07:22:58', '2020-06-06 07:22:58'),
(18, 'INV', 'INVB1000002', 9000, 9000, 0, 'CA', '2020-06-06', '2020-06-06', 1, 2, '2020-06-06 07:34:02', '2020-06-06 07:34:02'),
(19, 'INV', 'INVB1000002', 1800, 1800, 0, 'CA', '2020-06-06', '2020-06-06', 1, 2, '2020-06-06 07:35:26', '2020-06-06 07:35:26'),
(20, 'INV', 'INVB1000002', 1800, 1800, 0, 'CA', '2020-06-06', '2020-06-06', 1, 2, '2020-06-06 07:37:38', '2020-06-06 07:37:38'),
(21, 'INV', 'INVB1000002', 1620, 1620, 0, 'CA', '2020-06-06', '2020-06-06', 1, 2, '2020-06-06 07:40:07', '2020-06-06 07:40:07'),
(22, 'GRN', 'GRN000027', 720000, 0, 720000, 'CA', '2020-06-06', '2020-06-06', 1, 2, '2020-06-06 07:52:14', '2020-06-06 07:52:14'),
(23, 'GRN', 'GRN000027', 720000, 0, 720000, 'CA', '2020-06-06', '2020-06-06', 1, 2, '2020-06-06 07:52:48', '2020-06-06 07:52:48'),
(24, 'GRN', 'GRN000027', 720000, 0, 720000, 'CA', '2020-06-06', '2020-06-06', 1, 2, '2020-06-06 07:53:38', '2020-06-06 07:53:38'),
(25, 'GRN', 'GRN000027', 720000, 0, 720000, 'CA', '2020-06-06', '2020-06-06', 1, 2, '2020-06-06 07:54:16', '2020-06-06 07:54:16'),
(26, 'GRN', 'GRN000031', 720000, 0, 720000, 'CA', '2020-06-06', '2020-06-06', 1, 2, '2020-06-06 08:31:07', '2020-06-06 08:31:07'),
(27, 'GRN', 'INVB1000002', 9000, 9000, 0, 'CA', '2020-06-06', '2020-06-06', 1, 2, '2020-06-06 08:49:03', '2020-06-06 08:49:03'),
(28, 'GRN', 'GRN000032', 89999.1, 0, 89999.1, 'CA', '2020-06-10', '2020-06-10', 1, 2, '2020-06-10 05:25:50', '2020-06-10 05:25:50'),
(29, 'GRN', 'GRN000033', 111110, 0, 111110, 'CA', '2020-06-10', '2020-06-10', 1, 2, '2020-06-10 06:23:02', '2020-06-10 06:23:02'),
(30, 'GRN', 'GRN000034', 800000, 0, 800000, 'CA', '2020-06-10', '2020-06-10', 1, 2, '2020-06-10 08:01:23', '2020-06-10 08:01:23'),
(31, 'GRN', 'GRN000035', 9000, 0, 9000, 'CA', '2020-06-10', '2020-06-10', 1, 2, '2020-06-10 08:45:30', '2020-06-10 08:45:30'),
(32, 'GRN', 'GRN000035', 9000, 0, 9000, 'CA', '2020-06-10', '2020-06-10', 1, 2, '2020-06-10 08:46:55', '2020-06-10 08:46:55'),
(33, 'GRN', 'GRN000035', 9000, 0, 9000, 'CA', '2020-06-10', '2020-06-10', 1, 2, '2020-06-10 08:53:39', '2020-06-10 08:53:39'),
(34, 'GRN', 'GRN000038', 800000, 0, 800000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 00:59:41', '2020-06-11 00:59:41'),
(35, 'GRN', 'GRN000038', 800000, 0, 800000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 01:00:15', '2020-06-11 01:00:15'),
(36, 'GRN', 'GRN000001', 111110, 0, 111110, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 01:38:21', '2020-06-11 01:38:21'),
(37, 'GRN', 'GRN000002', 111110, 0, 111110, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 01:41:13', '2020-06-11 01:41:13'),
(38, 'GRN', 'GRN000002', 111110, 0, 111110, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 01:43:12', '2020-06-11 01:43:12'),
(39, 'GRN', 'GRN000002', 111110, 0, 111110, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 01:45:13', '2020-06-11 01:45:13'),
(40, 'GRN', 'GRN000004', 800000, 0, 800000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 01:45:51', '2020-06-11 01:45:51'),
(41, 'GRN', 'GRN000005', 9000, 0, 9000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 01:56:24', '2020-06-11 01:56:24'),
(42, 'GRN', 'GRN000006', 111110, 0, 111110, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 01:58:37', '2020-06-11 01:58:37'),
(43, 'GRN', 'GRN000007', 111110, 0, 111110, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 02:00:58', '2020-06-11 02:00:58'),
(44, 'GRN', 'GRN000008', 111110, 0, 111110, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 02:04:21', '2020-06-11 02:04:21'),
(45, 'GRN', 'GRN000009', 111110, 0, 111110, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 02:25:53', '2020-06-11 02:25:53'),
(46, 'GRN', 'GRN000009', 111110, 0, 111110, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 02:45:26', '2020-06-11 02:45:26'),
(47, 'GRN', 'GRN000011', 800000, 0, 800000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 02:59:30', '2020-06-11 02:59:30'),
(48, 'GRN', 'GRN000012', 9000, 0, 9000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 03:00:36', '2020-06-11 03:00:36'),
(49, 'GRN', 'GRN000012', 9000, 0, 9000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 03:01:22', '2020-06-11 03:01:22'),
(50, 'GRN', 'GRN000012', 9000, 0, 9000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 03:01:48', '2020-06-11 03:01:48'),
(51, 'GRN', 'GRN000012', 9000, 0, 9000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 03:17:39', '2020-06-11 03:17:39'),
(52, 'GRN', 'GRN000012', 9000, 0, 9000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 04:20:30', '2020-06-11 04:20:30'),
(53, 'GRN', 'GRN000012', 9000, 0, 9000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 04:22:56', '2020-06-11 04:22:56'),
(54, 'GRN', 'GRN000012', 9000, 0, 9000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 04:24:46', '2020-06-11 04:24:46'),
(55, 'GRN', 'GRN000012', 9000, 0, 9000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 04:26:27', '2020-06-11 04:26:27'),
(56, 'GRN', 'GRN000012', 9000, 0, 9000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 04:27:30', '2020-06-11 04:27:30'),
(57, 'GRN', 'GRN000012', 9000, 0, 9000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 04:36:44', '2020-06-11 04:36:44'),
(58, 'GRN', 'GRN000012', 9000, 0, 9000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 04:58:11', '2020-06-11 04:58:11'),
(59, 'GRN', 'GRN000012', 9000, 0, 9000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 04:58:57', '2020-06-11 04:58:57'),
(60, 'GRN', 'GRN000012', 9000, 0, 9000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 05:01:21', '2020-06-11 05:01:21'),
(61, 'GRN', 'GRN000012', 9000, 0, 9000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 05:02:58', '2020-06-11 05:02:58'),
(62, 'GRN', 'GRN000012', 9000, 0, 9000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 05:03:19', '2020-06-11 05:03:19'),
(63, 'GRN', 'GRN000012', 9000, 0, 9000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 05:04:04', '2020-06-11 05:04:04'),
(64, 'GRN', 'GRN000012', 9000, 0, 9000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 05:19:42', '2020-06-11 05:19:42'),
(65, 'GRN', 'GRN000012', 9000, 0, 9000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 05:23:09', '2020-06-11 05:23:09'),
(66, 'GRN', 'GRN000012', 9000, 0, 9000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 05:23:34', '2020-06-11 05:23:34'),
(67, 'GRN', 'GRN000012', 9000, 0, 9000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 05:27:00', '2020-06-11 05:27:00'),
(68, 'GRN', 'GRN000012', 9000, 0, 9000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 05:27:38', '2020-06-11 05:27:38'),
(69, 'GRN', 'GRN000012', 9000, 0, 9000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 05:28:04', '2020-06-11 05:28:04'),
(70, 'GRN', 'GRN000012', 9000, 0, 9000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 05:28:43', '2020-06-11 05:28:43'),
(71, 'GRN', 'GRN000012', 9000, 0, 9000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 05:39:01', '2020-06-11 05:39:01'),
(72, 'GRN', 'GRN000012', 9000, 0, 9000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 05:39:27', '2020-06-11 05:39:27'),
(73, 'GRN', 'GRN000012', 9000, 0, 9000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 05:39:54', '2020-06-11 05:39:54'),
(74, 'GRN', 'GRN000012', 9000, 0, 9000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 05:40:07', '2020-06-11 05:40:07'),
(75, 'GRN', 'GRN000012', 9000, 0, 9000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 05:40:34', '2020-06-11 05:40:34'),
(76, 'GRN', 'GRN000012', 9000, 0, 9000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 05:41:12', '2020-06-11 05:41:12'),
(77, 'GRN', 'GRN000012', 9000, 0, 9000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 05:44:17', '2020-06-11 05:44:17'),
(78, 'GRN', 'GRN000012', 9000, 0, 9000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 05:46:57', '2020-06-11 05:46:57'),
(79, 'GRN', 'GRN000012', 9000, 0, 9000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 05:48:19', '2020-06-11 05:48:19'),
(80, 'GRN', 'GRN000012', 9000, 0, 9000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 05:49:40', '2020-06-11 05:49:40'),
(81, 'GRN', 'GRN000012', 9000, 0, 9000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 05:50:11', '2020-06-11 05:50:11'),
(82, 'GRN', 'GRN000012', 9000, 0, 9000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 05:51:33', '2020-06-11 05:51:33'),
(83, 'GRN', 'GRN000012', 9000, 0, 9000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 05:52:56', '2020-06-11 05:52:56'),
(84, 'GRN', 'GRN000012', 9000, 0, 9000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 05:55:38', '2020-06-11 05:55:38'),
(85, 'GRN', 'GRN000012', 9000, 0, 9000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 05:56:36', '2020-06-11 05:56:36'),
(86, 'GRN', 'GRN000012', 9000, 0, 9000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 05:58:00', '2020-06-11 05:58:00'),
(87, 'GRN', 'GRN000012', 9000, 0, 9000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 05:58:10', '2020-06-11 05:58:10'),
(88, 'GRN', 'GRN000012', 9000, 0, 9000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 05:58:29', '2020-06-11 05:58:29'),
(89, 'GRN', 'GRN000012', 9000, 0, 9000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 05:58:49', '2020-06-11 05:58:49'),
(90, 'GRN', 'GRN000012', 9000, 0, 9000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 06:01:18', '2020-06-11 06:01:18'),
(91, 'GRN', 'GRN000012', 9000, 0, 9000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 06:04:52', '2020-06-11 06:04:52'),
(92, 'GRN', 'GRN000012', 9000, 0, 9000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 06:05:28', '2020-06-11 06:05:28'),
(93, 'GRN', 'GRN000012', 9000, 0, 9000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 06:05:50', '2020-06-11 06:05:50'),
(94, 'GRN', 'GRN000012', 9000, 0, 9000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 06:07:23', '2020-06-11 06:07:23'),
(95, 'GRN', 'GRN000012', 9000, 0, 9000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 06:08:25', '2020-06-11 06:08:25'),
(96, 'GRN', 'GRN000012', 9000, 0, 9000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 06:09:44', '2020-06-11 06:09:44'),
(97, 'GRN', 'GRN000012', 9000, 0, 9000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 06:11:45', '2020-06-11 06:11:45'),
(98, 'GRN', 'GRN000012', 9000, 0, 9000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 06:12:49', '2020-06-11 06:12:49'),
(99, 'GRN', 'GRN000012', 9000, 0, 9000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 06:13:00', '2020-06-11 06:13:00'),
(100, 'GRN', 'GRN000012', 9000, 0, 9000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 06:13:33', '2020-06-11 06:13:33'),
(101, 'GRN', 'GRN000012', 9000, 0, 9000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 06:13:47', '2020-06-11 06:13:47'),
(102, 'GRN', 'GRN000012', 9000, 0, 9000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 06:17:17', '2020-06-11 06:17:17'),
(103, 'GRN', 'GRN000012', 9000, 0, 9000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 06:21:38', '2020-06-11 06:21:38'),
(104, 'GRN', 'GRN000012', 9000, 0, 9000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 06:21:59', '2020-06-11 06:21:59'),
(105, 'GRN', 'GRN000012', 9000, 0, 9000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 06:22:35', '2020-06-11 06:22:35'),
(106, 'GRN', 'GRN000012', 9000, 0, 9000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 06:22:55', '2020-06-11 06:22:55'),
(107, 'GRN', 'GRN000012', 9000, 0, 9000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 06:23:22', '2020-06-11 06:23:22'),
(108, 'GRN', 'GRN000001', 126110, 126110, 0, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 06:25:29', '2020-06-11 06:25:29'),
(109, 'GRN', 'GRN000001', 126110, 126110, 0, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 06:26:39', '2020-06-11 06:26:39'),
(110, 'GRN', 'GRN000001', 126110, 126110, 0, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 06:27:17', '2020-06-11 06:27:17'),
(111, 'GRN', 'GRN000001', 126110, 126110, 0, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 06:30:55', '2020-06-11 06:30:55'),
(112, 'GRN', 'GRN000001', 126110, 126110, 0, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 06:32:07', '2020-06-11 06:32:07'),
(113, 'GRN', 'GRN000001', 126110, 126110, 0, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 06:32:32', '2020-06-11 06:32:32'),
(114, 'GRN', 'GRN000001', 126110, 126110, 0, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 06:33:06', '2020-06-11 06:33:06'),
(115, 'GRN', 'GRN000001', 126110, 126110, 0, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 06:39:24', '2020-06-11 06:39:24'),
(116, 'GRN', 'GRN000001', 126110, 126110, 0, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 06:40:30', '2020-06-11 06:40:30'),
(117, 'GRN', 'GRN000001', 126110, 126110, 0, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 06:41:32', '2020-06-11 06:41:32'),
(118, 'GRN', 'GRN000001', 126110, 126110, 0, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 06:44:41', '2020-06-11 06:44:41'),
(119, 'GRN', 'GRN000001', 126110, 126110, 0, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 06:46:07', '2020-06-11 06:46:07'),
(120, 'GRN', 'GRN000001', 126110, 126110, 0, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 06:47:07', '2020-06-11 06:47:07'),
(121, 'GRN', 'GRN000001', 126110, 126110, 0, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 06:47:30', '2020-06-11 06:47:30'),
(122, 'GRN', 'GRN000001', 126110, 126110, 0, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 06:49:56', '2020-06-11 06:49:56'),
(123, 'GRN', 'GRN000001', 126110, 126110, 0, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 06:52:21', '2020-06-11 06:52:21'),
(124, 'GRN', 'GRN000001', 126110, 126110, 0, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 06:53:16', '2020-06-11 06:53:16'),
(125, 'GRN', 'GRN000001', 126110, 126110, 0, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 06:53:26', '2020-06-11 06:53:26'),
(126, 'GRN', 'GRN000001', 126110, 126110, 0, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 06:53:43', '2020-06-11 06:53:43'),
(127, 'GRN', 'GRN000020', 648000, 100000, 548000, 'CA', '2020-06-11', '2020-06-11', 1, 2, '2020-06-11 07:01:39', '2020-06-11 07:01:39'),
(128, 'GRN', 'GRN000021', 800000, 0, 800000, 'CA', '2020-06-28', '2020-06-28', 1, 2, '2020-06-28 05:45:47', '2020-06-28 05:45:47'),
(129, 'GRN', 'GRN000022', 720000, 0, 720000, 'CA', '2020-06-28', '2020-06-28', 1, 2, '2020-06-28 05:51:07', '2020-06-28 05:51:07'),
(130, 'GRN', 'INVB1000002', 1620, 1000, 620, 'CA', '2020-06-28', '2020-06-28', 1, 2, '2020-06-28 06:07:00', '2020-06-28 06:07:00'),
(131, 'GRN', 'INVB1000002', 1620, 1000, 620, 'CA', '2020-06-28', '2020-06-28', 1, 2, '2020-06-28 06:09:25', '2020-06-28 06:09:25'),
(132, 'GRN', 'INVB1000002', 1620, 1000, 620, 'CA', '2020-06-28', '2020-06-28', 1, 2, '2020-06-28 06:11:45', '2020-06-28 06:11:45'),
(133, 'GRN', 'INVB1000002', 1620, 1000, 620, 'CA', '2020-06-28', '2020-06-28', 1, 2, '2020-06-28 06:16:47', '2020-06-28 06:16:47'),
(134, 'GRN', 'INVB1000002', 1620, 1000, 620, 'CA', '2020-06-28', '2020-06-28', 1, 2, '2020-06-28 06:17:07', '2020-06-28 06:17:07'),
(135, 'GRN', 'INVB1000002', 1620, 1000, 620, 'CA', '2020-06-28', '2020-06-28', 1, 2, '2020-06-28 06:17:20', '2020-06-28 06:17:20'),
(136, 'GRN', 'INVW000001', 99999, 1000, 98999, 'CA', '2020-06-28', '2020-06-28', 1, 2, '2020-06-28 06:18:03', '2020-06-28 06:18:03'),
(137, 'GRN', 'INVW000001', 99999, 1000, 98999, 'CA', '2020-06-28', '2020-06-28', 1, 2, '2020-06-28 06:18:47', '2020-06-28 06:18:47'),
(138, 'GRN', 'INVW000001', 99999, 1000, 98999, 'CA', '2020-06-28', '2020-06-28', 1, 2, '2020-06-28 06:24:25', '2020-06-28 06:24:25'),
(139, 'GRN', 'INVW000001', 99999, 1000, 98999, 'CA', '2020-06-28', '2020-06-28', 1, 2, '2020-06-28 06:24:46', '2020-06-28 06:24:46'),
(140, 'GRN', 'INVW000001', 99999, 1000, 98999, 'CA', '2020-06-28', '2020-06-28', 1, 2, '2020-06-28 06:27:49', '2020-06-28 06:27:49'),
(141, 'GRN', 'INVW000001', 99999, 1000, 98999, 'CA', '2020-06-28', '2020-06-28', 1, 2, '2020-06-28 06:28:50', '2020-06-28 06:28:50'),
(142, 'GRN', 'INVW000001', 99999, 1000, 98999, 'CA', '2020-06-28', '2020-06-28', 1, 2, '2020-06-28 06:29:20', '2020-06-28 06:29:20'),
(143, 'GRN', 'INVW000001', 99999, 1000, 98999, 'CA', '2020-06-28', '2020-06-28', 1, 2, '2020-06-28 06:30:39', '2020-06-28 06:30:39'),
(144, 'GRN', 'INVW000001', 99999, 1000, 98999, 'CA', '2020-06-28', '2020-06-28', 1, 2, '2020-06-28 06:34:46', '2020-06-28 06:34:46'),
(145, 'GRN', 'INVW000001', 99999, 1000, 98999, 'CA', '2020-06-28', '2020-06-28', 1, 2, '2020-06-28 06:44:55', '2020-06-28 06:44:55'),
(146, 'GRN', 'INVW000001', 99999, 1000, 98999, 'CA', '2020-06-28', '2020-06-28', 1, 2, '2020-06-28 06:45:53', '2020-06-28 06:45:53'),
(147, 'GRN', 'INVW000001', 99999, 1000, 98999, 'CA', '2020-06-28', '2020-06-28', 1, 2, '2020-06-28 06:48:06', '2020-06-28 06:48:06'),
(148, 'GRN', 'INVW000001', 99999, 1000, 98999, 'CA', '2020-06-28', '2020-06-28', 1, 2, '2020-06-28 06:52:05', '2020-06-28 06:52:05'),
(149, 'GRN', 'INVW000001', 99999, 1000, 98999, 'CA', '2020-06-28', '2020-06-28', 1, 2, '2020-06-28 06:55:54', '2020-06-28 06:55:54'),
(150, 'GRN', 'INVW000001', 99999, 1000, 98999, 'CA', '2020-06-28', '2020-06-28', 1, 2, '2020-06-28 06:57:18', '2020-06-28 06:57:18'),
(151, 'GRN', 'INVW000001', 99999, 1000, 98999, 'CA', '2020-06-28', '2020-06-28', 1, 2, '2020-06-28 06:59:54', '2020-06-28 06:59:54'),
(152, 'GRN', 'INVW000001', 99999, 1000, 98999, 'CA', '2020-06-28', '2020-06-28', 1, 2, '2020-06-28 07:01:19', '2020-06-28 07:01:19'),
(153, 'GRN', 'INVW000001', 99999, 1000, 98999, 'CA', '2020-06-28', '2020-06-28', 1, 2, '2020-06-28 07:02:39', '2020-06-28 07:02:39'),
(154, 'GRN', 'INVW000001', 99999, 1000, 98999, 'CA', '2020-06-28', '2020-06-28', 1, 2, '2020-06-28 07:03:03', '2020-06-28 07:03:03'),
(155, 'GRN', 'INVW000001', 99999, 1000, 98999, 'CA', '2020-06-28', '2020-06-28', 1, 2, '2020-06-28 07:05:46', '2020-06-28 07:05:46'),
(156, 'GRN', 'INVW000001', 99999, 1000, 98999, 'CA', '2020-06-28', '2020-06-28', 1, 2, '2020-06-28 07:09:58', '2020-06-28 07:09:58'),
(157, 'GRN', 'INVW000001', 99999, 1000, 98999, 'CA', '2020-06-28', '2020-06-28', 1, 2, '2020-06-28 07:11:16', '2020-06-28 07:11:16'),
(158, 'GRN', 'INVW000001', 99999, 1000, 98999, 'CA', '2020-06-28', '2020-06-28', 1, 2, '2020-06-28 07:14:25', '2020-06-28 07:14:25'),
(159, 'GRN', 'INVW000001', 99999, 1000, 98999, 'CA', '2020-06-28', '2020-06-28', 1, 2, '2020-06-28 07:14:41', '2020-06-28 07:14:41'),
(160, 'GRN', 'INVW000001', 99999, 1000, 98999, 'CA', '2020-06-28', '2020-06-28', 1, 2, '2020-06-28 07:15:27', '2020-06-28 07:15:27'),
(161, 'GRN', 'INVW000001', 99999, 1000, 98999, 'CA', '2020-06-28', '2020-06-28', 1, 2, '2020-06-28 07:16:46', '2020-06-28 07:16:46'),
(162, 'GRN', 'INVW000001', 99999, 1000, 98999, 'CA', '2020-06-28', '2020-06-28', 1, 2, '2020-06-28 07:17:27', '2020-06-28 07:17:27'),
(163, 'GRN', 'INVW000001', 99999, 1000, 98999, 'CA', '2020-06-28', '2020-06-28', 1, 2, '2020-06-28 07:19:28', '2020-06-28 07:19:28'),
(164, 'GRN', 'INVW000001', 99999, 1000, 98999, 'CA', '2020-06-28', '2020-06-28', 1, 2, '2020-06-28 07:24:04', '2020-06-28 07:24:04'),
(165, 'GRN', 'INVW000001', 99999, 1000, 98999, 'CA', '2020-06-28', '2020-06-28', 1, 2, '2020-06-28 07:24:49', '2020-06-28 07:24:49'),
(166, 'GRN', 'INVW000001', 99999, 1000, 98999, 'CA', '2020-06-28', '2020-06-28', 1, 2, '2020-06-28 07:25:40', '2020-06-28 07:25:40'),
(167, 'GRN', 'INVW000002', 8100, 1000, 7100, 'CA', '2020-06-28', '2020-06-28', 1, 2, '2020-06-28 07:26:34', '2020-06-28 07:26:34'),
(168, 'GRN', 'INVW000002', 8100, 8100, 0, 'CA', '2020-06-28', '2020-06-28', 1, 2, '2020-06-28 07:29:10', '2020-06-28 07:29:10'),
(169, 'GRN', 'INVW000002', 8100, 8100, 0, 'CA', '2020-06-28', '2020-06-28', 1, 2, '2020-06-28 07:29:59', '2020-06-28 07:29:59'),
(170, 'GRN', 'INVW000002', 8100, 8100, 0, 'CA', '2020-06-28', '2020-06-28', 1, 2, '2020-06-28 07:30:48', '2020-06-28 07:30:48'),
(171, 'GRN', 'INVW000002', 8100, 8100, 0, 'CA', '2020-06-28', '2020-06-28', 1, 2, '2020-06-28 07:31:31', '2020-06-28 07:31:31'),
(172, 'GRN', 'INVW000002', 8100, 8100, 0, 'CA', '2020-06-28', '2020-06-28', 1, 2, '2020-06-28 07:32:26', '2020-06-28 07:32:26'),
(173, 'GRN', 'INVW000002', 8100, 8100, 0, 'CA', '2020-06-28', '2020-06-28', 1, 2, '2020-06-28 07:39:21', '2020-06-28 07:39:21'),
(174, 'GRN', 'INVW000002', 8100, 8100, 0, 'CA', '2020-06-28', '2020-06-28', 1, 2, '2020-06-28 07:39:57', '2020-06-28 07:39:57'),
(175, 'GRN', 'INVW000002', 8100, 8100, 0, 'CA', '2020-06-28', '2020-06-28', 1, 2, '2020-06-28 07:40:22', '2020-06-28 07:40:22'),
(176, 'GRN', 'INVW000002', 8100, 8100, 0, 'CA', '2020-06-28', '2020-06-28', 1, 2, '2020-06-28 07:40:45', '2020-06-28 07:40:45'),
(177, 'GRN', 'INVW000002', 8100, 8100, 0, 'CA', '2020-06-28', '2020-06-28', 1, 2, '2020-06-28 07:41:16', '2020-06-28 07:41:16'),
(178, 'GRN', 'INVW000002', 8100, 8100, 0, 'CA', '2020-06-28', '2020-06-28', 1, 2, '2020-06-28 07:41:52', '2020-06-28 07:41:52'),
(179, 'GRN', 'INVW000002', 8100, 8100, 0, 'CA', '2020-06-28', '2020-06-28', 1, 2, '2020-06-28 07:43:12', '2020-06-28 07:43:12'),
(180, 'GRN', 'INVW000002', 8100, 8100, 0, 'CA', '2020-06-28', '2020-06-28', 1, 2, '2020-06-28 07:44:00', '2020-06-28 07:44:00');

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
-- Table structure for table `sales_order_details`
--

CREATE TABLE `sales_order_details` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `Quantity` double NOT NULL,
  `Unit_Price` double NOT NULL,
  `Discount` double NOT NULL,
  `Net_Amount` double NOT NULL,
  `Item` bigint(20) UNSIGNED NOT NULL,
  `Sales_Order_Header` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sales_order_details`
--

INSERT INTO `sales_order_details` (`id`, `Quantity`, `Unit_Price`, `Discount`, `Net_Amount`, `Item`, `Sales_Order_Header`, `created_at`, `updated_at`) VALUES
(19, 10, 900, 0, 9000, 3, 22, '2020-07-09 04:06:37', '2020-07-09 04:06:37');

-- --------------------------------------------------------

--
-- Table structure for table `sales_order_header`
--

CREATE TABLE `sales_order_header` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `Order_Number` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Location` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Order_Date` date NOT NULL,
  `Net_Amount` double NOT NULL,
  `customer_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `status` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sales_order_header`
--

INSERT INTO `sales_order_header` (`id`, `Order_Number`, `Location`, `Order_Date`, `Net_Amount`, `customer_id`, `user_id`, `status`, `created_at`, `updated_at`) VALUES
(22, 'SOR000010', 'B1', '2020-03-30', 9000, 3, 1, 3, '2020-07-09 04:06:37', '2020-07-09 04:18:50');

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
(5, 574, 900, 'W', 3, '2020-05-13 05:50:15', '2020-07-08 05:18:52'),
(6, 250, 11111, 'W', 1, '2020-05-13 07:01:28', '2020-07-09 03:30:53'),
(7, -106, 72000, 'W', 2, '2020-05-15 09:48:10', '2020-07-08 04:52:05'),
(8, -70, 100, 'B1', 3, NULL, '2020-07-09 04:18:49'),
(9, 180, 1500, 'W', 4, '2020-06-11 06:25:29', '2020-07-08 05:12:37'),
(10, 0, 900, 'B2', 3, '2020-07-08 05:02:25', '2020-07-09 03:20:47');

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

--
-- Dumping data for table `system_status`
--

INSERT INTO `system_status` (`id`, `Name`, `Code`) VALUES
(1, 'Active', 'ACT'),
(2, 'pending', 'PND'),
(3, 'settled ', 'STL'),
(4, 'unrealized ', 'UNR'),
(5, 'Deleted', 'DLT');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `Tran_Type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `DocType` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `DocId` int(11) NOT NULL,
  `Unit_Price` double NOT NULL,
  `Quantity` double NOT NULL,
  `Net_Amount` double NOT NULL,
  `Discount` double NOT NULL,
  `Gross_Amount` double NOT NULL,
  `Previous_Quantity` double NOT NULL,
  `New_Quantity` double NOT NULL,
  `Location` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Item` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `Tran_Type`, `DocType`, `DocId`, `Unit_Price`, `Quantity`, `Net_Amount`, `Discount`, `Gross_Amount`, `Previous_Quantity`, `New_Quantity`, `Location`, `Item`, `user_id`, `created_at`, `updated_at`) VALUES
(1, 'A', 'GRN', 65, 11111, 10, 111110, 10, 99999, 90, 100, 'W', 1, 1, '2020-06-02 01:18:41', '2020-06-02 01:18:41'),
(2, 'A', 'GRN', 66, 11111, 10, 111110, 10, 99999, 100, 110, 'W', 1, 1, '2020-06-05 04:51:42', '2020-06-05 04:51:42'),
(3, 'A', 'GRN', 67, 11111, 10, 111110, 0, 111110, 110, 120, 'W', 1, 1, '2020-06-05 04:53:40', '2020-06-05 04:53:40'),
(4, 'A', 'GRN', 68, 900, 12, 10800, 0, 10800, 10, 22, 'W', 3, 1, '2020-06-05 04:57:54', '2020-06-05 04:57:54'),
(5, 'A', 'GRN', 69, 900, 12, 10800, 0, 10800, 22, 34, 'W', 3, 1, '2020-06-05 04:58:14', '2020-06-05 04:58:14'),
(6, 'A', 'GRN', 70, 900, 12, 10800, 0, 10800, 34, 46, 'W', 3, 1, '2020-06-05 04:59:24', '2020-06-05 04:59:24'),
(7, 'A', 'GRN', 71, 900, 12, 10800, 0, 10800, 46, 58, 'W', 3, 1, '2020-06-05 04:59:52', '2020-06-05 04:59:52'),
(8, 'A', 'GRN', 72, 900, 12, 10800, 0, 10800, 58, 70, 'W', 3, 1, '2020-06-05 05:08:14', '2020-06-05 05:08:14'),
(9, 'A', 'GRN', 73, 900, 12, 10800, 0, 10800, 70, 82, 'W', 3, 1, '2020-06-05 05:27:24', '2020-06-05 05:27:24'),
(10, 'A', 'GRN', 74, 900, 12, 10800, 0, 10800, 82, 94, 'W', 3, 1, '2020-06-05 05:28:18', '2020-06-05 05:28:18'),
(11, 'A', 'GRN', 75, 11111, 10, 111110, 0, 111110, 120, 130, 'W', 1, 1, '2020-06-05 05:31:02', '2020-06-05 05:31:02'),
(12, 'A', 'GRN', 76, 11111, 10, 111110, 0, 111110, 130, 140, 'W', 1, 1, '2020-06-05 05:31:36', '2020-06-05 05:31:36'),
(13, 'A', 'GRN', 77, 11111, 10, 111110, 0, 111110, 140, 150, 'W', 1, 1, '2020-06-05 05:32:12', '2020-06-05 05:32:12'),
(14, 'A', 'GRN', 78, 11111, 10, 111110, 0, 111110, 150, 160, 'W', 1, 1, '2020-06-05 05:32:45', '2020-06-05 05:32:45'),
(15, 'A', 'GRN', 79, 11111, 10, 111110, 0, 111110, 160, 170, 'W', 1, 1, '2020-06-05 05:35:38', '2020-06-05 05:35:38'),
(16, 'A', 'GRN', 80, 11111, 10, 111110, 0, 111110, 170, 180, 'W', 1, 1, '2020-06-05 05:45:12', '2020-06-05 05:45:12'),
(17, 'A', 'GRN', 81, 11111, 10, 111110, 0, 111110, 180, 190, 'W', 1, 1, '2020-06-05 05:48:20', '2020-06-05 05:48:20'),
(18, 'A', 'GRN', 82, 11111, 10, 111110, 0, 111110, 190, 200, 'W', 1, 1, '2020-06-05 05:50:05', '2020-06-05 05:50:05'),
(19, 'A', 'GRN', 83, 11111, 10, 111110, 0, 111110, 200, 210, 'W', 1, 1, '2020-06-05 05:54:14', '2020-06-05 05:54:14'),
(20, 'A', 'GRN', 84, 11111, 10, 111110, 0, 111110, 210, 220, 'W', 1, 1, '2020-06-05 05:54:32', '2020-06-05 05:54:32'),
(21, 'A', 'GRN', 85, 11111, 10, 111110, 0, 111110, 220, 230, 'W', 1, 1, '2020-06-05 05:56:44', '2020-06-05 05:56:44'),
(22, 'A', 'GRN', 86, 11111, 10, 111110, 0, 111110, 230, 240, 'W', 1, 1, '2020-06-05 05:57:24', '2020-06-05 05:57:24'),
(23, 'A', 'GRN', 87, 11111, 10, 111110, 0, 111110, 240, 250, 'W', 1, 1, '2020-06-05 06:04:34', '2020-06-05 06:04:34'),
(24, 'A', 'GRN', 88, 11111, 10, 111110, 0, 111110, 250, 260, 'W', 1, 1, '2020-06-05 06:05:56', '2020-06-05 06:05:56'),
(25, 'A', 'GRN', 89, 900, 10, 9000, 10, 8100, 94, 104, 'W', 3, 1, '2020-06-05 06:17:45', '2020-06-05 06:17:45'),
(26, 'A', 'GRN', 90, 11111, 10, 111110, 0, 111110, 260, 270, 'W', 1, 1, '2020-06-05 06:19:37', '2020-06-05 06:19:37'),
(27, 'A', 'GRN', 91, 80000, 10, 800000, 0, 800000, 50, 60, 'W', 2, 1, '2020-06-05 06:21:25', '2020-06-05 06:21:25'),
(28, 'A', 'GRN', 92, 80000, 10, 800000, 0, 800000, 60, 70, 'W', 2, 1, '2020-06-05 06:26:05', '2020-06-05 06:26:05'),
(29, 'A', 'GRN', 93, 80000, 10, 800000, 0, 800000, 70, 80, 'W', 2, 1, '2020-06-05 06:26:39', '2020-06-05 06:26:39'),
(30, 'A', 'GRN', 94, 80000, 10, 800000, 0, 800000, 80, 90, 'W', 2, 1, '2020-06-05 06:27:21', '2020-06-05 06:27:21'),
(31, 'A', 'GRN', 95, 11111, 10, 111110, 0, 111110, 270, 280, 'W', 1, 1, '2020-06-05 06:28:17', '2020-06-05 06:28:17'),
(32, 'A', 'GRN', 96, 80000, 10, 800000, 0, 800000, 90, 100, 'W', 2, 1, '2020-06-05 06:35:23', '2020-06-05 06:35:23'),
(33, 'A', 'GRN', 97, 80000, 10, 800000, 0, 800000, 100, 110, 'W', 2, 1, '2020-06-05 07:12:17', '2020-06-05 07:12:17'),
(34, 'A', 'GRN', 98, 80000, 10, 800000, 0, 800000, 110, 120, 'W', 2, 1, '2020-06-05 07:16:24', '2020-06-05 07:16:24'),
(35, 'A', 'GRN', 99, 80000, 10, 800000, 0, 800000, 120, 130, 'W', 2, 1, '2020-06-05 07:30:10', '2020-06-05 07:30:10'),
(36, 'A', 'GRN', 100, 80000, 10, 800000, 0, 800000, 130, 140, 'W', 2, 1, '2020-06-05 07:36:52', '2020-06-05 07:36:52'),
(37, 'A', 'GRN', 101, 80000, 10, 800000, 0, 800000, 140, 150, 'W', 2, 1, '2020-06-05 07:37:33', '2020-06-05 07:37:33'),
(38, 'A', 'GRN', 102, 900, 10, 9000, 0, 9000, 104, 114, 'W', 3, 1, '2020-06-05 07:44:34', '2020-06-05 07:44:34'),
(39, 'A', 'GRN', 103, 900, 10, 9000, 0, 9000, 114, 124, 'W', 3, 1, '2020-06-05 12:53:35', '2020-06-05 12:53:35'),
(40, 'A', 'GRN', 104, 900, 10, 9000, 0, 9000, 124, 134, 'W', 3, 1, '2020-06-05 12:55:01', '2020-06-05 12:55:01'),
(41, 'A', 'GRN', 105, 900, 10, 9000, 0, 9000, 134, 144, 'W', 3, 1, '2020-06-05 12:55:39', '2020-06-05 12:55:39'),
(42, 'A', 'GRN', 106, 900, 10, 9000, 0, 9000, 144, 154, 'W', 3, 1, '2020-06-05 12:56:01', '2020-06-05 12:56:01'),
(43, 'A', 'GRN', 107, 900, 10, 9000, 0, 9000, 154, 164, 'W', 3, 1, '2020-06-05 12:59:19', '2020-06-05 12:59:19'),
(44, 'A', 'GRN', 108, 900, 10, 9000, 0, 9000, 164, 174, 'W', 3, 1, '2020-06-05 13:00:08', '2020-06-05 13:00:08'),
(45, 'A', 'GRN', 109, 900, 10, 9000, 0, 9000, 174, 184, 'W', 3, 1, '2020-06-05 13:02:27', '2020-06-05 13:02:27'),
(46, 'A', 'GRN', 110, 900, 10, 9000, 0, 9000, 184, 194, 'W', 3, 1, '2020-06-05 13:02:48', '2020-06-05 13:02:48'),
(47, 'A', 'GRN', 16, 900, 2, 1620, 10, 1620, 6, 4, 'W', 3, 1, '2020-06-06 04:42:42', '2020-06-06 04:42:42'),
(48, 'A', 'GRN', 17, 900, 10, 7200, 20, 7200, 44, 34, 'W', 3, 1, '2020-06-06 05:36:03', '2020-06-06 05:36:03'),
(49, 'D', 'INV', 18, 900, 10, 8100, 10, 8100, 34, 24, 'B1', 3, 1, '2020-06-06 06:43:21', '2020-06-06 06:43:21'),
(50, 'D', 'INV', 19, 900, 10, 8100, 10, 8100, 24, 14, 'B1', 3, 1, '2020-06-06 06:44:14', '2020-06-06 06:44:14'),
(51, 'D', 'INV', 20, 900, 10, 8100, 10, 8100, 14, 4, 'B1', 3, 1, '2020-06-06 06:47:35', '2020-06-06 06:47:35'),
(52, 'D', 'INV', 21, 900, 3, 2430, 10, 2430, 60, 57, 'B1', 3, 1, '2020-06-06 06:50:04', '2020-06-06 06:50:04'),
(53, 'D', 'INV', 22, 900, 3, 2430, 10, 2430, 57, 54, 'B1', 3, 1, '2020-06-06 06:58:56', '2020-06-06 06:58:56'),
(54, 'D', 'INV', 23, 900, 10, 9000, 0, 9000, 54, 44, 'B1', 3, 1, '2020-06-06 07:06:37', '2020-06-06 07:06:37'),
(55, 'D', 'INV', 24, 900, 10, 9000, 0, 9000, 44, 34, 'B1', 3, 1, '2020-06-06 07:11:13', '2020-06-06 07:11:13'),
(56, 'D', 'INV', 25, 900, 10, 9000, 0, 9000, 34, 24, 'B1', 3, 1, '2020-06-06 07:12:59', '2020-06-06 07:12:59'),
(57, 'D', 'INV', 26, 900, 10, 9000, 0, 9000, 24, 14, 'B1', 3, 1, '2020-06-06 07:20:51', '2020-06-06 07:20:51'),
(58, 'D', 'INV', 27, 900, 10, 9000, 0, 9000, 14, 4, 'B1', 3, 1, '2020-06-06 07:22:58', '2020-06-06 07:22:58'),
(59, 'D', 'INV', 28, 900, 10, 9000, 0, 9000, 4, -6, 'B1', 3, 1, '2020-06-06 07:34:02', '2020-06-06 07:34:02'),
(60, 'D', 'INV', 29, 900, 2, 1800, 0, 1800, 50, 48, 'B1', 3, 1, '2020-06-06 07:35:26', '2020-06-06 07:35:26'),
(61, 'D', 'INV', 30, 900, 2, 1800, 0, 1800, 48, 46, 'B1', 3, 1, '2020-06-06 07:37:38', '2020-06-06 07:37:38'),
(62, 'D', 'INV', 31, 900, 2, 1620, 10, 1620, 46, 44, 'B1', 3, 1, '2020-06-06 07:40:07', '2020-06-06 07:40:07'),
(63, 'D', 'INV', 32, 900, 2, 1800, 0, 1800, 44, 42, 'B1', 3, 1, '2020-06-06 07:42:07', '2020-06-06 07:42:07'),
(64, 'D', 'INV', 33, 900, 10, 9000, 0, 0, 42, 32, 'B1', 3, 1, '2020-06-06 07:43:34', '2020-06-06 07:43:34'),
(65, 'D', 'INV', 34, 900, 10, 9000, 0, 0, 32, 22, 'B1', 3, 1, '2020-06-06 07:45:18', '2020-06-06 07:45:18'),
(66, 'A', 'GRN', 111, 80000, 10, 800000, 10, 720000, 150, 160, 'W', 2, 1, '2020-06-06 07:52:14', '2020-06-06 07:52:14'),
(67, 'A', 'GRN', 112, 80000, 10, 800000, 10, 720000, 160, 170, 'W', 2, 1, '2020-06-06 07:52:48', '2020-06-06 07:52:48'),
(68, 'A', 'GRN', 113, 80000, 10, 800000, 10, 720000, 170, 180, 'W', 2, 1, '2020-06-06 07:53:38', '2020-06-06 07:53:38'),
(69, 'A', 'GRN', 114, 80000, 10, 800000, 10, 720000, 180, 190, 'W', 2, 1, '2020-06-06 07:54:16', '2020-06-06 07:54:16'),
(70, 'A', 'GRN', 115, 80000, 10, 800000, 10, 720000, 190, 200, 'W', 2, 1, '2020-06-06 08:31:07', '2020-06-06 08:31:07'),
(71, 'D', 'INV', 35, 900, 10, 9000, 0, 9000, 22, 12, 'B1', 3, 1, '2020-06-06 08:49:03', '2020-06-06 08:49:03'),
(72, 'A', 'GRN', 116, 11111, 10, 111110, 10, 99999, 280, 290, 'W', 1, 1, '2020-06-10 05:25:50', '2020-06-10 05:25:50'),
(73, 'A', 'GRN', 117, 11111, 10, 111110, 0, 111110, 290, 300, 'W', 1, 1, '2020-06-10 06:23:02', '2020-06-10 06:23:02'),
(74, 'A', 'GRN', 118, 80000, 10, 800000, 0, 800000, 200, 210, 'W', 2, 1, '2020-06-10 08:01:23', '2020-06-10 08:01:23'),
(75, 'A', 'GRN', 119, 900, 10, 9000, 0, 9000, 164, 174, 'W', 3, 1, '2020-06-10 08:45:30', '2020-06-10 08:45:30'),
(76, 'A', 'GRN', 120, 900, 10, 9000, 0, 9000, 174, 184, 'W', 3, 1, '2020-06-10 08:46:55', '2020-06-10 08:46:55'),
(77, 'A', 'GRN', 121, 900, 10, 9000, 0, 9000, 184, 194, 'W', 3, 1, '2020-06-10 08:53:39', '2020-06-10 08:53:39'),
(78, 'A', 'GRN', 122, 80000, 10, 800000, 0, 800000, 210, 220, 'W', 2, 1, '2020-06-11 00:59:41', '2020-06-11 00:59:41'),
(79, 'A', 'GRN', 123, 80000, 10, 800000, 0, 800000, 220, 230, 'W', 2, 1, '2020-06-11 01:00:15', '2020-06-11 01:00:15'),
(80, 'A', 'GRN', 124, 11111, 10, 111110, 0, 111110, 300, 310, 'W', 1, 1, '2020-06-11 01:38:21', '2020-06-11 01:38:21'),
(81, 'A', 'GRN', 125, 11111, 10, 111110, 0, 111110, 310, 320, 'W', 1, 1, '2020-06-11 01:41:13', '2020-06-11 01:41:13'),
(82, 'A', 'GRN', 126, 11111, 10, 111110, 0, 111110, 320, 330, 'W', 1, 1, '2020-06-11 01:43:12', '2020-06-11 01:43:12'),
(83, 'A', 'GRN', 127, 11111, 10, 111110, 0, 111110, 330, 340, 'W', 1, 1, '2020-06-11 01:45:13', '2020-06-11 01:45:13'),
(84, 'A', 'GRN', 128, 80000, 10, 800000, 0, 800000, 230, 240, 'W', 2, 1, '2020-06-11 01:45:51', '2020-06-11 01:45:51'),
(85, 'A', 'GRN', 129, 900, 10, 9000, 0, 9000, 194, 204, 'W', 3, 1, '2020-06-11 01:56:24', '2020-06-11 01:56:24'),
(86, 'A', 'GRN', 130, 11111, 10, 111110, 0, 111110, 340, 350, 'W', 1, 1, '2020-06-11 01:58:37', '2020-06-11 01:58:37'),
(87, 'A', 'GRN', 131, 11111, 10, 111110, 0, 111110, 350, 360, 'W', 1, 1, '2020-06-11 02:00:57', '2020-06-11 02:00:57'),
(88, 'A', 'GRN', 132, 11111, 10, 111110, 0, 111110, 360, 370, 'W', 1, 1, '2020-06-11 02:04:21', '2020-06-11 02:04:21'),
(89, 'A', 'GRN', 133, 11111, 10, 111110, 0, 111110, 370, 380, 'W', 1, 1, '2020-06-11 02:25:53', '2020-06-11 02:25:53'),
(90, 'A', 'GRN', 134, 11111, 10, 111110, 0, 111110, 380, 390, 'W', 1, 1, '2020-06-11 02:45:26', '2020-06-11 02:45:26'),
(91, 'A', 'GRN', 135, 80000, 10, 800000, 0, 800000, 240, 250, 'W', 2, 1, '2020-06-11 02:59:30', '2020-06-11 02:59:30'),
(92, 'A', 'GRN', 136, 900, 10, 9000, 0, 9000, 204, 214, 'W', 3, 1, '2020-06-11 03:00:36', '2020-06-11 03:00:36'),
(93, 'A', 'GRN', 137, 900, 10, 9000, 0, 9000, 214, 224, 'W', 3, 1, '2020-06-11 03:01:22', '2020-06-11 03:01:22'),
(94, 'A', 'GRN', 138, 900, 10, 9000, 0, 9000, 224, 234, 'W', 3, 1, '2020-06-11 03:01:48', '2020-06-11 03:01:48'),
(95, 'A', 'GRN', 139, 900, 10, 9000, 0, 9000, 234, 244, 'W', 3, 1, '2020-06-11 03:17:39', '2020-06-11 03:17:39'),
(96, 'A', 'GRN', 140, 900, 10, 9000, 0, 9000, 244, 254, 'W', 3, 1, '2020-06-11 04:20:30', '2020-06-11 04:20:30'),
(97, 'A', 'GRN', 141, 900, 10, 9000, 0, 9000, 254, 264, 'W', 3, 1, '2020-06-11 04:22:56', '2020-06-11 04:22:56'),
(98, 'A', 'GRN', 142, 900, 10, 9000, 0, 9000, 264, 274, 'W', 3, 1, '2020-06-11 04:24:46', '2020-06-11 04:24:46'),
(99, 'A', 'GRN', 143, 900, 10, 9000, 0, 9000, 274, 284, 'W', 3, 1, '2020-06-11 04:26:27', '2020-06-11 04:26:27'),
(100, 'A', 'GRN', 144, 900, 10, 9000, 0, 9000, 284, 294, 'W', 3, 1, '2020-06-11 04:27:30', '2020-06-11 04:27:30'),
(101, 'A', 'GRN', 145, 900, 10, 9000, 0, 9000, 294, 304, 'W', 3, 1, '2020-06-11 04:36:44', '2020-06-11 04:36:44'),
(102, 'A', 'GRN', 146, 900, 10, 9000, 0, 9000, 304, 314, 'W', 3, 1, '2020-06-11 04:58:11', '2020-06-11 04:58:11'),
(103, 'A', 'GRN', 147, 900, 10, 9000, 0, 9000, 314, 324, 'W', 3, 1, '2020-06-11 04:58:57', '2020-06-11 04:58:57'),
(104, 'A', 'GRN', 148, 900, 10, 9000, 0, 9000, 324, 334, 'W', 3, 1, '2020-06-11 05:01:21', '2020-06-11 05:01:21'),
(105, 'A', 'GRN', 149, 900, 10, 9000, 0, 9000, 334, 344, 'W', 3, 1, '2020-06-11 05:02:58', '2020-06-11 05:02:58'),
(106, 'A', 'GRN', 150, 900, 10, 9000, 0, 9000, 344, 354, 'W', 3, 1, '2020-06-11 05:03:19', '2020-06-11 05:03:19'),
(107, 'A', 'GRN', 151, 900, 10, 9000, 0, 9000, 354, 364, 'W', 3, 1, '2020-06-11 05:04:04', '2020-06-11 05:04:04'),
(108, 'A', 'GRN', 152, 900, 10, 9000, 0, 9000, 364, 374, 'W', 3, 1, '2020-06-11 05:19:42', '2020-06-11 05:19:42'),
(109, 'A', 'GRN', 153, 900, 10, 9000, 0, 9000, 374, 384, 'W', 3, 1, '2020-06-11 05:23:09', '2020-06-11 05:23:09'),
(110, 'A', 'GRN', 154, 900, 10, 9000, 0, 9000, 384, 394, 'W', 3, 1, '2020-06-11 05:23:34', '2020-06-11 05:23:34'),
(111, 'A', 'GRN', 155, 900, 10, 9000, 0, 9000, 394, 404, 'W', 3, 1, '2020-06-11 05:27:00', '2020-06-11 05:27:00'),
(112, 'A', 'GRN', 156, 900, 10, 9000, 0, 9000, 404, 414, 'W', 3, 1, '2020-06-11 05:27:38', '2020-06-11 05:27:38'),
(113, 'A', 'GRN', 157, 900, 10, 9000, 0, 9000, 414, 424, 'W', 3, 1, '2020-06-11 05:28:04', '2020-06-11 05:28:04'),
(114, 'A', 'GRN', 158, 900, 10, 9000, 0, 9000, 424, 434, 'W', 3, 1, '2020-06-11 05:28:43', '2020-06-11 05:28:43'),
(115, 'A', 'GRN', 159, 900, 10, 9000, 0, 9000, 434, 444, 'W', 3, 1, '2020-06-11 05:39:01', '2020-06-11 05:39:01'),
(116, 'A', 'GRN', 160, 900, 10, 9000, 0, 9000, 444, 454, 'W', 3, 1, '2020-06-11 05:39:26', '2020-06-11 05:39:26'),
(117, 'A', 'GRN', 161, 900, 10, 9000, 0, 9000, 454, 464, 'W', 3, 1, '2020-06-11 05:39:54', '2020-06-11 05:39:54'),
(118, 'A', 'GRN', 162, 900, 10, 9000, 0, 9000, 464, 474, 'W', 3, 1, '2020-06-11 05:40:07', '2020-06-11 05:40:07'),
(119, 'A', 'GRN', 163, 900, 10, 9000, 0, 9000, 474, 484, 'W', 3, 1, '2020-06-11 05:40:34', '2020-06-11 05:40:34'),
(120, 'A', 'GRN', 164, 900, 10, 9000, 0, 9000, 484, 494, 'W', 3, 1, '2020-06-11 05:41:12', '2020-06-11 05:41:12'),
(121, 'A', 'GRN', 165, 900, 10, 9000, 0, 9000, 494, 504, 'W', 3, 1, '2020-06-11 05:44:16', '2020-06-11 05:44:16'),
(122, 'A', 'GRN', 166, 900, 10, 9000, 0, 9000, 504, 514, 'W', 3, 1, '2020-06-11 05:46:56', '2020-06-11 05:46:56'),
(123, 'A', 'GRN', 167, 900, 10, 9000, 0, 9000, 514, 524, 'W', 3, 1, '2020-06-11 05:48:18', '2020-06-11 05:48:18'),
(124, 'A', 'GRN', 168, 900, 10, 9000, 0, 9000, 524, 534, 'W', 3, 1, '2020-06-11 05:49:40', '2020-06-11 05:49:40'),
(125, 'A', 'GRN', 169, 900, 10, 9000, 0, 9000, 534, 544, 'W', 3, 1, '2020-06-11 05:50:11', '2020-06-11 05:50:11'),
(126, 'A', 'GRN', 170, 900, 10, 9000, 0, 9000, 544, 554, 'W', 3, 1, '2020-06-11 05:51:33', '2020-06-11 05:51:33'),
(127, 'A', 'GRN', 171, 900, 10, 9000, 0, 9000, 554, 564, 'W', 3, 1, '2020-06-11 05:52:56', '2020-06-11 05:52:56'),
(128, 'A', 'GRN', 172, 900, 10, 9000, 0, 9000, 564, 574, 'W', 3, 1, '2020-06-11 05:55:38', '2020-06-11 05:55:38'),
(129, 'A', 'GRN', 173, 900, 10, 9000, 0, 9000, 574, 584, 'W', 3, 1, '2020-06-11 05:56:36', '2020-06-11 05:56:36'),
(130, 'A', 'GRN', 174, 900, 10, 9000, 0, 9000, 584, 594, 'W', 3, 1, '2020-06-11 05:58:00', '2020-06-11 05:58:00'),
(131, 'A', 'GRN', 175, 900, 10, 9000, 0, 9000, 594, 604, 'W', 3, 1, '2020-06-11 05:58:10', '2020-06-11 05:58:10'),
(132, 'A', 'GRN', 176, 900, 10, 9000, 0, 9000, 604, 614, 'W', 3, 1, '2020-06-11 05:58:29', '2020-06-11 05:58:29'),
(133, 'A', 'GRN', 177, 900, 10, 9000, 0, 9000, 614, 624, 'W', 3, 1, '2020-06-11 05:58:49', '2020-06-11 05:58:49'),
(134, 'A', 'GRN', 178, 900, 10, 9000, 0, 9000, 624, 634, 'W', 3, 1, '2020-06-11 06:01:18', '2020-06-11 06:01:18'),
(135, 'A', 'GRN', 179, 900, 10, 9000, 0, 9000, 634, 644, 'W', 3, 1, '2020-06-11 06:04:52', '2020-06-11 06:04:52'),
(136, 'A', 'GRN', 180, 900, 10, 9000, 0, 9000, 644, 654, 'W', 3, 1, '2020-06-11 06:05:28', '2020-06-11 06:05:28'),
(137, 'A', 'GRN', 181, 900, 10, 9000, 0, 9000, 654, 664, 'W', 3, 1, '2020-06-11 06:05:50', '2020-06-11 06:05:50'),
(138, 'A', 'GRN', 182, 900, 10, 9000, 0, 9000, 664, 674, 'W', 3, 1, '2020-06-11 06:07:23', '2020-06-11 06:07:23'),
(139, 'A', 'GRN', 183, 900, 10, 9000, 0, 9000, 674, 684, 'W', 3, 1, '2020-06-11 06:08:25', '2020-06-11 06:08:25'),
(140, 'A', 'GRN', 184, 900, 10, 9000, 0, 9000, 684, 694, 'W', 3, 1, '2020-06-11 06:09:44', '2020-06-11 06:09:44'),
(141, 'A', 'GRN', 185, 900, 10, 9000, 0, 9000, 694, 704, 'W', 3, 1, '2020-06-11 06:11:45', '2020-06-11 06:11:45'),
(142, 'A', 'GRN', 186, 900, 10, 9000, 0, 9000, 704, 714, 'W', 3, 1, '2020-06-11 06:12:49', '2020-06-11 06:12:49'),
(143, 'A', 'GRN', 187, 900, 10, 9000, 0, 9000, 714, 724, 'W', 3, 1, '2020-06-11 06:13:00', '2020-06-11 06:13:00'),
(144, 'A', 'GRN', 188, 900, 10, 9000, 0, 9000, 724, 734, 'W', 3, 1, '2020-06-11 06:13:33', '2020-06-11 06:13:33'),
(145, 'A', 'GRN', 189, 900, 10, 9000, 0, 9000, 734, 744, 'W', 3, 1, '2020-06-11 06:13:47', '2020-06-11 06:13:47'),
(146, 'A', 'GRN', 190, 900, 10, 9000, 0, 9000, 744, 754, 'W', 3, 1, '2020-06-11 06:17:17', '2020-06-11 06:17:17'),
(147, 'A', 'GRN', 191, 900, 10, 9000, 0, 9000, 754, 764, 'W', 3, 1, '2020-06-11 06:21:38', '2020-06-11 06:21:38'),
(148, 'A', 'GRN', 192, 900, 10, 9000, 0, 9000, 764, 774, 'W', 3, 1, '2020-06-11 06:21:59', '2020-06-11 06:21:59'),
(149, 'A', 'GRN', 193, 900, 10, 9000, 0, 9000, 774, 784, 'W', 3, 1, '2020-06-11 06:22:35', '2020-06-11 06:22:35'),
(150, 'A', 'GRN', 194, 900, 10, 9000, 0, 9000, 784, 794, 'W', 3, 1, '2020-06-11 06:22:55', '2020-06-11 06:22:55'),
(151, 'A', 'GRN', 195, 900, 10, 9000, 0, 9000, 794, 804, 'W', 3, 1, '2020-06-11 06:23:22', '2020-06-11 06:23:22'),
(152, 'A', 'GRN', 196, 11111, 10, 111110, 0, 111110, 390, 400, 'W', 1, 1, '2020-06-11 06:25:29', '2020-06-11 06:25:29'),
(153, 'A', 'GRN', 196, 1500, 10, 15000, 0, 15000, 0, 10, 'W', 4, 1, '2020-06-11 06:25:29', '2020-06-11 06:25:29'),
(154, 'A', 'GRN', 197, 11111, 10, 111110, 0, 111110, 400, 410, 'W', 1, 1, '2020-06-11 06:26:39', '2020-06-11 06:26:39'),
(155, 'A', 'GRN', 197, 1500, 10, 15000, 0, 15000, 10, 20, 'W', 4, 1, '2020-06-11 06:26:39', '2020-06-11 06:26:39'),
(156, 'A', 'GRN', 198, 11111, 10, 111110, 0, 111110, 410, 420, 'W', 1, 1, '2020-06-11 06:27:17', '2020-06-11 06:27:17'),
(157, 'A', 'GRN', 198, 1500, 10, 15000, 0, 15000, 20, 30, 'W', 4, 1, '2020-06-11 06:27:17', '2020-06-11 06:27:17'),
(158, 'A', 'GRN', 199, 11111, 10, 111110, 0, 111110, 420, 430, 'W', 1, 1, '2020-06-11 06:30:55', '2020-06-11 06:30:55'),
(159, 'A', 'GRN', 199, 1500, 10, 15000, 0, 15000, 30, 40, 'W', 4, 1, '2020-06-11 06:30:55', '2020-06-11 06:30:55'),
(160, 'A', 'GRN', 200, 11111, 10, 111110, 0, 111110, 430, 440, 'W', 1, 1, '2020-06-11 06:32:07', '2020-06-11 06:32:07'),
(161, 'A', 'GRN', 200, 1500, 10, 15000, 0, 15000, 40, 50, 'W', 4, 1, '2020-06-11 06:32:07', '2020-06-11 06:32:07'),
(162, 'A', 'GRN', 201, 11111, 10, 111110, 0, 111110, 440, 450, 'W', 1, 1, '2020-06-11 06:32:32', '2020-06-11 06:32:32'),
(163, 'A', 'GRN', 201, 1500, 10, 15000, 0, 15000, 50, 60, 'W', 4, 1, '2020-06-11 06:32:32', '2020-06-11 06:32:32'),
(164, 'A', 'GRN', 202, 11111, 10, 111110, 0, 111110, 450, 460, 'W', 1, 1, '2020-06-11 06:33:06', '2020-06-11 06:33:06'),
(165, 'A', 'GRN', 202, 1500, 10, 15000, 0, 15000, 60, 70, 'W', 4, 1, '2020-06-11 06:33:06', '2020-06-11 06:33:06'),
(166, 'A', 'GRN', 203, 11111, 10, 111110, 0, 111110, 460, 470, 'W', 1, 1, '2020-06-11 06:39:23', '2020-06-11 06:39:23'),
(167, 'A', 'GRN', 203, 1500, 10, 15000, 0, 15000, 70, 80, 'W', 4, 1, '2020-06-11 06:39:23', '2020-06-11 06:39:23'),
(168, 'A', 'GRN', 204, 11111, 10, 111110, 0, 111110, 470, 480, 'W', 1, 1, '2020-06-11 06:40:29', '2020-06-11 06:40:29'),
(169, 'A', 'GRN', 204, 1500, 10, 15000, 0, 15000, 80, 90, 'W', 4, 1, '2020-06-11 06:40:30', '2020-06-11 06:40:30'),
(170, 'A', 'GRN', 205, 11111, 10, 111110, 0, 111110, 480, 490, 'W', 1, 1, '2020-06-11 06:41:32', '2020-06-11 06:41:32'),
(171, 'A', 'GRN', 205, 1500, 10, 15000, 0, 15000, 90, 100, 'W', 4, 1, '2020-06-11 06:41:32', '2020-06-11 06:41:32'),
(172, 'A', 'GRN', 206, 11111, 10, 111110, 0, 111110, 490, 500, 'W', 1, 1, '2020-06-11 06:44:41', '2020-06-11 06:44:41'),
(173, 'A', 'GRN', 206, 1500, 10, 15000, 0, 15000, 100, 110, 'W', 4, 1, '2020-06-11 06:44:41', '2020-06-11 06:44:41'),
(174, 'A', 'GRN', 207, 11111, 10, 111110, 0, 111110, 500, 510, 'W', 1, 1, '2020-06-11 06:46:07', '2020-06-11 06:46:07'),
(175, 'A', 'GRN', 207, 1500, 10, 15000, 0, 15000, 110, 120, 'W', 4, 1, '2020-06-11 06:46:07', '2020-06-11 06:46:07'),
(176, 'A', 'GRN', 208, 11111, 10, 111110, 0, 111110, 510, 520, 'W', 1, 1, '2020-06-11 06:47:07', '2020-06-11 06:47:07'),
(177, 'A', 'GRN', 208, 1500, 10, 15000, 0, 15000, 120, 130, 'W', 4, 1, '2020-06-11 06:47:07', '2020-06-11 06:47:07'),
(178, 'A', 'GRN', 209, 11111, 10, 111110, 0, 111110, 520, 530, 'W', 1, 1, '2020-06-11 06:47:30', '2020-06-11 06:47:30'),
(179, 'A', 'GRN', 209, 1500, 10, 15000, 0, 15000, 130, 140, 'W', 4, 1, '2020-06-11 06:47:30', '2020-06-11 06:47:30'),
(180, 'A', 'GRN', 210, 11111, 10, 111110, 0, 111110, 530, 540, 'W', 1, 1, '2020-06-11 06:49:56', '2020-06-11 06:49:56'),
(181, 'A', 'GRN', 210, 1500, 10, 15000, 0, 15000, 140, 150, 'W', 4, 1, '2020-06-11 06:49:56', '2020-06-11 06:49:56'),
(182, 'A', 'GRN', 211, 11111, 10, 111110, 0, 111110, 540, 550, 'W', 1, 1, '2020-06-11 06:52:21', '2020-06-11 06:52:21'),
(183, 'A', 'GRN', 211, 1500, 10, 15000, 0, 15000, 150, 160, 'W', 4, 1, '2020-06-11 06:52:21', '2020-06-11 06:52:21'),
(184, 'A', 'GRN', 212, 11111, 10, 111110, 0, 111110, 550, 560, 'W', 1, 1, '2020-06-11 06:53:15', '2020-06-11 06:53:15'),
(185, 'A', 'GRN', 212, 1500, 10, 15000, 0, 15000, 160, 170, 'W', 4, 1, '2020-06-11 06:53:15', '2020-06-11 06:53:15'),
(186, 'A', 'GRN', 213, 11111, 10, 111110, 0, 111110, 560, 570, 'W', 1, 1, '2020-06-11 06:53:25', '2020-06-11 06:53:25'),
(187, 'A', 'GRN', 213, 1500, 10, 15000, 0, 15000, 170, 180, 'W', 4, 1, '2020-06-11 06:53:26', '2020-06-11 06:53:26'),
(188, 'A', 'GRN', 214, 11111, 10, 111110, 0, 111110, 570, 580, 'W', 1, 1, '2020-06-11 06:53:43', '2020-06-11 06:53:43'),
(189, 'A', 'GRN', 214, 1500, 10, 15000, 0, 15000, 180, 190, 'W', 4, 1, '2020-06-11 06:53:43', '2020-06-11 06:53:43'),
(190, 'A', 'GRN', 215, 80000, 10, 800000, 10, 720000, 250, 260, 'W', 2, 1, '2020-06-11 07:01:39', '2020-06-11 07:01:39'),
(191, 'A', 'GRN', 216, 80000, 10, 800000, 0, 800000, 260, 270, 'W', 2, 1, '2020-06-28 05:45:46', '2020-06-28 05:45:46'),
(192, 'A', 'GRN', 217, 80000, 10, 800000, 10, 720000, 270, 280, 'W', 2, 1, '2020-06-28 05:51:07', '2020-06-28 05:51:07'),
(193, 'D', 'INV', 36, 900, 2, 1620, 10, 1620, 12, 10, 'B1', 3, 1, '2020-06-28 06:07:00', '2020-06-28 06:07:00'),
(194, 'D', 'INV', 37, 900, 2, 1620, 10, 1620, 10, 8, 'B1', 3, 1, '2020-06-28 06:09:25', '2020-06-28 06:09:25'),
(195, 'D', 'INV', 38, 900, 2, 1620, 10, 1620, 8, 6, 'B1', 3, 1, '2020-06-28 06:11:45', '2020-06-28 06:11:45'),
(196, 'D', 'INV', 39, 900, 2, 1620, 10, 1620, 6, 4, 'B1', 3, 1, '2020-06-28 06:16:47', '2020-06-28 06:16:47'),
(197, 'D', 'INV', 40, 900, 2, 1620, 10, 1620, 4, 2, 'B1', 3, 1, '2020-06-28 06:17:07', '2020-06-28 06:17:07'),
(198, 'D', 'INV', 41, 900, 2, 1620, 10, 1620, 2, 0, 'B1', 3, 1, '2020-06-28 06:17:19', '2020-06-28 06:17:19'),
(199, 'D', 'INV', 42, 11111, 10, 99999, 10, 99999, 580, 570, 'W', 1, 1, '2020-06-28 06:18:03', '2020-06-28 06:18:03'),
(200, 'D', 'INV', 43, 11111, 10, 99999, 10, 99999, 570, 560, 'W', 1, 1, '2020-06-28 06:18:47', '2020-06-28 06:18:47'),
(201, 'D', 'INV', 44, 11111, 10, 99999, 10, 99999, 560, 550, 'W', 1, 1, '2020-06-28 06:24:24', '2020-06-28 06:24:24'),
(202, 'D', 'INV', 45, 11111, 10, 99999, 10, 99999, 550, 540, 'W', 1, 1, '2020-06-28 06:24:46', '2020-06-28 06:24:46'),
(203, 'D', 'INV', 46, 11111, 10, 99999, 10, 99999, 540, 530, 'W', 1, 1, '2020-06-28 06:27:49', '2020-06-28 06:27:49'),
(204, 'D', 'INV', 47, 11111, 10, 99999, 10, 99999, 530, 520, 'W', 1, 1, '2020-06-28 06:28:50', '2020-06-28 06:28:50'),
(205, 'D', 'INV', 48, 11111, 10, 99999, 10, 99999, 520, 510, 'W', 1, 1, '2020-06-28 06:29:20', '2020-06-28 06:29:20'),
(206, 'D', 'INV', 49, 11111, 10, 99999, 10, 99999, 510, 500, 'W', 1, 1, '2020-06-28 06:30:39', '2020-06-28 06:30:39'),
(207, 'D', 'INV', 50, 11111, 10, 99999, 10, 99999, 500, 490, 'W', 1, 1, '2020-06-28 06:34:46', '2020-06-28 06:34:46'),
(208, 'D', 'INV', 51, 11111, 10, 99999, 10, 99999, 490, 480, 'W', 1, 1, '2020-06-28 06:44:55', '2020-06-28 06:44:55'),
(209, 'D', 'INV', 52, 11111, 10, 99999, 10, 99999, 480, 470, 'W', 1, 1, '2020-06-28 06:45:53', '2020-06-28 06:45:53'),
(210, 'D', 'INV', 53, 11111, 10, 99999, 10, 99999, 470, 460, 'W', 1, 1, '2020-06-28 06:48:06', '2020-06-28 06:48:06'),
(211, 'D', 'INV', 54, 11111, 10, 99999, 10, 99999, 460, 450, 'W', 1, 1, '2020-06-28 06:52:05', '2020-06-28 06:52:05'),
(212, 'D', 'INV', 55, 11111, 10, 99999, 10, 99999, 450, 440, 'W', 1, 1, '2020-06-28 06:55:54', '2020-06-28 06:55:54'),
(213, 'D', 'INV', 56, 11111, 10, 99999, 10, 99999, 440, 430, 'W', 1, 1, '2020-06-28 06:57:18', '2020-06-28 06:57:18'),
(214, 'D', 'INV', 57, 11111, 10, 99999, 10, 99999, 430, 420, 'W', 1, 1, '2020-06-28 06:59:54', '2020-06-28 06:59:54'),
(215, 'D', 'INV', 58, 11111, 10, 99999, 10, 99999, 420, 410, 'W', 1, 1, '2020-06-28 07:01:18', '2020-06-28 07:01:18'),
(216, 'D', 'INV', 59, 11111, 10, 99999, 10, 99999, 410, 400, 'W', 1, 1, '2020-06-28 07:02:39', '2020-06-28 07:02:39'),
(217, 'D', 'INV', 60, 11111, 10, 99999, 10, 99999, 400, 390, 'W', 1, 1, '2020-06-28 07:03:03', '2020-06-28 07:03:03'),
(218, 'D', 'INV', 61, 11111, 10, 99999, 10, 99999, 390, 380, 'W', 1, 1, '2020-06-28 07:05:46', '2020-06-28 07:05:46'),
(219, 'D', 'INV', 62, 11111, 10, 99999, 10, 99999, 380, 370, 'W', 1, 1, '2020-06-28 07:09:57', '2020-06-28 07:09:57'),
(220, 'D', 'INV', 63, 11111, 10, 99999, 10, 99999, 370, 360, 'W', 1, 1, '2020-06-28 07:11:16', '2020-06-28 07:11:16'),
(221, 'D', 'INV', 64, 11111, 10, 99999, 10, 99999, 360, 350, 'W', 1, 1, '2020-06-28 07:14:25', '2020-06-28 07:14:25'),
(222, 'D', 'INV', 65, 11111, 10, 99999, 10, 99999, 350, 340, 'W', 1, 1, '2020-06-28 07:14:41', '2020-06-28 07:14:41'),
(223, 'D', 'INV', 66, 11111, 10, 99999, 10, 99999, 340, 330, 'W', 1, 1, '2020-06-28 07:15:27', '2020-06-28 07:15:27'),
(224, 'D', 'INV', 67, 11111, 10, 99999, 10, 99999, 330, 320, 'W', 1, 1, '2020-06-28 07:16:46', '2020-06-28 07:16:46'),
(225, 'D', 'INV', 68, 11111, 10, 99999, 10, 99999, 320, 310, 'W', 1, 1, '2020-06-28 07:17:27', '2020-06-28 07:17:27'),
(226, 'D', 'INV', 69, 11111, 10, 99999, 10, 99999, 310, 300, 'W', 1, 1, '2020-06-28 07:19:28', '2020-06-28 07:19:28'),
(227, 'D', 'INV', 70, 11111, 10, 99999, 10, 99999, 300, 290, 'W', 1, 1, '2020-06-28 07:24:04', '2020-06-28 07:24:04'),
(228, 'D', 'INV', 71, 11111, 10, 99999, 10, 99999, 290, 280, 'W', 1, 1, '2020-06-28 07:24:49', '2020-06-28 07:24:49'),
(229, 'D', 'INV', 72, 11111, 10, 99999, 10, 99999, 280, 270, 'W', 1, 1, '2020-06-28 07:25:40', '2020-06-28 07:25:40'),
(230, 'D', 'INV', 73, 900, 10, 8100, 10, 8100, 804, 794, 'W', 3, 1, '2020-06-28 07:26:34', '2020-06-28 07:26:34'),
(231, 'D', 'INV', 74, 900, 10, 9000, 0, 8100, 794, 784, 'W', 3, 1, '2020-06-28 07:29:10', '2020-06-28 07:29:10'),
(232, 'D', 'INV', 75, 900, 10, 9000, 0, 8100, 784, 774, 'W', 3, 1, '2020-06-28 07:29:59', '2020-06-28 07:29:59'),
(233, 'D', 'INV', 76, 900, 10, 9000, 0, 8100, 774, 764, 'W', 3, 1, '2020-06-28 07:30:48', '2020-06-28 07:30:48'),
(234, 'D', 'INV', 77, 900, 10, 9000, 0, 8100, 764, 754, 'W', 3, 1, '2020-06-28 07:31:31', '2020-06-28 07:31:31'),
(235, 'D', 'INV', 78, 900, 10, 9000, 0, 8100, 754, 744, 'W', 3, 1, '2020-06-28 07:32:26', '2020-06-28 07:32:26'),
(236, 'D', 'INV', 79, 900, 10, 9000, 0, 8100, 744, 734, 'W', 3, 1, '2020-06-28 07:39:21', '2020-06-28 07:39:21'),
(237, 'D', 'INV', 80, 900, 10, 9000, 0, 8100, 734, 724, 'W', 3, 1, '2020-06-28 07:39:57', '2020-06-28 07:39:57'),
(238, 'D', 'INV', 81, 900, 10, 9000, 0, 8100, 724, 714, 'W', 3, 1, '2020-06-28 07:40:22', '2020-06-28 07:40:22'),
(239, 'D', 'INV', 82, 900, 10, 9000, 0, 8100, 714, 704, 'W', 3, 1, '2020-06-28 07:40:45', '2020-06-28 07:40:45'),
(240, 'D', 'INV', 83, 900, 10, 9000, 0, 8100, 704, 694, 'W', 3, 1, '2020-06-28 07:41:16', '2020-06-28 07:41:16'),
(241, 'D', 'INV', 84, 900, 10, 9000, 0, 8100, 694, 684, 'W', 3, 1, '2020-06-28 07:41:52', '2020-06-28 07:41:52'),
(242, 'D', 'INV', 85, 900, 10, 9000, 0, 8100, 684, 674, 'W', 3, 1, '2020-06-28 07:43:12', '2020-06-28 07:43:12'),
(243, 'D', 'INV', 86, 900, 10, 9000, 0, 8100, 674, 664, 'W', 3, 1, '2020-06-28 07:43:59', '2020-06-28 07:43:59'),
(244, 'A', 'ITR', 7, 900, 10, 9000, 0, 9000, 654, 644, 'W', 3, 1, '2020-07-03 11:41:15', '2020-07-03 11:41:15'),
(245, 'A', 'ITR', 7, 900, 10, 9000, 0, 9000, 654, 644, 'W', 3, 1, '2020-07-03 11:41:15', '2020-07-03 11:41:15'),
(246, 'D', 'INV', 87, 900, 10, 9000, 0, 9000, 20, 10, 'B1', 3, 1, '2020-07-08 04:41:50', '2020-07-08 04:41:50'),
(247, 'A', 'GRN', 218, 11111, 10, 111110, 0, 111110, 270, 280, 'W', 1, 1, '2020-07-08 04:44:55', '2020-07-08 04:44:55'),
(248, 'A', 'ITR', 17, 900, 10, 9000, 0, 9000, 604, 594, 'W', 3, 1, '2020-07-08 05:02:25', '2020-07-08 05:02:25'),
(249, 'A', 'ITR', 17, 900, 10, 9000, 0, 9000, 604, 594, 'W', 3, 1, '2020-07-08 05:02:25', '2020-07-08 05:02:25'),
(250, 'D', 'INV', 89, 1500, 10, 15000, 0, 15000, 190, 180, 'W', 4, 1, '2020-07-08 05:12:37', '2020-07-08 05:12:37'),
(251, 'A', 'ITR', 18, 900, 10, 9000, 0, 9000, 594, 584, 'W', 3, 1, '2020-07-08 05:17:55', '2020-07-08 05:17:55'),
(252, 'A', 'ITR', 18, 900, 10, 9000, 0, 9000, 594, 584, 'W', 3, 1, '2020-07-08 05:17:55', '2020-07-08 05:17:55'),
(253, 'A', 'ITR', 19, 900, 10, 9000, 0, 9000, 584, 574, 'W', 3, 1, '2020-07-08 05:18:52', '2020-07-08 05:18:52'),
(254, 'A', 'ITR', 19, 900, 10, 9000, 0, 9000, 584, 574, 'W', 3, 1, '2020-07-08 05:18:52', '2020-07-08 05:18:52'),
(255, 'D', 'INV', 125, 900, 10, 8100, 10, 8100, 10, 0, 'B1', 3, 1, '2020-07-09 04:04:22', '2020-07-09 04:04:22'),
(256, 'D', 'INV', 126, 900, 10, 8100, 10, 8100, 0, -10, 'B1', 3, 1, '2020-07-09 04:04:27', '2020-07-09 04:04:27'),
(257, 'D', 'INV', 127, 900, 10, 8100, 10, 8100, -10, -20, 'B1', 3, 1, '2020-07-09 04:04:39', '2020-07-09 04:04:39'),
(258, 'D', 'INV', 128, 900, 10, 8100, 10, 8100, -20, -30, 'B1', 3, 1, '2020-07-09 04:05:39', '2020-07-09 04:05:39'),
(259, 'D', 'INV', 129, 900, 10, 8100, 10, 8100, -30, -40, 'B1', 3, 1, '2020-07-09 04:06:58', '2020-07-09 04:06:58'),
(260, 'D', 'INV', 130, 900, 10, 8100, 10, 8100, -40, -50, 'B1', 3, 1, '2020-07-09 04:17:31', '2020-07-09 04:17:31'),
(261, 'D', 'INV', 131, 900, 10, 8100, 10, 8100, -50, -60, 'B1', 3, 1, '2020-07-09 04:17:59', '2020-07-09 04:17:59'),
(262, 'D', 'INV', 132, 900, 10, 8100, 10, 8100, -60, -70, 'B1', 3, 1, '2020-07-09 04:18:50', '2020-07-09 04:18:50');

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
(1, 'saran', 'saran@gmail.com', NULL, '$2y$10$ezQEQLP.OQhi2EW05pcY3ukqjWcXG3xzbGTuocvuPGwtrY.r8uVXu', 'QOHmwgaiBEfOy478h4vkv9atMhquLWbnKn498Dsxa6910sCAG3XP1NGmhKSV', '2020-04-03 05:30:54', '2020-04-03 05:33:36'),
(3, 'Normal user', 'normal@gmail.com', NULL, '$2y$10$h2i3JITtuvXI8Up.lb6oge7HBzt39ZmCfn6nvvFQ51V8J0DLJPuBm', NULL, '2020-04-03 05:34:25', '2020-04-03 05:34:25'),
(4, 'tharju', 'tharju@gmail.com', NULL, '$2y$10$2F72POlj3I6fKTilF9vJFOp4oPQz4/tvWeofyMNTYCLvuNJKisbxa', NULL, '2020-04-07 09:50:04', '2020-04-07 09:50:04'),
(5, 'sathu', 'sathu@gmail.com', NULL, '$2y$10$465HVr0W1IF2oyDNI9GgheZrOU0pe5.jL2VFXPgbLkjpHKmL9iCVa', NULL, '2020-04-19 04:45:03', '2020-04-19 04:45:03');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cash_credit_acoount`
--
ALTER TABLE `cash_credit_acoount`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cash_credit_acoount_status_foreign` (`status`),
  ADD KEY `cash_credit_acoount_user_id_foreign` (`user_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cheques`
--
ALTER TABLE `cheques`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cheques_user_id_foreign` (`user_id`),
  ADD KEY `cheques_status_foreign` (`status`),
  ADD KEY `cheques_payment_foreign` (`Payment`);

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
-- Indexes for table `invoice_details`
--
ALTER TABLE `invoice_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `invoice_details_item_foreign` (`Item`),
  ADD KEY `invoice_details_invoice_header_foreign` (`Invoice_Header`);

--
-- Indexes for table `invoice_header`
--
ALTER TABLE `invoice_header`
  ADD PRIMARY KEY (`id`),
  ADD KEY `invoice_header_customer_id_foreign` (`customer_id`),
  ADD KEY `invoice_header_user_id_foreign` (`user_id`),
  ADD KEY `invoice_header_status_foreign` (`status`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `item_transfer_historys`
--
ALTER TABLE `item_transfer_historys`
  ADD PRIMARY KEY (`id`),
  ADD KEY `item_transfer_historys_item_foreign` (`Item`),
  ADD KEY `item_transfer_historys_user_id_foreign` (`user_id`);

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
-- Indexes for table `sales_order_details`
--
ALTER TABLE `sales_order_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sales_order_details_item_foreign` (`Item`),
  ADD KEY `sales_order_details_sales_order_header_foreign` (`Sales_Order_Header`);

--
-- Indexes for table `sales_order_header`
--
ALTER TABLE `sales_order_header`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sales_order_header_customer_id_foreign` (`customer_id`),
  ADD KEY `sales_order_header_user_id_foreign` (`user_id`),
  ADD KEY `sales_order_header_status_foreign` (`status`);

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
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `transactions_item_foreign` (`Item`),
  ADD KEY `transactions_user_id_foreign` (`user_id`);

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
-- AUTO_INCREMENT for table `cash_credit_acoount`
--
ALTER TABLE `cash_credit_acoount`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=110;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `cheques`
--
ALTER TABLE `cheques`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `doc_settings`
--
ALTER TABLE `doc_settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `expences`
--
ALTER TABLE `expences`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=241;

--
-- AUTO_INCREMENT for table `grn_header`
--
ALTER TABLE `grn_header`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=219;

--
-- AUTO_INCREMENT for table `invoice_details`
--
ALTER TABLE `invoice_details`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;

--
-- AUTO_INCREMENT for table `invoice_header`
--
ALTER TABLE `invoice_header`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=133;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `item_transfer_historys`
--
ALTER TABLE `item_transfer_historys`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

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
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=181;

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
-- AUTO_INCREMENT for table `sales_order_details`
--
ALTER TABLE `sales_order_details`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `sales_order_header`
--
ALTER TABLE `sales_order_header`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `stocks`
--
ALTER TABLE `stocks`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `system_status`
--
ALTER TABLE `system_status`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=263;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cash_credit_acoount`
--
ALTER TABLE `cash_credit_acoount`
  ADD CONSTRAINT `cash_credit_acoount_status_foreign` FOREIGN KEY (`status`) REFERENCES `system_status` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cash_credit_acoount_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `cheques`
--
ALTER TABLE `cheques`
  ADD CONSTRAINT `cheques_payment_foreign` FOREIGN KEY (`Payment`) REFERENCES `payments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cheques_status_foreign` FOREIGN KEY (`status`) REFERENCES `system_status` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cheques_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
-- Constraints for table `invoice_details`
--
ALTER TABLE `invoice_details`
  ADD CONSTRAINT `invoice_details_invoice_header_foreign` FOREIGN KEY (`Invoice_Header`) REFERENCES `invoice_header` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `invoice_details_item_foreign` FOREIGN KEY (`Item`) REFERENCES `items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `invoice_header`
--
ALTER TABLE `invoice_header`
  ADD CONSTRAINT `invoice_header_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `invoice_header_status_foreign` FOREIGN KEY (`status`) REFERENCES `system_status` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `invoice_header_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `item_transfer_historys`
--
ALTER TABLE `item_transfer_historys`
  ADD CONSTRAINT `item_transfer_historys_item_foreign` FOREIGN KEY (`Item`) REFERENCES `items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `item_transfer_historys_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
-- Constraints for table `sales_order_details`
--
ALTER TABLE `sales_order_details`
  ADD CONSTRAINT `sales_order_details_item_foreign` FOREIGN KEY (`Item`) REFERENCES `items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sales_order_details_sales_order_header_foreign` FOREIGN KEY (`Sales_Order_Header`) REFERENCES `sales_order_header` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sales_order_header`
--
ALTER TABLE `sales_order_header`
  ADD CONSTRAINT `sales_order_header_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sales_order_header_status_foreign` FOREIGN KEY (`status`) REFERENCES `system_status` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sales_order_header_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `stocks`
--
ALTER TABLE `stocks`
  ADD CONSTRAINT `stocks_item_foreign` FOREIGN KEY (`Item`) REFERENCES `items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_item_foreign` FOREIGN KEY (`Item`) REFERENCES `items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

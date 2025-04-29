-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 29, 2025 at 11:54 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `backup`
--
CREATE DATABASE IF NOT EXISTS `backup` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `backup`;
--
-- Database: `laravel`
--
CREATE DATABASE IF NOT EXISTS `laravel` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `laravel`;

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `mobile` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `name` varchar(20) NOT NULL,
  `status` tinyint(4) DEFAULT NULL,
  `head_count` int(11) NOT NULL DEFAULT 0,
  `section_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `mobile`, `email`, `name`, `status`, `head_count`, `section_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '9099103410', 'harmitkatariya153@gmail.com', 'Harmit Katariya', 2, 0, 2, '2025-04-29 04:17:08', '2025-04-29 04:17:08', NULL),
(2, '9898232348', 'meetshah@gmail.com', 'Meet Shah', 2, 0, 1, '2025-04-29 04:18:56', '2025-04-29 04:18:56', NULL),
(3, '9898231223', 'sanskrutpaneliya148@gmail.com', 'SanskruT Paneliya', 2, 0, 4, '2025-04-29 04:21:12', '2025-04-29 04:21:12', NULL),
(4, '9834343445', 'sweetpate@gmail.com', 'SweeT Pate', 2, 0, 3, '2025-04-29 04:22:57', '2025-04-29 04:22:57', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(40) NOT NULL,
  `item_type` enum('veg','non-veg','vegan') NOT NULL DEFAULT 'veg',
  `description` varchar(200) DEFAULT NULL,
  `category_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `unit` enum('gms','pcs') NOT NULL DEFAULT 'pcs',
  `rate` int(11) NOT NULL,
  `default_tax` tinyint(1) NOT NULL DEFAULT 1,
  `sell_count` int(11) NOT NULL DEFAULT 0,
  `tax_percentage` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `available` tinyint(1) NOT NULL DEFAULT 1,
  `short_code` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `name`, `item_type`, `description`, `category_id`, `quantity`, `unit`, `rate`, `default_tax`, `sell_count`, `tax_percentage`, `created_at`, `updated_at`, `deleted_at`, `available`, `short_code`, `image`) VALUES
(1, 'Margherita Pizza', 'veg', NULL, 1, 4, 'pcs', 350, 0, 0, 18, '2025-04-29 03:46:27', '2025-04-29 03:49:40', NULL, 0, NULL, 'mGVTAcIuQL5tS8u5jnJpM85sTL6hZkcabkv8vXY1.png'),
(2, 'Pepperoni Pizza', 'non-veg', NULL, 1, 4, 'pcs', 793, 1, 1, 18, '2025-04-29 03:47:40', '2025-04-29 04:21:30', NULL, 1, NULL, NULL),
(3, '7 Cheeze Pizza', 'veg', NULL, 1, 4, 'pcs', 490, 0, 0, 18, '2025-04-29 03:50:24', '2025-04-29 03:50:24', NULL, 0, NULL, NULL),
(4, 'Vegetable Garden Pizza', 'veg', NULL, 1, 4, 'pcs', 760, 0, 0, 12, '2025-04-29 03:51:06', '2025-04-29 03:51:06', NULL, 0, NULL, NULL),
(5, 'Mexican Jalapinos Pizza', 'veg', NULL, 1, 2, 'pcs', 350, 0, 2, 18, '2025-04-29 03:52:18', '2025-04-29 04:23:12', NULL, 0, NULL, NULL),
(6, 'Aloo Tikki Burger', 'veg', NULL, 2, 1, 'pcs', 250, 0, 0, 18, '2025-04-29 03:53:22', '2025-04-29 03:53:22', NULL, 0, NULL, NULL),
(7, 'Tandoori Twist Burger', 'veg', NULL, 2, 1, 'pcs', 350, 0, 1, 18, '2025-04-29 03:53:55', '2025-04-29 04:23:12', NULL, 0, NULL, NULL),
(8, 'Schezwan Sizzler Burger', 'veg', NULL, 2, 1, 'pcs', 320, 0, 4, 18, '2025-04-29 03:54:53', '2025-04-29 04:23:12', NULL, 0, NULL, NULL),
(9, 'Maharaja Burger', 'non-veg', NULL, 2, 1, 'pcs', 450, 0, 1, 18, '2025-04-29 03:55:25', '2025-04-29 04:19:34', NULL, 0, NULL, NULL),
(10, 'Vegetable Sandwich', 'veg', NULL, 3, 2, 'pcs', 200, 0, 1, 12, '2025-04-29 03:56:06', '2025-04-29 04:19:34', NULL, 0, NULL, NULL),
(11, 'Grilled Sandwich', 'veg', NULL, 3, 2, 'pcs', 240, 0, 1, 12, '2025-04-29 03:57:23', '2025-04-29 04:23:12', NULL, 0, NULL, NULL),
(12, 'Cheeze Sandwich', 'veg', NULL, 3, 2, 'pcs', 200, 0, 0, 12, '2025-04-29 03:58:05', '2025-04-29 03:58:05', NULL, 0, NULL, NULL),
(13, 'Maxican Tacos', 'veg', NULL, 4, 1, 'pcs', 200, 0, 0, 18, '2025-04-29 03:58:45', '2025-04-29 03:58:45', NULL, 0, NULL, NULL),
(14, 'Corn n Onion Garlic Bread', 'veg', NULL, 5, 4, 'pcs', 320, 0, 1, 18, '2025-04-29 03:59:28', '2025-04-29 04:19:34', NULL, 0, NULL, NULL),
(15, 'Cheeze Garlic Bread', 'veg', NULL, 5, 4, 'pcs', 300, 0, 0, 12, '2025-04-29 04:00:19', '2025-04-29 04:00:19', NULL, 0, NULL, NULL),
(16, 'Garlic Roll', 'veg', NULL, 5, 1, 'pcs', 220, 0, 0, 18, '2025-04-29 04:00:57', '2025-04-29 04:00:57', NULL, 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `item_categories`
--

CREATE TABLE `item_categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(150) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `item_categories`
--

INSERT INTO `item_categories` (`id`, `name`, `description`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 'Pizza', NULL, NULL, '2025-04-29 03:45:07', '2025-04-29 03:45:07'),
(2, 'Burger', NULL, NULL, '2025-04-29 03:45:12', '2025-04-29 03:45:12'),
(3, 'Sandwich', NULL, NULL, '2025-04-29 03:45:21', '2025-04-29 03:45:21'),
(4, 'Tacos', NULL, NULL, '2025-04-29 03:45:43', '2025-04-29 03:45:43'),
(5, 'Garlic Bread', NULL, NULL, '2025-04-29 03:54:06', '2025-04-29 03:54:06');

-- --------------------------------------------------------

--
-- Table structure for table `item_modifier_groups_mapping`
--

CREATE TABLE `item_modifier_groups_mapping` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `item_id` bigint(20) UNSIGNED NOT NULL,
  `modifier_group_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `item_modifier_groups_mapping`
--

INSERT INTO `item_modifier_groups_mapping` (`id`, `item_id`, `modifier_group_id`, `created_at`, `updated_at`) VALUES
(1, 1, 1, NULL, NULL),
(2, 1, 2, NULL, NULL),
(3, 1, 3, NULL, NULL),
(4, 1, 4, NULL, NULL),
(5, 2, 1, NULL, NULL),
(6, 2, 2, NULL, NULL),
(7, 2, 3, NULL, NULL),
(8, 2, 4, NULL, NULL),
(9, 3, 1, NULL, NULL),
(10, 3, 2, NULL, NULL),
(11, 3, 3, NULL, NULL),
(12, 3, 4, NULL, NULL),
(13, 4, 1, NULL, NULL),
(14, 4, 2, NULL, NULL),
(15, 4, 3, NULL, NULL),
(16, 4, 4, NULL, NULL),
(17, 5, 1, NULL, NULL),
(18, 5, 2, NULL, NULL),
(19, 5, 3, NULL, NULL),
(20, 5, 4, NULL, NULL),
(21, 6, 1, NULL, NULL),
(22, 6, 2, NULL, NULL),
(23, 6, 3, NULL, NULL),
(24, 7, 1, NULL, NULL),
(25, 7, 2, NULL, NULL),
(26, 7, 3, NULL, NULL),
(27, 8, 1, NULL, NULL),
(28, 8, 2, NULL, NULL),
(29, 8, 3, NULL, NULL),
(30, 9, 1, NULL, NULL),
(31, 9, 2, NULL, NULL),
(32, 9, 3, NULL, NULL),
(33, 10, 1, NULL, NULL),
(34, 10, 2, NULL, NULL),
(35, 10, 3, NULL, NULL),
(36, 11, 1, NULL, NULL),
(37, 11, 2, NULL, NULL),
(38, 11, 3, NULL, NULL),
(39, 12, 1, NULL, NULL),
(40, 13, 1, NULL, NULL),
(41, 13, 3, NULL, NULL),
(42, 14, 1, NULL, NULL),
(43, 14, 2, NULL, NULL),
(44, 14, 3, NULL, NULL),
(45, 15, 1, NULL, NULL),
(46, 15, 2, NULL, NULL),
(47, 16, 1, NULL, NULL),
(48, 16, 3, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `k_o_t_s`
--

CREATE TABLE `k_o_t_s` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `item_category` bigint(20) UNSIGNED NOT NULL,
  `status` int(11) NOT NULL DEFAULT 0,
  `item_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`item_data`)),
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `k_o_t_s`
--

INSERT INTO `k_o_t_s` (`id`, `order_id`, `item_category`, `status`, `item_data`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 100, 2, 0, '{\"items\":{\"item_id\":8,\"item_name\":\"Schezwan Sizzler Burger\",\"item_rate\":377.6,\"modifiers\":[{\"modifier_id\":1,\"modifier_name\":\"Mozerella Cheeze\",\"modifier_rate\":230},{\"modifier_id\":4,\"modifier_name\":\"Medium Serve\",\"modifier_rate\":200},{\"modifier_id\":6,\"modifier_name\":\"Schezwan Sauce\",\"modifier_rate\":200}],\"multiplier\":1},\"tables\":[\"F1\"],\"section\":\"First Floor\"}', '2025-04-29 04:17:36', '2025-04-29 04:17:31', '2025-04-29 04:17:36'),
(2, 101, 1, 0, '{\"items\":{\"item_id\":5,\"item_name\":\"Mexican Jalapinos Pizza\",\"item_rate\":413,\"modifiers\":[{\"modifier_id\":2,\"modifier_name\":\"Cheddar Cheeze\",\"modifier_rate\":320},{\"modifier_id\":3,\"modifier_name\":\"Large Serve\",\"modifier_rate\":400},{\"modifier_id\":6,\"modifier_name\":\"Schezwan Sauce\",\"modifier_rate\":200},{\"modifier_id\":8,\"modifier_name\":\"Whole Wheat Crust\",\"modifier_rate\":300}],\"multiplier\":1},\"tables\":[\"G5\"],\"section\":\"Ground Floor\"}', '2025-04-29 04:20:14', '2025-04-29 04:19:34', '2025-04-29 04:20:14'),
(3, 101, 2, 0, '{\"items\":{\"item_id\":9,\"item_name\":\"Maharaja Burger\",\"item_rate\":531,\"modifiers\":[{\"modifier_id\":2,\"modifier_name\":\"Cheddar Cheeze\",\"modifier_rate\":320},{\"modifier_id\":4,\"modifier_name\":\"Medium Serve\",\"modifier_rate\":200},{\"modifier_id\":6,\"modifier_name\":\"Schezwan Sauce\",\"modifier_rate\":200}],\"multiplier\":1},\"tables\":[\"G5\"],\"section\":\"Ground Floor\"}', '2025-04-29 04:20:14', '2025-04-29 04:19:34', '2025-04-29 04:20:14'),
(4, 101, 3, 0, '{\"items\":{\"item_id\":10,\"item_name\":\"Vegetable Sandwich\",\"item_rate\":224,\"modifiers\":[{\"modifier_id\":3,\"modifier_name\":\"Large Serve\",\"modifier_rate\":400},{\"modifier_id\":4,\"modifier_name\":\"Medium Serve\",\"modifier_rate\":200}],\"multiplier\":1},\"tables\":[\"G5\"],\"section\":\"Ground Floor\"}', '2025-04-29 04:20:14', '2025-04-29 04:19:34', '2025-04-29 04:20:14'),
(5, 101, 5, 0, '{\"items\":{\"item_id\":14,\"item_name\":\"Corn n Onion Garlic Bread\",\"item_rate\":377.6,\"modifiers\":[{\"modifier_id\":4,\"modifier_name\":\"Medium Serve\",\"modifier_rate\":200},{\"modifier_id\":9,\"modifier_name\":\"Small Serve\",\"modifier_rate\":100}],\"multiplier\":1},\"tables\":[\"G5\"],\"section\":\"Ground Floor\"}', '2025-04-29 04:20:14', '2025-04-29 04:19:34', '2025-04-29 04:20:14'),
(6, 102, 1, 0, '{\"items\":{\"item_id\":2,\"item_name\":\"Pepperoni Pizza\",\"item_rate\":935.74,\"modifiers\":[{\"modifier_id\":1,\"modifier_name\":\"Mozerella Cheeze\",\"modifier_rate\":230},{\"modifier_id\":2,\"modifier_name\":\"Cheddar Cheeze\",\"modifier_rate\":320},{\"modifier_id\":4,\"modifier_name\":\"Medium Serve\",\"modifier_rate\":200},{\"modifier_id\":6,\"modifier_name\":\"Schezwan Sauce\",\"modifier_rate\":200},{\"modifier_id\":8,\"modifier_name\":\"Whole Wheat Crust\",\"modifier_rate\":300}],\"multiplier\":1},\"tables\":[\"T2\"],\"section\":\"Terrace\"}', NULL, '2025-04-29 04:21:30', '2025-04-29 04:21:30'),
(7, 102, 2, 0, '{\"items\":{\"item_id\":8,\"item_name\":\"Schezwan Sizzler Burger\",\"item_rate\":377.6,\"modifiers\":[{\"modifier_id\":4,\"modifier_name\":\"Medium Serve\",\"modifier_rate\":200},{\"modifier_id\":9,\"modifier_name\":\"Small Serve\",\"modifier_rate\":100}],\"multiplier\":1},\"tables\":[\"T2\"],\"section\":\"Terrace\"}', NULL, '2025-04-29 04:21:30', '2025-04-29 04:21:30'),
(8, 102, 2, 0, '{\"items\":{\"item_id\":8,\"item_name\":\"Schezwan Sizzler Burger\",\"item_rate\":377.6,\"modifiers\":[{\"modifier_id\":6,\"modifier_name\":\"Schezwan Sauce\",\"modifier_rate\":200}],\"multiplier\":1},\"tables\":[\"T2\"],\"section\":\"Terrace\"}', NULL, '2025-04-29 04:21:30', '2025-04-29 04:21:30'),
(9, 103, 1, 0, '{\"items\":{\"item_id\":5,\"item_name\":\"Mexican Jalapinos Pizza\",\"item_rate\":413,\"modifiers\":[{\"modifier_id\":6,\"modifier_name\":\"Schezwan Sauce\",\"modifier_rate\":200},{\"modifier_id\":5,\"modifier_name\":\"Tomato Sauce\",\"modifier_rate\":200}],\"multiplier\":1},\"tables\":[\"S2\"],\"section\":\"Second Floor\"}', NULL, '2025-04-29 04:23:12', '2025-04-29 04:23:12'),
(10, 103, 2, 0, '{\"items\":{\"item_id\":8,\"item_name\":\"Schezwan Sizzler Burger\",\"item_rate\":377.6,\"modifiers\":[{\"modifier_id\":6,\"modifier_name\":\"Schezwan Sauce\",\"modifier_rate\":200},{\"modifier_id\":5,\"modifier_name\":\"Tomato Sauce\",\"modifier_rate\":200}],\"multiplier\":1},\"tables\":[\"S2\"],\"section\":\"Second Floor\"}', NULL, '2025-04-29 04:23:12', '2025-04-29 04:23:12'),
(11, 103, 3, 0, '{\"items\":{\"item_id\":11,\"item_name\":\"Grilled Sandwich\",\"item_rate\":268.8,\"modifiers\":[{\"modifier_id\":2,\"modifier_name\":\"Cheddar Cheeze\",\"modifier_rate\":320},{\"modifier_id\":1,\"modifier_name\":\"Mozerella Cheeze\",\"modifier_rate\":230}],\"multiplier\":1},\"tables\":[\"S2\"],\"section\":\"Second Floor\"}', NULL, '2025-04-29 04:23:12', '2025-04-29 04:23:12'),
(12, 103, 2, 0, '{\"items\":{\"item_id\":7,\"item_name\":\"Tandoori Twist Burger\",\"item_rate\":413,\"modifiers\":[{\"modifier_id\":3,\"modifier_name\":\"Large Serve\",\"modifier_rate\":400}],\"multiplier\":1},\"tables\":[\"S2\"],\"section\":\"Second Floor\"}', NULL, '2025-04-29 04:23:12', '2025-04-29 04:23:12');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2025_03_11_131049_create_modifiers_table', 1),
(6, '2025_03_11_132844_create_modifier_groups_table', 1),
(7, '2025_03_12_052031_create_items_table', 1),
(8, '2025_03_12_052102_create_item_categories_table', 1),
(9, '2025_03_25_102854_add_unit_column_in_items', 1),
(10, '2025_03_26_091028_create_modifier_modifier_group_table', 1),
(11, '2025_03_27_110704_create_sections_table', 1),
(12, '2025_03_27_110729_create_tables_table', 1),
(13, '2025_03_28_051128_id_fixing', 1),
(14, '2025_03_31_050944_create_tax_fees_table', 1),
(15, '2025_04_01_043921_create_item_modifier_groups_table', 1),
(16, '2025_04_01_044427_item_modifications', 1),
(17, '2025_04_03_085644_create_customers_table', 1),
(18, '2025_04_03_115802_tables_modification', 1),
(19, '2025_04_04_115548_create_orders_table', 1),
(20, '2025_04_18_075750_create_waiting_tokens_table', 1),
(21, '2025_04_21_043540_create_k_o_t_s_table', 1),
(22, '2025_04_25_041035_create_permission_tables', 1);

-- --------------------------------------------------------

--
-- Table structure for table `model_has_permissions`
--

CREATE TABLE `model_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `model_has_roles`
--

CREATE TABLE `model_has_roles` (
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `model_has_roles`
--

INSERT INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
(1, 'App\\Models\\User', 1),
(3, 'App\\Models\\User', 2),
(3, 'App\\Models\\User', 3);

-- --------------------------------------------------------

--
-- Table structure for table `modifiers`
--

CREATE TABLE `modifiers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `rate` int(11) NOT NULL,
  `unit` enum('grams','pieces') NOT NULL,
  `quantity` int(11) NOT NULL,
  `description` varchar(150) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `modifiers`
--

INSERT INTO `modifiers` (`id`, `name`, `rate`, `unit`, `quantity`, `description`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Mozerella Cheeze', 230, 'pieces', 4, NULL, '2025-04-29 03:40:48', '2025-04-29 03:41:21', NULL),
(2, 'Cheddar Cheeze', 320, 'grams', 300, NULL, '2025-04-29 03:41:10', '2025-04-29 03:41:10', NULL),
(3, 'Large Serve', 400, 'pieces', 12, NULL, '2025-04-29 03:42:01', '2025-04-29 03:42:35', NULL),
(4, 'Medium Serve', 200, 'pieces', 4, NULL, '2025-04-29 03:42:26', '2025-04-29 03:44:51', NULL),
(5, 'Tomato Sauce', 200, 'grams', 200, NULL, '2025-04-29 03:43:14', '2025-04-29 03:43:14', NULL),
(6, 'Schezwan Sauce', 200, 'grams', 50, NULL, '2025-04-29 03:43:43', '2025-04-29 03:43:43', NULL),
(7, 'Thin Crust', 400, 'pieces', 1, NULL, '2025-04-29 03:44:00', '2025-04-29 03:44:00', NULL),
(8, 'Whole Wheat Crust', 300, 'pieces', 1, NULL, '2025-04-29 03:44:23', '2025-04-29 03:44:23', NULL),
(9, 'Small Serve', 100, 'pieces', 2, NULL, '2025-04-29 03:44:42', '2025-04-29 03:44:42', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `modifier_groups`
--

CREATE TABLE `modifier_groups` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(150) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `modifier_groups`
--

INSERT INTO `modifier_groups` (`id`, `name`, `description`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 'Cheeze Options', 'Have more cheezy delight', NULL, '2025-04-29 03:37:59', '2025-04-29 03:37:59'),
(2, 'Size Options', 'Serving Size', NULL, '2025-04-29 03:38:14', '2025-04-29 03:38:14'),
(3, 'Sauce Options', 'Twist the taste', NULL, '2025-04-29 03:38:40', '2025-04-29 03:38:40'),
(4, 'Crust Options', 'Change Base', NULL, '2025-04-29 03:39:00', '2025-04-29 03:39:00');

-- --------------------------------------------------------

--
-- Table structure for table `modifier_modifier_group`
--

CREATE TABLE `modifier_modifier_group` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `modifier_id` bigint(20) UNSIGNED NOT NULL,
  `modifier_group_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `modifier_modifier_group`
--

INSERT INTO `modifier_modifier_group` (`id`, `modifier_id`, `modifier_group_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 1, NULL, NULL, NULL),
(2, 2, 1, NULL, NULL, NULL),
(3, 3, 2, NULL, NULL, NULL),
(4, 4, 2, NULL, NULL, NULL),
(5, 5, 3, NULL, NULL, NULL),
(6, 6, 3, NULL, NULL, NULL),
(7, 7, 4, NULL, NULL, NULL),
(8, 8, 4, NULL, NULL, NULL),
(9, 9, 2, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `customer_id` bigint(20) UNSIGNED NOT NULL,
  `order_status` enum('Completed','Ordered') DEFAULT NULL,
  `order_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`order_data`)),
  `payment_mode` enum('Cash','Online','Card') NOT NULL,
  `payment_status` enum('Completed','Pending','-') NOT NULL,
  `bill_amount` int(11) DEFAULT NULL,
  `rating` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`rating`)),
  `comment` varchar(180) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `customer_id`, `order_status`, `order_data`, `payment_mode`, `payment_status`, `bill_amount`, `rating`, `comment`, `deleted_at`, `created_at`, `updated_at`) VALUES
(100, 1, 'Completed', '{\"table_ids\":[5],\"table_names\":[\"F1\"],\"section_id\":2,\"section_name\":\"First Floor\",\"items\":[{\"item_id\":8,\"item_name\":\"Schezwan Sizzler Burger\",\"item_rate\":377.6,\"modifiers\":[{\"modifier_id\":1,\"modifier_name\":\"Mozerella Cheeze\",\"modifier_rate\":230},{\"modifier_id\":4,\"modifier_name\":\"Medium Serve\",\"modifier_rate\":200},{\"modifier_id\":6,\"modifier_name\":\"Schezwan Sauce\",\"modifier_rate\":200}],\"multiplier\":1}],\"taxes\":{\"GST\":0,\"Service Charge\":150,\"SGST\":0,\"CGST\":0},\"subTotal\":1008,\"total\":1158}', 'Cash', 'Completed', 1158, '{\"food\":4,\"ambience\":5,\"service\":5}', 'Nice view and location, food is okay', NULL, '2025-04-29 04:17:31', '2025-04-29 04:18:00'),
(101, 2, 'Completed', '{\"table_ids\":[4],\"table_names\":[\"G5\"],\"section_id\":1,\"section_name\":\"Ground Floor\",\"items\":[{\"item_id\":5,\"item_name\":\"Mexican Jalapinos Pizza\",\"item_rate\":413,\"modifiers\":[{\"modifier_id\":2,\"modifier_name\":\"Cheddar Cheeze\",\"modifier_rate\":320},{\"modifier_id\":3,\"modifier_name\":\"Large Serve\",\"modifier_rate\":400},{\"modifier_id\":6,\"modifier_name\":\"Schezwan Sauce\",\"modifier_rate\":200},{\"modifier_id\":8,\"modifier_name\":\"Whole Wheat Crust\",\"modifier_rate\":300}],\"multiplier\":1},{\"item_id\":9,\"item_name\":\"Maharaja Burger\",\"item_rate\":531,\"modifiers\":[{\"modifier_id\":2,\"modifier_name\":\"Cheddar Cheeze\",\"modifier_rate\":320},{\"modifier_id\":4,\"modifier_name\":\"Medium Serve\",\"modifier_rate\":200},{\"modifier_id\":6,\"modifier_name\":\"Schezwan Sauce\",\"modifier_rate\":200}],\"multiplier\":1},{\"item_id\":10,\"item_name\":\"Vegetable Sandwich\",\"item_rate\":224,\"modifiers\":[{\"modifier_id\":3,\"modifier_name\":\"Large Serve\",\"modifier_rate\":400},{\"modifier_id\":4,\"modifier_name\":\"Medium Serve\",\"modifier_rate\":200}],\"multiplier\":1},{\"item_id\":14,\"item_name\":\"Corn n Onion Garlic Bread\",\"item_rate\":377.6,\"modifiers\":[{\"modifier_id\":4,\"modifier_name\":\"Medium Serve\",\"modifier_rate\":200},{\"modifier_id\":9,\"modifier_name\":\"Small Serve\",\"modifier_rate\":100}],\"multiplier\":1}],\"taxes\":{\"GST\":0,\"Service Charge\":150,\"SGST\":0,\"CGST\":0},\"subTotal\":4386,\"total\":4536}', 'Cash', 'Completed', 4536, '{\"food\":null,\"ambience\":null,\"service\":4}', NULL, NULL, '2025-04-29 04:19:34', '2025-04-29 04:20:18'),
(102, 3, 'Ordered', '{\"table_ids\":[12],\"table_names\":[\"T2\"],\"section_id\":4,\"section_name\":\"Terrace\",\"items\":[{\"item_id\":2,\"item_name\":\"Pepperoni Pizza\",\"item_rate\":935.74,\"modifiers\":[{\"modifier_id\":1,\"modifier_name\":\"Mozerella Cheeze\",\"modifier_rate\":230},{\"modifier_id\":2,\"modifier_name\":\"Cheddar Cheeze\",\"modifier_rate\":320},{\"modifier_id\":4,\"modifier_name\":\"Medium Serve\",\"modifier_rate\":200},{\"modifier_id\":6,\"modifier_name\":\"Schezwan Sauce\",\"modifier_rate\":200},{\"modifier_id\":8,\"modifier_name\":\"Whole Wheat Crust\",\"modifier_rate\":300}],\"multiplier\":1},{\"item_id\":8,\"item_name\":\"Schezwan Sizzler Burger\",\"item_rate\":377.6,\"modifiers\":[{\"modifier_id\":4,\"modifier_name\":\"Medium Serve\",\"modifier_rate\":200},{\"modifier_id\":9,\"modifier_name\":\"Small Serve\",\"modifier_rate\":100}],\"multiplier\":1},{\"item_id\":8,\"item_name\":\"Schezwan Sizzler Burger\",\"item_rate\":377.6,\"modifiers\":[{\"modifier_id\":6,\"modifier_name\":\"Schezwan Sauce\",\"modifier_rate\":200}],\"multiplier\":1}],\"taxes\":{\"GST\":0,\"Service Charge\":150,\"SGST\":0,\"CGST\":0},\"subTotal\":3441,\"total\":3591}', 'Card', 'Completed', 3591, '4', NULL, NULL, '2025-04-29 04:21:30', '2025-04-29 04:21:30'),
(103, 4, 'Ordered', '{\"table_ids\":[17],\"table_names\":[\"S2\"],\"section_id\":3,\"section_name\":\"Second Floor\",\"items\":[{\"item_id\":5,\"item_name\":\"Mexican Jalapinos Pizza\",\"item_rate\":413,\"modifiers\":[{\"modifier_id\":6,\"modifier_name\":\"Schezwan Sauce\",\"modifier_rate\":200},{\"modifier_id\":5,\"modifier_name\":\"Tomato Sauce\",\"modifier_rate\":200}],\"multiplier\":1},{\"item_id\":8,\"item_name\":\"Schezwan Sizzler Burger\",\"item_rate\":377.6,\"modifiers\":[{\"modifier_id\":6,\"modifier_name\":\"Schezwan Sauce\",\"modifier_rate\":200},{\"modifier_id\":5,\"modifier_name\":\"Tomato Sauce\",\"modifier_rate\":200}],\"multiplier\":1},{\"item_id\":11,\"item_name\":\"Grilled Sandwich\",\"item_rate\":268.8,\"modifiers\":[{\"modifier_id\":2,\"modifier_name\":\"Cheddar Cheeze\",\"modifier_rate\":320},{\"modifier_id\":1,\"modifier_name\":\"Mozerella Cheeze\",\"modifier_rate\":230}],\"multiplier\":1},{\"item_id\":7,\"item_name\":\"Tandoori Twist Burger\",\"item_rate\":413,\"modifiers\":[{\"modifier_id\":3,\"modifier_name\":\"Large Serve\",\"modifier_rate\":400}],\"multiplier\":1}],\"taxes\":{\"GST\":0,\"Service Charge\":150,\"SGST\":0,\"CGST\":0},\"subTotal\":3222,\"total\":3372}', 'Card', 'Completed', 3372, '4', NULL, NULL, '2025-04-29 04:23:12', '2025-04-29 04:23:12');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'view_user', 'api', '2025-04-29 03:09:13', '2025-04-29 03:09:13'),
(2, 'add_edit_user', 'api', '2025-04-29 03:09:13', '2025-04-29 03:09:13'),
(3, 'delete_user', 'api', '2025-04-29 03:09:13', '2025-04-29 03:09:13'),
(4, 'view_role_permission', 'api', '2025-04-29 03:09:13', '2025-04-29 03:09:13'),
(5, 'add_edit_role_permission', 'api', '2025-04-29 03:09:13', '2025-04-29 03:09:13'),
(6, 'delete_role_permission', 'api', '2025-04-29 03:09:13', '2025-04-29 03:09:13'),
(7, 'view_menu', 'api', '2025-04-29 03:09:13', '2025-04-29 03:09:13'),
(8, 'add_edit_menu', 'api', '2025-04-29 03:09:13', '2025-04-29 03:09:13'),
(9, 'delete_menu', 'api', '2025-04-29 03:09:13', '2025-04-29 03:09:13'),
(10, 'view_table', 'api', '2025-04-29 03:09:13', '2025-04-29 03:09:13'),
(11, 'add_edit_table', 'api', '2025-04-29 03:09:13', '2025-04-29 03:09:13'),
(12, 'delete_table', 'api', '2025-04-29 03:09:13', '2025-04-29 03:09:13'),
(13, 'view_tax', 'api', '2025-04-29 03:09:13', '2025-04-29 03:09:13'),
(14, 'add_edit_tax', 'api', '2025-04-29 03:09:13', '2025-04-29 03:09:13'),
(15, 'delete_tax', 'api', '2025-04-29 03:09:13', '2025-04-29 03:09:13'),
(16, 'view_fee', 'api', '2025-04-29 03:09:13', '2025-04-29 03:09:13'),
(17, 'add_edit_fee', 'api', '2025-04-29 03:09:13', '2025-04-29 03:09:13'),
(18, 'delete_fee', 'api', '2025-04-29 03:09:13', '2025-04-29 03:09:13'),
(19, 'view_order', 'api', '2025-04-29 03:09:13', '2025-04-29 03:09:13'),
(20, 'add_edit_order', 'api', '2025-04-29 03:09:13', '2025-04-29 03:09:13'),
(21, 'delete_order', 'api', '2025-04-29 03:09:13', '2025-04-29 03:09:13'),
(22, 'view_customer', 'api', '2025-04-29 03:09:13', '2025-04-29 03:09:13'),
(23, 'add_edit_customer', 'api', '2025-04-29 03:09:13', '2025-04-29 03:09:13'),
(24, 'delete_customer', 'api', '2025-04-29 03:09:13', '2025-04-29 03:09:13'),
(25, 'view_kot', 'api', '2025-04-29 03:09:13', '2025-04-29 03:09:13'),
(26, 'add_edit_kot', 'api', '2025-04-29 03:09:13', '2025-04-29 03:09:13'),
(27, 'delete_kot', 'api', '2025-04-29 03:09:13', '2025-04-29 03:09:13');

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'super_admin', 'api', '2025-04-29 03:09:13', '2025-04-29 03:09:13'),
(2, 'account_manager', 'api', '2025-04-29 03:09:13', '2025-04-29 03:09:13'),
(3, 'chef', 'api', '2025-04-29 03:09:13', '2025-04-29 03:09:13');

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
(7, 2),
(8, 2),
(9, 2),
(10, 2),
(11, 2),
(12, 2),
(13, 2),
(14, 2),
(15, 2),
(16, 2),
(17, 2),
(18, 2),
(19, 2),
(20, 2),
(21, 2),
(22, 2),
(23, 2),
(24, 2),
(25, 2),
(25, 3),
(26, 2),
(26, 3),
(27, 2);

-- --------------------------------------------------------

--
-- Table structure for table `sections`
--

CREATE TABLE `sections` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(20) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sections`
--

INSERT INTO `sections` (`id`, `name`, `description`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 'Ground Floor', NULL, NULL, '2025-04-29 04:01:08', '2025-04-29 04:01:08'),
(2, 'First Floor', NULL, NULL, '2025-04-29 04:01:15', '2025-04-29 04:01:15'),
(3, 'Second Floor', NULL, NULL, '2025-04-29 04:01:22', '2025-04-29 04:01:22'),
(4, 'Terrace', NULL, NULL, '2025-04-29 04:01:31', '2025-04-29 04:01:31'),
(5, 'Garden', NULL, NULL, '2025-04-29 04:01:36', '2025-04-29 04:01:36'),
(6, 'Lawn', NULL, NULL, '2025-04-29 04:01:43', '2025-04-29 04:01:43');

-- --------------------------------------------------------

--
-- Table structure for table `tables`
--

CREATE TABLE `tables` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(10) NOT NULL,
  `section_id` bigint(20) UNSIGNED DEFAULT NULL,
  `capacity` int(11) NOT NULL DEFAULT 0,
  `status` enum('Available','Assigned','Running') NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `assigned_to` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tables`
--

INSERT INTO `tables` (`id`, `name`, `section_id`, `capacity`, `status`, `deleted_at`, `created_at`, `updated_at`, `assigned_to`) VALUES
(1, 'G1', 1, 4, 'Assigned', NULL, '2025-04-29 04:02:13', '2025-04-29 04:22:01', 2),
(2, 'G2', 1, 2, 'Available', NULL, '2025-04-29 04:02:25', '2025-04-29 04:02:25', NULL),
(3, 'G3', 1, 4, 'Available', NULL, '2025-04-29 04:02:37', '2025-04-29 04:02:44', NULL),
(4, 'G5', 1, 6, 'Available', NULL, '2025-04-29 04:02:56', '2025-04-29 04:20:14', 2),
(5, 'F1', 2, 2, 'Available', NULL, '2025-04-29 04:03:04', '2025-04-29 04:17:36', 1),
(6, 'F2', 2, 4, 'Available', NULL, '2025-04-29 04:03:11', '2025-04-29 04:03:11', NULL),
(7, 'F3', 2, 4, 'Available', NULL, '2025-04-29 04:03:39', '2025-04-29 04:03:39', NULL),
(8, 'L1', 6, 3, 'Available', NULL, '2025-04-29 04:03:53', '2025-04-29 04:03:53', NULL),
(9, 'L2', 6, 2, 'Available', NULL, '2025-04-29 04:04:03', '2025-04-29 04:04:03', NULL),
(10, 'L3', 6, 2, 'Available', NULL, '2025-04-29 04:04:17', '2025-04-29 04:04:17', NULL),
(11, 'T1', 4, 6, 'Available', NULL, '2025-04-29 04:04:34', '2025-04-29 04:04:34', NULL),
(12, 'T2', 4, 4, 'Running', NULL, '2025-04-29 04:04:47', '2025-04-29 04:21:30', 3),
(13, 'GD1', 5, 4, 'Available', NULL, '2025-04-29 04:05:01', '2025-04-29 04:05:01', NULL),
(14, 'GD2', 5, 6, 'Available', NULL, '2025-04-29 04:05:26', '2025-04-29 04:05:26', NULL),
(15, 'GD3', 5, 2, 'Available', NULL, '2025-04-29 04:05:35', '2025-04-29 04:05:35', NULL),
(16, 'S1', 3, 4, 'Available', NULL, '2025-04-29 04:05:56', '2025-04-29 04:05:56', NULL),
(17, 'S2', 3, 4, 'Running', NULL, '2025-04-29 04:06:04', '2025-04-29 04:23:12', 4),
(18, 'S3', 3, 7, 'Available', NULL, '2025-04-29 04:06:13', '2025-04-29 04:06:13', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tax_fees`
--

CREATE TABLE `tax_fees` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `type` enum('percentage','flat_amount') NOT NULL,
  `amount` int(11) NOT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT 0,
  `default` tinyint(1) NOT NULL DEFAULT 0,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tax_fees`
--

INSERT INTO `tax_fees` (`id`, `name`, `type`, `amount`, `enabled`, `default`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 'GST', 'percentage', 18, 0, 0, NULL, '2025-04-29 04:06:22', '2025-04-29 04:06:51'),
(2, 'Service Charge', 'flat_amount', 150, 1, 1, NULL, '2025-04-29 04:06:37', '2025-04-29 04:06:37'),
(3, 'SGST', 'percentage', 12, 0, 0, NULL, '2025-04-29 04:06:45', '2025-04-29 04:06:45'),
(4, 'CGST', 'percentage', 12, 0, 0, NULL, '2025-04-29 04:06:57', '2025-04-29 04:06:57');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `user_name` varchar(30) NOT NULL,
  `address` varchar(150) NOT NULL,
  `country` varchar(50) NOT NULL DEFAULT 'India',
  `state` varchar(17) NOT NULL DEFAULT 'Gujarat',
  `city` varchar(17) NOT NULL DEFAULT 'Ahmedabad',
  `zipcode` int(11) NOT NULL DEFAULT 380041,
  `password` varchar(180) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `phone`, `email`, `first_name`, `last_name`, `user_name`, `address`, `country`, `state`, `city`, `zipcode`, `password`, `email_verified_at`, `remember_token`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, '9099102310', 'superadmin@tatvasoft.com', 'Harmit', 'Katariya', 'HarmitKatariya', 'Ahmedabad, Gujarat', 'South Georgia and the South Sandwich Islands', 'Gujarat', 'Ahmedabad', 380041, '$2y$10$a7QFZeqcUynvFg8skDu7juKRz9Z0mwfqKKFQl2delnCueK3jVAzd2', '2025-04-29 03:12:11', 'dHIpmjGFrY', NULL, '2025-04-29 03:12:11', '2025-04-29 04:15:21'),
(2, '9022392039', 'accman@tatva.com', 'acc', 'man', 'accman', 'First Floor', 'India', 'Gujarat', 'Surat', 302930, '$2y$10$8UT4hdQyOr04FBQ31GEeduPAzKat8/hF0L4z8FWPAmID7I5KToxCm', NULL, NULL, NULL, '2025-04-29 03:23:32', '2025-04-29 03:23:32'),
(3, '9022849382', 'chef@tatva.com', 'chef', 'kit', 'chefkit', 'F4', 'India', 'Gujarat', 'Surat', 363642, '$2y$10$B1FbEvJeB45ZBHudeKfqw.HETqNngTf8pEfLHpcnYZfSycw4IWdWm', NULL, NULL, NULL, '2025-04-29 03:25:10', '2025-04-29 03:25:10');

-- --------------------------------------------------------

--
-- Table structure for table `waiting_tokens`
--

CREATE TABLE `waiting_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `customer_id` bigint(20) UNSIGNED NOT NULL,
  `head_count` int(11) NOT NULL,
  `section_id` bigint(20) UNSIGNED NOT NULL,
  `waiting_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `item_categories`
--
ALTER TABLE `item_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `item_modifier_groups_mapping`
--
ALTER TABLE `item_modifier_groups_mapping`
  ADD PRIMARY KEY (`id`),
  ADD KEY `item_modifier_groups_mapping_modifier_group_id_foreign` (`modifier_group_id`),
  ADD KEY `item_modifier_groups_mapping_item_id_foreign` (`item_id`);

--
-- Indexes for table `k_o_t_s`
--
ALTER TABLE `k_o_t_s`
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
-- Indexes for table `modifiers`
--
ALTER TABLE `modifiers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `modifiers_id_unique` (`id`);

--
-- Indexes for table `modifier_groups`
--
ALTER TABLE `modifier_groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `modifier_groups_id_unique` (`id`);

--
-- Indexes for table `modifier_modifier_group`
--
ALTER TABLE `modifier_modifier_group`
  ADD PRIMARY KEY (`id`),
  ADD KEY `modifier_modifier_group_modifier_id_foreign` (`modifier_id`),
  ADD KEY `modifier_modifier_group_modifier_group_id_foreign` (`modifier_group_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `role_has_permissions_role_id_foreign` (`role_id`);

--
-- Indexes for table `sections`
--
ALTER TABLE `sections`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tables`
--
ALTER TABLE `tables`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tables_section_id_foreign` (`section_id`),
  ADD KEY `tables_assigned_to_foreign` (`assigned_to`);

--
-- Indexes for table `tax_fees`
--
ALTER TABLE `tax_fees`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_id_unique` (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `waiting_tokens`
--
ALTER TABLE `waiting_tokens`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `item_categories`
--
ALTER TABLE `item_categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `item_modifier_groups_mapping`
--
ALTER TABLE `item_modifier_groups_mapping`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `k_o_t_s`
--
ALTER TABLE `k_o_t_s`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `modifiers`
--
ALTER TABLE `modifiers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `modifier_groups`
--
ALTER TABLE `modifier_groups`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `modifier_modifier_group`
--
ALTER TABLE `modifier_modifier_group`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=104;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `sections`
--
ALTER TABLE `sections`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tables`
--
ALTER TABLE `tables`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `tax_fees`
--
ALTER TABLE `tax_fees`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `waiting_tokens`
--
ALTER TABLE `waiting_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `item_modifier_groups_mapping`
--
ALTER TABLE `item_modifier_groups_mapping`
  ADD CONSTRAINT `item_modifier_groups_mapping_item_id_foreign` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `item_modifier_groups_mapping_modifier_group_id_foreign` FOREIGN KEY (`modifier_group_id`) REFERENCES `modifier_groups` (`id`) ON DELETE CASCADE;

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
-- Constraints for table `modifier_modifier_group`
--
ALTER TABLE `modifier_modifier_group`
  ADD CONSTRAINT `modifier_modifier_group_modifier_group_id_foreign` FOREIGN KEY (`modifier_group_id`) REFERENCES `modifier_groups` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `modifier_modifier_group_modifier_id_foreign` FOREIGN KEY (`modifier_id`) REFERENCES `modifiers` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `tables`
--
ALTER TABLE `tables`
  ADD CONSTRAINT `tables_assigned_to_foreign` FOREIGN KEY (`assigned_to`) REFERENCES `customers` (`id`),
  ADD CONSTRAINT `tables_section_id_foreign` FOREIGN KEY (`section_id`) REFERENCES `sections` (`id`);
--
-- Database: `phpmyadmin`
--
CREATE DATABASE IF NOT EXISTS `phpmyadmin` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;
USE `phpmyadmin`;

-- --------------------------------------------------------

--
-- Table structure for table `pma__bookmark`
--

CREATE TABLE `pma__bookmark` (
  `id` int(10) UNSIGNED NOT NULL,
  `dbase` varchar(255) NOT NULL DEFAULT '',
  `user` varchar(255) NOT NULL DEFAULT '',
  `label` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `query` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Bookmarks';

-- --------------------------------------------------------

--
-- Table structure for table `pma__central_columns`
--

CREATE TABLE `pma__central_columns` (
  `db_name` varchar(64) NOT NULL,
  `col_name` varchar(64) NOT NULL,
  `col_type` varchar(64) NOT NULL,
  `col_length` text DEFAULT NULL,
  `col_collation` varchar(64) NOT NULL,
  `col_isNull` tinyint(1) NOT NULL,
  `col_extra` varchar(255) DEFAULT '',
  `col_default` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Central list of columns';

-- --------------------------------------------------------

--
-- Table structure for table `pma__column_info`
--

CREATE TABLE `pma__column_info` (
  `id` int(5) UNSIGNED NOT NULL,
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `table_name` varchar(64) NOT NULL DEFAULT '',
  `column_name` varchar(64) NOT NULL DEFAULT '',
  `comment` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `mimetype` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `transformation` varchar(255) NOT NULL DEFAULT '',
  `transformation_options` varchar(255) NOT NULL DEFAULT '',
  `input_transformation` varchar(255) NOT NULL DEFAULT '',
  `input_transformation_options` varchar(255) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Column information for phpMyAdmin';

-- --------------------------------------------------------

--
-- Table structure for table `pma__designer_settings`
--

CREATE TABLE `pma__designer_settings` (
  `username` varchar(64) NOT NULL,
  `settings_data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Settings related to Designer';

-- --------------------------------------------------------

--
-- Table structure for table `pma__export_templates`
--

CREATE TABLE `pma__export_templates` (
  `id` int(5) UNSIGNED NOT NULL,
  `username` varchar(64) NOT NULL,
  `export_type` varchar(10) NOT NULL,
  `template_name` varchar(64) NOT NULL,
  `template_data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Saved export templates';

-- --------------------------------------------------------

--
-- Table structure for table `pma__favorite`
--

CREATE TABLE `pma__favorite` (
  `username` varchar(64) NOT NULL,
  `tables` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Favorite tables';

-- --------------------------------------------------------

--
-- Table structure for table `pma__history`
--

CREATE TABLE `pma__history` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(64) NOT NULL DEFAULT '',
  `db` varchar(64) NOT NULL DEFAULT '',
  `table` varchar(64) NOT NULL DEFAULT '',
  `timevalue` timestamp NOT NULL DEFAULT current_timestamp(),
  `sqlquery` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='SQL history for phpMyAdmin';

-- --------------------------------------------------------

--
-- Table structure for table `pma__navigationhiding`
--

CREATE TABLE `pma__navigationhiding` (
  `username` varchar(64) NOT NULL,
  `item_name` varchar(64) NOT NULL,
  `item_type` varchar(64) NOT NULL,
  `db_name` varchar(64) NOT NULL,
  `table_name` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Hidden items of navigation tree';

-- --------------------------------------------------------

--
-- Table structure for table `pma__pdf_pages`
--

CREATE TABLE `pma__pdf_pages` (
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `page_nr` int(10) UNSIGNED NOT NULL,
  `page_descr` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='PDF relation pages for phpMyAdmin';

-- --------------------------------------------------------

--
-- Table structure for table `pma__recent`
--

CREATE TABLE `pma__recent` (
  `username` varchar(64) NOT NULL,
  `tables` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Recently accessed tables';

--
-- Dumping data for table `pma__recent`
--

INSERT INTO `pma__recent` (`username`, `tables`) VALUES
('root', '[{\"db\":\"laravel\",\"table\":\"customers\"},{\"db\":\"laravel\",\"table\":\"orders\"},{\"db\":\"laravel\",\"table\":\"items\"},{\"db\":\"laravel\",\"table\":\"tables\"},{\"db\":\"laravel\",\"table\":\"k_o_t_s\"},{\"db\":\"laravel\",\"table\":\"roles\"},{\"db\":\"laravel\",\"table\":\"users\"},{\"db\":\"laravel\",\"table\":\"role_has_permissions\"},{\"db\":\"laravel\",\"table\":\"permissions\"},{\"db\":\"laravel\",\"table\":\"waiting_tokens\"}]');

-- --------------------------------------------------------

--
-- Table structure for table `pma__relation`
--

CREATE TABLE `pma__relation` (
  `master_db` varchar(64) NOT NULL DEFAULT '',
  `master_table` varchar(64) NOT NULL DEFAULT '',
  `master_field` varchar(64) NOT NULL DEFAULT '',
  `foreign_db` varchar(64) NOT NULL DEFAULT '',
  `foreign_table` varchar(64) NOT NULL DEFAULT '',
  `foreign_field` varchar(64) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Relation table';

-- --------------------------------------------------------

--
-- Table structure for table `pma__savedsearches`
--

CREATE TABLE `pma__savedsearches` (
  `id` int(5) UNSIGNED NOT NULL,
  `username` varchar(64) NOT NULL DEFAULT '',
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `search_name` varchar(64) NOT NULL DEFAULT '',
  `search_data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Saved searches';

-- --------------------------------------------------------

--
-- Table structure for table `pma__table_coords`
--

CREATE TABLE `pma__table_coords` (
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `table_name` varchar(64) NOT NULL DEFAULT '',
  `pdf_page_number` int(11) NOT NULL DEFAULT 0,
  `x` float UNSIGNED NOT NULL DEFAULT 0,
  `y` float UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Table coordinates for phpMyAdmin PDF output';

-- --------------------------------------------------------

--
-- Table structure for table `pma__table_info`
--

CREATE TABLE `pma__table_info` (
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `table_name` varchar(64) NOT NULL DEFAULT '',
  `display_field` varchar(64) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Table information for phpMyAdmin';

-- --------------------------------------------------------

--
-- Table structure for table `pma__table_uiprefs`
--

CREATE TABLE `pma__table_uiprefs` (
  `username` varchar(64) NOT NULL,
  `db_name` varchar(64) NOT NULL,
  `table_name` varchar(64) NOT NULL,
  `prefs` text NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Tables'' UI preferences';

-- --------------------------------------------------------

--
-- Table structure for table `pma__tracking`
--

CREATE TABLE `pma__tracking` (
  `db_name` varchar(64) NOT NULL,
  `table_name` varchar(64) NOT NULL,
  `version` int(10) UNSIGNED NOT NULL,
  `date_created` datetime NOT NULL,
  `date_updated` datetime NOT NULL,
  `schema_snapshot` text NOT NULL,
  `schema_sql` text DEFAULT NULL,
  `data_sql` longtext DEFAULT NULL,
  `tracking` set('UPDATE','REPLACE','INSERT','DELETE','TRUNCATE','CREATE DATABASE','ALTER DATABASE','DROP DATABASE','CREATE TABLE','ALTER TABLE','RENAME TABLE','DROP TABLE','CREATE INDEX','DROP INDEX','CREATE VIEW','ALTER VIEW','DROP VIEW') DEFAULT NULL,
  `tracking_active` int(1) UNSIGNED NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Database changes tracking for phpMyAdmin';

-- --------------------------------------------------------

--
-- Table structure for table `pma__userconfig`
--

CREATE TABLE `pma__userconfig` (
  `username` varchar(64) NOT NULL,
  `timevalue` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `config_data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='User preferences storage for phpMyAdmin';

--
-- Dumping data for table `pma__userconfig`
--

INSERT INTO `pma__userconfig` (`username`, `timevalue`, `config_data`) VALUES
('root', '2025-04-29 09:53:58', '{\"Console\\/Mode\":\"collapse\"}');

-- --------------------------------------------------------

--
-- Table structure for table `pma__usergroups`
--

CREATE TABLE `pma__usergroups` (
  `usergroup` varchar(64) NOT NULL,
  `tab` varchar(64) NOT NULL,
  `allowed` enum('Y','N') NOT NULL DEFAULT 'N'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='User groups with configured menu items';

-- --------------------------------------------------------

--
-- Table structure for table `pma__users`
--

CREATE TABLE `pma__users` (
  `username` varchar(64) NOT NULL,
  `usergroup` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Users and their assignments to user groups';

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pma__bookmark`
--
ALTER TABLE `pma__bookmark`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pma__central_columns`
--
ALTER TABLE `pma__central_columns`
  ADD PRIMARY KEY (`db_name`,`col_name`);

--
-- Indexes for table `pma__column_info`
--
ALTER TABLE `pma__column_info`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `db_name` (`db_name`,`table_name`,`column_name`);

--
-- Indexes for table `pma__designer_settings`
--
ALTER TABLE `pma__designer_settings`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `pma__export_templates`
--
ALTER TABLE `pma__export_templates`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `u_user_type_template` (`username`,`export_type`,`template_name`);

--
-- Indexes for table `pma__favorite`
--
ALTER TABLE `pma__favorite`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `pma__history`
--
ALTER TABLE `pma__history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `username` (`username`,`db`,`table`,`timevalue`);

--
-- Indexes for table `pma__navigationhiding`
--
ALTER TABLE `pma__navigationhiding`
  ADD PRIMARY KEY (`username`,`item_name`,`item_type`,`db_name`,`table_name`);

--
-- Indexes for table `pma__pdf_pages`
--
ALTER TABLE `pma__pdf_pages`
  ADD PRIMARY KEY (`page_nr`),
  ADD KEY `db_name` (`db_name`);

--
-- Indexes for table `pma__recent`
--
ALTER TABLE `pma__recent`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `pma__relation`
--
ALTER TABLE `pma__relation`
  ADD PRIMARY KEY (`master_db`,`master_table`,`master_field`),
  ADD KEY `foreign_field` (`foreign_db`,`foreign_table`);

--
-- Indexes for table `pma__savedsearches`
--
ALTER TABLE `pma__savedsearches`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `u_savedsearches_username_dbname` (`username`,`db_name`,`search_name`);

--
-- Indexes for table `pma__table_coords`
--
ALTER TABLE `pma__table_coords`
  ADD PRIMARY KEY (`db_name`,`table_name`,`pdf_page_number`);

--
-- Indexes for table `pma__table_info`
--
ALTER TABLE `pma__table_info`
  ADD PRIMARY KEY (`db_name`,`table_name`);

--
-- Indexes for table `pma__table_uiprefs`
--
ALTER TABLE `pma__table_uiprefs`
  ADD PRIMARY KEY (`username`,`db_name`,`table_name`);

--
-- Indexes for table `pma__tracking`
--
ALTER TABLE `pma__tracking`
  ADD PRIMARY KEY (`db_name`,`table_name`,`version`);

--
-- Indexes for table `pma__userconfig`
--
ALTER TABLE `pma__userconfig`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `pma__usergroups`
--
ALTER TABLE `pma__usergroups`
  ADD PRIMARY KEY (`usergroup`,`tab`,`allowed`);

--
-- Indexes for table `pma__users`
--
ALTER TABLE `pma__users`
  ADD PRIMARY KEY (`username`,`usergroup`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pma__bookmark`
--
ALTER TABLE `pma__bookmark`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pma__column_info`
--
ALTER TABLE `pma__column_info`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pma__export_templates`
--
ALTER TABLE `pma__export_templates`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pma__history`
--
ALTER TABLE `pma__history`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pma__pdf_pages`
--
ALTER TABLE `pma__pdf_pages`
  MODIFY `page_nr` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pma__savedsearches`
--
ALTER TABLE `pma__savedsearches`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- Database: `test`
--
CREATE DATABASE IF NOT EXISTS `test` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `test`;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

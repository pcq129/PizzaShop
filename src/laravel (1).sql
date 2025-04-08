-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 08, 2025 at 01:54 PM
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
-- Database: `laravel`
--

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `mobile` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `name` varchar(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `mobile`, `email`, `name`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '9499545454', 'test@test.com', 'Harmit', '2025-04-04 04:44:03', '2025-04-04 04:44:03', NULL),
(2, '9477384958', 'user@user.com', 'harmti', '2025-04-07 03:36:33', '2025-04-07 03:36:33', NULL),
(3, '9488583454', 'user@user.cm', 'armit', '2025-04-07 04:20:56', '2025-04-07 04:20:56', NULL),
(4, '8933723843', 'harmti@use.com', 'ht', '2025-04-08 03:58:10', '2025-04-08 03:58:10', NULL),
(5, '8477384543', 'User@user.dom', 'adsf', '2025-04-08 03:59:14', '2025-04-08 03:59:14', NULL),
(6, '4356465434', 'tet@rew.dfs', 'vf', '2025-04-08 04:29:20', '2025-04-08 04:29:20', NULL),
(7, '8988347384', 'uer@user.com', 'harmit`', '2025-04-08 04:38:08', '2025-04-08 04:38:08', NULL),
(8, '9833943834', 'test@user.com', 'harmit', '2025-04-08 04:53:00', '2025-04-08 04:53:00', NULL),
(9, '9833459345', 'harmit@user.com', 'harmit', '2025-04-08 06:24:17', '2025-04-08 06:24:17', NULL);

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

INSERT INTO `items` (`id`, `name`, `item_type`, `description`, `category_id`, `quantity`, `unit`, `rate`, `default_tax`, `tax_percentage`, `created_at`, `updated_at`, `deleted_at`, `available`, `short_code`, `image`) VALUES
(1, 'Margherita', 'veg', NULL, 1, 4, 'pcs', 456, 1, 23, '2025-04-02 07:25:01', '2025-04-08 04:28:52', NULL, 1, NULL, 'ho25832uJkkxXDPSKGDo14OqmFJ7ADIhvs98gqBi.png'),
(2, 'Thin Crust', 'veg', NULL, 1, 4, 'pcs', 456, 1, 23, '2025-04-02 07:25:49', '2025-04-02 07:25:49', NULL, 1, NULL, NULL),
(3, 'Veg Sandwich', 'veg', NULL, 3, 3, 'pcs', 150, 1, 23, '2025-04-02 07:31:09', '2025-04-02 07:31:09', NULL, 1, NULL, NULL),
(4, 'Aloo Tikki Burger', 'veg', NULL, 4, 1, 'pcs', 340, 1, 13, '2025-04-04 07:19:40', '2025-04-04 07:19:52', NULL, 1, NULL, NULL),
(5, 'Tandoori Burger', 'non-veg', NULL, 4, 1, 'pcs', 450, 0, 12, '2025-04-04 07:20:42', '2025-04-04 07:20:42', NULL, 0, NULL, NULL),
(6, 'Cheeze Tweeze', 'vegan', NULL, 5, 6, 'pcs', 299, 0, 18, '2025-04-04 07:23:21', '2025-04-08 04:28:17', NULL, 0, NULL, 'mW7MZphmoCdiLUtw9TJ57dSJt4eRhAg807XwSezi.png');

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
(1, 'Pizza', NULL, NULL, '2025-04-02 07:16:28', '2025-04-02 07:16:28'),
(2, 'Sandwich', NULL, '2025-04-02 07:16:43', '2025-04-02 07:16:40', '2025-04-02 07:16:43'),
(3, 'Sandwich', NULL, NULL, '2025-04-02 07:16:49', '2025-04-02 07:16:49'),
(4, 'Burger', NULL, NULL, '2025-04-02 07:17:03', '2025-04-02 07:17:03'),
(5, 'Garlic Bread', NULL, NULL, '2025-04-02 07:17:10', '2025-04-02 07:17:10'),
(6, 'French Fries', NULL, NULL, '2025-04-02 07:17:17', '2025-04-02 07:17:17');

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
(1, 4, 2, NULL, NULL),
(2, 4, 3, NULL, NULL),
(3, 4, 4, NULL, NULL),
(4, 5, 2, NULL, NULL),
(5, 5, 3, NULL, NULL),
(6, 5, 4, NULL, NULL),
(7, 6, 2, NULL, NULL),
(8, 6, 4, NULL, NULL),
(9, 1, 1, NULL, NULL),
(10, 1, 3, NULL, NULL);

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
(5, '2025_03_11_103937_create_orders_table', 1),
(6, '2025_03_11_131049_create_modifiers_table', 1),
(7, '2025_03_11_132844_create_modifier_groups_table', 1),
(8, '2025_03_12_052031_create_items_table', 1),
(9, '2025_03_12_052102_create_item_categories_table', 1),
(10, '2025_03_25_102854_add_unit_column_in_items', 1),
(11, '2025_03_26_091028_create_modifier_modifier_group_table', 1),
(12, '2025_03_27_110704_create_sections_table', 1),
(13, '2025_03_27_110729_create_tables_table', 1),
(14, '2025_03_28_051128_id_fixing', 1),
(23, '2025_03_31_050944_create_tax_fees_table', 2),
(25, '2025_04_01_043921_create_item_modifier_groups_table', 3),
(26, '2025_04_01_044427_item_modifications', 3),
(27, '2025_04_03_085644_create_customers_table', 3),
(29, '2025_04_03_115802_tables_modification', 4);

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
(1, 'Small', 100, 'pieces', 4, NULL, '2025-04-02 07:19:52', '2025-04-02 07:19:52', NULL),
(2, 'Medium', 200, 'pieces', 8, NULL, '2025-04-02 07:20:13', '2025-04-02 07:20:13', NULL),
(3, 'Large', 400, 'pieces', 16, NULL, '2025-04-02 07:20:44', '2025-04-02 07:21:56', NULL),
(4, 'BBQ', 50, 'grams', 200, NULL, '2025-04-02 07:23:17', '2025-04-02 07:23:17', NULL),
(5, 'Alfredo', 200, 'grams', 150, NULL, '2025-04-02 07:23:49', '2025-04-02 07:23:49', NULL),
(6, 'Tomato', 200, 'grams', 200, NULL, '2025-04-02 07:24:09', '2025-04-02 07:24:09', NULL),
(7, 'Jumbo', 80, 'grams', 400, NULL, '2025-04-02 07:29:03', '2025-04-02 07:29:03', NULL),
(8, 'Regular', 60, 'grams', 150, NULL, '2025-04-02 07:29:38', '2025-04-02 07:29:38', NULL);

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
(1, 'Crust Options', NULL, NULL, '2025-04-02 07:17:48', '2025-04-02 07:17:48'),
(2, 'Cheeze Optons', NULL, NULL, '2025-04-02 07:18:05', '2025-04-02 07:18:05'),
(3, 'Size Options', NULL, NULL, '2025-04-02 07:18:17', '2025-04-02 07:18:17'),
(4, 'Sauce Option', NULL, NULL, '2025-04-02 07:19:32', '2025-04-02 07:19:32');

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
(1, 1, 3, NULL, NULL, NULL),
(2, 2, 3, NULL, NULL, NULL),
(3, 3, 3, NULL, NULL, NULL),
(4, 4, 4, NULL, NULL, NULL),
(5, 5, 4, NULL, NULL, NULL),
(6, 6, 4, NULL, NULL, NULL),
(7, 7, 3, NULL, NULL, NULL),
(8, 8, 3, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `customer_id` bigint(20) UNSIGNED NOT NULL,
  `status` varchar(30) NOT NULL DEFAULT '-',
  `isServed` tinyint(1) NOT NULL,
  `order_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`order_data`)),
  `amount` int(11) NOT NULL,
  `rating` enum('1','2','3','4','5') NOT NULL,
  `comment` varchar(180) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `customer_id`, `status`, `isServed`, `order_data`, `amount`, `rating`, `comment`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 2, 'Ordered', 0, '{\"items\":[{\"item_id\":1,\"item_name\":\"Margherita\",\"item_rate\":560.88,\"modifiers\":[]}],\"taxes\":{\"GST\":100.8,\"SGST\":100.8,\"CGST\":0,\"Service charges\":230},\"subTotal\":560,\"total\":991.6}', 992, '1', NULL, NULL, '2025-04-08 03:27:36', '2025-04-08 03:27:36'),
(2, 2, 'Ordered', 0, '{\"items\":[{\"item_id\":1,\"item_name\":\"Margherita\",\"item_rate\":560.88,\"modifiers\":[]}],\"taxes\":{\"GST\":100.8,\"SGST\":100.8,\"CGST\":0,\"Service charges\":230},\"subTotal\":560,\"total\":991.6}', 992, '1', NULL, NULL, '2025-04-08 03:28:09', '2025-04-08 03:28:09'),
(3, 2, 'Ordered', 0, '{\"items\":[{\"item_id\":1,\"item_name\":\"Margherita\",\"item_rate\":560.88,\"modifiers\":[]}],\"taxes\":{\"GST\":100.8,\"SGST\":100.8,\"CGST\":0,\"Service charges\":230},\"subTotal\":560,\"total\":991.6}', 992, '1', NULL, NULL, '2025-04-08 03:28:25', '2025-04-08 03:28:25'),
(4, 2, 'Ordered', 0, '{\"items\":[{\"item_id\":1,\"item_name\":\"Margherita\",\"item_rate\":560.88,\"modifiers\":[]},{\"item_id\":2,\"item_name\":\"Thin Crust\",\"item_rate\":560.88,\"modifiers\":[]}],\"taxes\":{\"GST\":201.78,\"SGST\":201.78,\"CGST\":0,\"Service charges\":230},\"subTotal\":1121,\"total\":1754.56}', 1755, '1', NULL, NULL, '2025-04-08 03:30:03', '2025-04-08 03:30:03'),
(5, 2, 'Ordered', 0, '{\"items\":[{\"item_id\":1,\"item_name\":\"Margherita\",\"item_rate\":560.88,\"modifiers\":[{\"modifier_id\":2,\"modifier_name\":\"Medium\",\"modifier_rate\":200}]},{\"item_id\":3,\"item_name\":\"Veg Sandwich\",\"item_rate\":184.5,\"modifiers\":[]},{\"item_id\":5,\"item_name\":\"Tandoori Burger\",\"item_rate\":504,\"modifiers\":[{\"modifier_id\":4,\"modifier_name\":\"BBQ\",\"modifier_rate\":50}]}],\"taxes\":{\"GST\":269.82,\"SGST\":269.82,\"CGST\":0,\"Service charges\":230},\"subTotal\":1499,\"total\":2268.64}', 2269, '1', NULL, NULL, '2025-04-08 03:36:24', '2025-04-08 03:36:24'),
(6, 2, 'Ordered', 0, '{\"items\":[{\"item_id\":2,\"item_name\":\"Thin Crust\",\"item_rate\":560.88,\"modifiers\":[]},{\"item_id\":5,\"item_name\":\"Tandoori Burger\",\"item_rate\":504,\"modifiers\":[{\"modifier_id\":5,\"modifier_name\":\"Alfredo\",\"modifier_rate\":200}]}],\"taxes\":{\"GST\":227.52,\"SGST\":227.52,\"CGST\":0,\"Service charges\":230},\"subTotal\":1264,\"total\":1949.04}', 1949, '1', NULL, NULL, '2025-04-08 03:56:42', '2025-04-08 03:56:42'),
(7, 2, 'Ordered', 0, '{\"items\":[{\"item_id\":1,\"item_name\":\"Margherita\",\"item_rate\":560.88,\"modifiers\":[]}],\"taxes\":{\"GST\":100.8,\"SGST\":100.8,\"CGST\":0,\"Service charges\":230},\"subTotal\":560,\"total\":991.6}', 992, '1', NULL, NULL, '2025-04-08 04:15:37', '2025-04-08 04:15:37'),
(8, 2, 'Ordered', 0, '{\"tables\":[13],\"items\":[{\"item_id\":2,\"item_name\":\"Thin Crust\",\"item_rate\":560.88,\"modifiers\":[]}],\"taxes\":{\"GST\":100.8,\"SGST\":100.8,\"CGST\":0,\"Service charges\":230},\"subTotal\":560,\"total\":991.6}', 992, '1', NULL, NULL, '2025-04-08 04:19:16', '2025-04-08 04:19:16'),
(9, 2, 'Ordered', 0, '{\"tables\":[13],\"items\":[{\"item_id\":2,\"item_name\":\"Thin Crust\",\"item_rate\":560.88,\"modifiers\":[]}],\"taxes\":{\"GST\":100.8,\"SGST\":100.8,\"CGST\":0,\"Service charges\":230},\"subTotal\":560,\"total\":991.6}', 992, '1', NULL, NULL, '2025-04-08 04:19:27', '2025-04-08 04:19:27'),
(10, 2, 'Ordered', 0, '{\"tables\":[13],\"items\":[{\"item_id\":2,\"item_name\":\"Thin Crust\",\"item_rate\":560.88,\"modifiers\":[]}],\"taxes\":{\"GST\":100.8,\"SGST\":100.8,\"CGST\":0,\"Service charges\":230},\"subTotal\":560,\"total\":991.6}', 992, '1', NULL, NULL, '2025-04-08 04:20:22', '2025-04-08 04:20:22'),
(11, 2, 'Ordered', 0, '{\"tables\":[13],\"items\":[{\"item_id\":2,\"item_name\":\"Thin Crust\",\"item_rate\":560.88,\"modifiers\":[]}],\"taxes\":{\"GST\":100.8,\"SGST\":100.8,\"CGST\":0,\"Service charges\":230},\"subTotal\":560,\"total\":991.6}', 992, '1', NULL, NULL, '2025-04-08 04:21:03', '2025-04-08 04:21:03'),
(12, 2, 'Ordered', 0, '{\"tables\":[13],\"items\":[{\"item_id\":2,\"item_name\":\"Thin Crust\",\"item_rate\":560.88,\"modifiers\":[]}],\"taxes\":{\"GST\":100.8,\"SGST\":100.8,\"CGST\":0,\"Service charges\":230},\"subTotal\":560,\"total\":991.6}', 992, '1', NULL, NULL, '2025-04-08 04:22:53', '2025-04-08 04:22:53'),
(13, 2, 'Ordered', 0, '{\"tables\":[13],\"items\":[{\"item_id\":2,\"item_name\":\"Thin Crust\",\"item_rate\":560.88,\"modifiers\":[]}],\"taxes\":{\"GST\":100.8,\"SGST\":100.8,\"CGST\":0,\"Service charges\":230},\"subTotal\":560,\"total\":991.6}', 992, '1', NULL, NULL, '2025-04-08 04:24:15', '2025-04-08 04:24:15'),
(14, 2, 'Ordered', 0, '{\"tables\":[10],\"items\":[{\"item_id\":5,\"item_name\":\"Tandoori Burger\",\"item_rate\":504,\"modifiers\":[{\"modifier_id\":1,\"modifier_name\":\"Small\",\"modifier_rate\":100}]}],\"taxes\":{\"GST\":108.72,\"SGST\":108.72,\"CGST\":0,\"Service charges\":230},\"subTotal\":604,\"total\":1051.44}', 1051, '1', NULL, NULL, '2025-04-08 04:29:36', '2025-04-08 04:29:36'),
(15, 4, 'Ordered', 0, '{\"tables\":[],\"items\":[{\"item_id\":5,\"item_name\":\"Tandoori Burger\",\"item_rate\":504,\"modifiers\":[{\"modifier_id\":7,\"modifier_name\":\"Jumbo\",\"modifier_rate\":80},{\"modifier_id\":8,\"modifier_name\":\"Regular\",\"modifier_rate\":60}]}],\"taxes\":{\"GST\":115.92,\"SGST\":115.92,\"CGST\":0,\"Service charges\":230},\"subTotal\":644,\"total\":1105.8400000000001}', 1106, '1', NULL, NULL, '2025-04-08 04:30:55', '2025-04-08 04:30:55'),
(16, 4, 'Ordered', 0, '{\"tables\":[],\"items\":[{\"item_id\":5,\"item_name\":\"Tandoori Burger\",\"item_rate\":504,\"modifiers\":[{\"modifier_id\":7,\"modifier_name\":\"Jumbo\",\"modifier_rate\":80},{\"modifier_id\":8,\"modifier_name\":\"Regular\",\"modifier_rate\":60}]}],\"taxes\":{\"GST\":115.92,\"SGST\":115.92,\"CGST\":0,\"Service charges\":230},\"subTotal\":644,\"total\":1105.8400000000001}', 1106, '1', NULL, NULL, '2025-04-08 04:31:24', '2025-04-08 04:31:24'),
(17, 4, 'Ordered', 0, '{\"tables\":[],\"items\":[{\"item_id\":5,\"item_name\":\"Tandoori Burger\",\"item_rate\":504,\"modifiers\":[{\"modifier_id\":7,\"modifier_name\":\"Jumbo\",\"modifier_rate\":80},{\"modifier_id\":8,\"modifier_name\":\"Regular\",\"modifier_rate\":60}]}],\"taxes\":{\"GST\":115.92,\"SGST\":115.92,\"CGST\":0,\"Service charges\":230},\"subTotal\":644,\"total\":1105.8400000000001}', 1106, '1', NULL, NULL, '2025-04-08 04:34:13', '2025-04-08 04:34:13'),
(18, 4, 'Ordered', 0, '{\"tables\":[],\"items\":[{\"item_id\":5,\"item_name\":\"Tandoori Burger\",\"item_rate\":504,\"modifiers\":[{\"modifier_id\":7,\"modifier_name\":\"Jumbo\",\"modifier_rate\":80},{\"modifier_id\":8,\"modifier_name\":\"Regular\",\"modifier_rate\":60}]}],\"taxes\":{\"GST\":115.92,\"SGST\":115.92,\"CGST\":0,\"Service charges\":230},\"subTotal\":644,\"total\":1105.8400000000001}', 1106, '1', NULL, NULL, '2025-04-08 04:37:22', '2025-04-08 04:37:22'),
(19, 7, 'Ordered', 0, '{\"tables\":[12,16],\"items\":[{\"item_id\":5,\"item_name\":\"Tandoori Burger\",\"item_rate\":504,\"modifiers\":[{\"modifier_id\":5,\"modifier_name\":\"Alfredo\",\"modifier_rate\":200}]}],\"taxes\":{\"GST\":126.72,\"SGST\":126.72,\"CGST\":0,\"Service charges\":230},\"subTotal\":704,\"total\":1187.44}', 1187, '1', NULL, NULL, '2025-04-08 04:38:40', '2025-04-08 04:38:40'),
(20, 7, 'Ordered', 0, '{\"tables\":[12,16],\"items\":[{\"item_id\":5,\"item_name\":\"Tandoori Burger\",\"item_rate\":504,\"modifiers\":[{\"modifier_id\":5,\"modifier_name\":\"Alfredo\",\"modifier_rate\":200}]}],\"taxes\":{\"GST\":126.72,\"SGST\":126.72,\"CGST\":0,\"Service charges\":230},\"subTotal\":704,\"total\":1187.44}', 1187, '1', NULL, NULL, '2025-04-08 04:38:46', '2025-04-08 04:38:46'),
(21, 7, 'Ordered', 0, '{\"tables\":[12,16],\"items\":[{\"item_id\":5,\"item_name\":\"Tandoori Burger\",\"item_rate\":504,\"modifiers\":[{\"modifier_id\":5,\"modifier_name\":\"Alfredo\",\"modifier_rate\":200}]}],\"taxes\":{\"GST\":126.72,\"SGST\":126.72,\"CGST\":0,\"Service charges\":230},\"subTotal\":704,\"total\":1187.44}', 1187, '1', NULL, NULL, '2025-04-08 04:45:05', '2025-04-08 04:45:05'),
(22, 8, 'Ordered', 0, '{\"tables\":[15],\"items\":[{\"item_id\":1,\"item_name\":\"Margherita\",\"item_rate\":560.88,\"modifiers\":[{\"modifier_id\":1,\"modifier_name\":\"Small\",\"modifier_rate\":100}]},{\"item_id\":2,\"item_name\":\"Thin Crust\",\"item_rate\":560.88,\"modifiers\":[]}],\"taxes\":{\"GST\":219.78,\"SGST\":219.78,\"CGST\":0,\"Service charges\":230},\"subTotal\":1221,\"total\":1890.56}', 1891, '1', NULL, NULL, '2025-04-08 04:53:32', '2025-04-08 04:53:32'),
(23, 2, 'Ordered', 0, '{\"tables\":[],\"items\":[{\"item_id\":6,\"item_name\":\"Cheeze Tweeze\",\"item_rate\":352.82,\"modifiers\":[{\"modifier_id\":5,\"modifier_name\":\"Alfredo\",\"modifier_rate\":200}]},{\"item_id\":2,\"item_name\":\"Thin Crust\",\"item_rate\":560.88,\"modifiers\":[]},{\"item_id\":1,\"item_name\":\"Margherita\",\"item_rate\":560.88,\"modifiers\":[{\"modifier_id\":1,\"modifier_name\":\"Small\",\"modifier_rate\":100}]}],\"taxes\":{\"GST\":319.32,\"SGST\":319.32,\"CGST\":0,\"Service charges\":230},\"subTotal\":1774,\"total\":2642.64}', 2643, '1', NULL, NULL, '2025-04-08 05:27:51', '2025-04-08 05:27:51'),
(24, 9, 'Ordered', 0, '{\"tables\":[19],\"items\":[{\"item_id\":1,\"item_name\":\"Margherita\",\"item_rate\":560.88,\"modifiers\":[{\"modifier_id\":8,\"modifier_name\":\"Regular\",\"modifier_rate\":60},{\"modifier_id\":2,\"modifier_name\":\"Medium\",\"modifier_rate\":200}]}],\"taxes\":{\"GST\":147.6,\"SGST\":147.6,\"CGST\":0,\"Service charges\":230},\"subTotal\":820,\"total\":1345.2}', 1345, '1', NULL, NULL, '2025-04-08 06:24:28', '2025-04-08 06:24:28');

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
(1, 'Ground Floor', NULL, NULL, '2025-04-02 07:26:02', '2025-04-02 07:26:22'),
(2, 'First Floor', NULL, NULL, '2025-04-02 07:26:15', '2025-04-02 07:26:15'),
(3, 'Third Floor', NULL, NULL, '2025-04-02 07:26:31', '2025-04-02 07:26:31'),
(4, 'AC Hall', NULL, NULL, '2025-04-02 07:26:36', '2025-04-02 07:26:36');

-- --------------------------------------------------------

--
-- Table structure for table `tables`
--

CREATE TABLE `tables` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(10) NOT NULL,
  `section_id` bigint(20) UNSIGNED DEFAULT NULL,
  `capacity` int(11) NOT NULL DEFAULT 0,
  `status` varchar(255) NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `assigned_to` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tables`
--

INSERT INTO `tables` (`id`, `name`, `section_id`, `capacity`, `status`, `deleted_at`, `created_at`, `updated_at`, `assigned_to`) VALUES
(10, 'T1', 1, 3, 'Assigned', NULL, '2025-04-04 04:31:29', '2025-04-08 04:27:40', 2),
(11, 'T2', 1, 2, 'Available', NULL, '2025-04-04 04:31:38', '2025-04-07 03:36:33', 2),
(12, 't3', 1, 3, 'Running', NULL, '2025-04-04 04:31:45', '2025-04-08 04:45:05', 7),
(13, 'T6', 1, 5, 'Assigned', NULL, '2025-04-04 04:35:27', '2025-04-08 04:19:08', 2),
(14, 't7', 1, 5, 'Available', NULL, '2025-04-04 04:35:36', '2025-04-04 04:35:36', 1),
(15, 'y8', 1, 8, 'Running', NULL, '2025-04-04 04:40:35', '2025-04-08 04:53:32', 8),
(16, 'ty', 1, 7, 'Running', NULL, '2025-04-04 04:40:46', '2025-04-08 04:45:05', 7),
(17, 't5', 2, 3, 'Assigned', NULL, '2025-04-04 04:47:16', '2025-04-08 03:59:14', 5),
(18, 'h5', 2, 5, 'Assigned', NULL, '2025-04-04 04:47:33', '2025-04-08 04:29:20', 6),
(19, 'g5', 2, 5, 'Running', NULL, '2025-04-04 04:47:42', '2025-04-08 06:24:28', 9);

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
(1, 'GST', 'percentage', 18, 1, 1, NULL, '2025-04-07 06:31:37', '2025-04-07 06:31:37'),
(2, 'SGST', 'percentage', 18, 1, 1, NULL, '2025-04-07 06:31:47', '2025-04-07 06:31:47'),
(3, 'CGST', 'percentage', 18, 1, 0, NULL, '2025-04-07 06:32:22', '2025-04-07 06:32:23'),
(4, 'Service charges', 'flat_amount', 230, 1, 1, NULL, '2025-04-07 07:40:56', '2025-04-07 07:40:56');

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
  `role` varchar(10) NOT NULL DEFAULT 'user',
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

INSERT INTO `users` (`id`, `phone`, `email`, `first_name`, `last_name`, `user_name`, `address`, `country`, `state`, `city`, `zipcode`, `role`, `password`, `email_verified_at`, `remember_token`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, '914-985-7465', 'user@user.com', 'Dulce', 'Rutherford', 'swaniawski.hailee', '651 Douglas Walk Suite 858\nPagacside, NV 19200', 'Kenya', 'Gujarat', 'Ahmedabad', 380041, 'user', '$2y$10$Oolde.WHc4vCvWRLxkz8mOdadPXj9AqlLTOxc.aM7ZmWFEUyka1qm', '2025-04-02 07:15:51', '94x69kS4je', NULL, '2025-04-02 07:15:52', '2025-04-02 07:15:52'),
(2, '+1-606-756-7545', 'lelah02@example.org', 'Hannah', 'Lehner', 'umayer', '50899 Cecil Square\nPort Valentineport, PA 57688-0276', 'Ukraine', 'Gujarat', 'Ahmedabad', 380041, 'user', '$2y$10$AY0TFleCBD2f0WxilRIReeaxWSTglgJ5ptJkP3pnAKjZAH4nhEinC', '2025-04-02 07:15:52', 'X1EGm1YZPK', NULL, '2025-04-02 07:15:52', '2025-04-02 07:15:52'),
(3, '+13213722075', 'nwaelchi@example.com', 'Roselyn', 'McClure', 'blick.stephon', '609 Ivy Track Suite 613\nPort Claud, WV 42732', 'Guadeloupe', 'Gujarat', 'Ahmedabad', 380041, 'user', '$2y$10$YaY.FgTW9uCJtuQznKefS.ut/RIP8wVOYECSNGj1kwjIFd4ZDT6fO', '2025-04-02 07:15:52', '0S6W9usVCN', NULL, '2025-04-02 07:15:52', '2025-04-02 07:15:52'),
(4, '1-234-547-5539', 'laltenwerth@example.org', 'Davin', 'Emard', 'tpagac', '37871 Roberts Unions Apt. 831\nPort Karleeborough, MO 24750', 'Lao People\'s Democratic Republic', 'Gujarat', 'Ahmedabad', 380041, 'user', '$2y$10$1Y9ox27rJO088Z372ynOL.kTd.psme7rTxL9XWvycBtZ6CYTt96N2', '2025-04-02 07:15:52', 'Sn1oAJUMT6', NULL, '2025-04-02 07:15:52', '2025-04-02 07:15:52'),
(5, '(703) 258-6114', 'amari18@example.com', 'Henri', 'Hagenes', 'velma.rodriguez', '20682 Heaney Forges Apt. 748\nNedberg, MN 83918-3481', 'Guyana', 'Gujarat', 'Ahmedabad', 380041, 'user', '$2y$10$hBwaUXlSmGu9HFtXPd..befdFvEtDSNk42gBrT/xE4ibfhd7XhKJC', '2025-04-02 07:15:52', 'mDaTyQ5qHm', NULL, '2025-04-02 07:15:52', '2025-04-02 07:15:52'),
(6, '615-641-8276', 'clara.grimes@example.net', 'Sheldon', 'McCullough', 'eden25', '94102 Noble Stream\nZiemannberg, CA 41254', 'Liechtenstein', 'Gujarat', 'Ahmedabad', 380041, 'user', '$2y$10$GX5PEMWt7MlNv6nu44JDTOOJMH.d4rH4hrE9D1GH2MhTSbR45xBuC', '2025-04-02 07:15:52', 'ST6RefhJ5k', NULL, '2025-04-02 07:15:52', '2025-04-02 07:15:52'),
(7, '(828) 430-4221', 'leanna.kunde@example.com', 'Oren', 'Boehm', 'dcrooks', '1976 Welch Plains Apt. 316\nStoltenbergchester, MA 33621-6266', 'British Virgin Islands', 'Gujarat', 'Ahmedabad', 380041, 'user', '$2y$10$gLvCXcxRrAsSC7PczJbeA.JhYppLga7LU9mrEuY4j0EZDKT75neta', '2025-04-02 07:15:52', '69Zexqbah6', NULL, '2025-04-02 07:15:52', '2025-04-02 07:15:52'),
(8, '(351) 819-0806', 'nettie08@example.org', 'Briana', 'Effertz', 'carter.dwight', '791 Shirley Estate\nEast Lelia, SD 87885-3367', 'Cote d\'Ivoire', 'Gujarat', 'Ahmedabad', 380041, 'user', '$2y$10$ewhuIVu2VM3Up7qK8QU5/uUbidS2kf3QHLgXEnaA/Q36Vugmq8MK.', '2025-04-02 07:15:52', 'cs1iOHBzq0', NULL, '2025-04-02 07:15:52', '2025-04-02 07:15:52'),
(9, '351.682.8121', 'gibson.vergie@example.org', 'Micheal', 'Gusikowski', 'vinnie.ondricka', '64001 Crist Club Apt. 235\nJaskolskimouth, NC 58372-0997', 'Bahrain', 'Gujarat', 'Ahmedabad', 380041, 'user', '$2y$10$KYqnJH5g.RbKt3OcTzNtN./i4sw9YNfO32pic8dny0xLX7zxYHoX.', '2025-04-02 07:15:52', 'F5QIXdXR79', NULL, '2025-04-02 07:15:52', '2025-04-02 07:15:52'),
(10, '+1-774-290-4652', 'maggio.priscilla@example.net', 'Maudie', 'Herman', 'mina.mcdermott', '805 Mertz Groves Suite 997\nWest Marisaberg, MD 85257-3926', 'Slovakia (Slovak Republic)', 'Gujarat', 'Ahmedabad', 380041, 'user', '$2y$10$tjuyWb//ZiAotdRYWPM.4usJytmW0ABEHD3smJ4XtsVBJCqGjlU8G', '2025-04-02 07:15:52', 'qhQ6aBMsXQ', NULL, '2025-04-02 07:15:52', '2025-04-02 07:15:52');

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
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

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
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `orders_id_unique` (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `item_categories`
--
ALTER TABLE `item_categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `item_modifier_groups_mapping`
--
ALTER TABLE `item_modifier_groups_mapping`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `modifiers`
--
ALTER TABLE `modifiers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `modifier_groups`
--
ALTER TABLE `modifier_groups`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `modifier_modifier_group`
--
ALTER TABLE `modifier_modifier_group`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sections`
--
ALTER TABLE `sections`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tables`
--
ALTER TABLE `tables`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `tax_fees`
--
ALTER TABLE `tax_fees`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

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
-- Constraints for table `modifier_modifier_group`
--
ALTER TABLE `modifier_modifier_group`
  ADD CONSTRAINT `modifier_modifier_group_modifier_group_id_foreign` FOREIGN KEY (`modifier_group_id`) REFERENCES `modifier_groups` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `modifier_modifier_group_modifier_id_foreign` FOREIGN KEY (`modifier_id`) REFERENCES `modifiers` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `tables`
--
ALTER TABLE `tables`
  ADD CONSTRAINT `tables_assigned_to_foreign` FOREIGN KEY (`assigned_to`) REFERENCES `customers` (`id`),
  ADD CONSTRAINT `tables_section_id_foreign` FOREIGN KEY (`section_id`) REFERENCES `sections` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

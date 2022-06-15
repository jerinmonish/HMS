-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 15, 2022 at 08:57 PM
-- Server version: 8.0.29
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `HMS`
--

-- --------------------------------------------------------

--
-- Table structure for table `card`
--

CREATE TABLE `card` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` int DEFAULT NULL,
  `name_on_card` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `card_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `expiration_month` int DEFAULT NULL,
  `expiration_year` int DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `brand` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stripe_card_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stripe_fingerprint` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stripe_customer_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cvc_check` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mobile_no` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `card`
--

INSERT INTO `card` (`id`, `user_id`, `name_on_card`, `card_number`, `expiration_month`, `expiration_year`, `email`, `brand`, `stripe_card_id`, `stripe_fingerprint`, `stripe_customer_id`, `cvc_check`, `mobile_no`, `created_at`, `updated_at`) VALUES
(1, 2, 'Vasu Bosco', '0005', 1, 2024, '2', 'American Express', 'card_1KGQt8KNiq3rPLSFjtTqYYCd', 'wADpvsRA72mPgGyr', NULL, 'pass', NULL, '2022-01-10 16:38:31', '2022-01-10 16:38:31'),
(2, 2, 'Vasu Bosco', '9424', 1, 2026, '2', 'Discover', 'card_1KGRFfKNiq3rPLSFHNyuJ0AA', 'VetGvwCPevm8VB04', NULL, 'pass', NULL, '2022-01-10 17:01:48', '2022-01-10 17:01:48'),
(3, 2, 'Vasu Bosco', '1117', 1, 2024, '2', 'Discover', 'card_1KGRH6KNiq3rPLSFdb3Dkxuk', 'PNvAux889I55grFp', NULL, 'pass', NULL, '2022-01-10 17:03:17', '2022-01-10 17:03:17'),
(4, 1, 'Jerin Monish', '0505', 1, 2026, '1', 'JCB', 'card_1KGRI9KNiq3rPLSF0008aVOf', 'FwZ0EwqSvpmKVB1Q', NULL, 'pass', NULL, '2022-01-10 17:04:23', '2022-01-10 17:04:23'),
(5, 3, 'AdRaj', '1117', 1, 2027, '3', 'Discover', 'card_1KOPxXKNiq3rPLSFMCy8xV3t', 'PNvAux889I55grFp', NULL, 'pass', NULL, '2022-02-01 17:16:04', '2022-02-01 17:16:04'),
(6, 3, 'AD', '4444', 1, 2023, '3', 'MasterCard', 'card_1KOzcgKNiq3rPLSF21rpVTwr', 'YHZgUY9UjYjOSghN', NULL, 'pass', NULL, '2022-02-03 07:20:55', '2022-02-03 07:20:55'),
(7, 3, 'John Doe', '4242', 1, 2024, '3', 'Visa', 'card_1KTqSnKNiq3rPLSFhAoB2Ous', 'wMgyLdbLkdLVreLO', NULL, 'pass', NULL, '2022-02-16 16:34:47', '2022-02-16 16:34:47'),
(8, 2, 'Thaddeus', '0505', 1, 2038, '2', 'JCB', 'card_1KjRXHKNiq3rPLSFQSPPnxly', 'FwZ0EwqSvpmKVB1Q', NULL, 'pass', NULL, '2022-03-31 17:11:52', '2022-03-31 17:11:52');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `cart_dated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `product_amount` double(20,2) DEFAULT NULL,
  `total_amount` double(20,2) DEFAULT NULL,
  `purchased_status` enum('Seen','Incart','Processing','Payment_done') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Seen',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `user_id`, `product_id`, `quantity`, `cart_dated`, `product_amount`, `total_amount`, `purchased_status`, `created_at`, `updated_at`) VALUES
(10, 2, 21, 3, '2022-01-06 07:03:29', 60.00, 180.00, 'Payment_done', '2022-01-06 07:03:29', '2022-01-10 16:38:31'),
(11, 2, 18, 5, '2022-01-06 07:03:34', 165.00, 825.00, 'Payment_done', '2022-01-06 07:03:34', '2022-01-10 16:38:31'),
(12, 2, 15, 3, '2022-01-06 07:03:39', 210.00, 630.00, 'Payment_done', '2022-01-06 07:03:39', '2022-01-10 16:38:31'),
(18, 1, 20, 1, '2022-01-07 01:51:47', 75.00, 75.00, 'Payment_done', '2022-01-07 13:51:47', '2022-01-10 17:04:23'),
(20, 2, 21, 5, '2022-01-10 04:51:26', 60.00, 300.00, 'Payment_done', '2022-01-10 16:51:26', '2022-01-10 17:01:48'),
(21, 2, 16, 7, '2022-01-10 04:51:33', 110.00, 770.00, 'Payment_done', '2022-01-10 16:51:33', '2022-01-10 17:01:48'),
(22, 2, 4, 2, '2022-01-10 04:51:40', 140.00, 280.00, 'Payment_done', '2022-01-10 16:51:40', '2022-01-10 17:01:48'),
(23, 2, 4, 1, '2022-01-10 05:02:42', 140.00, 140.00, 'Payment_done', '2022-01-10 17:02:42', '2022-01-10 17:03:17'),
(34, 1, 20, 3, '2022-01-19 04:12:23', 75.00, 225.00, 'Incart', '2022-01-19 16:12:23', '2022-01-19 16:12:23'),
(39, 3, 19, 5, '2022-02-01 05:13:03', 165.00, 825.00, 'Payment_done', '2022-02-01 17:13:03', '2022-02-01 17:16:04'),
(40, 3, 21, 3, '2022-02-01 05:13:13', 60.00, 180.00, 'Payment_done', '2022-02-01 17:13:13', '2022-02-01 17:16:04'),
(41, 3, 16, 4, '2022-02-01 05:13:26', 110.00, 440.00, 'Payment_done', '2022-02-01 17:13:26', '2022-02-01 17:16:04'),
(42, 1, 21, 3, '2022-02-02 05:06:58', 60.00, 180.00, 'Incart', '2022-02-02 17:06:58', '2022-02-02 17:06:58'),
(43, 3, 4, 1, '2022-02-03 07:20:04', 140.00, 140.00, 'Payment_done', '2022-02-03 07:20:04', '2022-02-03 07:20:55'),
(44, 3, 4, 3, '2022-02-16 04:33:21', 140.00, 420.00, 'Payment_done', '2022-02-16 16:33:21', '2022-02-16 16:34:47'),
(45, 2, 29, 3, '2022-03-31 05:10:12', 22.00, 66.00, 'Payment_done', '2022-03-31 17:10:12', '2022-03-31 17:11:52'),
(46, 4, 19, 5, '2022-05-23 23:31:31', 165.00, 825.00, 'Incart', '2022-05-24 11:31:31', '2022-05-24 11:31:31'),
(47, 4, 27, 15, '2022-05-23 23:35:08', 25.00, 375.00, 'Incart', '2022-05-24 11:35:08', '2022-05-24 11:35:08'),
(48, 2, 14, 2, '2022-05-23 23:56:23', 70.00, 140.00, 'Incart', '2022-05-24 11:56:23', '2022-05-24 11:56:23');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cat_img` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `cat_img`, `description`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Veg', 'photo-61bcc4a43344d-61c324da5e283.jpg', 'Veg', 'Active', '2021-12-22 07:45:06', '2021-12-22 07:45:06'),
(2, 'Non Veg', 'photo-61bcc55908419-61c324ee3123f.jpg', 'Non Veg', 'Active', '2021-12-22 07:45:26', '2021-12-22 07:45:26'),
(3, 'Ice Cream', '07virus-ice-cream2-mobileMasterAt3x-61c316d1638b4-61c3250082c65.jpg', 'Ice Cream', 'Active', '2021-12-22 07:45:44', '2021-12-22 07:45:44'),
(4, 'Chat', '0_F7cV7z5gE7U86x4B-61c1d24491b6a-61c325106c443.jpg', 'Chat', 'Active', '2021-12-22 07:46:00', '2021-12-22 07:46:00');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2021_11_30_111611_create_category_table', 1),
(6, '2021_11_30_111611_create_products_table', 1),
(7, '2021_11_30_112603_create_product_images_table', 1),
(8, '2021_12_29_131611_create_cart_table', 2),
(9, '2021_12_29_131611_create_card_table', 3);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `created_at`, `updated_at`) VALUES
(137, 'App\\Models\\User', 2, 'myapptoken', '0cdaa97387eec88e87fc69378a33ee2232231cc80277ba385592bf389c3dfa53', '[\"*\"]', '2022-06-15 12:34:37', '2022-06-15 12:04:26', '2022-06-15 12:34:37'),
(138, 'App\\Models\\User', 1, 'myapptoken', '86b1ac787a66790727569e52acf365a70af0f4d1c4173750002904a7be98fcfb', '[\"*\"]', '2022-06-15 12:07:05', '2022-06-15 12:04:57', '2022-06-15 12:07:05');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint UNSIGNED NOT NULL,
  `cat_id` int NOT NULL,
  `p_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `p_description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `available` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `p_amt` decimal(5,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `cat_id`, `p_name`, `p_description`, `available`, `p_amt`, `created_at`, `updated_at`) VALUES
(1, 1, 'Paneer Tikka', 'Very Tasty', 'Active', '100.00', '2021-12-22 07:55:39', '2021-12-22 07:55:39'),
(4, 1, 'Gobi Manchurian', 'Very Tasty', 'Active', '140.00', '2021-12-22 08:02:25', '2021-12-22 08:02:25'),
(5, 2, 'Pepper Chicken', 'Very Tasty', 'Active', '240.00', '2021-12-22 08:04:31', '2021-12-22 08:04:31'),
(8, 2, 'Mutton Tandoori', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an  with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 'Active', '450.00', '2021-12-27 10:51:09', '2021-12-27 10:51:09'),
(9, 2, 'ChickenGrill', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum.', 'Active', '240.67', '2021-12-27 10:52:43', '2021-12-27 10:52:43'),
(10, 2, 'Mutton Biryani', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum.', 'Active', '450.50', '2021-12-29 05:05:37', '2021-12-29 05:05:37'),
(11, 2, 'Tandoori Chicken Biryani', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum.', 'Active', '150.80', '2021-12-29 05:06:39', '2021-12-29 05:06:39'),
(12, 2, 'Kaadai / Quail Fry', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum.', 'Active', '170.00', '2021-12-29 05:08:40', '2021-12-29 05:08:40'),
(13, 2, 'Pepper Chicken', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum.', 'Active', '120.00', '2021-12-29 05:09:34', '2021-12-29 05:09:34'),
(14, 2, 'Kerala Fish Fry', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum.', 'Active', '70.00', '2021-12-29 05:10:49', '2021-12-29 05:10:49'),
(15, 2, 'Mutton Sheek Kabab', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum.', 'Active', '210.00', '2021-12-29 05:11:32', '2021-12-29 05:11:32'),
(16, 2, 'Malai Kabab', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum.', 'Active', '110.00', '2021-12-29 05:12:59', '2021-12-29 05:12:59'),
(17, 2, 'Chicken Tikka', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum.', 'Active', '145.00', '2021-12-29 05:16:18', '2021-12-29 05:16:18'),
(18, 2, 'Dragon Chicken', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum.', 'Active', '165.00', '2021-12-29 05:17:11', '2021-12-29 05:17:11'),
(19, 2, 'Vanjaram Fish Fry', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum.', 'Active', '165.00', '2021-12-29 05:18:10', '2021-12-29 05:18:10'),
(20, 2, 'Chicken Kothu Parotta', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum.', 'Active', '75.00', '2021-12-29 05:36:43', '2021-12-29 05:36:43'),
(21, 2, 'Chicken Rice', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum.', 'Active', '60.00', '2021-12-29 05:37:23', '2021-12-29 05:37:23'),
(25, 2, 'Prawn Fry', 'admin/product admin/product admin/product', 'Active', '12.22', '2022-03-07 16:29:33', '2022-03-07 16:29:33'),
(26, 2, 'Mutton Soup', 'Mutton Leg Soup', 'Active', '30.00', '2022-03-08 17:01:34', '2022-03-08 17:01:34'),
(27, 3, 'Falooda', 'A falooda is a Mughlai Indian version of a cold dessert made with noodles. It has origins in the Persian dish faloodeh', 'Active', '25.00', '2022-03-15 16:33:32', '2022-03-15 16:33:32'),
(28, 4, 'Bhel Puri', 'Bhelpuri is a savoury snack originating from India, and is also a type of chaat. It is made of puffed rice, vegetables and a tangy tamarind sauce', 'Active', '30.00', '2022-03-15 16:36:50', '2022-03-15 16:36:50'),
(29, 4, 'Biscuts', 'Product Description Product Description Product Description', 'Active', '22.00', '2022-03-31 17:09:32', '2022-03-31 17:09:32');

-- --------------------------------------------------------

--
-- Table structure for table `product_images`
--

CREATE TABLE `product_images` (
  `id` bigint UNSIGNED NOT NULL,
  `p_image_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pid` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_images`
--

INSERT INTO `product_images` (`id`, `p_image_name`, `pid`, `created_at`, `updated_at`) VALUES
(1, 'Achari-paneer-tikka-recipe-6-500x500-61c32753d0eb2.jpg', 1, '2021-12-22 07:55:39', '2021-12-22 07:55:39'),
(2, 'Achari_Paneer_Tikka_Recipe_Party_Food-61c32753d3f94.jpg', 1, '2021-12-22 07:55:39', '2021-12-22 07:55:39'),
(6, 'Gobi Manchurian or Cauliflower Manchurian 1-61c328e9be313.JPG', 4, '2021-12-22 08:02:25', '2021-12-22 08:02:25'),
(7, '18e7053151cefa3e4b5b98a33563efe1-61c328e9c1a87.JPG', 4, '2021-12-22 08:02:25', '2021-12-22 08:02:25'),
(8, 'IMG_4884_709751027_center-61c328e9c49bd.JPG', 4, '2021-12-22 08:02:25', '2021-12-22 08:02:25'),
(9, 'Pepper Chicken-61c32967c8b97.JPG', 5, '2021-12-22 08:04:31', '2021-12-22 08:04:31'),
(10, 'DSC00170-1-61c32967cba41.JPG', 5, '2021-12-22 08:04:31', '2021-12-22 08:04:31'),
(12, 'llll-61c9e7f57415d.jpg', 8, '2021-12-27 10:51:09', '2021-12-27 10:51:09'),
(13, 'Simply--61c9e8531aaab.jpg', 9, '2021-12-27 10:52:43', '2021-12-27 10:52:43'),
(14, 'Mutton-Biryani-600x600-61cc39f90d586.jpg', 10, '2021-12-29 05:05:37', '2021-12-29 05:05:37'),
(15, 'Tandoori-chicken-biryani-61cc3a37be2b1.jpg', 11, '2021-12-29 05:06:39', '2021-12-29 05:06:39'),
(16, 'maxresdefault-61cc3ab0ee5ee.jpg', 12, '2021-12-29 05:08:40', '2021-12-29 05:08:40'),
(17, 'photo-61cc3ae702281.jpg', 13, '2021-12-29 05:09:35', '2021-12-29 05:09:35'),
(18, 'Restaurant-style-fish-fry-recipe-61cc3b3197b7e.jpg', 14, '2021-12-29 05:10:49', '2021-12-29 05:10:49'),
(19, 'photo (1)-61cc3b5c43566.jpg', 15, '2021-12-29 05:11:32', '2021-12-29 05:11:32'),
(20, 'malai-61cc3bb3c93ef.jpg', 16, '2021-12-29 05:12:59', '2021-12-29 05:12:59'),
(21, 'Tandoori-Chicken1-1024x683-61cc3c7a68e44.jpg', 17, '2021-12-29 05:16:18', '2021-12-29 05:16:18'),
(22, 'maxresdefault (1)-61cc3cafcf0e2.jpg', 18, '2021-12-29 05:17:11', '2021-12-29 05:17:11'),
(23, 'how-to-make-vanjaram-vepudu-61cc3cea9fbdc.jpg', 19, '2021-12-29 05:18:10', '2021-12-29 05:18:10'),
(24, '148201-ubmqvmelxk-1601225371-61cc414345e2e.jpg', 20, '2021-12-29 05:36:43', '2021-12-29 05:36:43'),
(25, '148201-ubmqvmelxk-1601225371-61cc416bed878.jpg', 21, '2021-12-29 05:37:23', '2021-12-29 05:37:23'),
(30, '622632ed9d92f220307095933.jpeg', 25, '2022-03-07 16:29:33', '2022-03-07 16:29:33'),
(31, '622632ed9ffd7220307095933.png', 25, '2022-03-07 16:29:33', '2022-03-07 16:29:33'),
(32, '622632eda29c0220307095933.png', 25, '2022-03-07 16:29:33', '2022-03-07 16:29:33'),
(33, '62278bee72a4f220308103134.png', 26, '2022-03-08 17:01:34', '2022-03-08 17:01:34'),
(34, '62278bee75b46220308103134.jpeg', 26, '2022-03-08 17:01:34', '2022-03-08 17:01:34'),
(35, '62278bee7749e220308103134.jpeg', 26, '2022-03-08 17:01:34', '2022-03-08 17:01:34'),
(36, '6230bfdcb5b2e220315100332.jpeg', 27, '2022-03-15 16:33:32', '2022-03-15 16:33:32'),
(37, '6230bfdcb7f70220315100332.jpeg', 27, '2022-03-15 16:33:32', '2022-03-15 16:33:32'),
(38, '6230c0a2e3104220315100650.jpeg', 28, '2022-03-15 16:36:50', '2022-03-15 16:36:50'),
(39, '6230c0a2e562a220315100650.jpeg', 28, '2022-03-15 16:36:50', '2022-03-15 16:36:50'),
(40, '6245e04ce83de220331103932.jpeg', 29, '2022-03-31 17:09:32', '2022-03-31 17:09:32'),
(41, '6245e04cec1d3220331103932.jpeg', 29, '2022-03-31 17:09:32', '2022-03-31 17:09:32');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_type` enum('admin','user') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user',
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `user_type`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Jerin Monish', 'jerinmonish007@gmail.com', 'admin', NULL, '$2y$10$NkdnMaH0iTx1MJjZ5MN5fuN0JLiSBiSnMCbXHQ8p1LGNTJS.rRibC', NULL, '2021-12-22 07:41:29', '2021-12-22 07:41:29'),
(2, 'Vasu', 'vasu@gmail.com', 'user', NULL, '$2y$10$SzOp5Uco/ppAXMSUb93Ll.uyawsGhX94WE/nxr8ptW8uYqwrbg/My', NULL, '2022-01-06 07:03:04', '2022-01-06 07:03:04'),
(3, 'Adaikalam', 'msadaikalam@gmail.com', 'user', NULL, '$2y$10$Xqc3LWDB2ucIF9wZwqE51uwtvxRjqt/JPaKScPhyOFzS5kw/Xyly.', NULL, '2022-02-01 17:12:36', '2022-02-01 17:12:36'),
(4, 'Ashik', 'ashik@gmail.com', 'user', NULL, '$2y$10$N83Q3RkEhQ3duPdd2RgOj.m9BwX32iSl3Xp7Tdg5/dg.3KuvCPgd.', NULL, '2022-05-24 11:30:52', '2022-05-24 11:30:52');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `card`
--
ALTER TABLE `card`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_images`
--
ALTER TABLE `product_images`
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
-- AUTO_INCREMENT for table `card`
--
ALTER TABLE `card`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=139;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `product_images`
--
ALTER TABLE `product_images`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

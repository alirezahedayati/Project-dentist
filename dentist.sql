-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:988
-- Generation Time: Dec 18, 2024 at 04:15 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dentist`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `id` bigint(20) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `mobile_number` varchar(20) NOT NULL,
  `type` enum('checkup','cosmetic') NOT NULL DEFAULT 'checkup',
  `reserved_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `reserved_for` timestamp NULL DEFAULT NULL,
  `user_id` bigint(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`id`, `first_name`, `last_name`, `mobile_number`, `type`, `reserved_at`, `reserved_for`, `user_id`, `created_at`, `updated_at`) VALUES
(0, 'محمدجواد', 'میرزازاده', '09144535680', 'checkup', '2024-12-15 13:25:54', NULL, 0, '2024-12-15 13:25:54', '2024-12-15 13:25:54'),
(0, 'sdfsdfsd', 'fsdfsdfsdf', '09144535680', 'checkup', '2024-12-15 13:27:19', NULL, 0, '2024-12-15 13:27:19', '2024-12-15 13:27:19');

-- --------------------------------------------------------

--
-- Table structure for table `gallery_images`
--

CREATE TABLE `gallery_images` (
  `id` int(11) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gallery_images`
--

INSERT INTO `gallery_images` (`id`, `image_url`, `created_at`) VALUES
(1, 'https://picsum.photos/536/354', '2024-12-18 14:52:26'),
(2, 'https://picsum.photos/536/354', '2024-12-18 14:52:26'),
(3, 'https://picsum.photos/536/354', '2024-12-18 14:52:26'),
(4, 'https://picsum.photos/536/354', '2024-12-18 14:58:39'),
(5, 'https://picsum.photos/536/354', '2024-12-18 14:58:39'),
(6, 'https://picsum.photos/536/354', '2024-12-18 14:58:39'),
(7, 'https://picsum.photos/536/354', '2024-12-18 14:58:39'),
(8, 'https://picsum.photos/536/354', '2024-12-18 14:58:39'),
(9, 'https://picsum.photos/536/354', '2024-12-18 14:59:04'),
(10, 'https://picsum.photos/536/354', '2024-12-18 14:59:04'),
(11, 'xcvxcv', '2024-12-18 15:10:14'),
(12, 'http://localhost:5173/src/assets/img/about-us.jpg', '2024-12-18 15:13:00');

-- --------------------------------------------------------

--
-- Table structure for table `menus`
--

CREATE TABLE `menus` (
  `id` int(11) NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `order_m` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menus`
--

INSERT INTO `menus` (`id`, `parent_id`, `title`, `url`, `order_m`, `is_active`, `created_at`, `updated_at`) VALUES
(1, NULL, 'خانه', '/', 1, 1, '2024-12-18 13:46:43', '2024-12-18 13:46:43'),
(2, NULL, 'درمان های دندانپزشکی', '#', 2, 1, '2024-12-18 13:46:43', '2024-12-18 13:46:43'),
(3, 2, 'درمان های عمومی', '#', 1, 1, '2024-12-18 13:46:43', '2024-12-18 13:46:43'),
(4, 2, 'درمان های زیبایی', '#', 2, 1, '2024-12-18 13:46:43', '2024-12-18 13:46:43'),
(5, 2, 'درمان های پروتزهای دندانی', '#', 3, 1, '2024-12-18 13:46:43', '2024-12-18 13:46:43'),
(6, 2, 'جراح لثه', '#', 4, 1, '2024-12-18 13:46:43', '2024-12-18 13:46:43'),
(7, 2, 'سایر درمان ها', '#', 5, 1, '2024-12-18 13:46:43', '2024-12-18 13:46:43'),
(8, 6, 'xcvxcvxc', 'zzz', 1, 1, '2024-12-18 14:22:17', '2024-12-18 14:22:17');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `mobile_number` varchar(20) NOT NULL,
  `active_code` varchar(200) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `password` varchar(250) NOT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 0,
  `refresh_token` varchar(255) DEFAULT NULL,
  `reset_token` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --
-- -- Dumping data for table `users`
-- --

-- INSERT INTO `users` (`id`, `mobile_number`, `active_code`, `first_name`, `last_name`, `password`, `is_admin`, `is_active`, `refresh_token`, `reset_token`, `created_at`, `updated_at`) VALUES
-- (1, '09144535680', '', 'محمدجواد', 'میرزازاده', '$2y$10$W9kbAgCoO676hY7ACWF.JeXteoV6QTLNsMJmnW3zX4o31zPHIfvPK', 1, 1, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMCIsImV4cCI6MTc2NjA2Njg3MX0.vcjaezUvN1WAkPVQyY51JFylVgKoevB64EGD4dL3zdc', NULL, '2024-12-15 13:23:39', '2024-12-15 13:23:39'),
-- (2, '09966439335', '393355', 'رضا', 'علیپور', 'Mm13861386', 1, 1, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMCIsImV4cCI6MTc2NjA2Njg3MX0.vcjaezUvN1WAkPVQyY51JFylVgKoevB64EGD4dL3zdc', NULL, '2024-12-16 14:03:52', '2024-12-16 14:03:52');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `gallery_images`
--
ALTER TABLE `gallery_images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `menus`
--
ALTER TABLE `menus`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `gallery_images`
--
ALTER TABLE `gallery_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `menus`
--
ALTER TABLE `menus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

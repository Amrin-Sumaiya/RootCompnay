-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 28, 2025 at 06:14 AM
-- Server version: 10.6.23-MariaDB
-- PHP Version: 8.4.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `studentv_school`
--

-- --------------------------------------------------------

--
-- Table structure for table `account_employee_salaries`
--

CREATE TABLE `account_employee_salaries` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `employee_id` int(11) NOT NULL COMMENT 'employee_id=user_id',
  `date` varchar(255) DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `account_employee_salaries`
--

INSERT INTO `account_employee_salaries` (`id`, `employee_id`, `date`, `amount`, `created_at`, `updated_at`) VALUES
(1, 15, '2020-11', 1353.3333333333, '2020-11-03 14:20:24', '2020-11-03 14:20:24'),
(2, 16, '2020-11', 1000, '2020-11-03 14:20:24', '2020-11-03 14:20:24');

-- --------------------------------------------------------

--
-- Table structure for table `account_other_costs`
--

CREATE TABLE `account_other_costs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `date` date DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `account_other_costs`
--

INSERT INTO `account_other_costs` (`id`, `date`, `amount`, `description`, `image`, `created_at`, `updated_at`) VALUES
(2, '2020-11-01', 5000, 'Note Book and marker pen', NULL, '2020-11-03 14:21:10', '2020-11-03 14:21:10');

-- --------------------------------------------------------

--
-- Table structure for table `account_student_fees`
--

CREATE TABLE `account_student_fees` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `year_id` int(11) DEFAULT NULL,
  `class_id` int(11) DEFAULT NULL,
  `student_id` int(11) DEFAULT NULL,
  `fee_category_id` int(11) DEFAULT NULL,
  `date` varchar(255) DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `account_student_fees`
--

INSERT INTO `account_student_fees` (`id`, `year_id`, `class_id`, `student_id`, `fee_category_id`, `date`, `amount`, `created_at`, `updated_at`) VALUES
(1, 2, 1, 12, 1, '2020-11', 700, '2020-11-03 14:18:56', '2020-11-03 14:18:56'),
(2, 2, 1, 13, 1, '2020-11', 1000, '2020-11-03 14:18:56', '2020-11-03 14:18:56'),
(3, 2, 1, 14, 1, '2020-11', 1000, '2020-11-03 14:18:56', '2020-11-03 14:18:56'),
(4, 2, 1, 12, 2, '2020-10', 140, '2020-11-03 14:19:38', '2020-11-03 14:19:38'),
(5, 2, 1, 13, 2, '2020-10', 200, '2020-11-03 14:19:38', '2020-11-03 14:19:38'),
(6, 2, 1, 14, 2, '2020-10', 200, '2020-11-03 14:19:38', '2020-11-03 14:19:38');

-- --------------------------------------------------------

--
-- Table structure for table `assign_students`
--

CREATE TABLE `assign_students` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `student_id` int(11) NOT NULL COMMENT 'user_id=student_id',
  `roll` int(11) DEFAULT NULL,
  `class_id` int(11) DEFAULT NULL,
  `year_id` int(11) DEFAULT NULL,
  `group_id` int(11) DEFAULT NULL,
  `shift_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `assign_students`
--

INSERT INTO `assign_students` (`id`, `student_id`, `roll`, `class_id`, `year_id`, `group_id`, `shift_id`, `created_at`, `updated_at`) VALUES
(1, 12, 1, 1, 2, NULL, 1, '2020-10-19 11:29:50', '2020-11-03 14:05:01'),
(2, 13, 2, 1, 2, NULL, 1, '2020-10-19 11:30:53', '2020-11-03 14:05:01'),
(3, 14, 3, 1, 2, NULL, NULL, '2020-10-19 11:31:48', '2020-11-03 14:05:01'),
(4, 19, NULL, 1, 2, 2, 1, '2021-01-13 10:45:14', '2021-01-13 10:45:14'),
(5, 20, NULL, 1, 1, 1, 2, '2021-01-13 11:45:35', '2021-01-13 11:45:35'),
(6, 21, NULL, 5, 1, 3, 1, '2021-01-17 17:49:09', '2021-01-17 17:49:09'),
(7, 22, NULL, 3, 2, 3, 2, '2021-01-17 17:54:06', '2021-01-17 17:54:06'),
(8, 23, NULL, 4, 2, 2, 2, '2021-01-17 17:57:37', '2021-01-17 17:57:37'),
(9, 24, NULL, 2, 2, 3, 2, '2021-01-18 02:50:45', '2021-01-18 02:50:45'),
(10, 25, NULL, 1, 2, 1, 1, '2021-01-18 19:48:10', '2021-01-18 19:48:10'),
(11, 26, NULL, 1, 3, 1, 1, '2021-01-19 03:01:07', '2021-01-19 03:01:07'),
(12, 28, NULL, 7, 3, 1, 4, '2021-01-19 03:19:46', '2021-01-19 03:19:46');

-- --------------------------------------------------------

--
-- Table structure for table `assign_subjects`
--

CREATE TABLE `assign_subjects` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `class_id` int(11) NOT NULL,
  `subject_id` int(11) NOT NULL,
  `full_mark` double(8,2) DEFAULT NULL,
  `pass_mark` double(8,2) DEFAULT NULL,
  `subjective_mark` double(8,2) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `assign_subjects`
--

INSERT INTO `assign_subjects` (`id`, `class_id`, `subject_id`, `full_mark`, `pass_mark`, `subjective_mark`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 100.00, 33.00, 100.00, 1, 1, '2020-07-24 01:55:38', '2021-01-19 03:11:22'),
(2, 1, 2, 100.00, 33.00, 100.00, 1, 1, '2020-07-24 01:55:38', '2021-01-19 03:11:22'),
(3, 1, 3, 100.00, 33.00, 100.00, 1, 1, '2020-07-24 01:55:38', '2021-01-19 03:11:22'),
(4, 1, 4, 100.00, 33.00, 100.00, 1, 1, '2020-07-24 01:55:38', '2021-01-19 03:11:22'),
(5, 2, 1, 100.00, 33.00, 100.00, 1, NULL, '2020-07-24 01:56:20', '2020-07-24 01:56:20'),
(6, 2, 2, 100.00, 33.00, 100.00, 1, NULL, '2020-07-24 01:56:20', '2020-07-24 01:56:20'),
(7, 2, 3, 100.00, 33.00, 100.00, 1, NULL, '2020-07-24 01:56:20', '2020-07-24 01:56:20'),
(8, 2, 4, 100.00, 33.00, 100.00, 1, NULL, '2020-07-24 01:56:21', '2020-07-24 01:56:21'),
(9, 3, 1, 100.00, 33.00, 100.00, 1, NULL, '2020-07-24 01:57:01', '2020-07-24 01:57:01'),
(10, 3, 2, 100.00, 33.00, 100.00, 1, NULL, '2020-07-24 01:57:01', '2020-07-24 01:57:01'),
(11, 3, 3, 100.00, 33.00, 100.00, 1, NULL, '2020-07-24 01:57:01', '2020-07-24 01:57:01'),
(12, 3, 4, 100.00, 33.00, 100.00, 1, NULL, '2020-07-24 01:57:01', '2020-07-24 01:57:01'),
(13, 4, 1, 100.00, 33.00, 100.00, 1, NULL, '2020-07-24 01:57:39', '2020-07-24 01:57:39'),
(14, 4, 2, 100.00, 33.00, 100.00, 1, NULL, '2020-07-24 01:57:39', '2020-07-24 01:57:39'),
(15, 4, 3, 100.00, 33.00, 100.00, 1, NULL, '2020-07-24 01:57:39', '2020-07-24 01:57:39'),
(16, 4, 4, 100.00, 33.00, 100.00, 1, NULL, '2020-07-24 01:57:39', '2020-07-24 01:57:39'),
(26, 5, 1, 100.00, 33.00, 100.00, 1, NULL, '2020-11-03 14:01:28', '2020-11-03 14:01:28'),
(27, 5, 2, 100.00, 33.00, 100.00, 1, NULL, '2020-11-03 14:01:28', '2020-11-03 14:01:28'),
(28, 5, 3, 100.00, 33.00, 100.00, 1, NULL, '2020-11-03 14:01:29', '2020-11-03 14:01:29'),
(29, 5, 4, 100.00, 33.00, 100.00, 1, NULL, '2020-11-03 14:01:29', '2020-11-03 14:01:29'),
(30, 8, 10, 100.00, 33.00, 100.00, 1, NULL, '2021-01-19 02:58:08', '2021-01-19 02:58:08');

-- --------------------------------------------------------

--
-- Table structure for table `designations`
--

CREATE TABLE `designations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `designations`
--

INSERT INTO `designations` (`id`, `name`, `status`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 'Principal', 1, 1, NULL, '2021-01-20 03:33:06', '2021-01-20 03:33:06'),
(2, 'Assistant Professor', 1, 1, NULL, '2021-01-20 03:33:30', '2021-01-20 03:33:30'),
(3, 'Lecturer', 1, 1, 1, '2021-01-20 03:33:50', '2021-01-20 03:34:01');

-- --------------------------------------------------------

--
-- Table structure for table `discount_students`
--

CREATE TABLE `discount_students` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `assign_student_id` int(11) NOT NULL,
  `fee_category_id` int(11) DEFAULT NULL,
  `discount` double DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `discount_students`
--

INSERT INTO `discount_students` (`id`, `assign_student_id`, `fee_category_id`, `discount`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 10, '2020-07-24 02:01:15', '2020-07-24 02:01:15'),
(2, 2, 1, 20, '2020-07-24 02:19:56', '2020-07-24 02:19:56'),
(3, 3, 1, 10, '2020-07-24 02:20:36', '2020-07-24 02:20:36'),
(4, 4, 1, 20, '2020-07-24 02:21:01', '2020-07-24 02:21:01'),
(5, 5, 1, 3, '2020-07-24 02:21:54', '2020-07-24 02:21:54'),
(6, 6, 1, 30, '2020-07-24 02:23:01', '2020-07-24 02:23:01'),
(7, 7, 1, 35, '2020-07-24 02:24:01', '2020-07-24 02:24:01'),
(8, 8, 1, 25, '2020-08-09 07:32:49', '2020-08-09 07:32:49'),
(9, 1, 1, 30, '2020-10-19 11:29:50', '2020-10-19 11:29:50'),
(10, 2, 1, 0, '2020-10-19 11:30:53', '2020-10-19 11:30:53'),
(11, 3, 1, 0, '2020-10-19 11:31:48', '2020-10-19 11:31:48'),
(12, 4, 1, 6, '2021-01-13 10:45:14', '2021-01-13 10:45:14'),
(13, 5, 1, NULL, '2021-01-13 11:45:35', '2021-01-13 11:45:35'),
(14, 6, 1, NULL, '2021-01-17 17:49:09', '2021-01-17 17:49:09'),
(15, 7, 1, NULL, '2021-01-17 17:54:06', '2021-01-17 17:54:06'),
(16, 8, 1, NULL, '2021-01-17 17:57:37', '2021-01-17 17:57:37'),
(17, 9, 1, NULL, '2021-01-18 02:50:45', '2021-01-18 02:50:45'),
(18, 10, 1, NULL, '2021-01-18 19:48:10', '2021-01-18 19:48:10'),
(19, 11, 1, NULL, '2021-01-19 03:01:07', '2021-01-19 03:01:07'),
(20, 12, 1, NULL, '2021-01-19 03:19:46', '2021-01-19 03:19:46');

-- --------------------------------------------------------

--
-- Table structure for table `employee_attendances`
--

CREATE TABLE `employee_attendances` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `employee_id` int(11) NOT NULL COMMENT 'employee_id=user_id',
  `date` date NOT NULL,
  `attend_status` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `employee_attendances`
--

INSERT INTO `employee_attendances` (`id`, `employee_id`, `date`, `attend_status`, `created_at`, `updated_at`) VALUES
(48, 17, '2020-11-04', 'Present', '2020-11-03 14:13:48', '2020-11-03 14:13:48'),
(47, 16, '2020-11-04', 'Present', '2020-11-03 14:13:48', '2020-11-03 14:13:48'),
(46, 15, '2020-11-04', 'Present', '2020-11-03 14:13:48', '2020-11-03 14:13:48'),
(42, 17, '2020-11-03', 'Present', '2020-11-03 14:12:53', '2020-11-03 14:12:53'),
(41, 16, '2020-11-03', 'Present', '2020-11-03 14:12:53', '2020-11-03 14:12:53'),
(40, 15, '2020-11-03', 'Absent', '2020-11-03 14:12:53', '2020-11-03 14:12:53'),
(39, 17, '2020-11-02', 'Present', '2020-11-03 14:12:28', '2020-11-03 14:12:28'),
(38, 16, '2020-11-02', 'Present', '2020-11-03 14:12:28', '2020-11-03 14:12:28'),
(37, 15, '2020-11-02', 'Present', '2020-11-03 14:12:28', '2020-11-03 14:12:28'),
(45, 15, '2020-11-01', 'Present', '2020-11-03 14:13:35', '2020-11-03 14:13:35'),
(44, 16, '2020-11-01', 'Present', '2020-11-03 14:13:35', '2020-11-03 14:13:35'),
(43, 17, '2020-11-01', 'Leave', '2020-11-03 14:13:35', '2020-11-03 14:13:35');

-- --------------------------------------------------------

--
-- Table structure for table `employee_leaves`
--

CREATE TABLE `employee_leaves` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `employee_id` int(11) NOT NULL COMMENT 'employee_id=user_id',
  `leave_purpose_id` int(11) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `employee_leaves`
--

INSERT INTO `employee_leaves` (`id`, `employee_id`, `leave_purpose_id`, `start_date`, `end_date`, `created_at`, `updated_at`) VALUES
(3, 15, 4, '2020-11-01', '2020-11-01', '2020-11-03 14:11:13', '2020-11-03 14:11:13'),
(4, 16, 4, '2021-06-07', '2021-04-05', '2021-01-19 03:06:12', '2021-01-19 03:06:12');

-- --------------------------------------------------------

--
-- Table structure for table `employee_salary_logs`
--

CREATE TABLE `employee_salary_logs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `employee_id` int(11) NOT NULL COMMENT 'employee_id=user_id',
  `previous_salary` double DEFAULT NULL,
  `present_salary` double DEFAULT NULL,
  `increment_salary` double DEFAULT NULL,
  `effected_date` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `employee_salary_logs`
--

INSERT INTO `employee_salary_logs` (`id`, `employee_id`, `previous_salary`, `present_salary`, `increment_salary`, `effected_date`, `created_at`, `updated_at`) VALUES
(7, 15, 1000, 1000, 0, '2020-09-01', '2020-10-23 22:39:25', '2020-10-23 22:39:25'),
(8, 16, 1000, 1000, 0, '2020-09-01', '2020-10-23 22:40:03', '2020-10-23 22:40:03'),
(9, 17, 1000, 1000, 0, '2020-09-01', '2020-10-23 22:43:58', '2020-10-23 22:43:58'),
(10, 15, 1000, 1200, 200, '2020-11-01', '2020-11-03 14:08:53', '2020-11-03 14:08:53'),
(11, 15, 1200, 1400, 200, '2020-12-01', '2020-11-03 14:09:56', '2020-11-03 14:09:56'),
(12, 27, 15000, 15000, 0, '2018-08-31', '2021-01-19 03:05:15', '2021-01-19 03:05:15');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `text` varchar(1000) NOT NULL,
  `image` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `user_id`, `title`, `text`, `image`, `date`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'First Event', 'Hello', '110243927_1362220900648024_6306563541515132525_n.jpg', '2021-01-19', 1, '2021-01-19 14:44:33', '2021-01-19 14:44:33'),
(2, 1, 'Test', 'Test only  Test only Test only Test only Test only Test only Test only Test only Test only Test only Test only Test only', 'com.png', '2021-02-02', 1, '2021-01-19 14:56:33', '2021-01-19 14:56:33');

-- --------------------------------------------------------

--
-- Table structure for table `exam_types`
--

CREATE TABLE `exam_types` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `exam_types`
--

INSERT INTO `exam_types` (`id`, `name`, `status`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, '1st Terminal Examination', 1, 1, NULL, '2020-07-24 01:51:59', '2020-07-24 01:51:59'),
(2, '2nd Terminal Examination', 1, 1, NULL, '2020-07-24 01:52:08', '2020-07-24 01:52:08'),
(3, 'Final Examination', 1, 1, NULL, '2020-07-24 01:52:21', '2020-07-24 01:52:21'),
(4, 'Monthly Test', 1, 1, NULL, '2021-01-19 02:57:12', '2021-01-19 02:57:12');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `fee_categories`
--

CREATE TABLE `fee_categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `fee_categories`
--

INSERT INTO `fee_categories` (`id`, `name`, `status`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 'Registration Fee', 1, 1, NULL, '2020-07-24 01:48:35', '2020-07-24 01:48:35'),
(2, 'Monthly Fee', 1, 1, NULL, '2020-07-24 01:48:50', '2020-07-24 01:48:50'),
(3, 'Exam Fee', 1, 1, NULL, '2020-07-24 01:49:01', '2020-07-24 01:49:01'),
(4, 'Month', 0, 1, NULL, '2021-01-19 02:42:19', '2021-01-19 02:42:19');

-- --------------------------------------------------------

--
-- Table structure for table `fee_category_amounts`
--

CREATE TABLE `fee_category_amounts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `class_id` int(11) NOT NULL,
  `fee_category_id` int(11) NOT NULL,
  `amount` double(8,2) NOT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `fee_category_amounts`
--

INSERT INTO `fee_category_amounts` (`id`, `class_id`, `fee_category_id`, `amount`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(37, 1, 1, 1000.00, 1, 1, '2020-08-11 02:27:33', '2020-08-11 02:27:33'),
(38, 2, 1, 1500.00, 1, 1, '2020-08-11 02:27:33', '2020-08-11 02:27:33'),
(39, 3, 1, 2000.00, 1, 1, '2020-08-11 02:27:33', '2020-08-11 02:27:33'),
(40, 4, 1, 2500.00, 1, 1, '2020-08-11 02:27:33', '2020-08-11 02:27:33'),
(41, 5, 1, 3000.00, 1, 1, '2020-08-11 02:27:33', '2020-08-11 02:27:33'),
(42, 1, 2, 200.00, 1, 1, '2020-11-03 13:26:43', '2020-11-03 13:26:52'),
(43, 2, 2, 200.00, 1, 1, '2020-11-03 13:26:43', '2020-11-03 13:26:52'),
(44, 3, 2, 300.00, 1, 1, '2020-11-03 13:26:43', '2020-11-03 13:26:52'),
(45, 4, 2, 300.00, 1, 1, '2020-11-03 13:26:43', '2020-11-03 13:26:52'),
(46, 5, 2, 500.00, 1, 1, '2020-11-03 13:26:43', '2020-11-03 13:26:52'),
(47, 1, 3, 200.00, 1, NULL, '2020-11-03 13:58:13', '2020-11-03 13:58:13'),
(48, 2, 3, 200.00, 1, NULL, '2020-11-03 13:58:13', '2020-11-03 13:58:13'),
(49, 3, 3, 300.00, 1, NULL, '2020-11-03 13:58:13', '2020-11-03 13:58:13'),
(50, 4, 3, 300.00, 1, NULL, '2020-11-03 13:58:13', '2020-11-03 13:58:13'),
(51, 5, 3, 500.00, 1, NULL, '2020-11-03 13:58:13', '2020-11-03 13:58:13');

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `name`, `status`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 'Science', 1, 1, NULL, '2020-07-24 01:47:25', '2020-07-24 01:47:25'),
(2, 'Arts', 1, 1, NULL, '2020-07-24 01:47:39', '2020-07-24 01:47:39'),
(3, 'Commerce', 1, 1, NULL, '2020-07-24 01:47:48', '2020-07-24 01:47:48'),
(4, 'Vocational', 1, 1, NULL, '2021-01-19 02:50:26', '2021-01-19 02:50:26'),
(5, 'Test', 1, 1, NULL, '2021-01-19 02:56:15', '2021-01-19 02:56:15');

-- --------------------------------------------------------

--
-- Table structure for table `home_pages`
--

CREATE TABLE `home_pages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `about` varchar(500) DEFAULT NULL,
  `welcome_text_title` varchar(255) DEFAULT NULL,
  `welcome_text` varchar(500) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `welcome_image` varchar(255) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `website` varchar(50) DEFAULT NULL,
  `address` varchar(150) DEFAULT NULL,
  `mobile` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `home_pages`
--

INSERT INTO `home_pages` (`id`, `user_id`, `about`, `welcome_text_title`, `welcome_text`, `logo`, `welcome_image`, `email`, `website`, `address`, `mobile`, `created_at`, `updated_at`) VALUES
(9, 1, NULL, 'Welcome to M. E. H. Arif College', NULL, '131988020_876511389764173_1050601064808007818_n (1).png', NULL, NULL, NULL, NULL, NULL, '2021-01-19 16:49:23', '2021-01-19 17:27:20'),
(10, 1, 'M. E. H. Arif College is a higher secondary school located at Konabari, Gazipur Sadar Upazila, Gazipur District, Bangladesh. It offers 7 years primary education, 5 years secondary education, and 2 years higher secondary education. It has about 4,000 students in this college', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2021-01-20 05:32:29', '2021-01-20 05:32:29'),
(11, 1, 'M. E. H. Arif College is a higher secondary school located at Konabari, Gazipur Sadar Upazila, Gazipur District, Bangladesh. It offers 7 years primary education, 5 years secondary education, and 2 years higher secondary education. It has about 4,000 students in this college', 'Welcome to M E H Arif College', 'Dear  colleger,\r\nYou are the person responsible for your happiness. we will only show the manner but we should do it. therefore, think about your life with care and knowledge. I know you’ll do very well in your life.\r\n\r\n\"A well-educated child, more valuable than more wealth\"', '131988020_876511389764173_1050601064808007818_n (1).png', NULL, 'arifcollege.info@gmail.com', 'www.arifcollege.info', 'Nilnagar, Konabari, Gazipur City, Gazipur', '01719 21 57 57', '2021-01-20 05:54:34', '2021-01-20 05:54:34'),
(12, 1, NULL, NULL, NULL, 'eau de parfum.png', NULL, NULL, NULL, NULL, NULL, '2021-01-20 08:44:37', '2021-01-20 08:44:37'),
(13, 1, NULL, NULL, NULL, 'Screenshot (379).png', NULL, NULL, NULL, NULL, NULL, '2021-01-20 08:45:38', '2021-01-20 08:45:38'),
(14, 1, NULL, NULL, NULL, '131988020_876511389764173_1050601064808007818_n (1).png', NULL, NULL, NULL, NULL, NULL, '2021-01-20 08:50:19', '2021-01-20 08:50:19');

-- --------------------------------------------------------

--
-- Table structure for table `leave_purposes`
--

CREATE TABLE `leave_purposes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `leave_purposes`
--

INSERT INTO `leave_purposes` (`id`, `name`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 'Family Problem', 1, 1, '2020-07-24 02:34:12', '2020-07-25 03:03:52'),
(2, 'Personal Problem', 1, 1, '2020-07-24 04:01:33', '2020-07-25 03:04:01'),
(4, 'Physical Problem', 1, NULL, '2020-11-03 14:11:13', '2020-11-03 14:11:13');

-- --------------------------------------------------------

--
-- Table structure for table `marks_grades`
--

CREATE TABLE `marks_grades` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `grade_name` varchar(255) NOT NULL,
  `grade_point` varchar(255) NOT NULL,
  `start_marks` varchar(255) NOT NULL,
  `end_marks` varchar(255) NOT NULL,
  `start_point` varchar(255) NOT NULL,
  `end_point` varchar(255) NOT NULL,
  `remarks` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `marks_grades`
--

INSERT INTO `marks_grades` (`id`, `grade_name`, `grade_point`, `start_marks`, `end_marks`, `start_point`, `end_point`, `remarks`, `created_at`, `updated_at`) VALUES
(1, 'A+', '5', '80', '99', '5', '5', 'Excellent', '2020-08-15 13:02:43', '2020-08-15 13:05:33'),
(2, 'A', '4', '70', '79', '4', '4.99', 'Very Good', '2020-08-15 13:06:42', '2020-08-15 13:06:42'),
(3, 'A-', '3.5', '60', '69', '3.5', '4', 'Good', '2020-08-15 13:07:21', '2020-08-15 13:07:21'),
(4, 'B', '3', '50', '59', '3', '3.49', 'Average', '2020-08-15 13:08:11', '2020-08-15 13:08:11'),
(5, 'C', '2', '40', '49', '2', '2.99', 'Disappoint', '2020-08-15 13:08:50', '2020-08-15 13:08:50'),
(6, 'D', '1', '33', '39', '1', '1.99', 'Bad', '2020-08-15 13:09:21', '2020-08-15 13:09:21'),
(7, 'F', '0', '00', '32', '0', '0.99', 'Fail', '2020-08-15 13:10:09', '2020-08-15 13:10:09'),
(8, 'y', '2.25', '55', '77', '77', '99', 'jhvb', '2021-01-19 03:13:34', '2021-01-19 03:13:34');

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
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2020_06_29_154735_create_student_classes_table', 1),
(5, '2020_06_29_172026_create_years_table', 1),
(6, '2020_06_29_175631_create_groups_table', 1),
(7, '2020_06_30_030524_create_shifts_table', 1),
(8, '2020_06_30_032444_create_fee_categories_table', 1),
(9, '2020_06_30_062418_create_fee_category_amounts_table', 1),
(10, '2020_07_01_042527_create_exam_types_table', 1),
(11, '2020_07_01_044523_create_subjects_table', 1),
(12, '2020_07_13_073320_create_assign_subjects_table', 1),
(13, '2020_07_13_094043_create_designations_table', 1),
(14, '2020_07_22_151054_create_schools_table', 1),
(15, '2020_07_22_154522_create_assign_students_table', 1),
(16, '2020_07_22_154540_create_discount_students_table', 1),
(17, '2020_07_23_134554_create_employee_salary_logs_table', 1),
(18, '2020_07_24_054152_create_leave_purposes_table', 1),
(19, '2020_07_24_054430_create_employee_leaves_table', 1),
(21, '2020_07_29_153136_create_employee_attendances_table', 2),
(22, '2020_08_09_143733_create_student_marks_table', 3),
(25, '2020_08_15_184417_create_marks_grades_table', 4),
(28, '2020_08_28_114733_create_account_student_fees_table', 5),
(29, '2020_08_28_173640_create_account_employee_salaries_table', 6),
(31, '2020_08_29_130927_create_account_other_costs_table', 7),
(32, '2021_01_17_095658_create_notices_table', 8),
(33, '2021_01_17_200252_create_home_pages_table', 9),
(34, '2021_01_17_213148_create_sliders_table', 10),
(35, '2021_01_18_163055_create_teachers_table', 11);

-- --------------------------------------------------------

--
-- Table structure for table `notices`
--

CREATE TABLE `notices` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` tinyint(4) NOT NULL,
  `notice_title` varchar(100) NOT NULL,
  `notice_file` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `notices`
--

INSERT INTO `notices` (`id`, `user_id`, `notice_title`, `notice_file`, `created_at`, `updated_at`) VALUES
(1, 1, 'Test', 'document.pdf', '2021-01-18 14:17:43', '2021-01-18 14:17:43'),
(2, 1, 'Test  1', 'document_2.pdf', '2021-01-18 14:18:30', '2021-01-18 14:18:30'),
(3, 1, 'Online Class', 'memberlist.pdf', '2021-01-19 03:14:30', '2021-01-19 03:14:30'),
(4, 1, 'একাদশ ও দ্বাদশ শ্রেণির অনলাইন ক্লাস পরীক্ষার রুটিন', 'Online-Exam-Rotine-2.pdf', '2021-01-20 04:31:47', '2021-01-20 04:31:47');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `schools`
--

CREATE TABLE `schools` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1 COMMENT '0=inactive,1=active',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `schools`
--

INSERT INTO `schools` (`id`, `name`, `address`, `phone`, `mobile`, `email`, `website`, `image`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Alia Begum Modern School', 'Kushtia Sadar, Kushtia-7000', '01718017757', '01713060135', 'aliabegum@gmail.com', 'https:\\\\www.aliabegum.com', '202007240745202007201451school.png', 1, '2020-07-24 01:45:17', '2020-07-24 01:45:17');

-- --------------------------------------------------------

--
-- Table structure for table `shifts`
--

CREATE TABLE `shifts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `shifts`
--

INSERT INTO `shifts` (`id`, `name`, `status`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 'A Shift', 1, 1, NULL, '2020-07-24 01:48:06', '2020-07-24 01:48:06'),
(2, 'B Shift', 1, 1, NULL, '2020-07-24 01:48:18', '2020-07-24 01:48:18'),
(3, 'C Shift', 1, 1, NULL, '2021-01-19 02:51:21', '2021-01-19 02:51:21'),
(4, 'D Shift', 1, 1, NULL, '2021-01-19 02:56:34', '2021-01-19 02:56:34');

-- --------------------------------------------------------

--
-- Table structure for table `sliders`
--

CREATE TABLE `sliders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `slider_text` varchar(255) DEFAULT NULL,
  `slider_image` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sliders`
--

INSERT INTO `sliders` (`id`, `user_id`, `slider_text`, `slider_image`, `created_at`, `updated_at`) VALUES
(8, 1, 'Science Fair 2020', 'Screenshot (377).png', '2021-01-20 05:27:49', '2021-01-20 05:27:49');

-- --------------------------------------------------------

--
-- Table structure for table `student_classes`
--

CREATE TABLE `student_classes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `student_classes`
--

INSERT INTO `student_classes` (`id`, `name`, `status`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 'One', 1, 1, NULL, '2020-07-24 01:46:00', '2020-07-24 01:46:00'),
(2, 'Two', 1, 1, NULL, '2020-07-24 01:46:11', '2020-07-24 01:46:11'),
(3, 'Three', 1, 1, NULL, '2020-07-24 01:46:24', '2020-07-24 01:46:24'),
(4, 'Four', 1, 1, NULL, '2020-07-24 01:46:36', '2020-07-24 01:46:36'),
(5, 'Five', 1, 1, NULL, '2020-07-24 01:46:45', '2020-07-24 01:46:45'),
(6, 'Sixe', 1, 1, NULL, '2020-11-03 13:54:49', '2020-11-03 13:54:49'),
(7, 'Ten', 1, 1, NULL, '2020-11-06 05:09:51', '2020-11-06 05:09:51'),
(8, 'test', 1, 1, NULL, '2021-01-19 02:48:06', '2021-01-19 02:48:06'),
(9, 'test2', 1, 1, NULL, '2021-01-19 02:51:39', '2021-01-19 02:51:39');

-- --------------------------------------------------------

--
-- Table structure for table `student_marks`
--

CREATE TABLE `student_marks` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `student_id` int(11) NOT NULL COMMENT 'student_id=user_id',
  `id_no` varchar(255) DEFAULT NULL,
  `shift_id` tinyint(10) DEFAULT NULL,
  `year_id` int(11) DEFAULT NULL,
  `class_id` int(11) DEFAULT NULL,
  `assign_subject_id` int(11) DEFAULT NULL,
  `exam_type_id` int(11) DEFAULT NULL,
  `marks` double DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `student_marks`
--

INSERT INTO `student_marks` (`id`, `student_id`, `id_no`, `shift_id`, `year_id`, `class_id`, `assign_subject_id`, `exam_type_id`, `marks`, `created_at`, `updated_at`) VALUES
(42, 19, '20200015', 1, 2, 1, 1, 1, 85, '2021-01-15 12:06:49', '2021-01-15 12:08:42'),
(41, 13, '20200013', 1, 2, 1, 1, 1, 80, '2021-01-15 12:06:49', '2021-01-15 12:08:42'),
(40, 12, '20200001', 1, 2, 1, 1, 1, 70, '2021-01-15 12:06:49', '2021-01-15 12:09:03');

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE `subjects` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`id`, `name`, `status`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 'Bangla', 1, 1, NULL, '2020-07-24 01:53:48', '2020-07-24 01:53:48'),
(2, 'English', 1, 1, NULL, '2020-07-24 01:53:58', '2020-07-24 01:53:58'),
(3, 'Mathematics', 1, 1, NULL, '2020-07-24 01:54:08', '2020-07-24 01:54:08'),
(4, 'Islam & Moral Studies', 1, 1, 1, '2020-07-24 01:54:35', '2020-11-06 05:11:57'),
(5, 'Physics', 1, 1, NULL, '2020-11-06 05:11:31', '2020-11-06 05:11:31'),
(6, 'Chemistry', 1, 1, NULL, '2020-11-06 05:12:23', '2020-11-06 05:12:23'),
(7, 'Biology', 1, 1, NULL, '2020-11-06 05:12:36', '2020-11-06 05:12:36'),
(8, 'Higher Math', 1, 1, NULL, '2020-11-06 05:12:49', '2020-11-06 05:12:49'),
(9, 'Bangladesh & Global Studies', 1, 1, NULL, '2020-11-06 05:13:41', '2020-11-06 05:13:41'),
(10, 'ICT', 1, 1, NULL, '2021-01-19 02:57:30', '2021-01-19 02:57:30'),
(11, 'Management', 1, 1, NULL, '2021-01-20 04:10:16', '2021-01-20 04:10:16'),
(12, 'Accounting', 1, 1, NULL, '2021-01-20 04:19:19', '2021-01-20 04:19:19');

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

CREATE TABLE `teachers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL COMMENT 'who create',
  `name` varchar(255) NOT NULL,
  `designation` tinyint(4) NOT NULL,
  `subject` tinyint(4) DEFAULT NULL,
  `qualification` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `image` varchar(255) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `teachers`
--

INSERT INTO `teachers` (`id`, `user_id`, `name`, `designation`, `subject`, `qualification`, `address`, `mobile`, `image`, `status`, `created_at`, `updated_at`) VALUES
(7, 1, 'MEH ARIF', 1, 6, NULL, NULL, '01715506860', 'arif-284x450.jpg', 1, '2021-01-20 04:00:19', '2021-01-20 04:00:19'),
(8, 1, 'NAZRUL ISLAM', 2, 1, NULL, NULL, '01719215757', 'nazrul-284x450.jpg', 1, '2021-01-20 04:02:26', '2021-01-20 04:02:26'),
(9, 1, 'MONIRUZZAMAN BHUIYAN', 2, 2, NULL, NULL, '01912069024', 'bhuiyan-284x360.jpg', 1, '2021-01-20 04:03:51', '2021-01-20 04:03:51'),
(10, 1, 'MD. ZAKIR HOSSANIN', 2, 2, NULL, NULL, '01715527993', 'zakir-eng-1-284x450.jpg', 1, '2021-01-20 04:05:35', '2021-01-20 04:05:35'),
(11, 1, 'MD. OSMAN GONI', 2, 3, NULL, NULL, '01916258494', 'goni-284x450.jpg', 1, '2021-01-20 04:06:39', '2021-01-20 04:06:39'),
(12, 1, 'MD. FARUK AHMED', 3, 7, NULL, NULL, '01715800543', 'faruk-284x450.jpg', 1, '2021-01-20 04:07:34', '2021-01-20 04:07:34'),
(13, 1, 'MD. ANAMUL HAQUE', 3, 11, NULL, NULL, '01736670823', 'anamul-284x450.jpg', 1, '2021-01-20 04:11:17', '2021-01-20 04:11:17'),
(14, 1, 'MD. ZAKIR HOSSANIN', 3, 3, NULL, NULL, '01678305227', 'zakir-math-284x450.jpg', 1, '2021-01-20 04:12:13', '2021-01-20 04:12:13'),
(15, 1, 'ABDUS SATTER', 3, 10, NULL, NULL, '01912343530', '66312_163608173668030_915515_n-284x450.jpg', 1, '2021-01-20 04:13:18', '2021-01-20 04:13:18'),
(16, 1, 'MD. NURUJJAMAN', 3, 5, NULL, NULL, '01911717055', 'jaman-284x360.jpg', 1, '2021-01-20 04:14:08', '2021-01-20 04:14:08'),
(17, 1, 'MD. JAHANGIR ALAM KHAN', 3, 6, NULL, NULL, '01710402332', 'jahangir-284x450.jpg', 1, '2021-01-20 04:15:10', '2021-01-20 04:15:10'),
(18, 1, 'ARIF ROBBANY', 3, 6, NULL, NULL, '01911613008', 'robbany-284x450.jpg', 1, '2021-01-20 04:16:35', '2021-01-20 04:16:35'),
(19, 1, 'ABDUL KUDDUS MONJU', 3, 7, NULL, NULL, '01840122480', 'akmonju-284x450.jpg', 1, '2021-01-20 04:17:26', '2021-01-20 04:17:26'),
(20, 1, 'HABIBUR RAHMAN', 3, 5, NULL, NULL, '01710067006', 'Habib_Sir-284x450.jpg', 1, '2021-01-20 04:18:50', '2021-01-20 04:18:50'),
(21, 1, 'MD SHAKHAWAT ULLAH', 3, 12, NULL, NULL, '01920655998', 'Mahdi-284x450.jpg', 1, '2021-01-20 04:20:07', '2021-01-20 04:20:07'),
(22, 1, 'MD. ZOBAIR HOSSAIN', 3, 1, NULL, NULL, '01775133850', 'Jubayer-284x450.jpg', 1, '2021-01-20 04:21:33', '2021-01-20 04:21:33'),
(23, 1, 'ZAHIDUL HOQUE', 3, 9, NULL, NULL, '01767134931', 'jahid-284x370.jpg', 1, '2021-01-20 04:22:39', '2021-01-20 04:22:39'),
(24, 1, 'MAHBUB HASAN', 3, 12, NULL, NULL, '01516156163', 'mahbub-284x450.jpg', 1, '2021-01-20 04:24:14', '2021-01-20 04:24:14'),
(25, 1, 'MD. REAZ UDDIN MOLLA', 3, 11, NULL, NULL, '01946929115', '580b1cdcf2b4d.jpg', 1, '2021-01-20 04:25:24', '2021-01-20 04:25:24'),
(26, 1, 'SUVRATA SAHA', 3, 10, NULL, NULL, '01862203479', '5811ca579845b-1.jpg', 1, '2021-01-20 04:26:04', '2021-01-20 04:26:04'),
(27, 1, 'MD. A. RAHAMAN', 3, 11, NULL, NULL, '01719212823', 'rahman-284x360.jpg', 1, '2021-01-20 04:27:33', '2021-01-20 04:27:33'),
(28, 1, 'MD. MOBAROQUE HOSSAIN', 3, 6, NULL, NULL, '01819016760', 'mobaroque-3-284x450.jpg', 1, '2021-01-20 04:28:20', '2021-01-20 04:28:20'),
(29, 1, 'MD. TOHIDUL ISLAM', 3, 5, NULL, NULL, '01727213704', 'Touhidul-1.jpg', 1, '2021-01-20 04:29:04', '2021-01-20 04:29:04'),
(30, 1, 'KANIJ FATAMA', 3, 1, NULL, NULL, '01995592068', 'kanij.jpg', 1, '2021-01-20 04:29:44', '2021-01-20 04:29:44');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `usertype` varchar(255) DEFAULT NULL COMMENT 'student,employee,admin',
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `fname` varchar(255) DEFAULT NULL,
  `mname` varchar(255) DEFAULT NULL,
  `religion` varchar(255) DEFAULT NULL,
  `id_no` varchar(255) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL COMMENT 'admin=head of software,operator=computer operator,user=employee',
  `join_date` date DEFAULT NULL,
  `designation_id` int(11) DEFAULT NULL,
  `salary` double DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1 COMMENT '0=inactive,1=active',
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `usertype`, `name`, `email`, `email_verified_at`, `password`, `mobile`, `address`, `gender`, `image`, `fname`, `mname`, `religion`, `id_no`, `dob`, `code`, `role`, `join_date`, `designation_id`, `salary`, `status`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'Md. Asadullah Galib', 'root@iglweb.com', NULL, '$2y$12$ibaofZiMmitP/bjHGW3mcuMP5CRWq8aRyk8xFzN80gyeS0ngfifji', '01928511049', 'Uttar-badda, dhaka', 'Male', '202101192357france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg', NULL, NULL, NULL, NULL, NULL, NULL, 'admin', NULL, NULL, NULL, 1, NULL, '2020-07-23 18:00:00', '2021-01-19 17:57:19'),
(12, 'student', 'Sayem', NULL, NULL, '$2y$10$16.bSmWvEJvUJlwi4xzV/eHCYDrVyNTRp7ewKuczTK4jfoHwQ/qwe', '01718017757', 'Uttar-badda, dhaka', 'male', '2020101917292f79fc577e20f45331ae3b8d88a1ce6d.jpg', 'Abdul Korim', 'Fatima', 'islam', '20200001', '2020-10-19', '3828', NULL, NULL, NULL, NULL, 1, NULL, '2020-10-19 11:29:49', '2020-10-19 11:29:49'),
(13, 'student', 'Rahim', NULL, NULL, '$2y$10$6yH.bXSmZL/7cmi1M0olmuPAMcVL3zfIuF5DSCfB7X6g8HcJDYPie', '01718017757', 'Uttar-badda, dhaka', 'male', '2020101917302f79fc577e20f45331ae3b8d88a1ce6d.jpg', 'Abdul Korim', 'Fatima', 'islam', '20200013', '2020-10-19', '5932', NULL, NULL, NULL, NULL, 1, NULL, '2020-10-19 11:30:53', '2020-10-19 11:30:53'),
(14, 'student', 'Halima', NULL, NULL, '$2y$10$2tv160KTk.8SlMMDM6hmSeURmbFwzmYa6S5DjuY..CFV0i05JJBf2', '01718017757', 'Uttar-badda, dhaka', 'male', '2020101917317d4d3c8f55b9fa506f93452ff66ab808.jpg', 'Abdul Korim', 'Fatima', 'islam', '20200014', '2020-10-19', '9875', NULL, NULL, NULL, NULL, 1, NULL, '2020-10-19 11:31:48', '2020-10-19 11:31:48'),
(15, 'employee', 'Akash', 'akash@gmail.com', NULL, '$2y$10$1bqH4qDgiKsEy.km2ahatuXXv8uDabH1sKCwJnebfPDIZyjjI7ox6', '01718017757', 'Uttar-badda, dhaka', 'male', '2020102404390236f471120f1d74620e9bbaef765a0b.jpg', 'Jamil', 'Rahima', 'islam', '2020090001', '2020-10-15', '6828', NULL, '2020-09-01', 3, 1400, 1, NULL, '2020-10-23 22:39:24', '2020-11-03 14:09:56'),
(16, 'employee', 'Subhan', 'subhan@gmail.com', NULL, '$2y$10$RmHVGI8KsFWFacK81EVMtu10MSbIkvM2Vnut6OjRkHyQcDI/llBne', '01718017757', 'Uttar-badda, dhaka', 'male', '202010240640bdc0a60c918845b657d6d3ef5fbd146c.jpg', 'Abdul Kader', 'Jamila', 'islam', '2020090016', '2020-10-15', '5161', NULL, '2020-09-01', 3, 1000, 1, NULL, '2020-10-23 22:40:03', '2020-10-24 00:40:51'),
(17, 'employee', 'Rahman', 'rahman@gmail.com', NULL, '$2y$10$66nXO9b9glq0/3gVq3hB8un2kAVe9uK8BKe8hfj9Bd2C.9SxWKZAq', '01718017757', 'Uttar-badda, dhaka', 'male', '202010240641ac1dc06d1fda59591e1294247e2a05bb.jpg', 'Md. Abdul Korim', 'Khaleda begum', 'islam', '2020090017', '2020-10-15', '2646', NULL, '2020-09-01', 3, 1000, 1, NULL, '2020-10-23 22:43:58', '2020-10-24 00:41:06'),
(18, 'admin', 'Sayem', 'sayem@gmail.com', NULL, '$2y$12$ibaofZiMmitP/bjHGW3mcuMP5CRWq8aRyk8xFzN80gyeS0ngfifji', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '6249', 'admin', NULL, NULL, NULL, 1, NULL, '2020-11-03 13:23:12', '2020-11-03 13:23:12'),
(19, 'student', 'Dara Stevens', 'zecowamy@mailinator.com', NULL, '$2y$10$deMtVUP98PD/1Xw6459u9Oj.4uvYZCbJkXe3m7pGcLrvamjeqbBMe', 'Pariatur Irure reic', 'Error assumenda non', 'female', NULL, 'Lacota Neal', 'Stacy Edwards', 'christian', '20200015', '1973-07-01', '7546', NULL, NULL, NULL, NULL, 1, NULL, '2021-01-13 10:45:14', '2021-01-13 10:45:14'),
(20, 'student', 'Skyler Allison', 'dyfy@mailinator.com', NULL, '$2y$10$eMH.zi61ej6pF0r5opigxeIxLbSxxnbMBGOOmA2jEnsApSd6jj9oO', 'Distinctio Quo cons', 'Harum dolor ipsum m', 'male', 'deCqqf6a1Q5c2IBKtBhapng', 'Martina Parker', 'Rebekah Mullins', 'buddhist', '20190020', '1986-10-15', '4484', NULL, NULL, NULL, NULL, 1, NULL, '2021-01-13 11:45:35', '2021-01-13 11:45:35'),
(21, 'student', 'Rhonda Oneill', 'luxis@mailinator.com', NULL, '$2y$10$SbB6j9ZI4N/zPt2wYHIDjeLm5CCAbcrBYJfGHcvqr5IN.lX.187G.', 'Distinctio Nisi bea', 'Soluta ratione nobis', 'male', 'gMmfRKBjyHu3pIcNrMXsjpg', 'Lyle Norton', 'Vielka Powell', 'atheist', '20190021', '1985-10-13', '6187', NULL, NULL, NULL, NULL, 0, NULL, '2021-01-17 17:49:09', '2021-01-17 17:49:09'),
(22, 'student', 'Lester Hunter', 'fyson@mailinator.com', NULL, '$2y$10$YLaZOCZoLrcTJDUsE9man.m9kB6XNblWiRAH3Ra9uU1PJ9N.8K45u', 'Excepteur anim volup', 'Saepe irure ullam el', 'female', 'wB5vItiqoOsu8ZvlNc1Ejpg', 'Whitney Calderon', 'Akeem Calderon', 'hindu', '20200022', '2015-03-15', '958', NULL, NULL, NULL, NULL, 0, NULL, '2021-01-17 17:54:06', '2021-01-17 17:54:06'),
(23, 'student', 'Victor Sullivan', 'viluhima@mailinator.com', NULL, '$2y$10$CHhP00s8CXaBE0qckETi4OgAg68oh3tldN6spyV33/2EdxoJGEB2i', 'Quis voluptates sed', 'Cupidatat ipsa nisi', 'female', 'R5t9wQc2b1aTitVjtjzajpg', 'Samantha Dominguez', 'Yvonne Patterson', 'christian', '20200023', '1975-08-09', '6342', NULL, NULL, NULL, NULL, 0, NULL, '2021-01-17 17:57:37', '2021-01-17 17:57:37'),
(24, 'student', 'Janna Glass', 'kequk@mailinator.com', NULL, '$2y$10$u0K5T7i8CY9ACaeN.YFGHOwbJ108VWVOTu/L830TDuRovcsMgYucW', 'Nulla eiusmod velit', 'Quas minim quo deser', 'female', 'pUQozisyaJxdS2gq7WA2jpg', 'Chester Hartman', 'Joel Hopkins', 'christian', '20200024', '2000-04-16', '8195', NULL, NULL, NULL, NULL, 0, NULL, '2021-01-18 02:50:45', '2021-01-18 02:50:45'),
(25, 'student', 'Nahid Al Islam', 'demo08@gmail.com', NULL, '$2y$10$I8tQvipFZaGMyMSeiAPm0.lKdWN0qHfDzvB7FLiu11QbdSIBNUz4e', '02866677', 'Gazipur', 'male', 'OxTolaT2KEzXCT9LtdzEjpg', 'Abdul Makek', 'Farjana khatun', 'islam', '20200025', '2021-01-21', '6957', NULL, NULL, NULL, NULL, 1, NULL, '2021-01-18 19:48:10', '2021-01-18 19:49:21'),
(26, 'student', 'nayon', 'demo@gmail.com', NULL, '$2y$10$4ujqatY.uONeQFU0YMNZ7emScXHlaMG9fGCQhSApo.Xt8ziF6GuHO', '678987', 'gazipur', 'male', 'YymU1lW4PTffOwQQuFvYpng', 'Aziz', 'rr', 'islam', '20210026', '2000-02-03', '8118', NULL, NULL, NULL, NULL, 1, NULL, '2021-01-19 03:01:07', '2021-01-19 03:01:07'),
(27, 'employee', 'Arif', 'demo9@gmail.com', NULL, '$2y$10$CcNbOooRfCbzqflYLi0TJO2yB.Zc1iwKBpjzQySM8tgwCW09gASPC', '6789009', 'ccc', 'male', '202101190905nid.png', 'aa', 'bb', 'islam', '2018080018', '1998-03-31', '4796', NULL, '2018-08-31', 4, 15000, 1, NULL, '2021-01-19 03:05:15', '2021-01-19 03:05:15'),
(28, 'student', 'Rabbi', 'demo976@gmail.com', NULL, '$2y$10$x60Iy4lnSyo63YrsVmx4keqzUQBR8FEvUJcC3Mcb/N/ypoRctOyUW', '678900909876', 'gazipur', 'male', 'djwuuUYViYpODqRovu8Kjpg', 'RR', 'RR', 'islam', '20210027', '2005-05-06', '8539', NULL, NULL, NULL, NULL, 0, NULL, '2021-01-19 03:19:46', '2021-01-19 03:19:46'),
(29, 'admin', 'Smais Shawon', 'smaisshawon@gmail.com', NULL, '$2y$10$9.9ITsCn2TtgFsQx/yGpvOy4HdAHapn6Lncn1JU9sszQ55WYFqHVe', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2626', 'admin', NULL, NULL, NULL, 1, NULL, '2021-01-20 09:01:46', '2021-01-20 09:01:46');

-- --------------------------------------------------------

--
-- Table structure for table `years`
--

CREATE TABLE `years` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `years`
--

INSERT INTO `years` (`id`, `name`, `status`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, '2019', 1, 1, NULL, '2020-07-24 01:46:58', '2020-07-24 01:46:58'),
(2, '2020', 1, 1, NULL, '2020-07-24 01:47:09', '2020-07-24 01:47:09'),
(3, '2021', 1, 1, NULL, '2021-01-19 02:49:24', '2021-01-19 02:49:24');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account_employee_salaries`
--
ALTER TABLE `account_employee_salaries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `account_other_costs`
--
ALTER TABLE `account_other_costs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `account_student_fees`
--
ALTER TABLE `account_student_fees`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `assign_students`
--
ALTER TABLE `assign_students`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `assign_subjects`
--
ALTER TABLE `assign_subjects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `designations`
--
ALTER TABLE `designations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `discount_students`
--
ALTER TABLE `discount_students`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employee_attendances`
--
ALTER TABLE `employee_attendances`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employee_leaves`
--
ALTER TABLE `employee_leaves`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employee_salary_logs`
--
ALTER TABLE `employee_salary_logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `exam_types`
--
ALTER TABLE `exam_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fee_categories`
--
ALTER TABLE `fee_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fee_category_amounts`
--
ALTER TABLE `fee_category_amounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `home_pages`
--
ALTER TABLE `home_pages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `leave_purposes`
--
ALTER TABLE `leave_purposes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `marks_grades`
--
ALTER TABLE `marks_grades`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notices`
--
ALTER TABLE `notices`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `schools`
--
ALTER TABLE `schools`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shifts`
--
ALTER TABLE `shifts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sliders`
--
ALTER TABLE `sliders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student_classes`
--
ALTER TABLE `student_classes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student_marks`
--
ALTER TABLE `student_marks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `years`
--
ALTER TABLE `years`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account_employee_salaries`
--
ALTER TABLE `account_employee_salaries`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `account_other_costs`
--
ALTER TABLE `account_other_costs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `account_student_fees`
--
ALTER TABLE `account_student_fees`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `assign_students`
--
ALTER TABLE `assign_students`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `assign_subjects`
--
ALTER TABLE `assign_subjects`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `designations`
--
ALTER TABLE `designations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `discount_students`
--
ALTER TABLE `discount_students`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `employee_attendances`
--
ALTER TABLE `employee_attendances`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `employee_leaves`
--
ALTER TABLE `employee_leaves`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `employee_salary_logs`
--
ALTER TABLE `employee_salary_logs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `exam_types`
--
ALTER TABLE `exam_types`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `fee_categories`
--
ALTER TABLE `fee_categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `fee_category_amounts`
--
ALTER TABLE `fee_category_amounts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `home_pages`
--
ALTER TABLE `home_pages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `leave_purposes`
--
ALTER TABLE `leave_purposes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `marks_grades`
--
ALTER TABLE `marks_grades`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `notices`
--
ALTER TABLE `notices`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `schools`
--
ALTER TABLE `schools`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `shifts`
--
ALTER TABLE `shifts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `sliders`
--
ALTER TABLE `sliders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `student_classes`
--
ALTER TABLE `student_classes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `student_marks`
--
ALTER TABLE `student_marks`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `subjects`
--
ALTER TABLE `subjects`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `teachers`
--
ALTER TABLE `teachers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `years`
--
ALTER TABLE `years`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

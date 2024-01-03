-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 27, 2023 at 05:08 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `plsres`
--
CREATE DATABASE IF NOT EXISTS `plsres` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `plsres`;

-- --------------------------------------------------------

--
-- Table structure for table `announcements`
--

CREATE TABLE `announcements` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `date` datetime NOT NULL,
  `content_link` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `charbon`
--

CREATE TABLE `charbon` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL,
  `datetime` datetime NOT NULL,
  `duration` time DEFAULT NULL,
  `course_id` varchar(4) NOT NULL,
  `replay_link` varchar(100) DEFAULT NULL,
  `resources_link` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `charbon`
--

INSERT INTO `charbon` (`id`, `title`, `description`, `datetime`, `duration`, `course_id`, `replay_link`, `resources_link`) VALUES
(1, 'Premier charbon de l\'histoire', 'On fait le premier charbon de l\'histoire', '2023-12-01 10:39:00', NULL, 'PS22', NULL, NULL),
(2, 'AAP 4, 5 et 6 de PM1 !', 'On prépare le CC2 de PM en révisant les AAP 4, 5 et 6. Nous utiliserons l\'ECA du CC2 en distanciel A22, alors jetez-y un coup d\'oeil !', '2023-12-16 13:54:57', NULL, 'PM1', 'https://youtube.com', NULL),
(3, 'Révision pour le final d\'EL22', 'On révise toutes les notions depuis le début de l\'année', '2023-12-29 20:15:57', NULL, 'EL22', 'https://youtube.com', NULL),
(4, 'Révisions pour le médian de PS2', 'On revoit les coordonnées cartésiennes et polaires', '2023-11-13 18:15:57', '02:07:57', 'PS2', 'http://youtube.com', NULL),
(5, 'Chapitres 3 et 4', 'On fait des exercices sur l\'algèbre linéaire et les fonctions à 2 variables', '2023-11-02 20:00:00', '02:42:12', 'MT2', 'http://youtube.com', NULL),
(8, 'test', 'test', '2020-12-12 12:12:12', NULL, 'MT3', 'https://youtube.com', NULL),
(16, 'Revisions final', 'On revise toutes les notions vues depuis le debut de l\'annee', '2018-04-26 06:22:22', NULL, 'PS25', 'https://youtube.com', NULL),
(22, 'Révisions BDD', 'On revoit les BDD', '2023-12-14 19:00:00', NULL, 'IF3A', NULL, NULL),
(23, 'Test2', 'Uwu', '2023-12-13 18:52:00', NULL, 'EL22', NULL, NULL),
(24, 'Test2', 'Uwu', '2023-12-13 18:52:00', NULL, 'PS22', NULL, NULL),
(25, 'uwu', 'kaka', '2023-12-22 21:28:00', NULL, 'PS25', NULL, NULL),
(26, 'Suua', '', '2023-12-22 21:28:00', NULL, 'IF1', NULL, NULL),
(27, 'Révisions PHP', 'On revoit ensemble la connexion aux bases de données', '2023-12-20 11:47:00', NULL, 'IF3A', NULL, NULL),
(28, 'Révisions PHP', 'On revoit ensemble la connexion aux bases de données', '2023-12-20 11:47:00', NULL, 'IF3A', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `charbon_host`
--

CREATE TABLE `charbon_host` (
  `charbon_id` int(11) NOT NULL,
  `actionneur_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `charbon_host`
--

INSERT INTO `charbon_host` (`charbon_id`, `actionneur_id`) VALUES
(1, 1),
(1, 2),
(8, 1),
(8, 2),
(16, 1),
(16, 2),
(22, 1),
(22, 2),
(23, 1),
(23, 2),
(24, 1),
(24, 2),
(25, 1),
(25, 2),
(26, 1),
(27, 1),
(27, 2),
(28, 1),
(28, 2);

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `id` varchar(4) NOT NULL,
  `type_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`id`, `type_id`) VALUES
('PS2', 1),
('PS25', 1),
('PS27', 1),
('IF1', 2),
('IF2', 2),
('IF3A', 2),
('IF3B', 2),
('LO21', 2),
('LP25', 2),
('LP2A', 2),
('LP2B', 2),
('EL21', 3),
('EL22', 3),
('PS1', 3),
('PS22', 3),
('MT1', 4),
('MT2', 4),
('MT28', 4),
('MT3', 4),
('PM1', 4),
('SQ20', 4);

-- --------------------------------------------------------

--
-- Table structure for table `course_type`
--

CREATE TABLE `course_type` (
  `id` int(11) NOT NULL,
  `type` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course_type`
--

INSERT INTO `course_type` (`id`, `type`) VALUES
(3, 'elec'),
(2, 'info'),
(4, 'maths'),
(1, 'meca');

-- --------------------------------------------------------

--
-- Table structure for table `exercise`
--

CREATE TABLE `exercise` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `difficulty` int(1) NOT NULL,
  `is_corrected` tinyint(1) NOT NULL,
  `source` varchar(100) NOT NULL,
  `topic_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `exercise`
--

INSERT INTO `exercise` (`id`, `title`, `difficulty`, `is_corrected`, `source`, `topic_id`) VALUES
(1, 'Parcours d\'un BST', 3, 1, 'Tyuvetou', 1),
(2, 'Parcours d\'une liste chainée', 2, 0, 'Wiqiro', 2),
(3, 'Inversion d\'une liste chainée', 3, 0, 'Wiqiro', 2),
(4, 'Parcours d\'un graphe', 4, 1, 'Trytoon', 3),
(7, 'Test exercise', 1, 0, 'Source', 1),
(8, 'TestExercise', 5, 0, 'William', 2),
(9, 'Un cas assez particulier', 4, 0, 'Tatouille', 8),
(10, 'dfg', 4, 0, 'po', 5),
(11, 'Test', 4, 0, 'William', 6);

-- --------------------------------------------------------

--
-- Table structure for table `exercise_topic`
--

CREATE TABLE `exercise_topic` (
  `id` int(11) NOT NULL,
  `topic` varchar(100) NOT NULL,
  `course_id` varchar(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `exercise_topic`
--

INSERT INTO `exercise_topic` (`id`, `topic`, `course_id`) VALUES
(1, 'Arbres binaires', 'LO21'),
(2, 'Listes chaînées', 'LO21'),
(3, 'Graphes', 'LO21'),
(4, 'Coordonnées polaires', 'PS2'),
(5, 'Coordonnées intrinsèques', 'PS2'),
(6, 'Nombres complexes', 'MT1'),
(7, 'Fonctions à deux variables', 'MT2'),
(8, 'Equivalence Thevenin-Norton', 'PS1');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(100) NOT NULL,
  `actionneur` tinyint(1) NOT NULL DEFAULT 0,
  `admin` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password_hash`, `actionneur`, `admin`) VALUES
(1, 'William', 'william.imbert@utbm.fr', '$2y$10$MyDpbLIZhLScjJxDH7GKGu.Y/G5XhznRq0hozGgmFZ7SI0Pj9TTk.', 1, 1),
(2, 'Tyuvetou', 'gregori.machin@utbm.fr', 'UWU', 1, 1),
(12, 'Michel', 'michel@utbm.fr', '$2y$10$3MxqdrWuezokz1IcZLr1DOgy5hCLHXvmSXV/Xi/q37XorxK/AvEpm', 0, 0),
(17, 'Robert', 'robert@utbm.fr', '$2y$10$OVp11374Sw2bQKs6ebfeTe26TDP.FA.60iz0JkL3oft1mR2OP4IFu', 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `announcements`
--
ALTER TABLE `announcements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `charbon`
--
ALTER TABLE `charbon`
  ADD PRIMARY KEY (`id`),
  ADD KEY `course_id` (`course_id`);

--
-- Indexes for table `charbon_host`
--
ALTER TABLE `charbon_host`
  ADD PRIMARY KEY (`charbon_id`,`actionneur_id`),
  ADD KEY `actionneur_id` (`actionneur_id`);

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`id`),
  ADD KEY `type_id` (`type_id`);

--
-- Indexes for table `course_type`
--
ALTER TABLE `course_type`
  ADD PRIMARY KEY (`id`),
  ADD KEY `type` (`type`);

--
-- Indexes for table `exercise`
--
ALTER TABLE `exercise`
  ADD PRIMARY KEY (`id`),
  ADD KEY `topic_id` (`topic_id`);

--
-- Indexes for table `exercise_topic`
--
ALTER TABLE `exercise_topic`
  ADD PRIMARY KEY (`id`),
  ADD KEY `course_id` (`course_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `announcements`
--
ALTER TABLE `announcements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `charbon`
--
ALTER TABLE `charbon`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `course_type`
--
ALTER TABLE `course_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `exercise`
--
ALTER TABLE `exercise`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `exercise_topic`
--
ALTER TABLE `exercise_topic`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `charbon`
--
ALTER TABLE `charbon`
  ADD CONSTRAINT `charbon_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`);

--
-- Constraints for table `charbon_host`
--
ALTER TABLE `charbon_host`
  ADD CONSTRAINT `charbon_host_ibfk_1` FOREIGN KEY (`charbon_id`) REFERENCES `charbon` (`id`),
  ADD CONSTRAINT `charbon_host_ibfk_2` FOREIGN KEY (`actionneur_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `course`
--
ALTER TABLE `course`
  ADD CONSTRAINT `course_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `course_type` (`id`);

--
-- Constraints for table `exercise`
--
ALTER TABLE `exercise`
  ADD CONSTRAINT `exercise_ibfk_1` FOREIGN KEY (`topic_id`) REFERENCES `exercise_topic` (`id`);

--
-- Constraints for table `exercise_topic`
--
ALTER TABLE `exercise_topic`
  ADD CONSTRAINT `exercise_topic_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

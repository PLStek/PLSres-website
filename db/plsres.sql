-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 11, 2024 at 10:44 PM
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
-- Table structure for table `announcement`
--

CREATE TABLE `announcement` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `date` datetime NOT NULL,
  `content` varchar(5000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `announcement`
--

INSERT INTO `announcement` (`id`, `title`, `date`, `content`) VALUES
(1, 'Nouveau semestre et reprise !', '2023-09-04 10:13:19', '<h5>Bonjour à toutes et à tous !</h5> <br>\r\n\r\n\r\n            C\'est l\'heure ! <br><br>\r\n\r\n            Envie de traverser l\'océan pour remplir ton CV tout blanc ? <br>\r\n            Envie de t\'ouvrir à d\'autres domaines parce que t\'en as assez de l\'espace Schengen ?\r\n            <br>\r\n            Envie de doubler ton diplôme pour viser mieux qu\'un toit de chaume ? <br><br>\r\n\r\n            <strong>Le PL$tek t\'apporte les réponses sur les DD et SEE au CANADA 🇨🇦\r\n                !</strong><br><br>\r\n\r\n            Rejoins-nous MARDI à 19h00 pour charbonner ton prochain programme d\'études <br><br>\r\n\r\n            <strong>Au menu :</strong>\r\n            <ul>\r\n                <li>M\'engager dans un Double Diplôme : En suis-je capable ?</li>\r\n                <li>Quelques opportunités de DD et de SEE au Canada 🇨🇦</li>\r\n                <li>Témoignages de vaillants explorateurs !</li>\r\n                <li>Comment me lancer au DD ?</li>\r\n                <li>Séance Q&A</li>\r\n            </ul>\r\n\r\n            Il est grand temps ! <br>\r\n            A tantôt ! <br>\r\n            Le melon d\'eau <br>'),
(2, 'Annonce de test', '2023-10-04 22:41:03', 'Ceci est une annonce de test\r\n\r\nLe site arrive bientot');

-- --------------------------------------------------------

--
-- Table structure for table `charbon`
--

CREATE TABLE `charbon` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL,
  `datetime` int(11) NOT NULL,
  `duration` time DEFAULT NULL,
  `course_id` varchar(4) NOT NULL,
  `replay_link` varchar(100) DEFAULT '',
  `resources_link` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `charbon`
--

INSERT INTO `charbon` (`id`, `title`, `description`, `datetime`, `duration`, `course_id`, `replay_link`, `resources_link`) VALUES
(1, 'Premier charbon de l\'histoir', 'On fait le premier charbon de l\'histoire', 1701362340, NULL, 'PS22', 'youtube.com/watch', 'null'),
(2, 'AAP 4, 5 et 6 de PM1 !', 'On prépare le CC2 de PM en révisant les AAP 4, 5 et 6. Nous utiliserons l\'ECA du CC2 en distanciel A22, alors jetez-y un coup d\'oeil !', 1702731297, NULL, 'PM1', 'youtube.com/watch', NULL),
(3, 'Révision pour le final d\'EL22', 'On révise toutes les notions depuis le début de l\'année', 1703877357, NULL, 'EL22', 'youtube.com/watch', NULL),
(4, 'Révisions pour le médian de PS2', 'On revoit les coordonnées cartésiennes et polaires', 1699895757, '02:07:57', 'PS2', 'youtube.com/watch', NULL),
(5, 'Chapitres 3 et 4', 'On fait des exercices sur l\'algèbre linéaire et les fonctions à 2 variables', 1698951600, '02:42:12', 'MT2', 'youtube.com/watch', NULL),
(8, 'test', 'test', 1607771532, NULL, 'MT3', 'youtube.com/watch', NULL),
(16, 'Revisions final', 'On revise toutes les notions vues depuis le debut de l\'annee', 1524716542, NULL, 'PS25', 'youtube.com/watch', NULL),
(22, 'Révisions BDD', 'On revoit les BDD', 1702576800, NULL, 'IF3A', 'youtube.com/watch', NULL),
(23, 'Test2', 'Uwu', 1702489920, NULL, 'EL22', 'youtube.com/watch', NULL),
(24, 'Test2', 'Uwu', 1702486320, NULL, 'PS22', 'youtube.com/watch', 'null'),
(25, 'uwu', 'kaka', 1703276880, NULL, 'PS25', 'youtube.com/watch', NULL),
(26, 'Suua', '', 1703276880, NULL, 'IF1', 'youtube.com/watch', NULL),
(27, 'Révisions PHP', 'On revoit ensemble la connexion aux bases de données', 1703065620, NULL, 'IF3A', 'youtube.com/watch', 'null'),
(28, 'Révisions PHP', 'On revoit ensemble la connexion aux bases de données', 1703069220, NULL, 'IF3A', 'youtube.com/watch', NULL),
(31, 'Le test ultime', 'C\'est un test !!', 1705010400, NULL, 'IF3B', NULL, NULL),
(32, 'Le test', 'C\'est un test', 1702413780, NULL, 'IF3B', 'youtube.com/watch', NULL),
(33, 'Révision pour le final d\'EL22', 'On révise toutes les notions depuis le début de l\'année', 1703877357, NULL, 'EL22', 'youtube.com/watch', NULL),
(34, 'Charbon test (le 1800e)', 'Le 1800e charbon de test, déj', 1705011600, NULL, 'PS25', '', NULL),
(40, 'Charbon de PS2', 'Une description', 1703257020, NULL, 'PS2', 'youtube.com/watch', NULL),
(45, 'ddddddddddddddf', 'dddddddddddddddf', 1704311100, NULL, 'IF2', '', NULL),
(46, 'ddddddddddddaaaaad', 'aaaaaaaaaaaaaqsd', 1704310680, NULL, 'IF1', '', NULL),
(47, 'TTTTTTTTTTTTTTTTTTTTT', 'EEEEEEEEEEEEEEEEEEEEEE', 1704225120, NULL, 'IF2', '', NULL);

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
(3, 1),
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
(28, 2),
(31, 1),
(32, 1),
(34, 2),
(40, 1),
(40, 2),
(45, 1),
(46, 1),
(47, 1);

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
(1, 'Parcours d\'un BST', 2, 1, 'Tyuvetou', 1),
(2, 'Parcours d\'une liste chainée', 2, 0, 'Wiqiro', 2),
(3, 'Inversion d\'une liste chainée', 3, 0, 'Wiqiro', 2),
(4, 'Parcours d\'un graphe', 3, 1, 'Trytoon', 3),
(7, 'Test exercice', 3, 0, 'Source', 1),
(8, 'TestExercise', 5, 0, 'William', 2),
(9, 'Un cas assez particulier', 4, 0, 'Tatouille', 8),
(11, 'Test', 4, 0, 'William', 6),
(16, 'Ma source', 4, 1, 'Ma source', 8),
(18, 'Teeeest', 2, 1, 'Wiqiro', 6),
(19, 'Pmartituo', 2, 1, 'Test', 1);

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
(2, 'Listes chaînée', 'LO21'),
(3, 'Graphes', 'LO21'),
(4, 'Coordonnées polaires', 'PS2'),
(5, 'Coordonnées intrinsèque', 'PS2'),
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
(17, 'Robert', 'robert@utbm.fr', '$2y$10$OVp11374Sw2bQKs6ebfeTe26TDP.FA.60iz0JkL3oft1mR2OP4IFu', 0, 0),
(18, '1234', '1234@utbm.fr', '$2y$10$9EoBXxtEp5zdlThT28p3nOuNdqaK9xKQ8YGAjuF9.7TLZui3MMx2O', 0, 0),
(20, '123', '123', '$2y$10$gKc4PzoAHNXSRWwLeyWUaeP6iq9LCYBbAtyd11r/TKPgulmmoxmQO', 0, 0),
(24, '12345', '12345', '$2y$10$pr3PMrNjUczsldf1Hws/rewK0bpUCNXff2qU.5D5cQ/r43aOgq5ze', 0, 0),
(25, '', '', '$2y$10$TLrhv27w77h7bxn5eCHy6.Q5300wMRuWpAB1bW6AanqXedfRNevpe', 0, 0),
(29, 'Uwuwuwu', 'michell@utbm.fr', '$2y$10$n/TcZH2JYyir7JnbNoZfX.Y7Iz9eQgX7Q2WJswNoB2xAN9NhwHGDy', 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `announcement`
--
ALTER TABLE `announcement`
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
-- AUTO_INCREMENT for table `announcement`
--
ALTER TABLE `announcement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `charbon`
--
ALTER TABLE `charbon`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `course_type`
--
ALTER TABLE `course_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `exercise`
--
ALTER TABLE `exercise`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `exercise_topic`
--
ALTER TABLE `exercise_topic`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

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

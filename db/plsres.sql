-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 14, 2024 at 02:32 PM
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
(1, 'Nouveau semestre et reprise !', '2023-09-04 10:13:19', '<h5>Bonjour à toutes et à tous !</h5> <br>\n\n\n            C\'est l\'heure ! <br><br>\n\n            Envie de traverser l\'océan pour remplir ton CV tout blanc ? <br>\n            Envie de t\'ouvrir à d\'autres domaines parce que t\'en as assez de l\'espace Schengen ?\n            <br>\n            Envie de doubler ton diplôme pour viser mieux qu\'un toit de chaume ? <br><br>\n\n            <strong>Le PL$tek t\'apporte les réponses sur les DD et SEE au CANADA 🇨🇦\n                !</strong><br><br>\n\n            Rejoins-nous MARDI à 19h00 pour charbonner ton prochain programme d\'études <br><br>\n\n            <strong>Au menu :</strong>\n            <ul>\n                <li>M\'engager dans un Double Diplôme : En suis-je capable ?</li>\n                <li>Quelques opportunités de DD et de SEE au Canada 🇨🇦</li>\n                <li>Témoignages de vaillants explorateurs !</li>\n                <li>Comment me lancer au DD ?</li>\n                <li>Séance Q&A</li>\n            </ul>\n\n            Il est grand temps ! <br>\n            A tantôt ! <br>\n            Le melon d\'eau <br>'),
(2, 'Annonce de test', '2023-10-04 22:41:03', 'Ceci est une annonce de test\n\nLe site arrive bientot'),
(3, 'Annonce 1', '2024-01-03 16:35:31', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris venenatis a nisl vitae tempor. Morbi sit amet molestie nibh, ut dapibus velit. Vestibulum eu purus in ipsum commodo accumsan sit amet sit amet sem. Fusce congue eros eu ante placerat, eget ultrices turpis blandit. Proin ultrices purus sed tincidunt congue. Fusce fringilla nunc et ex sodales dignissim. Aliquam cursus tincidunt orci vel vestibulum. In vitae finibus leo. Integer ut rhoncus tellus. Sed facilisis erat et risus cursus vulputate. Sed porttitor nunc ipsum, dignissim efficitur turpis suscipit a.</p>'),
(4, 'Annonce 2', '2023-12-01 16:37:23', 'Vivamus mollis felis sem, vel volutpat urna suscipit a. Suspendisse potenti. Quisque non convallis quam. Maecenas ac aliquet orci. Vivamus eget pulvinar velit, tempor viverra tellus. Pellentesque purus sem, volutpat id nisi ac, congue placerat nisl. Aliquam erat volutpat. Pellentesque eu diam at nibh elementum bibendum. Quisque in orci id sem tincidunt pulvinar. Pellentesque in turpis nisi. Phasellus ullamcorper a lorem et bibendum. Cras et auctor enim. Integer sem justo, mollis non efficitur ut, tincidunt vitae turpis. Nulla id eleifend arcu, eu cursus tortor. Suspendisse orci nulla, fringilla sed odio vitae, laoreet placerat lectus. Nullam feugiat, mauris nec eleifend tincidunt, elit odio tristique purus, sit amet sodales libero erat nec arcu.'),
(5, 'Annonce 3', '2023-11-23 16:37:40', 'Praesent viverra mi nec tempor mollis. Pellentesque vehicula, massa in lacinia tincidunt, sapien quam tincidunt est, nec posuere turpis sem eget magna. Nulla sem nunc, mollis eget rutrum non, hendrerit ac justo. Donec eleifend tempor lectus bibendum tincidunt. Nam egestas mi id eros fringilla scelerisque. Donec tortor justo, aliquet ut leo a, convallis pharetra diam. Suspendisse potenti.\r\n\r\n');

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
(49, 'Révisions CC1 de PM', 'On révise les notions du CC1 !', 1702148400, NULL, 'PM1', 'https://youtube.com/watch', NULL),
(53, 'Révisions bases de données', 'On revoit le SQl basique', 1705429800, NULL, 'IF3A', NULL, NULL),
(54, 'On revoit le CC2', 'Révision des notions du CC2 ensemble', 1704223800, NULL, 'PS22', 'https://youtube.com/watch', NULL);

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
(49, 35),
(49, 36),
(53, 34),
(54, 36);

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
(20, 'Mise en application DFS', 4, 0, 'Cours de LO21', 3),
(21, 'Mise en application Thévenin-Norton', 2, 1, 'Tatouille', 8),
(22, 'Exercice de découverte des graphs', 4, 1, 'W3school', 3),
(23, 'Inversion de liste chainée', 4, 1, 'W3school', 2),
(24, 'Dérivation partielle d\'une fonction compliquée', 5, 0, 'Poly de MT2', 7);

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
(1, 'Admin', 'admin@utbm.fr', '$2y$10$SvGeVi2BSsvSivR55PGmI.xpzuPfXWAIaCmtC.6cxbhDUjdDciIkW', 1, 1),
(34, 'Vertonox', 'jean.charles@utbm.fr', '$2y$10$SvGeVi2BSsvSivR55PGmI.xpzuPfXWAIaCmtC.6cxbhDUjdDciIkW', 1, 0),
(35, 'Loopy', 'nathan.pretendu@utbm.fr', '$2y$10$SvGeVi2BSsvSivR55PGmI.xpzuPfXWAIaCmtC.6cxbhDUjdDciIkW', 1, 0),
(36, 'Tax', 'amelie.tronque@utbm.fr', '$2y$10$SvGeVi2BSsvSivR55PGmI.xpzuPfXWAIaCmtC.6cxbhDUjdDciIkW', 1, 0);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `charbon`
--
ALTER TABLE `charbon`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `course_type`
--
ALTER TABLE `course_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `exercise`
--
ALTER TABLE `exercise`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `exercise_topic`
--
ALTER TABLE `exercise_topic`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

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

-- phpMyAdmin SQL Dump
-- version 5.0.0
-- https://www.phpmyadmin.net/
--
-- Hôte : datastore
-- Généré le :  mer. 08 jan. 2020 à 08:38
-- Version du serveur :  8.0.18
-- Version de PHP :  7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `test`
--
CREATE DATABASE IF NOT EXISTS `test` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `test`;

-- --------------------------------------------------------

--
-- Structure de la table `permission`
--

CREATE TABLE `permission` (
  `id` varchar(36) NOT NULL,
  `operation` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `permission`
--

INSERT INTO `permission` (`id`, `operation`) VALUES
('48bdf377-a514-4a44-a2ed-e8714b11482c', 'AccountEdit'),
('84e16fdc-b4ad-40ee-9dc0-6851bdf25076', 'AccountView'),
('ccee7f38-6b5d-4302-bff9-943b9eb2cd2f', 'ChangePassword');

-- --------------------------------------------------------

--
-- Structure de la table `role`
--

CREATE TABLE `role` (
  `id` varchar(36) NOT NULL,
  `name` varchar(60) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `role`
--

INSERT INTO `role` (`id`, `name`, `createdAt`) VALUES
('4d8128d4-766a-49fc-bcb3-6f3bd82f9b73', 'Member', '2020-01-07 16:24:49.307537'),
('695070fb-1b5f-49b1-affa-bf556bee6a6e', 'Administrator', '2020-01-07 16:24:49.288025'),
('864bb186-0131-47b3-a4f9-31accdcfdf9c', 'Manager', '2020-01-07 16:24:49.300029'),
('8cd0991b-8aa4-4ad7-96e6-3cbcf67eb93f', 'User', '2020-01-07 16:24:49.327109');

-- --------------------------------------------------------

--
-- Structure de la table `role_has_permission`
--

CREATE TABLE `role_has_permission` (
  `roleId` varchar(36) NOT NULL,
  `permissionId` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `role_has_permission`
--

INSERT INTO `role_has_permission` (`roleId`, `permissionId`) VALUES
('8cd0991b-8aa4-4ad7-96e6-3cbcf67eb93f', '48bdf377-a514-4a44-a2ed-e8714b11482c'),
('8cd0991b-8aa4-4ad7-96e6-3cbcf67eb93f', '84e16fdc-b4ad-40ee-9dc0-6851bdf25076'),
('8cd0991b-8aa4-4ad7-96e6-3cbcf67eb93f', 'ccee7f38-6b5d-4302-bff9-943b9eb2cd2f');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` varchar(36) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `birthdate` timestamp NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `firstName`, `lastName`, `birthdate`, `createdAt`, `updatedAt`) VALUES
('3f38b738-a16c-4147-b769-7689816cf8f2', 'jane.doe@gmail.com', '1234', 'Jane', 'Doe', '2020-01-07 14:30:27', '2020-01-07 16:24:49.316000', '2020-01-07 16:24:49.316000'),
('7cdb46c1-b6d4-427d-9b61-fdae65a39156', 'john.doe@gmail.com', '1234', 'John', 'DOe', '2020-01-07 14:28:59', '2020-01-07 16:24:49.336032', '2020-01-07 16:24:49.336032');

-- --------------------------------------------------------

--
-- Structure de la table `user_has_role`
--

CREATE TABLE `user_has_role` (
  `userId` varchar(36) NOT NULL,
  `roleId` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `user_has_role`
--

INSERT INTO `user_has_role` (`userId`, `roleId`) VALUES
('3f38b738-a16c-4147-b769-7689816cf8f2', '695070fb-1b5f-49b1-affa-bf556bee6a6e'),
('7cdb46c1-b6d4-427d-9b61-fdae65a39156', '8cd0991b-8aa4-4ad7-96e6-3cbcf67eb93f');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `permission`
--
ALTER TABLE `permission`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_ae4578dcaed5adff96595e6166` (`name`);

--
-- Index pour la table `role_has_permission`
--
ALTER TABLE `role_has_permission`
  ADD PRIMARY KEY (`roleId`,`permissionId`),
  ADD KEY `IDX_b011e63f8f8ee6ca14474f25db` (`roleId`),
  ADD KEY `IDX_d31002d1e5ba9a752e0718e8c9` (`permissionId`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`);

--
-- Index pour la table `user_has_role`
--
ALTER TABLE `user_has_role`
  ADD PRIMARY KEY (`userId`,`roleId`),
  ADD KEY `IDX_722a6208eab4958546b47bb0d4` (`userId`),
  ADD KEY `IDX_24d733d67b9c2b19db7bf34b51` (`roleId`);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `role_has_permission`
--
ALTER TABLE `role_has_permission`
  ADD CONSTRAINT `FK_b011e63f8f8ee6ca14474f25dbd` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_d31002d1e5ba9a752e0718e8c9d` FOREIGN KEY (`permissionId`) REFERENCES `permission` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `user_has_role`
--
ALTER TABLE `user_has_role`
  ADD CONSTRAINT `FK_24d733d67b9c2b19db7bf34b518` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_722a6208eab4958546b47bb0d41` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;


-- 
-- This is the shema for The Golded Fish Tank database
-- 
CREATE DATABASE IF NOT EXISTS `thegoldedfishtank` DEFAULT CHARACTER
SET
    utf8mb4 COLLATE utf8mb4_general_ci;

USE `thegoldedfishtank`;

DROP TABLE IF EXISTS `message`;
DROP TABLE IF EXISTS `user`;

CREATE TABLE
    `user` (
        `id_user` int NOT NULL AUTO_INCREMENT,
        `name` varchar(50) NOT NULL,
        `email` varchar(50) NOT NULL,
        `password` varchar(50) NOT NULL,
        `creation_date` DATETIME NOT NULL,
        PRIMARY KEY (`id_user`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE
    `message` (
        `id_message` int NOT NULL AUTO_INCREMENT,
        `type` ENUM ('forum', 'review'),
        `id_user` int NOT NULL,
        `message_date` DATETIME NOT NULL,
        `question` varchar(512) NOT NULL,
        `response` varchar(1024) NULL,
        `validation` ENUM ('yes', 'no'),
        PRIMARY KEY (`id_message`),
        KEY `id_user` (`id_user`),
        CONSTRAINT `message_itbf` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

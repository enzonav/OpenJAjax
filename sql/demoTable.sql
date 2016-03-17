-- phpMyAdmin SQL Dump
-- version 2.8.0.2
-- http://www.phpmyadmin.net
-- 
-- Host: your_host
-- Generato il: 13 Mar, 2016 at 06:51 PM
-- Versione MySQL: 5.1.66
-- Versione PHP: 4.3.10-22
-- 
-- Database: 'your_database'
-- 

-- --------------------------------------------------------

-- 
-- Struttura della tabella `demoTable`
-- 

CREATE TABLE `demoTable` (
  `id` int(2) NOT NULL,
  `name` varchar(50) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- 
-- Dump dei dati per la tabella `demoTable`
-- 

INSERT INTO `demoTable` (`id`, `name`, `surname`, `email`) VALUES (1, 'Johnn', 'Doe', 'johnndoe@example.com'),
(2, 'Frank', 'Black', 'frank.black@example.com'),
(3, 'Dennis', 'Mangia', 'dennis.mangia@example.com'),
(4, 'Alex', 'Van Der Graf', 'alex.vandergraf@example.com'),
(5, 'Luis', 'Figo', 'luis.figo@antotheremail.com'),
(6, 'Johnny ', 'Wilkinson', 'Jonny.wilkinson@example.com');
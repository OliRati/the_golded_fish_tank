<?php
// This is an axample file for project configuration
// You must set the required values for your Host
// and save it as .env.php

/*
 * Path to the application from Web server root
 */
const WEB_ROOT = '/the_golded_fish_tank';

/*
 * Absolute path to PHP server files
 */
define( 'PHP_ROOT', $_SERVER['DOCUMENT_ROOT'] . WEB_ROOT );

/*
 * Database Connexion infos
 */

// Host name for mysql server
const DB_HOSTNAME = 'localhost';

// Database name 
const DB_NAME = 'thegoldedfishtank';

// Database user
const DB_USER = '';

// Database password
const DB_PASSWORD = '';

// Database charset to be used
const DB_CHARSET = 'utf8mb4';

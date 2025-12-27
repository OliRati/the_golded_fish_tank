<?php
const DB_NAME = 'thegoldedfishtank';
const DB_PASSWORD = 'yourpassword';

function getDBConnection() {
    $dbConnection = new PDO('mysql:host=localhost;dbname=' . DB_NAME, 'root', DB_PASSWORD);
    $dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $dbConnection;
}

?>
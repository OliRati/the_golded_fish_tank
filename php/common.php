<?php
if (file_exists('../.env.php')) {
    // Get local configuration file
    require '../.env.php';
} elseif (file_exists('../.env.example.php')) {
    // Get sample configuration file
    require '../.env.example.php';
}

function getDBConnection()
{
    $dsn = "mysql:host=" . DB_HOSTNAME . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;

    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ];

    try {
        $pdo = new PDO($dsn, DB_USER, DB_PASSWORD, $options);
    } catch (PDOException $error) {
        error_log('Fatal Error connecting to database');
        die();
    }

    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    return $pdo;
}

function checkPassword($pdo, $name, $password)
{
    $sql = "SELECT `password` FROM `user` WHERE `name` = :name;";
    $stmt = $pdo->prepare($sql);
    $state = $stmt->execute([
        ':name' => $name
    ]);

    if ($state) {
        $storedPassword = $stmt->fetch();

        if (!empty($storedPassword)) {
            if ($password === $storedPassword['password'])
                return true;
        }
    }

    return false;
}

function getForumMessages($pdo)
{
    $sql = "SELECT m.message_date as date, u.name, m.question as message, m.response FROM `message` m
            JOIN `user` u
            ON m.id_user = u.id_user
            WHERE m.validation = 'yes' AND m.type = 'forum'
            ORDER BY m.message_date DESC;";
    $stmt = $pdo->prepare($sql);
    $state = $stmt->execute();

    if ($state) {
        $forums = $stmt->fetchAll();

        if (!empty($forums)) {
            return $forums;
        }
    }

    return [];
}

function getReviewMessages($pdo)
{
    $sql = "SELECT m.message_date as date, u.name, m.question as message, m.response FROM `message` m
            JOIN `user` u
            ON m.id_user = u.id_user
            WHERE m.validation = 'yes' AND m.type = 'review'
            ORDER BY m.message_date DESC;";
    $stmt = $pdo->prepare($sql);
    $state = $stmt->execute();

    if ($state) {
        $reviews = $stmt->fetchAll();

        if (!empty($reviews)) {
            return $reviews;
        }
    }

    return [];
}

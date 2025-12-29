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

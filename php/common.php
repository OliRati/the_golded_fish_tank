<?php
session_start();

// --- CSRF token: generate if missing ---
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

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
    $sql = "SELECT `password`, `id_user` FROM `user` WHERE `name` = :name;";
    $stmt = $pdo->prepare($sql);
    $state = $stmt->execute([
        ':name' => $name
    ]);

    if ($state) {
        $storedPassword = $stmt->fetch();

        if (!empty($storedPassword)) {
            if ($password === $storedPassword['password']) {
                $_SESSION['user_id'] = $storedPassword['id_user'];
                return true;
            }
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

function addForumMessage($pdo, $id_user, $message)
{
    date_default_timezone_set('GMT');

    $sql = "INSERT INTO `message` ( `type`, `id_user`, `message_date`, `question`, `validation` ) VALUES
            ( :type, :id_user, :message_date, :question, :validation );";
    $stmt = $pdo->prepare($sql);
    $state = $stmt->execute([
        ':type' => 'forum',
        ':id_user' => $id_user,
        ':message_date' => date("Y-m-d h:m:s"),
        ':question' => $message,
        ':validation' => 'no'
    ]);

    if ($state)
        return true;

    return false;
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

function addReviewMessage($pdo, $id_user, $message)
{
    date_default_timezone_set('GMT');

    $sql = "INSERT INTO `message` ( `type`, `id_user`, `message_date`, `question`, `validation` ) VALUES
            ( :type, :id_user, :message_date, :question, :validation );";
    $stmt = $pdo->prepare($sql);
    $state = $stmt->execute([
        ':type' => 'review',
        ':id_user' => $id_user,
        ':message_date' => date("Y-m-d h:m:s"),
        ':question' => $message,
        ':validation' => 'no'
    ]);

    if ($state)
        return true;

    return false;
}

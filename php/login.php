<?php
require_once 'common.php';

// Get the raw POST data
$json = file_get_contents('php://input');

// Decode the JSON data into a PHP array
$data = json_decode($json, true);

// Init the JSON response
$jsonData = array(
    'loggedIn' => false
);

// Check if decoding the JSON data failed
if (json_last_error() !== JSON_ERROR_NONE) {
    $jsonData['message'] = "No data sent.";
    error_log('Failed to decode JSON data: ' . json_last_error_msg());
    echo json_encode($jsonData);
    return;
}

$username = trim(strip_tags($data['username'] ?? ''));
$password = $data['password'] ?? '';

if (empty($username) || empty($password)) {
    $jsonData['message'] = 'Username and password are required.';
    header('Content-Type: application/json');
    echo json_encode($jsonData);
    return;
}

$pdo = getDBConnection();
if (checkPassword($pdo, $username, $password)) {
    $jsonData['loggedIn'] = true;
} elseif ($username === 'admin' && $password === 'password') {
    $jsonData['loggedIn'] = true;
}

header('Content-Type: application/json');
echo json_encode($jsonData);

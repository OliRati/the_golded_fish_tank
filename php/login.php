<?php
require_once 'common.php';

// Get the raw POST data
$json = file_get_contents('php://input');

// Decode the JSON data into a PHP array
$data = json_decode($json, true);

// Check if decoding the JSON data failed
if (json_last_error() !== JSON_ERROR_NONE) {
    error_log('Failed to decode JSON data: ' . json_last_error_msg());
    return;
}

$jsonData = array(
    'loggedIn' => false
);

$username = trim(filter_var($data['username'] ?? '', FILTER_SANITIZE_STRING));
$password = $data['password'] ?? '';

if (empty($username) || empty($password)) {
    $jsonData['message'] = 'Username and password are required.';
    header('Content-Type: application/json');
    echo json_encode($jsonData);
    return;
}

if ($username === 'admin' && $password === 'password') {
    $jsonData['loggedIn'] = true;
}

header('Content-Type: application/json');
echo json_encode($jsonData);
?>
<?php
require_once 'common.php';

// Get the raw POST data
$json = file_get_contents('php://input');

// Decode the JSON data into a PHP array
$data = json_decode($json, true);

// Check if decoding the JSON data failed
if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON']);
    exit;
}

// Validate required fields
if (empty($data['message'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

// Init the JSON response
$jsonData = array();

// Clean up message string
$message = trim(strip_tags($data['message']));

if (isset($_SESSION['user_id'])) {
    $id_user = $_SESSION['user_id'];
    $pdo = getDBConnection();
    $result = addForumMessage($pdo, $id_user, $message);
} else {
    $result = false;
    error_log("Trying to send forum message without user_id defined !!!");
}

// Init the JSON response
$jsonData['status'] = $result ? 'success' : 'failed';

// Return JSON response
header('Content-Type: application/json');
echo json_encode($jsonData);

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
if (empty($data['name']) || empty($data['email']) || empty($data['phone']) || empty($data['message'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

// Load existing database
$databaseFile = '../assets/json/contacts.json';
$database = [];

if (file_exists($databaseFile)) {
    $database = json_decode(file_get_contents($databaseFile), true);
}

// Add contact data with timestamp
$contact = [
    'date' => date('d/m/Y'),
    'name' => $data['name'],
    'email' => $data['email'],
    'phone' => $data['phone'],
    'message' => $data['message'],
    'puballowed' => $data['puballowed'] ?? 'false'
];

if (!isset($database['contacts'])) {
    $database['contacts'] = [];
}

$database['contacts'][] = $contact;

// Save back to file
file_put_contents($databaseFile, json_encode($database, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

error_log("Received and saved contact from " . $data['name']);

// Send success response
echo json_encode(['status' => 'success']);

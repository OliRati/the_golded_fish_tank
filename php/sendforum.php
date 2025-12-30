<?php
require_once 'common.php';

error_log('Received send forum request');

// Init the JSON response
$jsonData = array(
    'message' => 'Not implemented yet !',
    'status' => 'success'
);

// Return JSON response
header('Content-Type: application/json');
echo json_encode($jsonData);

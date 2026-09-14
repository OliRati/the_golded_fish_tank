<?php
require_once 'common.php';

$pdo = getDBConnection();

$forums = getReviewMessages($pdo);

header('Content-Type: application/json');
echo json_encode($forums);

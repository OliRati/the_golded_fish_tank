<?php
require_once 'common.php';

$pdo = getDBConnection();

$forums = getForumMessages($pdo);

header('Content-Type: application/json');
echo json_encode($forums);

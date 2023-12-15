<?php
require_once 'database.php';

header('Content-Type: application/json');

$result = $conn->query('SELECT id, title, difficulty, is_corrected, souce, topic_id FROM exercise');

$exercises = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode($exercises);

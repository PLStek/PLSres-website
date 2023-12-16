<?php
require_once 'database.php';

header('Content-Type: application/json');

$max_difficulty = $_GET['max_difficulty'] ?? 5;
$content = $_GET['content'] ?? false;
$topic_id = $_GET['topic_id'] ?? null;
$corrected_only = $_GET['corrected_only'] ?? false;

$query = "SELECT id, title, difficulty, is_corrected, source, topic_id FROM exercise
    WHERE difficulty <= $max_difficulty";

if ($topic_id) {
    $query .= " AND topic_id = $topic_id";
}

if ($corrected_only == true) {
    $query .= " AND is_corrected = 1";
}

$result = $conn->query($query);

$exercises = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode($exercises);

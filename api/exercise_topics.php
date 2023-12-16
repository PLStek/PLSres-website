<?php
require_once 'database.php';

header('Content-Type: application/json');

$id = $_GET['id'] ?? null;
$courses = isset($_GET['courses']) ? explode(',', $_GET['courses']) : null;
$course_type = $_GET['course_type'] ?? null;

$query = "SELECT E.id, E.topic, C.id course, T.type course_type FROM exercise_topic E 
INNER JOIN course C ON E.course_id = C.id
INNER JOIN course_type T ON C.type_id = T.id
WHERE " . ($id ? "E.id = $id" : "1");

if ($course_type) {
    $query .= " AND T.type = '$course_type'";
}

if ($courses) {
    $query .= " AND C.course_id IN (";

    foreach ($courses as $course) {
        $query .= "'$course',";
    }
    $query = substr($query, 0, -1) . ")";
}


$result = $conn->query($query);

$exercise_topics = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode($exercise_topics);

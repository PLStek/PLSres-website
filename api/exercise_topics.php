<?php

require_once 'database.php';

header('Content-Type: application/json');
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");



$id = $_GET['id'] ?? null;
$courses = isset($_GET['courses']) ? explode(',', $_GET['courses']) : null;
$course_type = $_GET['course_type'] ?? null;

$query = "SELECT ET.id, ET.topic, C.id course, T.type course_type, COUNT(E.id) exercise_count FROM exercise_topic ET 
INNER JOIN course C ON ET.course_id = C.id
INNER JOIN course_type T ON C.type_id = T.id
LEFT JOIN exercise E ON ET.id = E.topic_id
WHERE " . ($id ? "ET.id = $id" : "1");

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
$query .= " GROUP BY ET.id";

$result = $conn->query($query);

$exercise_topics = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode($exercise_topics);

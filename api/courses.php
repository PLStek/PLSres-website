<?php
header('Content-Type: application/json');
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


require_once 'database.php';

$method = $_SERVER["REQUEST_METHOD"];

try {
    if ($method == 'GET') {
        $query = "SELECT course.id, type FROM course INNER JOIN course_type ON course.type_id = course_type.id";

        $result = $conn->query($query);

        $courses = $result->fetch_all(MYSQLI_ASSOC);

        echo json_encode($courses);
    } else {
        throw new Exception('This method is not allowed.');
    }
} catch (Exception $e) {
    echo json_encode(array('success' => false, 'error' => $e->getMessage()));
}

<?php
header('Content-Type: application/json');
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Methods: GET, POST, PUT");
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once 'database.php';

$method = $_SERVER["REQUEST_METHOD"];


function getExerciseTopics($id, $courses, $course_type)
{
    global $conn;

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

    return $result->fetch_all(MYSQLI_ASSOC);
}

function updateExerciseTopic($id, $title, $course_id)
{
    global $conn;
    $query = "UPDATE exercise_topic SET topic = ?, course_id = ? WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ssi", $title, $course_id, $id);
    
    $stmt->execute();
}

try {
    switch ($method) {
        case 'GET':
            $id = $_GET['id'] ?? null;
            $courses = isset($_GET['courses']) ? explode(',', $_GET['courses']) : null;
            $course_type = $_GET['course_type'] ?? null;
            $exercise_topics = getExerciseTopics($id, $courses, $course_type);
            echo json_encode($exercise_topics);
            break;
        case 'PUT':
            $data = json_decode(file_get_contents('php://input'), true);
            if (!isset($data['id']) || !isset($data['title']) || !isset($data['course'])) {
                throw new Exception('Missing parameters');
            }
            $id = $data['id'];
            $title = $data['title'];
            $course_id = $data['course'];

            updateExerciseTopic($id, $title, $course_id);
            echo json_encode(array('success' => true));
            break;
        default:
            break;
    }
} catch (Exception $e) {
    echo json_encode(array('success' => false, 'error' => $e->getMessage()));
}

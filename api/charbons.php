<?php
require_once 'database.php';

header('Content-Type: application/json');




function getProducts($courses, $course_type, $min_date, $max_date, $min_duration, $max_duration, $null_duration, $offset, $limit)
{
    global $conn;

    $query = "SELECT C.id, C.title, C.description, C.datetime, C.id_course course, T.type course_type, A.username as actionner FROM (
        SELECT id, title, description, datetime, id_course, duration
        FROM charbon
        ORDER BY id
        LIMIT $limit OFFSET $offset
    ) C
    INNER JOIN course CO ON C.id_course = CO.id
    INNER JOIN course_type T ON T.id = CO.type_id
    LEFT JOIN charbon_host H ON C.id = H.id_charbon
    LEFT JOIN user A ON H.id_actionneur = A.id
    WHERE C.datetime BETWEEN '$min_date' AND '$max_date'
    AND (HOUR(C.duration) BETWEEN $min_duration AND $max_duration" . ($null_duration ? " OR C.duration IS NULL)" : ")");

    if ($course_type) {
        $query .= " AND T.type = '$course_type'";
    }

    if ($courses) {
        $query .= " AND C.id_course IN (";

        foreach ($courses as $course) {
            $query .= "'$course',";
        }
        $query = substr($query, 0, -1) . ")";
    }
    $result = $conn->query($query);

    $charbons = array();
    while ($row = $result->fetch_assoc()) {
        $charbon_id = $row['id'];

        $charbon_exists = false;

        foreach ($charbons as &$charbon) {
            if ($charbon['id'] == $charbon_id) {
                $charbon_exists = true;
                $charbon['actionners'][] = $row['actionner'];
                break;
            }
        }

        if (!$charbon_exists) {
            $charbons[] = array(
                'id' => $charbon_id,
                'title' => $row['title'],
                'description' => $row['description'],
                'datetime' => $row['datetime'],
                'course' => $row['course'],
                'course_type' => $row['course_type'],
                'actionners' => $row['actionner'] ? array($row['actionner']) : array()
            );
        }
    }
    return $charbons;
}

$method = $_SERVER["REQUEST_METHOD"];

switch ($method) {
    case 'GET':
        $courses = isset($_GET['courses']) ? explode(',', $_GET['courses']) : null;
        $course_type = $_GET['course_type'] ?? null;
        $min_date = isset($_GET['min_date']) ? new DateTime('@' . $_GET['min_date']) : "0000-00-00 00:00:00";
        $max_date = isset($_GET['max_date']) ? new DateTime('@' . $_GET['max_date']) : "9999-12-31 23:59:59";
        $min_duration = $_GET['min_duration'] ?? 0;
        $max_duration = $_GET['max_duration'] ?? 99;
        $null_duration = $_GET['null_duration'] ?? true;
        $offset = $_GET['offset'] ?? 0;
        $limit = $_GET['limit'] ?? 10;

        $charbons = getProducts($courses, $course_type, $min_date, $max_date, $min_duration, $max_duration, $null_duration, $offset, $limit);
        break;
    default:
        echo json_encode(array('error' => 'This method is not allowed.'));
        break;
}




echo json_encode($charbons);

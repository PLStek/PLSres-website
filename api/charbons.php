<?php
header('Content-Type: application/json');

require_once 'database.php';

$method = $_SERVER["REQUEST_METHOD"];





function getCharbons($courses, $course_type, $min_date, $max_date, $min_duration, $max_duration, $null_duration, $offset, $limit)
{
    global $conn;

    $query = "SELECT C.*, A.username as actionneur FROM (
        SELECT C.id, C.title, C.description, C.datetime, C.course_id course, T.type course_type
        FROM charbon C
        INNER JOIN course CO ON C.course_id = CO.id
        INNER JOIN course_type T ON T.id = CO.type_id
        WHERE C.datetime BETWEEN '$min_date' AND '$max_date'
        AND (HOUR(C.duration) BETWEEN $min_duration AND $max_duration" . ($null_duration ? " OR C.duration IS NULL)" : ")");

    if ($course_type) {
        $query .= " AND T.type = '$course_type'";
    }

    if ($courses) {
        $query .= " AND C.course_id IN (";

        foreach ($courses as $course) {
            $query .= "'$course',";
        }
        $query = rtrim($query, ',') . ")";
    }
    $query .= "
        ORDER BY id
        LIMIT $limit OFFSET $offset
    ) C
    LEFT JOIN charbon_host H ON C.id = H.charbon_id
    LEFT JOIN user A ON H.actionneur_id = A.id";

    $result = $conn->query($query);


    $charbons = array();
    while ($row = $result->fetch_assoc()) {
        $charbon_id = $row['id'];

        $charbon_exists = false;

        foreach ($charbons as &$charbon) {
            if ($charbon['id'] == $charbon_id) {
                $charbon_exists = true;
                $charbon['actionneurs'][] = $row['actionneur'];
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
                'actionneurs' => $row['actionneur'] ? array($row['actionneur']) : array()
            );
        }
    }
    return $charbons;
}

function addCharbon($title, $description, $datetime, $course, $actionneurs)
{
    global $conn;

    $conn->begin_transaction();

    $query1 = "INSERT INTO charbon (title, description, datetime, course_id) VALUES (?, ?, ?, ?)";
    $stmt1 = $conn->prepare($query1);
    $stmt1->bind_param("ssss", $title, $description, $datetime, $course);
    $stmt1->execute();

    $id = $conn->insert_id;

    $query2 = "INSERT INTO charbon_host (charbon_id, actionneur_id) VALUES (?, ?)";
    $stmt2 = $conn->prepare($query2);

    foreach ($actionneurs as $actionneur) {
        $stmt2->bind_param("ii", $id, $actionneur);
        $stmt2->execute();
        $stmt2->reset();
    }

    $stmt1->close();
    $stmt2->close();

    $conn->commit();
}


switch ($method) {
    case 'GET':
        $courses = isset($_GET['courses']) ? explode(',', $_GET['courses']) : null;
        $course_type = $_GET['course_type'] ?? null;
        $min_date = isset($_GET['min_date']) ? (new DateTime('@' . $_GET['min_date']))->format('Y-m-d H:i:s') : "0000-00-00 00:00:00";
        $max_date = isset($_GET['max_date']) ? (new DateTime('@' . $_GET['max_date']))->format('Y-m-d H:i:s') : "9999-12-31 23:59:59";
        $min_duration = $_GET['min_duration'] ?? 0;
        $max_duration = $_GET['max_duration'] ?? 99;
        $null_duration = $_GET['null_duration'] ?? true;
        $offset = $_GET['offset'] ?? 0;
        $limit = $_GET['limit'] ?? 10;

        $charbons = getCharbons($courses, $course_type, $min_date, $max_date, $min_duration, $max_duration, $null_duration, $offset, $limit);
        echo json_encode($charbons);
        break;
    case 'POST':
        if (!isset($_POST['title']) || !isset($_POST['description']) || !isset($_POST['datetime']) || !isset($_POST['course']) || !isset($_POST['actionneurs'])) {
            echo json_encode(array('error' => 'Missing parameters.'));
            break;
        }
        $title = $_POST['title'];
        $description = $_POST['description'];
        $datetime = (new DateTime('@' . $_POST['datetime']))->format('Y-m-d H:i:s');
        $course = $_POST['course'];
        $actionneurs = explode(',', $_POST['actionneurs']);

        addCharbon($title, $description, $datetime, $course, $actionneurs);
        break;
    default:
        echo json_encode(array('error' => 'This method is not allowed.'));
        break;
}

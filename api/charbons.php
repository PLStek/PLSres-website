<?php
header('Content-Type: application/json');
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once 'database.php';

$method = $_SERVER["REQUEST_METHOD"];


function getCharbons($courses, $course_type, $min_date, $max_date, $min_duration, $max_duration, $null_duration, $offset, $limit, $sort)
{
    global $conn;    

    $query = "SELECT C.*, A.username as actionneur FROM (
        SELECT C.id, C.title, C.description, C.datetime, C.course_id course, C.replay_link, C.resources_link, T.type course_type
        FROM charbon C
        INNER JOIN course CO ON C.course_id = CO.id
        INNER JOIN course_type T ON T.id = CO.type_id
        WHERE C.datetime BETWEEN $min_date AND $max_date
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
        ORDER BY $sort
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
                'date' => $row['datetime'],
                'course' => $row['course'],
                'course_type' => $row['course_type'],
                'replay_link' => $row['replay_link'],
                'resources_link' => $row['resources_link'],
                'actionneurs' => $row['actionneur'] ? array($row['actionneur']) : array()
            );
        }
    }
    return $charbons;
}

function addCharbon($title, $description, $date, $course, $replayLink, $resourcesLink, $actionneurs)
{
    global $conn;

    $conn->begin_transaction();

    $query1 = "INSERT INTO charbon (title, description, datetime, course_id, replay_link, resources_link) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt1 = $conn->prepare($query1);
    $stmt1->bind_param("ssssss", $title, $description, $date, $course, $replayLink, $resourcesLink);
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


function updateCharbon($id, $title, $description, $date, $course, $replayLink, $resourcesLink, $actionneurs)
{
    global $conn;

    $conn->begin_transaction();

    $query1 = "UPDATE charbon SET title = ?, description = ?, datetime = ?, course_id = ?, replay_link = ?, resources_link = ? WHERE id = ?";
    $stmt1 = $conn->prepare($query1);
    $stmt1->bind_param("ssssssi", $title, $description, $date, $course, $replayLink, $resourcesLink, $id);
    $stmt1->execute();

    $query2 = "DELETE FROM charbon_host WHERE charbon_id = ?";
    $stmt2 = $conn->prepare($query2);
    $stmt2->bind_param("i", $id);
    $stmt2->execute();

    $query3 = "INSERT INTO charbon_host (charbon_id, actionneur_id) VALUES (?, ?)";
    $stmt3 = $conn->prepare($query3);

    foreach ($actionneurs as $actionneur) {
        $stmt3->bind_param("ii", $id, $actionneur);
        $stmt3->execute();
        $stmt3->reset();
    }

    $stmt1->close();
    $stmt2->close();
    $stmt3->close();

    $conn->commit();
}

function deleteCharbon($id)
{
    global $conn;

    $conn->begin_transaction();

    $query1 = "DELETE FROM charbon_host WHERE charbon_id = ?";
    $stmt1 = $conn->prepare($query1);
    $stmt1->bind_param("i", $id);
    $stmt1->execute();

    $query2 = "DELETE FROM charbon WHERE id = ?";
    $stmt2 = $conn->prepare($query2);
    $stmt2->bind_param("i", $id);
    $stmt2->execute();

    $stmt1->close();
    $stmt2->close();

    $conn->commit();
}

date_default_timezone_set('UTC');

try {
    switch ($method) {
        case 'GET':
            $courses = isset($_GET['courses']) ? explode(',', $_GET['courses']) : null;
            $course_type = $_GET['courseType'] ?? null;
            $min_date = $_GET['minDate'] ?? "0";
            $max_date = $_GET['maxDate'] ?? "99999999999";
            $min_duration = $_GET['minDuration'] ?? 0;
            $max_duration = $_GET['maxDuration'] ?? 99;
            $null_duration = $_GET['nullDuration'] ?? true;
            $offset = $_GET['offset'] ?? 0;
            $limit = $_GET['limit'] ?? 1000;
            $sort = "";

            switch ($_GET['sort'] ?? null) {
                case 'dateAsc':
                    $sort = "C.datetime ASC";
                    break;
                case 'dateDesc':
                    $sort = "C.datetime DESC";
                    break;
                case 'durationAsc':
                    $sort = "C.duration ASC";
                    break;
                case 'durationDesc':
                    $sort = "C.duration DESC";
                    break;
                default:
                    $sort = "C.datetime DESC";
                    break;
            }

            $charbons = getCharbons($courses, $course_type, $min_date, $max_date, $min_duration, $max_duration, $null_duration, $offset, $limit, $sort);
            echo json_encode($charbons);
            break;
        case 'POST':
            if (!isset($_POST['title']) || !isset($_POST['description']) || !isset($_POST['date']) || !isset($_POST['course']) || !isset($_POST['actionneurs'])) {
                throw new Exception('Missing parameters.');
            }
            $title = $_POST['title'];
            $description = $_POST['description'];
            $date = $_POST['date'];
            $course = $_POST['course'];
            $replayLink = $_POST['replayLink'] ?? null;
            $resourcesLink = $_POST['resourcesLink'] ?? null;
            $actionneurs = explode(',', $_POST['actionneurs']);

            addCharbon($title, $description, $date, $course, $replayLink, $resourcesLink, $actionneurs);
            echo json_encode(array('success' => true));
            break;
        case 'PUT':
            $data = json_decode(file_get_contents('php://input'), true);
            if (!isset($data['id']) || !isset($data['title']) || !isset($data['description']) || !isset($data['date']) || !isset($data['course']) || !isset($data['actionneurs'])) {
                throw new Exception('Missing parameters.');
            }
            $id = $data['id'];
            $title = $data['title'];
            $description = $data['description'];
            $date = $data['date'];
            $course = $data['course'];
            $replayLink = $data['replayLink'] ?? null;
            $resourcesLink = $data['resourcesLink'] ?? null;
            $actionneurs = $data['actionneurs'];

            updateCharbon($id, $title, $description, $date, $course, $replayLink, $resourcesLink, $actionneurs);
            echo json_encode(array('success' => true));
            break;
        case 'DELETE':
            if (!isset($_GET['id'])) {
                throw new Exception('Missing parameters.');
            }
            $id = $_GET['id'];
            deleteCharbon($id);
            echo json_encode(array('success' => true));
            break;
        default:
            throw new Exception('This method is not allowed.');
            break;
    }
} catch (Exception $e) {
    echo json_encode(array('success' => false, 'error' => $e->getMessage()));
}

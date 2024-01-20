<?php
header('Content-Type: application/json');
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once 'database.php';

$method = $_SERVER["REQUEST_METHOD"];

function getAnnouncements($limit, $offset, $sort) {
    global $conn;

    $query = "SELECT * FROM announcement ORDER BY $sort LIMIT ? OFFSET ?";


    $stmt = $conn->prepare($query);
    $stmt->bind_param("ii", $limit, $offset);

    $stmt->execute();
    $result = $stmt->get_result();

    $announcements = array();

    while ($row = $result->fetch_assoc()) {
        $announcements[] = array(
            'id' => $row['id'],
            'title' => $row['title'],
            'content' => $row['content'],
            'date' => $row['date']
        );
    }

    return $announcements;
}

try {
    switch ($method) {
        case 'GET':
            $limit = $_GET['limit'] ?? 10;
            $offset = $_GET['offset'] ?? 0;
            $sort = "";

            switch ($_GET['sort'] ?? null) {
                case 'nameAsc':
                    $sort = "title ASC";
                    break;
                case 'nameDesc':
                    $sort = "title DESC";
                    break;
                case 'dateAsc':
                    $sort = "date ASC";
                    break;
                case 'dateDesc':
                    $sort = "date DESC";
                    break;
                default:
                    $sort = "date DESC";
                    break;
            }


            $announcements = getAnnouncements($limit, $offset, $sort);
            echo json_encode($announcements);
            break;

        default:
            throw new Exception('This method is not allowed.');
            break;
    }
} catch (Exception $e) {
    echo json_encode(array('success' => false, 'error' => $e->getMessage()));
}

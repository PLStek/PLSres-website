<?php
header('Content-Type: application/json');
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once 'database.php';

$method = $_SERVER["REQUEST_METHOD"];

function getAnnouncements() {
    global $conn;

    $query = "SELECT * FROM announcement ORDER BY date DESC";

    $result = $conn->query($query);

    $announcements = $result->fetch_all(MYSQLI_ASSOC);

    return $announcements;
}

try {
    switch ($method) {
        case 'GET':
            $announcements = getAnnouncements();
            echo json_encode($announcements);
            break;

        default:
            throw new Exception('This method is not allowed.');
            break;
    }
} catch (Exception $e) {
    echo json_encode(array('success' => false, 'error' => $e->getMessage()));
}

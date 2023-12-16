<?php
require_once 'database.php';

header('Content-Type: application/json');

$courses = isset($_GET['courses']) ? explode(',', $_GET['courses']) : null;

$query = "SELECT C.id, C.title, C.description, C.datetime, C.id_course, A.username as actionner FROM charbon C 
LEFT JOIN charbon_host H ON C.id = H.id_charbon
LEFT JOIN user A ON H.id_actionneur = A.id";

if ($courses) {
    $query .= " WHERE C.id_course IN (";

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
            'id_course' => $row['id_course'],
            'actionners' => $row['actionner'] ? array($row['actionner']) : array()
        );
    }
}


echo json_encode($charbons);






/* echo '[
    {
        "id": 1,
        "course": "PS2",
        "courseType": "meca",
        "date": "2023-12-11T22:00:00",
        "title": "AAP 4, 5 et 6 de PM1 !",
        "actionners": [
            "Lilit",
            "Flo",
            "William"
        ],
        "description": "On prépare le CC2 de PM en révisant les AAP 4, 5 et 6. Nous utiliserons l\'ECA du CC2 en distanciel A22, alors jetez-y un coup d\'oeil !"
    },
    {
        "id": 2,
        "course": "EL22",
        "courseType": "elec",
        "date": "2023-12-10T23:00:00",
        "title": "AAP 4, 5 et 6 de PM1 !",
        "actionners": [
            "Lilit",
            "Flo",
            "William"
        ],
        "description": "On prépare le CC2 de PM en révisant les AAP 4, 5 et 6. Nous utiliserons l\'ECA du CC2 en distanciel A22, alors jetez-y un coup d\'oeil !"
    },
    {
        "id": 3,
        "course": "MT3",
        "courseType": "maths",
        "date": "2023-12-12T18:00:00",
        "title": "AAP 4, 5 et 6 de MT3 !",
        "actionners": [
            "Lilit",
            "Flo",
            "William"
        ],
        "description": "On prépare le CC2 de MT en révisant les AAP 4, 5 et 6. Nous utiliserons l\'ECA du CC2 en distanciel A22, alors jetez-y un coup d\'oeil !"
    },
    {
        "id": 4,
        "course": "IF2",
        "courseType": "info",
        "date": "2023-12-12T20:00:00",
        "title": "AAP 4, 5 et 6 de IF2 !",
        "actionners": [
            "Lilit",
            "Flo",
            "William"
        ],
        "description": "On prépare le CC2 de IF en révisant les AAP 4, 5 et 6. Nous utiliserons l\'ECA du CC2 en distanciel A22, alors jetez-y un coup d\'oeil !"
    }
]'; */
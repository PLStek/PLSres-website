<?php
require_once 'database.php';

header('Content-Type: application/json');

$result = $conn->query('SELECT id, title, difficulty, is_corrected, souce, topic_id FROM exercise');

$exercises = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode($exercises);


/* echo '[
    {
        "id": 1,
        "title": "Parcours d\'un BST",
        "difficulty": 3,
        "topicId": 1,
        "isCorrected": true,
        "source": "Tyuvetou"
    },
    {
        "id": 2,
        "title": "Parcours d\'une liste chaînée",
        "difficulty": 2,
        "topicId": 2,
        "isCorrected": false,
        "source": "Wiqiro"
    },
    {
        "id": 4,
        "title": "Inverse d\'une liste chaînée",
        "difficulty": 3,
        "topicId": 2,
        "isCorrected": false,
        "source": "Wiqiro"
    },
    {
        "id": 3,
        "title": "Parcours d\'un graphe",
        "difficulty": 4,
        "topicId": 3,
        "isCorrected": true,
        "source": "Wiqiro"
    }
]';
 */
<?php
require_once 'database.php';

header('Content-Type: application/json');

echo '[
    {
        "id": 1,
        "topic": "Arbres binaires",
        "course": "LO21",
        "courseType": "info"
    },
    {
        "id": 2,
        "topic": "Listes chaînées",
        "course": "LO21",
        "courseType": "meca"
    },
    {
        "id": 3,
        "topic": "Graphes",
        "course": "LO21",
        "courseType": "maths"
    }
]';

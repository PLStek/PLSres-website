<?php
$host = 'localhost';
$dbname = 'plsres';
$username = 'root';
$password = '';

try {
    $conn = new mysqli($host, $username, $password, $dbname);
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}

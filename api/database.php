<?php
$host = 'localhost';
$dbname = 'PLSres';
$username = 'root';
$password = '';

try {
    $conn = new mysqli($host, $username, $password, $dbname);
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}

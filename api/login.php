<?php
header('Content-Type: application/json');
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Headers: Authorization, Content-Type, Access-Control-Allow-Headers, X-Requested-With');

require_once 'database.php';

if (!isset($_SERVER['HTTP_AUTHORIZATION'])) {
    echo json_encode(array("success" => false, "message" => "Unauthorized"));
    exit;
}

$authHeader = $_SERVER['HTTP_AUTHORIZATION'];

list($type, $credentials) = explode(' ', $authHeader, 2);
list($username, $password) = explode(':', base64_decode($credentials));

if ($username != 'admin' || $password != 'admin') {
    echo json_encode(array("success" => false, "message" => "Unauthorized"));
    exit;
} else {
    echo json_encode(array("success" => true, "message" => "Authorized"));
    exit;
}
<?php
header('Content-Type: application/json');
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once 'database.php';

$method = $_SERVER["REQUEST_METHOD"];


if ($method != 'POST') {
    echo json_encode(array("success" => false, "message" => "Unauthorized"));
    exit;
}

$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

if ($email != 'admin' || $password != 'admin') {
    echo json_encode(array("success" => false, "message" => "Unauthorized"));
    exit;
} else {
    echo json_encode(array("success" => true, "message" => "Authorized"));
    exit;
}
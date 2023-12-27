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
    throw new Exception('This method is not allowed.');
    exit;
}

$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';


$query = "SELECT id, username, email, password_hash, actionneur, admin FROM user WHERE email = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $email);

$stmt->execute();
$result = $stmt->get_result()->fetch_assoc();
$stmt->close();


if (!$result || !isset($result['id'])) {
    echo json_encode(array("success" => false, "message" => "Cannot find user"));
    exit;
} else if (!password_verify($password, $result['password_hash'])) {
    echo json_encode(array("success" => false, "message" => "Wrong password"));
    exit;
} else {
    $user = array(
        "id" => $result['id'],
        "username" => $result['username'],
        "email" => $result['email'],
        "actionneur" => $result['actionneur'],
        "admin" => $result['admin']
    );
    echo json_encode(array("success" => true, "user" => $user));
}

exit;

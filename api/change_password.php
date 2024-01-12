<?php
header('Content-Type: application/json');
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once 'database.php';

$method = $_SERVER["REQUEST_METHOD"];

try {
    if ($method != 'POST') {
        throw new Exception('This method is not allowed');
    }

    if (!isset($_POST['email']) || !isset($_POST['oldPassword']) || !isset($_POST['newPassword'])) {
        throw new Exception('Missing parameters');
    }


    $email = $_POST['email'];
    $old_password = $_POST['oldPassword'];
    $new_password = $_POST['newPassword'];


    $query1 = "SELECT password_hash FROM user WHERE email = ?";
    $stmt1 = $conn->prepare($query1);
    $stmt1->bind_param("s", $email);

    $stmt1->execute();
    $result = $stmt1->get_result()->fetch_assoc();
    $stmt1->close();


    if (!$result || !isset($result['password_hash'])) {
        throw new Exception('User not found');
    } else if (!password_verify($old_password, $result['password_hash'])) {
        throw new Exception('Wrong password');
    } 
    
    $new_password_hash = password_hash($new_password, PASSWORD_BCRYPT);

    $query2 = "UPDATE user SET password_hash = ? WHERE email = ?";
    $stmt2 = $conn->prepare($query2);
    $stmt2->bind_param("ss", $new_password_hash, $email);

    $stmt2->execute();
    $stmt2->close();

    echo json_encode(array("success" => true));
} catch (Exception $e) {
    echo json_encode(array('success' => false, 'error' => $e->getMessage()));
}

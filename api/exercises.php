<?php
header('Content-Type: application/json');
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once 'database.php';

$method = $_SERVER["REQUEST_METHOD"];

function getExercises($id, $max_difficulty, $topic_id, $corrected_only)
{
    global $conn;

    $query = "SELECT id, title, difficulty, is_corrected, source, topic_id FROM exercise
    WHERE difficulty <= $max_difficulty";

    if ($id) {
        $query .= " AND id = $id";
    }

    if ($topic_id) {
        $query .= " AND topic_id = $topic_id";
    }

    if ($corrected_only == true) {
        $query .= " AND is_corrected = 1";
    }

    $result = $conn->query($query);

    $exercises = array();
    while ($row = $result->fetch_assoc()) {
        $exercises[] = array(
            'id' => $row['id'],
            'title' => $row['title'],
            'difficulty' => $row['difficulty'],
            'isCorrected' => $row['is_corrected'],
            'source' => $row['source'],
            'topicId' => $row['topic_id']
        );
    }

    return $exercises;
}

function getExerciseContent($id)
{
    $file = "content/exercises/ex_$id.html";
    if (file_exists($file)) {
        $content = file_get_contents($file);
        return base64_encode($content);
    } else {
        return "";
    }
}

function addExercise($title, $difficulty, $is_corrected, $source, $topic_id)
{
    global $conn;

    $query = "INSERT INTO exercise (title, difficulty, is_corrected, source, topic_id) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("siisi", $title, $difficulty, $is_corrected, $source, $topic_id);
    $stmt->execute();
    $stmt->close();
    return $conn->insert_id;
}

function compileContent($input)
{
    chdir("./plsres-exdb");

    $process = proc_open("python3 compile_plsmarkdown.py", array(
        0 => array("pipe", "r"),
        1 => array("pipe", "w"),
        2 => array("pipe", "w")
    ), $pipes);

    if (is_resource($process)) {
        fwrite($pipes[0], $input);
        fclose($pipes[0]);

        $output = stream_get_contents($pipes[1]);
        fclose($pipes[1]);

        $error = stream_get_contents($pipes[2]);
        fclose($pipes[2]);

        $return_value = proc_close($process);

        if ($return_value !== 0) {
            throw new Exception($error);
        }
        chdir("../");
        return $output;
    }
}

function updateExercise($id, $title, $difficulty, $is_corrected, $source, $topic_id)
{
    global $conn;

    $query = "UPDATE exercise SET title = ?, difficulty = ?, is_corrected = ?, source = ?, topic_id = ? WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("siisii", $title, $difficulty, $is_corrected, $source, $topic_id, $id);
    $stmt->execute();
    $stmt->close();
}


try {
    switch ($method) {
        case 'GET':
            $id = $_GET['id'] ?? null;
            $max_difficulty = $_GET['maxDifficulty'] ?? 5;
            $content = $_GET['content'] ?? false;
            $topic_id = $_GET['topicId'] ?? null;
            $corrected_only = $_GET['correctedOnly'] ?? false;
            $content = $_GET['content'] ?? false;

            $exercises = getExercises($id, $max_difficulty, $topic_id, $corrected_only);
            if ($content) {
                foreach ($exercises as &$exercise) {
                    $exercise['content'] = getExerciseContent($exercise['id']);
                }
            }

            echo json_encode($exercises);
            break;
        case 'POST':
            if (!isset($_POST['title']) || !isset($_POST['difficulty']) || !isset($_POST['isCorrected']) || !isset($_POST['source']) || !isset($_POST['topicId']) || !isset($_FILES['content']) || $_FILES['content']['error'] != 0) {
                throw new Exception('Missing parameters.');
            }
            $title = $_POST['title'];
            $difficulty = $_POST['difficulty'];
            $is_corrected = $_POST['isCorrected'];
            $source = $_POST['source'];
            $topic_id = $_POST['topicId'];
            $content = file_get_contents($_FILES['content']['tmp_name']);

            $id = addExercise($title, $difficulty, $is_corrected, $source, $topic_id);
            $compiled = compileContent($content);
            file_put_contents("content/exercises/ex_$id.html", $compiled);

            echo json_encode(array('success' => true));
            break;
        case 'PUT':
            $data = json_decode(file_get_contents('php://input'), true);
            if (!isset($data['id']) || !isset($data['title']) || !isset($data['difficulty']) || !isset($data['isCorrected']) || !isset($data['source']) || !isset($data['topicId'])) {
                throw new Exception('Missing parameters.');
            }
            $id = $data['id'];
            $title = $data['title'];
            $difficulty = $data['difficulty'];
            $is_corrected = $data['isCorrected'];
            $source = $data['source'];
            $topic_id = $data['topicId'];

            updateExercise($id, $title, $difficulty, $is_corrected, $source, $topic_id);
            echo json_encode(array('success' => true));
            break;
        default:
            break;
    }
} catch (Exception $e) {
    echo json_encode(array('success' => false, 'error' => $e->getMessage()));
}

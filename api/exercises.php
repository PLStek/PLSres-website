<?php
header('Content-Type: application/json');

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

    $exercises = $result->fetch_all(MYSQLI_ASSOC);

    return $exercises;
}

try {
    switch ($method) {
        case 'GET':
            $id = $_GET['id'] ?? null;
            $max_difficulty = $_GET['max_difficulty'] ?? 5;
            $content = $_GET['content'] ?? false;
            $topic_id = $_GET['topic_id'] ?? null;
            $corrected_only = $_GET['corrected_only'] ?? false;

            $exercises = getExercises($id, $max_difficulty, $topic_id, $corrected_only);

            echo json_encode($exercises);
            break;
        case 'POST':
            //TODO: rename 'thunbnail' to 'content'
            if (isset($_FILES['thumbnail']) && $_FILES['thumbnail']['error'] == 0) {
                $input_text = file_get_contents($_FILES['thumbnail']['tmp_name']);

                chdir("./plsres-exdb");
                
                $process = proc_open("python3 compile_plsmarkdown.py", array(
                    0 => array("pipe", "r"),
                    1 => array("pipe", "w"),
                    2 => array("pipe", "w")
                ), $pipes);

                if (is_resource($process)) {
                    fwrite($pipes[0], $input_text);
                    fclose($pipes[0]);
                
                    $output_text = stream_get_contents($pipes[1]);
                    fclose($pipes[1]);
                
                    $error_text = stream_get_contents($pipes[2]);
                    fclose($pipes[2]);
                
                    $return_value = proc_close($process);
                
                    if ($return_value !== 0) {
                        throw new Exception($error_text);
                    } else {
                        echo $output_text;
                    }
                }
            } else {
                throw new Exception('Missing parameters.');
            }
            break;
        default:
            break;
    }
} catch (Exception $e) {
    echo json_encode(array('success' => false, 'error' => $e->getMessage()));
}

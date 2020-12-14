<?php
    try {
        $conn = new PDO("mysql:host=localhost;dbname=A4", "root", "root");
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    catch(PDOException $e) {
        echo "Connection Failed: ".$e->getMessage();
    }
    try {
        $sql = "SELECT * FROM markers WHERE 1";
        $result = $conn->query($sql);
        if ($result->rowCount() > 0) {
            $rows = array();
            while($row = $result->fetch()) {
                $rows[] = $row;
            }
            $data = json_encode($rows);
        }
        else
            echo "Nothing to display";
    }
    catch(PDOException $e) {
        echo $e->getMessage();
    }
    $conn = null;
    echo $data;
?>
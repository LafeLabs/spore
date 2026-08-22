<?php

    $directoryName = isset($_GET["directory"]) ? basename($_GET["directory"]) : '';
    $targetPath = getcwd() . '/' . $directoryName;
    $files = array_diff(scandir($targetPath), ['.', '..']);
    echo json_encode(array_values($files));

?>

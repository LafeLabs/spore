<?php

    $files = scandir(getcwd());
    $dirs = array_filter($files, function ($value) {
        return $value[0] !== '.' && is_dir($value);
    });
    echo json_encode(array_values($dirs));

?>

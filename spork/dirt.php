<?php
    $data = $_GET["data"]; //get data 
    $name = $_GET["name"];//get filename
    $file = fopen($name,"w");// create new file with this name
    fwrite($file,$data); //write data to file
    fclose($file);  //close file
?>
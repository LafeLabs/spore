<!-- 
this program generates the file dna.txt which lists the files to replicate 
-->
<a style ="font-family:Arial;color:blue;font-size:1.5em;" href = "index.html">index.html</a>
<br>
<br>
<pre>
<?php

    $files = scandir(getcwd());

    $file_set =[];     
    foreach($files as $value){
        if( substr($value,-5) == ".html" || substr($value,-5) == ".json" || substr($value,-4) == ".css" || substr($value,-3) == ".js" || substr($value,-3) == ".md" || substr($value,-4) == ".txt" || substr($value,-6) == ".ipynb" || substr($value,-4) == ".php"  || substr($value,-3) == ".py"){
            array_push($file_set,$value);
        }
    }

    echo json_encode($file_set,JSON_PRETTY_PRINT);
    $file = fopen("spore.json","w");// create new file with this name
    fwrite($file,json_encode($file_set,JSON_PRETTY_PRINT)); //write data to file
    fclose($file);  //close file
?>
</pre>
<br>

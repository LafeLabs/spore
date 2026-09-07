<?php

if(isset($_GET["branch"])){
    $branch = $_GET["branch"];
    mkdir($branch);

    $targetPath = getcwd() . '/';
    $files = array_diff(scandir($targetPath), ['.', '..']);
    foreach ($files as $file) {
        @copy($file,$branch."/".$file);
    }
    
}
else{

    
}





?>
<a href = "<?php echo $branch?>/index.html"><?php echo $branch?>/index.html
</a>

<style>
body{
    font-size:3em;
    font-family:arial;
}
a{
    font-size:3em;
    color:blue;
}
</style>
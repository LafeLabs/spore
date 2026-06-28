<?php
$spore = "https://raw.githubusercontent.com/LafeLabs/spore/refs/heads/main/spore.php";
$baseurl = explode("spore.php",$spore)[0];

@copy($baseurl."index.html","index.html");
@copy($baseurl."spore-editor.html","spore-editor.html");
@copy($baseurl."save-file.php","save-file.php");
@copy($baseurl."save-file-get.php","save-file-get.php");
@copy($baseurl."load-file.php","load-file.php");
@copy($baseurl."list-files.php","list-files.php");
@copy($baseurl."list-directories.php","list-directories.php");
@copy($baseurl."README.md","README.md");
@copy($baseurl."spore.php","spore.php");//comment out to keep existing spore
@copy($baseurl."wall.txt","wall.txt");//comment out to keep existing spore

?>
<a href = "index.html">index.html</a>
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
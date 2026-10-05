<?php

if(isset($_GET["branch"])){
    $branch = $_GET["branch"];
    mkdir($branch);

    $targetPath = getcwd() . '/';
    $files = array_diff(scandir($targetPath), ['.', '..']);
    
    $code_files = [];
    $allowed_extensions = ['txt', 'html', 'css', 'js', 'json', 'php', 'md', 'sh', 'bat', 'ipynb', 'py'];
    
    foreach ($files as $file) {
        $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
        if (in_array($ext, $allowed_extensions)) {
            $code_files[] = $file;
        }
    }
    
    foreach ($code_files as $file) {
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
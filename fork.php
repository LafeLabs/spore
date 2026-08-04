<?php

if(isset($_GET["fork"])){
    $fork = $_GET["fork"];
}
else{
    $fork = "spork";
}

$sporeUrl = "spore.json";

$files = json_decode(file_get_contents($sporeUrl), true);

mkdir($fork);

foreach ($files as $file) {
    @copy($file,$fork."/".$file);
}

?>
<a href = "<?php echo $fork?>/index.html"><?php echo $fork?>/index.html</a>
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
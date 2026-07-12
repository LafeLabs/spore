<?php
$sporeUrl = "https://raw.githubusercontent.com/LafeLabs/spore/refs/heads/main/spore.json";

$baseUrl = explode("spore.json",$sporeUrl)[0];

$files = json_decode(file_get_contents($sporeUrl), true);

foreach ($files as $file) {
    @copy($baseUrl.$file,$file);
}


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
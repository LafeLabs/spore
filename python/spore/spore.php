<?php
    $sporeUrl = "https://raw.githubusercontent.com/LafeLabs/spore/refs/heads/main/python/spore.json";
    $baseUrl = explode("spore.json",$sporeUrl)[0];
    $spore = json_decode(file_get_contents($sporeUrl), true);
    $files = $spore['files'];    
    foreach ($files as $file) {
        @copy($baseUrl.$file,$file);
    }
?>
<a href = "index.html">index.html</a>
<style>
a{
    font-size:3em;
    color:blue;
    font-family:arial;
}
</style>
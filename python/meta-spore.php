<a style ="font-family:Arial;color:blue;font-size:1.5em;" href = "index.html">index.html</a>
<br>
<a style ="font-family:Arial;color:blue;font-size:1.5em;" href = "editor.html">editor.html</a>
<br>
<pre>

<?php
    $file_set = glob("*.{html,json,css,js,md,txt,ipynb,php,py,sh}", GLOB_BRACE);
    echo json_encode($file_set, JSON_PRETTY_PRINT);
    file_put_contents("spore.json", json_encode($file_set, JSON_PRETTY_PRINT));
?>

</pre>
<br>

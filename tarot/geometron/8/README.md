# [list-files.php](https://github.com/LafeLabs/spore/blob/main/tarot/8/)

![](https://raw.githubusercontent.com/LafeLabs/spore/refs/heads/main/tarot/spore/card8.png)

# [STRENGTH](https://en.wikipedia.org/wiki/Strength_(Tarot_card))

![](https://upload.wikimedia.org/wikipedia/commons/f/f5/RWS_Tarot_08_Strength.jpg)

# Scroll


# DESCRIPTION

[list-files.php](https://github.com/LafeLabs/spore/blob/main/list-files.php) IS A [PHP](https://en.wikipedia.org/wiki/PHP) SCRIPT WHITCH LISTS FILES.

# PHP CODE:


```
<?php
        $directoryName = isset($_GET["directory"]) ? basename($_GET["directory"]) : '';
        $targetPath = getcwd() . '/' . $directoryName;
        $files = array_diff(scandir($targetPath), ['.', '..']);
        echo json_encode(array_values($files));    
?>
```

# JAVASCRIPT EXAMPLE CODE


```
fetch('list-files.php')
    .then(xhr => xhr.json())
    .then(files => {
        for (var index = 0; index < files.length; index++) {
            if (files[index].substring(files[index].length - 5, files[index].length) == ".html" && files[index] != "index.html") {
                var newa = document.createElement("A");
                newa.href = files[index];
                newa.innerHTML = files[index];
                document.getElementById("html-files").appendChild(newa);
            }
        }
    });
   
```
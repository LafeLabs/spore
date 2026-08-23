# [list-files.php](https://github.com/LafeLabs/spore/blob/main/tarot/8/README.md)

![](https://raw.githubusercontent.com/LafeLabs/spore/refs/heads/main/tarot/spore/card8.png)

# [STRENGTH](https://en.wikipedia.org/wiki/Strength_(Tarot_card))

![]()

# Scroll




## DESCRIPTION

[list-files.php](https://github.com/LafeLabs/spore/blob/main/list-files.php) IS A [PHP](https://en.wikipedia.org/wiki/PHP) SCRIPT WHITCH LISTS FILES.

## PHP CODE:


```
<?php
        $directoryName = isset($_GET["directory"]) ? basename($_GET["directory"]) : '';
        $targetPath = getcwd() . '/' . $directoryName;
        $files = array_diff(scandir($targetPath), ['.', '..']);
        echo json_encode(array_values($files));    
?>
```
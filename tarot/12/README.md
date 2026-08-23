# [delete-fork.php](https://github.com/LafeLabs/spore/blob/main/tarot/12/README.md)

![](https://raw.githubusercontent.com/LafeLabs/spore/refs/heads/main/tarot/spore/card12.png)

# [THE HANGED MAN](https://en.wikipedia.org/wiki/The_Hanged_Man_(tarot_card))

![](https://upload.wikimedia.org/wikipedia/commons/e/e0/RWS_Tarot_11_Justice.jpg)

# Scroll


## DESCRIPTION

[delete-fork.php](https://github.com/LafeLabs/spore/blob/main/list-files.php) IS A [PHP](https://en.wikipedia.org/wiki/PHP) SCRIPT WHICH DELETES FORKS.

## PHP CODE

```
<?php

$branchname = $_POST["fork"];//get name of branch to delete

rrmdir($branchname);//run recursive delet function

function rrmdir($src) {
    $dir = opendir($src);
    while(false !== ( $file = readdir($dir)) ) {
        if (( $file != '.' ) && ( $file != '..' )) {
            $full = $src . '/' . $file;
            if ( is_dir($full) ) {
                rrmdir($full);
            }
            else {
                unlink($full);//this is the delete command
            }
        }
    }
    closedir($dir);
    rmdir($src);
}


?>
```
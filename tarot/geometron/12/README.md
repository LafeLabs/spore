# [ICON](https://github.com/LafeLabs/spore/blob/main/tarot/12/)

![](https://raw.githubusercontent.com/LafeLabs/spore/refs/heads/main/tarot/spore/card12.png)

# [THE HANGED MAN](https://en.wikipedia.org/wiki/The_Hanged_Man_(tarot_card))

![](https://upload.wikimedia.org/wikipedia/commons/2/2b/RWS_Tarot_12_Hanged_Man.jpg)

# Scroll


# DESCRIPTION

[delete-fork.php](https://github.com/LafeLabs/spore/blob/main/list-files.php) IS A [PHP](https://en.wikipedia.org/wiki/PHP) SCRIPT WHICH DELETES FORKS.

# PHP CODE

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

# JAVASCRIPT EXAMPLE CODE

```
fetch("delete-fork.php", {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
  },
  body: "fork=" + encodeURIComponent(deadfork)
});

```
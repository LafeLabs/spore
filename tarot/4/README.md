# [meta-spore.php](https://github.com/LafeLabs/spore/blob/main/tarot/4/)

![](https://raw.githubusercontent.com/LafeLabs/spore/refs/heads/main/tarot/spore/card4.png)

# [THE EMPEROR](https://en.wikipedia.org/wiki/The_Emperor_(Tarot_card))

![](https://upload.wikimedia.org/wikipedia/commons/c/c3/RWS_Tarot_04_Emperor.jpg)

# Scroll


# DESCRIPTION

[meta-spore.php](https://github.com/LafeLabs/spore/blob/main/meta-spore.php) IS A PHP SCRIPT WHICH CREATES [spore.json](https://github.com/LafeLabs/spore/blob/main/spore.json).

## PHP CODE

```
<?php
    $file_set = glob("*.{html,json,css,js,md,txt,ipynb,php,py,sh}", GLOB_BRACE);
    echo json_encode($file_set, JSON_PRETTY_PRINT);
    file_put_contents("spore.json", json_encode($file_set, JSON_PRETTY_PRINT));
?>
```
## [glob](https://www.php.net/manual/en/function.glob.php)
## [GLOB_BRACE](https://www.php.net/manual/en/filesystem.constants.php#constant.glob-brace)
## [echo](https://www.php.net/manual/en/function.echo.php)
## [json_encode](https://www.php.net/manual/en/function.json-encode.php)
## [JSON_PRETTY_PRINT](https://www.php.net/manual/en/json.constants.php#constant.json-pretty-print)
## [file_put_contents](https://www.php.net/manual/en/function.file-put-contents.php)
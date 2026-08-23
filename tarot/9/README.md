# [list-directories.php](https://github.com/LafeLabs/spore/blob/main/tarot/9/)

![](https://raw.githubusercontent.com/LafeLabs/spore/refs/heads/main/tarot/spore/card9.png)

# [THE HERMIT](https://en.wikipedia.org/wiki/The_Hermit_(Tarot_card))

![](https://upload.wikimedia.org/wikipedia/commons/4/4d/RWS_Tarot_09_Hermit.jpg)

# Scroll



# DESCRIPTION

[list-directories.php](https://github.com/LafeLabs/spore/blob/main/list-files.php) IS A [PHP](https://en.wikipedia.org/wiki/PHP) SCRIPT WHITCH LISTS DIRECTORIES.

## [list-directories.php](https://github.com/LafeLabs/spore/blob/main/list-directories.php) CODE:

# PHP CODE

```
<?php
        $files = scandir(getcwd());
        $dirs = array_filter($files, function ($value) {
            return $value[0] !== '.' && is_dir($value);
        });
        echo json_encode(array_values($dirs));
?>
```

## [scandir](https://www.php.net/manual/en/function.scandir.php)
## [getcwd](https://www.php.net/manual/en/function.getcwd.php)
## [array_filter](https://www.php.net/manual/en/function.array-filter.php)
## [function](https://www.php.net/manual/en/functions.user-defined.php)
## [return](https://www.php.net/manual/en/function.return.php)
## [is_dir](https://www.php.net/manual/en/function.is-dir.php)
## [&&](https://www.php.net/manual/en/language.operators.logical.php)
## [!==](https://www.php.net/manual/en/language.operators.comparison.php)
## [echo](https://www.php.net/manual/en/function.echo.php)
## [json_encode](https://www.php.net/manual/en/function.json-encode.php)
## [array_values](https://www.php.net/manual/en/function.array-values.php)


## JAVASCRIPT EXAMPLE

```
directories = [];

fetch('list-directories.php')
    .then(xhr => xhr.json())
    .then(data => {
        directories = data;
        
        var newa = document.createElement("A");
        newa.innerHTML = "up a level (../)";
        newa.href = "../";
        document.getElementById("directories").appendChild(newa);
        
        for (var index = 0; index < directories.length; index++) {
            var newa = document.createElement("A");
            newa.innerHTML = directories[index] + "/";
            newa.href = directories[index] + "/";
            document.getElementById("directories").appendChild(newa);
        }
    });
```
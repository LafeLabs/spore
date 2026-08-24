# [LASER](https://github.com/LafeLabs/spore/blob/main/tarot/geometron/10/)

![](https://raw.githubusercontent.com/LafeLabs/spore/refs/heads/main/tarot/spore/card10.png)

# [WHEEL OF FORTUNE](https://en.wikipedia.org/wiki/Wheel_of_Fortune_(Tarot_card))

![](https://upload.wikimedia.org/wikipedia/commons/3/3c/RWS_Tarot_10_Wheel_of_Fortune.jpg)

# Scroll


# DESCRIPTION

[fork.php](https://github.com/LafeLabs/spore/blob/main/list-files.php) IS A [PHP](https://en.wikipedia.org/wiki/PHP) SCRIPT WHITCH FORKS THE SPORE TREE.

# PHP CODE:

```
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

```

## [isset](https://www.php.net/manual/en/function.isset.php)
## [_GET](https://www.php.net/manual/en/reserved.variables.get.php)
## [if](https://www.php.net/manual/en/control-structures.if.php)
## [else](https://www.php.net/manual/en/control-structures.else.php)
## [json_decode](https://www.php.net/manual/en/function.json-decode.php)
## [file\_get\_contents](https://www.php.net/manual/en/function.file-get-contents.php)
## [mkdir](https://www.php.net/manual/en/function.mkdir.php)
## [foreach](https://www.php.net/manual/en/control-structures.foreach.php)
## [copy](https://www.php.net/manual/en/function.copy.php)
## [@](https://www.php.net/manual/en/language.operators.errorcontrol.php)

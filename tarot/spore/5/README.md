# [spore.php](https://github.com/LafeLabs/spore/tree/main/tarot/spore/5)

[spore.php](https://github.com/LafeLabs/spore/blob/main/spore.php) IS A PHP SCRIPT WHICH REPLICATES ALL THE FILES IN [spore.json](https://github.com/LafeLabs/spore/blob/main/spore.json) FROM ONE HOST TO ANOTHER ACROSS THE OPEN TRASH MAGIC WEB.

## spore.php CODE:

```
<?php
    $sporeUrl = "https://raw.githubusercontent.com/LafeLabs/spore/refs/heads/main/spore.json";
    $baseUrl = explode("spore.json",$sporeUrl)[0];
    $files = json_decode(file_get_contents($sporeUrl), true);
    foreach ($files as $file) {
        @copy($baseUrl.$file,$file);
    }
?>
```
## [spore.json RAW DATA](https://raw.githubusercontent.com/LafeLabs/spore/refs/heads/main/spore.json)
## [explode](https://www.php.net/manual/en/function.explode.php)
## [json_decode](https://www.php.net/manual/en/function.json-decode.php)
## [foreach](https://www.php.net/manual/en/control-structures.foreach.php)
## [copy](https://www.php.net/manual/en/function.copy.php)
## [@](https://www.php.net/manual/en/language.operators.errorcontrol.php)
## [string operators](https://www.php.net/manual/en/language.operators.string.php)

![PHOTOGRAPH OF CARD](card.png)

# [THE HEIROPHANT](https://en.wikipedia.org/wiki/The_Hierophant)

![WIKIPEDIA IMAGE](https://upload.wikimedia.org/wikipedia/commons/8/8d/RWS_Tarot_05_Hierophant.jpg)

USE 4 BY 6 INCH THERMAL PRINTER TO PRINT STIKERS AND PUT THEM ON THE CARDBOARD!

# [METASPORE](https://metaspore.net/tarot/spore/5/)
# [LOCALHOST](http://localhost/spore/tarot/spore/5/)
# [LOCALHOST/HERE](http://localhost/spore/tarot/spore/5/readme.html)


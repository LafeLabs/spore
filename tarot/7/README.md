# [save-file.php](https://github.com/LafeLabs/spore/blob/main/tarot/7/README.md)

![](https://raw.githubusercontent.com/LafeLabs/spore/refs/heads/main/tarot/spore/card7.png)

# [THE CHARIOT](https://en.wikipedia.org/wiki/The_Chariot_(Tarot_card))

![](https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg)

# Scroll


## DESCRIPTION

[save-file.php](https://github.com/LafeLabs/spore/blob/main/save-file.php) SAVES DATA AS A FILE IN LOCAL FILE SYSTEM!

## PHP CODE

```
<?php
    $data = $_POST["data"]; //get data 
    $filename = $_POST["filename"];//get filename
    $file = fopen($filename,"w");// create new file with this name
    fwrite($file,$data); //write data to file
    fclose($file);  //close file
?>
```

## JAVASCRIPT EXAMPLE:

```
    data = encodeURIComponent(JSON.stringify(stack,null,"    "));
    fetch('save-file.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        body: 'data=' + data + '&filename=stack.json'
    });    
```
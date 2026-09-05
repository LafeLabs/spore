# [delete-file.php](https://github.com/LafeLabs/spore/blob/main/delete-file.php)

![](https://raw.githubusercontent.com/LafeLabs/spore/refs/heads/main/tarot/spore/card11.png)

# [JUSTICE](https://en.wikipedia.org/wiki/Justice_(Tarot_card))

![](https://upload.wikimedia.org/wikipedia/commons/e/e0/RWS_Tarot_11_Justice.jpg)

# Scroll


# DESCRIPTION

[delete-file.php](https://github.com/LafeLabs/spore/blob/main/list-files.php) IS A [PHP](https://en.wikipedia.org/wiki/PHP) SCRIPT WHICH DELETES FILES.

# PHP CODE:

```
 <?php
    $filename = $_POST["filename"];
    unlink($filename);
?>
```

# JAVASCRIPT EXAMPLE CODE

```
fetch("delete-file.php", {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
  },
  body: "filename=" + encodeURIComponent(fileName)
});
```
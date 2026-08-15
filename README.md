![](qrcode.png)

# [spore](r)

self-replicating web swarm

## Replicate:

 - buy a domain or get a subdomain from someone
 - get a digital ocean account and set up a droplet
 - point name servers to 
    - NS1.DIGITALOCEAN.COM
    - NS2.DIGITALOCEAN.COM
    - NS3.DIGITALOCEAN.COM
 - in digital ocean web interface, go to dashboard -> create domain -> and put in the domain name
 - add an A record for @ and point to the droplet
 - add an A record for www and point to the droplet
 - ssh root@[ip address of droplet] (use PowerShell if in Windows)
 - ```sudo apt update```
 - ```sudo apt install apache2 -y```
 - ```sudo apt install php libapache2-mod-php -y```
 - ```mkdir -p /var/www/[DOMAIN]/public_html```
 - ```cd /var/www/[DOMAIN]/public_html```
 - ```sudo curl -o spore.php https://raw.githubusercontent.com/LafeLabs/spore/refs/heads/main/spore.php```
 - ```php spore.php```
 - ```cd /etc/apache2/sites-available/```
 - ```sudo curl -o template.conf https://raw.githubusercontent.com/LafeLabs/spore/refs/heads/main/template.conf.txt```
 - ```cp template.conf [DOMAIN].conf```
 - ```sed -i "s/TEMPLATE_DOMAIN/[DOMAIN]/g" [DOMAIN].conf```
 - ```a2ensite [DOMAIN].conf```
 - ```systemctl restart apache2```
 - ```certbot --apache -d [DOMAIN]```
 - ```chown -R www-data:www-data /var/www/[DOMAIN]/public_html```

## Spore.php

```
<?php
$sporeUrl = "https://raw.githubusercontent.com/LafeLabs/spore/refs/heads/main/spore.json";

$baseUrl = explode("spore.json",$sporeUrl)[0];

$files = json_decode(file_get_contents($sporeUrl), true);

foreach ($files as $file) {
    @copy($baseUrl.$file,$file);
}


?>
<a href = "index.html">index.html</a>
<style>
body{
    font-size:3em;
    font-family:arial;
}
a{
    font-size:3em;
    color:blue;
}
</style>
```


## Spore.json

```

[
    "README.md",
    "delete-file.php",
    "delete-fork.php",
    "editor.html",
    "feed.html",
    "feed.json",
    "fork.html",
    "fork.php",
    "freebox.html",
    "index.html",
    "list-directories.php",
    "list-files.php",
    "load-file.php",
    "meta-spore.php",
    "mushroom.txt",
    "qrcode.html",
    "readme.html",
    "save-file.php",
    "spore.html",
    "spore.json",
    "spore.php",
    "stack.html",
    "template.conf.txt",
    "upload-image.php",
    "wall.txt"
]

```
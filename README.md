# [spore](https://github.com/lafelabs/spore/)

self-replicating web swarm

```
[
    "README.md",
    "delete-file.php",
    "delete-fork.php",
    "editor.html",
    "fork.html",
    "fork.php",
    "freebox.html",
    "index.html",
    "list-directories.php",
    "list-files.php",
    "load-file.php",
    "market.html",
    "market.txt",
    "meta-spore.php",
    "news.html",
    "news.txt",
    "qrcode.html",
    "readme.html",
    "save-file.php",
    "spore.html",
    "spore.json",
    "spore.php",
    "upload-image.php",
    "wall.txt"
]
```

## Replicate [https://trashrobot.org](https://trashrobot.org):

 - buy a domain or get a subdomain from someone
 - point name servers to 
    - NS1.DIGITALOCEAN.COM
    - NS2.DIGITALOCEAN.COM
    - NS3.DIGITALOCEAN.COM
 - get a digital ocean account and set up a droplet
 - ```sudo apt update```
 - ```sudo apt install apache2 -y```
 - ```sudo apt install php libapache2-mod-php -y```
 - in digital ocean web interface, go to dashboard -> create domain -> and put in the domain name
 - add an A record for @ and point to the droplet
 - add an A record for www and point to the droplet
 - get ssh set up and log in from command line
 - ```mkdir -p /var/www/[DOMAIN]/public_html```
 - ```cd /var/www/[DOMAIN]/public_html```
 - ```sudo curl -o spore.php https://raw.githubusercontent.com/LafeLabs/spore/refs/heads/main/spore.php ```
 - ```php spore.php```
 - ```cd /etc/apache2/sites-available/```
 - ```cp southplatte.net.conf [SUBDOMAIN].[DOMAIN].net.conf```
 - ```a2ensite [DOMAIN].conf```
 - ```systemctl restart apache2```
 - ```certbot --apache -d [DOMAIN]```
 - ```chown -R www-data:www-data /var/www/[SUBDOMAIN].[DOMAIN].net/public_html```

 



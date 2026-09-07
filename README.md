![](qrcode.png)

# [spore](https://github.com/lafelabs/spore/)

```
sudo curl -o spore.php https://raw.githubusercontent.com/LafeLabs/spore/refs/heads/main/spore.php
php spore.php
```

## Live Web Pages

 - [https://metaspore.net/](https://metaspore.net/)
 - [https://trashrobot.net/](https://trashrobot.net/)
 - [https://trashrobot.org/](https://trashrobot.org/)
 - [https://aerostatpark.net/](https://aerostatpark.net/)
 - [https://composttheology.net/](https://composttheology.net/)
 - [https://soiltheology.net/](https://soiltheology.net/)
 - [https://southplatte.net](https://southplatte.net)
 - [https://basemar.lol/](https://basemar.lol/)
 - [https://unionstation.lol/](https://unionstation.lol/)
 - [https://skoolie.lol/](https://skoolie.lol/)
 - [https://schoolie.lol](https://schoolie.lol)
 - [https://sprintervan.lol](https://sprintervan.lol)
 - [https://quantumnoise.org/](https://quantumnoise.org/)
 - [https://magicspore.net/](https://magicspore.net/)
 - [https://denverbus.net](https://denverbus.net)


## Replication Path:

 - [buy a domain](https://porkbun.com/) or get a subdomain from someone for your local trash  magic universe
 - get a [digital ocean](https://www.digitalocean.com/) account and set up a droplet
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



## Black Flags

![](black-flag-1.png)
![](black-flag-2.png)
![](black-flag-3.png)
![](black-flag-4.png)
![](black-flag-5.png)
![](black-flag-6.png)
![](black-flag-7.png)
![](black-flag-8.png)
![](black-flag-9.png)
![](black-flag-10.png)
![](black-flag-11.png)
![](black-flag-12.png)

## Cardboard Signs

![](cardboard-sign-1.png)
![](cardboard-sign-2.png)
![](cardboard-sign-3.png)
![](cardboard-sign-4.png)
![](cardboard-sign-5.png)
![](cardboard-sign-6.png)

## Rocks

![](rock-1.png)
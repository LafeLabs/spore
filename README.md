# [spore](https://github.com/lafelabs/spore/)

self-replicating web swarm

## Replicate [https://trashrobot.org](https://trashrobot.org):

 - buy a domain or get a subdomain from someone
 - get a digital ocean account and set up a droplet
 - point name servers to 
    - NS1.DIGITALOCEAN.COM
    - NS2.DIGITALOCEAN.COM
    - NS3.DIGITALOCEAN.COM
 - in digital ocean web interface, go to dashboard -> create domain -> and put in the domain name
 - add an A record for @ and point to the droplet
 - add an A record for www and point to the droplet
 - ```mkdir -p /var/www/[SUBDOMAIN].[DOMAIN].net/public_html```
 - ```cd /etc/apache2/sites-available/```
 - ```cp southplatte.net.conf [SUBDOMAIN].[DOMAIN].net.conf```
 - ```cp southplatte.net.conf [SUBDOMAIN].[DOMAIN].net.conf```
 - ```vi [SUBDOMAIN].[DOMAIN].net.conf```
 

* Change `ServerName` to `[SUBDOMAIN].[DOMAIN].net`
* **Delete** the `ServerAlias www...` line entirely.
* Update `DocumentRoot` path to `/var/www/[SUBDOMAIN].[DOMAIN].net/public_html`
* Update `<Directory>` path to `/var/www/[SUBDOMAIN].[DOMAIN].net/public_html`

 - ```a2ensite [SUBDOMAIN].[DOMAIN].net.conf```
 - ```systemctl restart apache2```
 - ```chown -R www-data:www-data /var/www/[SUBDOMAIN].[DOMAIN].net/public_html```
 - ```certbot --apache -d [SUBDOMAIN].[DOMAIN].net```
 - ```chown -R www-data:www-data /var/www/[SUBDOMAIN].[DOMAIN].net/public_html```

 



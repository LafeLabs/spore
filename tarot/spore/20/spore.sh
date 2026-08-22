sudo apt update 
sudo apt install apache2 -y
sudo apt install php libapache2-mod-php -y
mkdir -p /var/www/[DOMAIN]/public_html
chown -R www-data:www-data /var/www/[DOMAIN]/public_html
cd /var/www/[DOMAIN]/public_html
sudo curl -o spore.php https://raw.githubusercontent.com/LafeLabs/spore/refs/heads/main/spore.php
php spore.php
cd /etc/apache2/sites-available/
sudo curl -o template.conf https://raw.githubusercontent.com/LafeLabs/spore/refs/heads/main/template.conf.txt
cp template.conf [DOMAIN].conf
sed -i "s/TEMPLATE_DOMAIN/[DOMAIN]/g" [DOMAIN].conf
a2ensite [DOMAIN].conf
systemctl restart apache2
certbot --apache -d [DOMAIN]

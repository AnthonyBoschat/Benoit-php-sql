• Installer PHP : 

sudo apt install php-fpm
a2enmod proxy_fcgi setenvif
a2enconf php8.2-fpm
sudo service apache2 restart
-> Voir disponibilité sur localhost

• Créer fichier index.php (sudo touch index.php) dans /var/www/html et ajouter la ligne : 

<?php

die("coucou");


• Vérifier accessibilité dans localhost/index.php


-> Si erreur -> A mettre dans /etc/apache2/sites-enabled en sudo (vim) -> editer "000-default.conf", à rajouter :

<FilesMatch \.php$>
    SetHandler application/x-httpd-php
	SetHandler "proxy:unix:/var/run/php/php8.2-fpm.sock|fcgi://localhost"
</FilesMatch>

i = insertion
echap = sortir de l'insertion
:wq = write and quit

/var/run/php/php8.2-fpm.sock

• Redémarrer le serveur apache :

sudo service apache2 restart

• BUG CORS -> Si erreur -> A mettre dans /etc/apache2/sites-enabled en sudo (vim) -> editer "000-default.conf", à rajouter :

<IfModule mod_headers.c>
    Header add Access-Control-Allow-Origin "*"
    Header add Access-Control-Allow-Headers "*"
    Header add Access-Control-Allow-Methods "PUT, GET, POST, DELETE, OPTIONS"
</IfModule>
+
sudo vim /etc/apache2/apache2.conf
+ ecrire
LoadModule headers_module modules/mod_headers.so
+
sudo a2enmod headers
+
sudo service apache2 restart






DEMARRER serveur

sudo service apache2 start
sudo /etc/init.d/php8.2-fpm start
sudo service mariadb start










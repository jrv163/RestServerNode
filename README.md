## WebServer + RestServer

Recordar que se debe ejecutar el comando ```npm install``` para reconstruir los modulos de Node

## Configuración archivo .env 

PORT=8080

Se debe crear una cuenta en Mongodb Atlas, crear usuario y password, establecer connección con mongoBD compass y a su vez establecer la conección de la base de datos con la APP.

MONGODB_CNN=mongodb+srv://<````user_name````>:<```password```>@socialgroup.7xcryt8.mongodb.net/test


Tomar como ejemplo el archivo .example.env para configurar las variables de entorno. Utilizar el GOOGLE_CLIENT_ID o generar uno nuevo ( Tomar como guía la documentación de google Identity, https://developers.google.com/identity/gsi/web/guides/overview?hl=es-419 ) para configurar el GOOGLE_CLIENT_ID si lo desea.


## Documentación

https://documenter.getpostman.com/view/20774596/2s93ebSWLp
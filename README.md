
# Formulario de Reclutamiento
Este es el formulario de la Página Web de Vamos que se utiliza para reclutamiento. El mismo recibe los campos via POST, valida a través de un captcha, y los sube a un Google Sheet determinado.

## Instalación
Solo clona el repositorio, corre `npm i` para instalar las dependencias y ya se puede utilizar la aplicación. Sin embargo, esta requiere de ciertas variables de entorno para ejecutar correctamente.

## Credenciales y Variables de Entorno
La aplicación obtiene los credenciales para acceder a sheets a través de la [Consola de Developer de Google](https://console.developers.google.com/project). Aqui se obtiene un archivo JSON con los service account credentials. La dirección de donde se encuentra este archivo se especifica en la variable de entorno *CREDENTIALS*.

El Google Sheet que se utilizará para subir la información se identifica por un ID que se puede obtener de la dirección del Sheet. Este id se debe colocar en la variable de entorno *GOOGLE_SHEET*.

La llave privada del Recaptcha se debe dar a través de la variable de entorno *RECAPTCHA_KEY*.

El puerto donde corre la aplicación se puede cambiar a través de la variable de entrorno *PORT*.

```bash
# Ubicación de las credenciales
CREDENTIALS=/path/to/credentials.json
# Id del Google Sheet
GOOGLE_SHEET=
# Llave privada del recaptcha para validación de servidor
RECAPTCHA_KEY=
# Puerto donde corre la aplicación
PORT=3001
```

## Google Sheet
También es necesario compartir el Google Sheet que esta aplicación va a editar con el service account email. Esta dirección de correo electrónico la puede encontrar en el archivo json de credenciales descrito arriba.

## Correr local
Para correr localmente, una vez esten seteadas las variables de ambiente, puedes correr con el comando `npm start`. Para correr con el debugger, ejecuta el comando `npm run debug`.

## Correr en Producción
Para correr en producción, puedes usar el comando `npm run production`.

## Docker
Para facilitar los deployment, hay una versión de Docker de esta aplicación en el repo [https://hub.docker.com/repository/docker/vamosporpanama/formulario-reclutamiento](vamosporpanama/formulario-reclutamiento:latest).

Este arranca en modo producción, siempre y cuando se pasen las variables antes mencionadas. Esta corre en el puerto 3001.

# nodeAPI - Anuncios
Api de Anuncios - software que se ejecuta en el servidor dando servicio a una app (API) de venta de artículos de segunda mano, llamada nodeApi. Con esta API se comunicará tanto la app versión iOS y como la versión Android. La pantalla principal de la app muestra una lista de anuncios y permite tanto buscar como poner filtros por varios criterios, por tanto la API a desarrollar deberá proveer los métodos necesarios para esto.

##Tecnologias
MongoDb, Express, Nodejs

##Servicios API
URL de documentacion de la API: http://localhost:3000/

##Ejecucion

####Inicializar base de datos
npm run installDB

####Iniciar servidor web API
npm start

##Funcionalidades

####Implementadas
- Crear app Express y probarla (express nodepop –ejs)
- Meter arranque con nodemon y DEBUG en scripts de package.json.
- Instalar Mongoose, modelo de anuncios y probarlo (con algún anuncio.save por ejemplo).
- Hacer un script de carga del json de anuncios, que se puede llamar p.e. install_db.js, que borre las tablas y cargue anuncios, y algún usuario. 
- Hacer un fichero README.md con las instrucciones de uso puede ser una muy buena idea, lo ponemos en la raiz del proyecto y si apuntamos ahí como arrancarlo, como inicializar la BD.
- Hacer una primera versión básica del API, por ejemplo GET /apiv1/anuncios que devuelva la lista de anuncios sin filtros.
- Mejorar la lista de anuncios poniendo filtros, paginación, etc.
- Registro & Autenticación JWT (json web token).
- Presenta consulta de anuncios unicamente a usuarios autenticados.
- Crear indice por email.
- Aprovechar recursos del servidor – cluster y clones.
- Documentación API.


####Pendientes
- Acceso a imagenes de anuncios
- Lista de tags existentes
- Internacionalizacion de errores personalizados.
- Automatizacion de control de calidad de codigo.
---
####Practica realizada por
Eduardo Vizuete
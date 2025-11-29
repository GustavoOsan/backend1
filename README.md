# Proyecto Final Backend 1 - Ecommerce

## Descripción
API RESTful para un ecommerce, desarrollada con Node.js, Express y MongoDB.

## Tecnologías
* Node.js & Express
* MongoDB & Mongoose
* Handlebars (Motor de plantillas)
* Websockets (Socket.io)

## Instalación
1.  Clonar el repositorio.
2.  Ejecutar `npm install`.
3.  Configurar la base de datos en `server.js` (o variables de entorno).
4.  Ejecutar `node server.js`.

## Endpoints Principales
* GET `/api/products` (Con paginación, sort y query)
* GET `/carts/:cid`
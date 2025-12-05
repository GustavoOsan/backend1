# 🛒 Backend Ecommerce - Websockets & Handlebars

Este proyecto es parte de la **Entrega N° 2** del curso de Backend. Consiste en una API RESTful para la gestión de productos y carritos de compra, integrada con un motor de plantillas (Handlebars) y comunicación en tiempo real (Socket.io).

El sistema permite visualizar, crear y eliminar productos, reflejando los cambios instantáneamente en todos los clientes conectados sin necesidad de recargar la página.

## 🚀 Características Principales

- **API REST Completa:** Endpoints para realizar CRUD de productos y gestión de carritos.
- **Motor de Plantillas:** Uso de `Handlebars` para visualizar los productos en el navegador.
- **Websockets (Socket.io):** Actualización de la lista de productos en tiempo real.
- **Persistencia de Datos:** Almacenamiento en archivos JSON (`FileSystem`).
- **Integración Híbrida (Bonus):** Las peticiones HTTP (POST/DELETE) realizadas desde herramientas externas (Postman/ThunderClient) disparan actualizaciones en tiempo real vía Websocket.
- **Diseño Responsive:** Interfaz estilizada con CSS puro y diseño de tarjetas.

## 🛠️ Tecnologías Utilizadas

- **Node.js** (Entorno de ejecución)
- **Express.js** (Framework web)
- **Socket.io** (Comunicación en tiempo real)
- **Express-Handlebars** (Motor de vistas)
- **CSS3** (Estilos visuales)


## ⚙️ Instalación y Uso

1.  **Clonar el repositorio:**
    ```bash
    git clone <URL_DE_TU_REPOSITORIO>
    ```

2.  **Instalar dependencias:**
    Ubícate en la carpeta raíz y ejecuta:
    ```bash
    npm install
    ```

3.  **Iniciar el servidor:**
    ```bash
    node server.js
    ```
    *El servidor iniciará en el puerto 8080.*

## 🖥️ Vistas Disponibles

| Ruta | Descripción | Tecnología |
| :--- | :--- | :--- |
| `http://localhost:8080/` | **Vista Home:** Muestra la lista de productos actual. Requiere recargar (F5) para ver cambios. | Handlebars + HTTP |
| `http://localhost:8080/realtimeproducts` | **Vista RealTime:** Muestra la lista y un formulario. Se actualiza automáticamente al crear/borrar productos. | Handlebars + Websockets |

## 📡 Documentación de la API

Puedes probar estos endpoints usando **Postman** o **Thunder Client**.

### Productos (`/api/products`)

* **GET** `/`
    * Obtiene todos los productos.
* **GET** `/:pid`
    * Obtiene un producto específico por ID.
* **POST** `/`
    * Crea un nuevo producto.
    * **Body (JSON):**
        ```json
        {
          "title": "Producto Prueba",
          "description": "Descripción del producto",
          "code": "ABC1234",
          "price": 250,
          "status": true,
          "stock": 25,
          "category": "Electrónica"
        }
        ```
    * *Nota: Esta acción dispara una actualización automática en la vista RealTime.*
* **PUT** `/:pid`
    * Actualiza un producto existente.
* **DELETE** `/:pid`
    * Elimina un producto por ID.
    * *Nota: Esta acción dispara una actualización automática en la vista RealTime.*

### Carritos (`/api/carts`)

* **POST** `/`
    * Crea un carrito vacío.
* **GET** `/:cid`
    * Lista los productos de un carrito específico.
* **POST** `/:cid/product/:pid`
    * Agrega un producto al carrito (incrementa cantidad si ya existe).

## 🧪 Testing

1.  Abre `http://localhost:8080/realtimeproducts` en tu navegador.
2.  Abre Postman/Thunder Client y envía una petición **POST** para crear un producto.
3.  Observa cómo el producto aparece automáticamente en el navegador sin recargar la página.
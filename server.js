const express = require('express');
const handlebars = require('express-handlebars');
const { Server } = require('socket.io');
const mongoose = require('mongoose'); 
const path = require('path');
const productsRouter = require('./routes/products.router.js');
const cartsRouter = require('./routes/carts.router.js');
const viewsRouter = require('./routes/views.router.js');

const app = express();
const PORT = 8080;

mongoose.connect('mongodb://localhost:27017/ecommerce')
    .then(() => {
        console.log("Conectado a la base de datos 'ecommerce' correctamente");
    })
    .catch((error) => {
        console.error("Error al conectar a la base de datos:", error);
    });


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');


const httpServer = app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

const socketServer = new Server(httpServer);

app.use((req, res, next) => {
    req.context = { socketServer };
    next();
});


app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

socketServer.on('connection', (socket) => {
    console.log('Nuevo cliente conectado por Websocket');
});
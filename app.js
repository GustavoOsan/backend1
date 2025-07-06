const express = require('express');
const app = express();
const PORT = 8080;


app.get('/', (req, res) => {
    res.send("Estoy escuchando tu petición");
})

app.get('/consulta', (req, res) => {
    res.json({
        message: "Estoy escuchando tu petición en la ruta /consulta",
    })
})

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
})
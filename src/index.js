const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();
const userRutas = require("./routes/user");
const app = express();
const port = 7002;

//Middleware
app.use(express.json());

//Rutas
app.use('/api', userRutas);

// Servir archivos estáticos desde la carpeta public
app.use(express.static('public'));

// Conexión a MongoDB
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Conectado a la BD Mongo Closter0'))
    .catch((error) => console.error(error));

// Iniciar el servidor
app.listen(port, () => console.log('Servidor funcionando en puerto', port));

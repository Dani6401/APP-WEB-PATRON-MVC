const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();
const userRutas = require("./routes/user");
const app = express();
const port = 7000;

//Middleware
app.use(express.json());

//Rutas
app.use('/api', userRutas);


//rutas 
app.get('/', (req,res) => {
    res.send('Bienvenido a mi API')
})

//Mongo Conexion 
mongoose
.connect(process.env.MONGODB_URI)
.then(() => console.log('Conectado a la BD Mongo Closter0'))
.catch((error) => console.error(error));


app.listen(port, () => console.log('Servidor funcionando en puerto', port));

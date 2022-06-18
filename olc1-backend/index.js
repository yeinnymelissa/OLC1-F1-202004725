const express = require('express');
const cors = require('cors')
const { principal } = require('./controller/principal.controller');

const app = express();

app.use(express.json())

app.use(cors());

app.post('/run', principal.inicio);

app.listen(4000, ()=>console.log('Servidor corriendo en el puerto 8080'));
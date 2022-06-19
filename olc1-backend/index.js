const express = require('express');
const cors = require('cors');
const { principal } = require('./controller/principal.controller');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.post('/run', principal.inicio);

app.get('/errores', principal.errores);

app.listen(4000, () => console.log('Servidor corriendo en el puerto 8080'));
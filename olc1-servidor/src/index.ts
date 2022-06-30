import { Entorno } from "./simbolos/entorno";
import { InsFuncion } from "./instrucciones/funcion";
import { Singleton } from "./patronSingleton/singleton";

var express = require('express');
const res = require('express/lib/response');
var morgan = require('morgan');
var cors = require('cors');
var app = express();
var corsOptions = { origin: true, optionsSuccessStatus: 200 };

app.use(morgan('dev'));
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

const parser = require('./gramatica/gramatica.js');


app.listen(8000, function () {
    console.log('app escuchando en el puerto 8000')
})

app.get('/', function (request: any, response: any) {
    response.json({ Mensaje: 'Hola mundoooos!!!' })
})

app.post('/prueba', function (request: any, response: any) {
    let variable = "<h1>Hola soy prueba</h1>";
    response.send(variable)
})

app.post('/run', function (request: any, response: any) {
    const data = request.body.datos;
    console.log("Estoy analizando");
    console.log(data);
    let singleton = Singleton.getInstance()
    singleton.limpiarConsola();
    //realizando el analisis de la entrada.
    
    const ast = parser.parse(data.toString());
    const env_padre = new Entorno(null, "", 0);

    for (const elemento  of ast) {
        try {
            if(elemento instanceof InsFuncion){
                elemento.run(env_padre)
            }
        } catch (error) {
            console.log(error);
        }
    }
    let cont = 0; 
    for (const elemento  of ast) {
        try {
            if(!(elemento instanceof InsFuncion)){
                console.log(cont)
                console.log(elemento)
                elemento.run(env_padre)
            }
            cont++;
        } catch (error) {
            console.log(error);
        }
    }

    console.log(singleton.get_consola());
    response.send(singleton.get_consola());

})
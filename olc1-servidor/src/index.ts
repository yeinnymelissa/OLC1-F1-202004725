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

app.post('/errores', function (request: any, response: any) {
    let singleton = Singleton.getInstance()

    response.send(singleton.get_errores())
})

app.post('/tablaSimbolos', function (request: any, response: any) {
    let singleton = Singleton.getInstance()

    response.send(singleton.get_graficarTs())
})

app.post('/grafica', function (request: any, response: any) {
    let singleton = Singleton.getInstance()

    response.send(singleton.getAst())
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
                console.log("funcion")
                console.log(elemento)
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

    
    singleton.addAst("digraph G { \nnode[shape=box];\nnodeInicio[label=\"<\\ INICIO \\>\"];\n\n");
    var cont1 = 0;
    var inst_line_anterior = 0;
    var inst_col_anterior = 0;

    for (const instruccion of ast) {
        try {
            if (cont1 == 0) {
                singleton.addAst(`nodeInicio->instruccion_${instruccion.line}_${instruccion.column}_;\n`);
                inst_line_anterior = instruccion.line;
                inst_col_anterior = instruccion.column;
            } else {
                singleton.addAst(`instruccion_${inst_line_anterior}_${inst_col_anterior}_->instruccion_${instruccion.line}_${instruccion.column}_;\n`);
                inst_line_anterior = instruccion.line;
                inst_col_anterior = instruccion.column;
            }

            instruccion.ast()

        } catch (error) {
            console.log("soy un error" + error)
        }
        cont1++;
    }

    singleton.addAst("\n}");

    console.log(singleton.get_consola());
    response.send(singleton.get_consola());

})
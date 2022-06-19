"use strict";
exports.__esModule = true;
var metodo_1 = require("./src/instrucciones/metodo");
var singleton_1 = require("./src/patronSigleton/singleton");
var entorno_1 = require("./src/simbolos/entorno");
var singleton = singleton_1.Singleton.getInstance();
var parser = require('./src/gramatica/gramatica');
var fs = require("fs");
try {
    var entrada = fs.readFileSync("./entrada.LF");
    var ast = parser.parse(entrada.toString());
    var env_padre = new entorno_1.Entorno(null);
    //aqui analisis semantico
    //console.log(ast);    
    //primera pasada, buscar elemntos clase metodo
    for (var _i = 0, ast_1 = ast; _i < ast_1.length; _i++) {
        var elemento = ast_1[_i];
        try {
            //preguntar si ese elemtno es de clase metodo o funciones
            if (elemento instanceof metodo_1.Metodo) {
                elemento.run(env_padre);
            }
        }
        catch (error) {
            //console.log(error);
            singleton.add_errores(error);
        }
    }
    //segunda pasada, todas la sdemas, menos las de metodo
    for (var _a = 0, ast_2 = ast; _a < ast_2.length; _a++) {
        var elemento = ast_2[_a];
        try {
            //todas las intrucciones pero qu eno sean de clase metodo
            if (!(elemento instanceof metodo_1.Metodo)) {
                elemento.run(env_padre);
            }
        }
        catch (error) {
            //console.log(error);
            singleton.add_errores(error);
        }
    }
    console.log("Termine de recorrer el ast :) ahora mostrare lo que tiene el singleton consola");
    console.log("Consola del usuario:-----------------------------");
    console.log(singleton.get_consola());
}
catch (error) {
    //console.log(error);
}

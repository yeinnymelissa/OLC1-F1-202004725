import { Metodo } from "./src/instrucciones/metodo";
import { Singleton } from "./src/patronSigleton/singleton";
import { Entorno } from "./src/simbolos/entorno";

const singleton=Singleton.getInstance()
const parser = require('./src/gramatica/gramatica');
const fs = require("fs");

try {
    const entrada = fs.readFileSync("./entrada.LF");
    const ast= parser.parse(entrada.toString());
    const env_padre = new Entorno(null);
    //aqui analisis semantico
    //console.log(ast);    

    //primera pasada, buscar elemntos clase metodo
    for (const elemento  of ast) {
        try {
            
            //preguntar si ese elemtno es de clase metodo o funciones
            if(elemento instanceof Metodo){
                elemento.run(env_padre)
            }
        } catch (error) {
            //console.log(error);
            singleton.add_errores(error)
            
        }
    }
    //segunda pasada, todas la sdemas, menos las de metodo

    for (const elemento  of ast) {
        try {
            //todas las intrucciones pero qu eno sean de clase metodo
            if(!(elemento instanceof Metodo)){
                elemento.run(env_padre)
            }
        } catch (error) {
            //console.log(error);
            singleton.add_errores(error)
            
        }
    }

    console.log("Termine de recorrer el ast :) ahora mostrare lo que tiene el singleton consola")
    console.log("Consola del usuario:-----------------------------");
    
    console.log(singleton.get_consola());


} catch (error) {
    //console.log(error);
    
}
import { Expresion } from "../abstract/expresion";
import { Instruccion } from "../abstract/instruccion";
import { Entorno } from "../simbolos/entorno";
import { Bloque } from "./bloque";

export class DoWhile extends Instruccion {
    constructor(
        public condicion:Expresion,
        public bloque_do: Bloque,
        public bloque_verdadero: Bloque,
        line: number, 
        column : number
    ) {
        super(line,column);
    }

    public run(env: Entorno) {


       
        //confirmar que la expresion es de tipo booleana

        let x=this.condicion.run(env);

        if(x.type==3){
            throw "Error semantico, el while necesita una condicion boolena";
        }
        
        do{
            this.bloque_do.run(env)
        } while (x){
            this.bloque_verdadero.run(env)
            x=this.condicion.run(env);
        }

        
    }
}
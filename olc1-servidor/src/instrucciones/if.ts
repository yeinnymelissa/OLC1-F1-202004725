import { Expresion } from "../abstract/expresion";
import { Instruccion } from "../abstract/instruccion";
import { Singleton } from "../patronSigleton/singleton";
import { Entorno } from "../simbolos/entorno";

class If extends Instruccion {
    constructor(
        public condicion:Expresion,
        public bloque_verdadero: Instruccion,
        public bloque_falso: Instruccion,
        line: number, 
        column : number
    ) {
        super(line, column)
    }

    public run(env: Entorno) {

        const x=this.condicion.run(env);

        if(x.type==3){
            if(x){
                this.bloque_verdadero.run(env)
            }else{
                this.bloque_falso.run(env)
            }
        }else{
            throw "Error semantico, el if necesita una condicion boolena";
        }

        

    }

}
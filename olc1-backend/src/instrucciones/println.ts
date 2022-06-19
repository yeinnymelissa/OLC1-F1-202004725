import { Expresion } from "../abstract/expresion";
import { Instruccion } from "../abstract/instruccion";
import { Singleton } from "../patronSigleton/singleton";
import { Entorno } from "../simbolos/entorno";

export class Print extends Instruccion {
    constructor(        
        public expresion : Expresion,
        line: number, 
        column : number
    ) {
        super(line,column);
    }

    public run(env: Entorno) {

        //console.log(this.expresion) 
        //console.log("---------------");
        
        const tmp= this.expresion.run(env);
        // console.log(tmp);
        // console.log(tmp.type); 
        //console.log(">>",tmp.value); //esto es lo que tienen que mostrar al usuario
        
        const s= Singleton.getInstance()
        s.add_consola(tmp.value+"\n")
        
    }
}
import { Instruccion } from "../abstract/instruccion";
import { Entorno } from "../simbolos/entorno";

export class Metodo extends Instruccion {
    constructor(
        public id:string,
        public parametros:any,
        public bloque: Instruccion,
        line: number, 
        column : number
    ) {
        super(line,column);
    }

    public run(env:Entorno) {

        env.guardar_funcion(this.id, this);


    }
}
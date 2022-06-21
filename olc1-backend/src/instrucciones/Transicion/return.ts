import { Expresion } from "../abstract/expresion";
import { Instruccion } from "../abstract/instruccion";
import { Entorno } from "../simbolos/entorno";

export class Return extends Instruccion{
    constructor(
        public expresion:Expresion,
        line: number, 
        column : number
    ) {
        super(line,column);
    }

    public run(env:Entorno) {
        return this.expresion;
    }
}
import { Instruccion } from "../abstract/instruccion";

export class Declaracion extends Instruccion{
    constructor(
        public nombre: string,
        public tipo: string,
        line: number,
        column: number
       // public expresion: Expresion
    ) {
        super(line, column);
    }

    public run() {
        
    }
}
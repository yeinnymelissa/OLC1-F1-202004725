import { Entorno } from "../simbolos/entorno"
import { Retorno } from "./retorno"

export abstract class Expresion {

    constructor(public line: number, public column: number) {
        this.line = line
        this.column = column + 1
    }

    public abstract run(env:Entorno): Retorno
    //public abstract graficarAST(): any
}
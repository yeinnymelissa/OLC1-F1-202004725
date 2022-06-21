import { Entorno } from "../simbolos/entorno"

export abstract class Instruccion {
    constructor(
        public line: number,
        public column: number
    ) {
        this.line = line;
        this.column = column;
    }

    public abstract run(env:Entorno): any
    public abstract ast(): void
}
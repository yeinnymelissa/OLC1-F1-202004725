export class Errores {

    constructor(
        public line: number, 
        public column: number,
        public err: string,
        public tipo: string
        ) {
        
            this.line = line;
            this.column = column;
            this.err= err;
            this.tipo = tipo;
    }
}
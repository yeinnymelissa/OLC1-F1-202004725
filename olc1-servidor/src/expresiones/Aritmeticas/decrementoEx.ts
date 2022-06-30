import { Expresion } from "../../abstract/expresion";
import { Retorno } from "../../abstract/retorno";
import { Errores } from "../../errores/errores";
import { Singleton } from "../../patronSingleton/singleton";
import { Entorno } from "../../simbolos/entorno";
import { Tipo } from "../../simbolos/tipo";

export class DecrementoEx extends Expresion{
    constructor(
        private expresion: Expresion,
        line: number,
        column: number
    ){
        super(line, column)
    }

    public run(env: Entorno): Retorno {
        
        var singleton = Singleton.getInstance(); //instancia de la consola por posibles errores
        let retorno: Retorno = {valor: null, tipo: Tipo.error}; // es un error hasta que se diga lo contrario
        const exp = this.expresion.run(env);

        if (exp.tipo == Tipo.error) {
            //no tiene que hacer la elevación y solo dar un error semántico
            const error = new Errores(this.line, this.column, `El decremento en un valor nulo no es permitido.`, "Semántico");
            singleton.add_errores(error);
            retorno = {valor: null, tipo: Tipo.error}
        }else{
            if(exp.tipo == Tipo.INT || exp.tipo == Tipo.DOUBLE){
                retorno = { valor: (exp.valor - 1), tipo: exp.tipo}
            }else{
                //error
                const error = new Errores( this.line, this.column, `El incremento de un valor no numérico no es válido`,"Semántico");
                singleton.add_errores(error);
                retorno = {valor: null, tipo: Tipo.error}
            }
        }
        return retorno;
    }

    public ast(): string {
        const name_nodo = `node_${this.expresion.line}_${this.expresion.column}_expresion`;
        return `
        ${name_nodo};
        ${name_nodo}[label="\\< Expresión \\> \\n decremento"];
        ${name_nodo}->${this.expresion.ast()}
        ${name_nodo}_decremento[label="{--}"];
        ${name_nodo}->${name_nodo}_decremento;
        `
    }
}
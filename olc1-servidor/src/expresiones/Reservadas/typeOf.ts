import { Expresion } from "../../abstract/expresion";
import { Retorno } from "../../abstract/retorno";
import { Errores } from "../../errores/errores";
import { Singleton } from "../../patronSingleton/singleton";
import { Entorno } from "../../simbolos/entorno";
import { Tipo } from "../../simbolos/tipo";

export class TypeOf extends Expresion{
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
        const nodoExp = this.expresion.run(env);

        if (nodoExp.tipo == Tipo.error) {
            //no tiene que hacer la conversión y solo dar un error semántico
            const error = new Errores(this.line, this.column, `No es posible aplicar la funcion TypeOf() a un valor nulo. `, "Semántico");
            singleton.add_errores(error);
            retorno = {valor: null, tipo: Tipo.error}
        }else{
            if(nodoExp.tipo == Tipo.INT){
                retorno = { valor: "int", tipo: Tipo.STRING}
            }else if(nodoExp.tipo == Tipo.DOUBLE){
                retorno = { valor: "double", tipo: Tipo.STRING}
            }else if(nodoExp.tipo == Tipo.CHAR){
                retorno = { valor: "char", tipo: Tipo.STRING}
            }else if(nodoExp.tipo == Tipo.STRING){
                retorno = { valor: "string", tipo: Tipo.STRING}
            }else if(nodoExp.tipo == Tipo.BOOLEAN){
                retorno = { valor: "boolean", tipo: Tipo.STRING}
            }else if(nodoExp.tipo == Tipo.VECINT){
                retorno = { valor: "vector_int", tipo: Tipo.STRING}
            }else if(nodoExp.tipo == Tipo.VECSTRING){
                retorno = { valor: "vector_string", tipo: Tipo.STRING}
            }else if(nodoExp.tipo == Tipo.VECBOOLEAN){
                retorno = { valor: "vector_boolean", tipo: Tipo.STRING}
            }else if(nodoExp.tipo == Tipo.VECCHAR){
                retorno = { valor: "vector_char", tipo: Tipo.STRING}
            }else if(nodoExp.tipo == Tipo.VECDOUBLE){
                retorno = { valor: "vector_double", tipo: Tipo.STRING}
            }else if(nodoExp.tipo == Tipo.MINT){
                retorno = { valor: "matriz_int", tipo: Tipo.STRING}
            }else if(nodoExp.tipo == Tipo.MSTRING){
                retorno = { valor: "matriz_string", tipo: Tipo.STRING}
            }else if(nodoExp.tipo == Tipo.MBOOLEAN){
                retorno = { valor: "matriz_boolean", tipo: Tipo.STRING}
            }else if(nodoExp.tipo == Tipo.MCHAR){
                retorno = { valor: "matriz_char", tipo: Tipo.STRING}
            }else if(nodoExp.tipo == Tipo.MDOUBLE){
                retorno = { valor: "matriz_double", tipo: Tipo.STRING}
            }else{
                //no tiene que hacer la conversión y solo dar un error semántico
                const error = new Errores( this.line, this.column, `No es posible aplicar la funcion TypeOf() a un valor desconocido`, "Semántico");
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
        ${name_nodo}[label="\\< Expresión \\> \\n tipoOf"];
        ${name_nodo}_tipoOf[label="{tipoOf()}"];
        ${name_nodo}->${name_nodo}_tipoOf;
        ${name_nodo}->${this.expresion.ast()}
        `
    }
}
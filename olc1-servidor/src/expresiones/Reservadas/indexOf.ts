import { Expresion } from "../../abstract/expresion";
import { Retorno } from "../../abstract/retorno";
import { Errores } from "../../errores/errores";
import { Singleton } from "../../patronSingleton/singleton";
import { Entorno } from "../../simbolos/entorno";
import { Tipo } from "../../simbolos/tipo";

export class indexOf extends Expresion{
    constructor(
        private nombreVector: string,
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
        var vector = env.get_variable(this.nombreVector)

        if (vector == null || vector == undefined){
            const error = new Errores(this.line, this.column, `Variable con el nombre '${this.nombreVector}' inexistente.`,"Error semántico");
            singleton.add_errores(error);
            retorno = {valor: null, tipo: Tipo.error}
        } 


        if (nodoExp.tipo == Tipo.error) {
            //no tiene que hacer la conversión y solo dar un error semántico
            const error = new Errores(this.line, this.column, `No es posible aplicar la funcion toCharArray() a un valor nulo.`,"Semántico");
            singleton.add_errores(error);
            retorno = {valor: null, tipo: Tipo.error}
        }else{
            if(vector != null){
                if(vector.tipo == Tipo.VECINT || vector.tipo == Tipo.VECSTRING || vector.tipo == Tipo.VECBOOLEAN || vector.tipo == Tipo.VECDOUBLE || vector.tipo == Tipo.VECCHAR){
                    retorno = { valor: vector.valor.indexOf(nodoExp), tipo: Tipo.INT}
                }else{
                    const error = new Errores(this.line, this.column, "La variable no es un vector.", "Semántico");
                    singleton.add_errores(error);
                    console.log(error)
                }
            }else{
                //no tiene que hacer la conversión y solo dar un error semántico
                const error = new Errores( this.line, this.column, `No es posible aplicar la funcion toCharArray() a un valor que no sea un vector.`, "Semántico");
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
        ${name_nodo}[label="\\< Expresión \\> \\n IndexOf"];
        ${name_nodo}_IndexOf[label="{IndexOf()}"];
        ${name_nodo}->${name_nodo}_IndexOf;
        ${name_nodo}->${this.expresion.ast()}
        `
    }
}
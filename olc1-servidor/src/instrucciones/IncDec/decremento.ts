import { Instruccion } from "../../abstract/instruccion";
import { Errores } from "../../errores/errores";
import { Singleton } from "../../patronSingleton/singleton";
import { Entorno } from "../../simbolos/entorno";
import { Tipo } from "../../simbolos/tipo";

export class Decremento extends Instruccion{
    constructor(
        private nombreVariable: string,
        line: number,
        column: number
    ){
        super(line, column)
    }

    public run(env: Entorno) {
        
        var singleton = Singleton.getInstance(); //instancia de la consola por posibles errores
        var variable = env.get_variable(this.nombreVariable)

        if (variable == null || variable == undefined) {
            //no tiene que hacer la elevación y solo dar un error semántico
            const error = new Errores(this.line, this.column, `El decremento en un valor nulo no es permitido.`, "Semántico");
            singleton.add_errores(error);
        }else{
            if(variable?.tipo == Tipo.INT || variable?.tipo == Tipo.DOUBLE){
                env.actualizar_variable(this.nombreVariable, (variable.valor - 1));
            }else{
                //ERROR
                const error = new Errores( this.line, this.column, `El incremento de un valor no numérico no es válido`,"Semántico");
                singleton.add_errores(error);
            }
        }
    }

    public ast(){
        const singleton = Singleton.getInstance()
        const name_nodo = `instruccion_${this.line}_${this.column}_`;
        singleton.addAst(`
        ${name_nodo};
        ${name_nodo}[label="\\< Instrucción \\> \\n Decremento"];
        ${name_nodo}_identificador[label="\\< Identificador \\> \\n ${this.nombreVariable}"];
        ${name_nodo}->${name_nodo}_identificador;
        ${name_nodo}_decremento[label="{--}"];
        ${name_nodo}->${name_nodo}_decremento;
        `);
    }
}
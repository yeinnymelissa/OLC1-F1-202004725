import { Instruccion } from "../abstract/instruccion";
import { Errores } from "../errores/errores";
import { Singleton } from "../patronSigleton/singleton";
import { Entorno } from "../simbolos/entorno";
import { Tipo } from "../simbolos/tipo";

export class Incremento extends Instruccion {
    constructor(
        public nombre: string,
        line: number, 
        column : number
    ) {
        super(line,column);
    }

    public run(env: Entorno) {

        var singleton = Singleton.getInstance(); //instancia de la consola por posibles errores
        var variable = env.get_variable(this.nombre)

        if (variable == null || variable == undefined) {
            //no tiene que hacer la elevación y solo dar un error semántico
            const error = new Errores(this.line, this.column, `No se puede incrementar una variable con asignación null.`,"Semántico");
            singleton.add_errores(error);
        }else{
            if(variable?.tipo == Tipo.INT || variable?.tipo == Tipo.DOUBLE){
                env.actualizar_variable(this.nombre, (variable.valor + 1));
            }else{
                //ERROR
                const error = new Errores( this.line, this.column, `El incremento en este tipo de dato no es válido.`,"Semántico");
                singleton.add_errores(error);
            }
        }

        
    }
    public ast(){
        const consola = Singleton.getInstance()
        const name_nodo = `instruccion_${this.line}_${this.column}_`;
        consola.addAst(`
        ${name_nodo};
        ${name_nodo}[label="\\< Instrucción \\> \\n Incremento"];
        ${name_nodo}_identificador[label="\\< Identificador \\> \\n ${this.nombre}"];
        ${name_nodo}->${name_nodo}_identificador;
        ${name_nodo}_incremento[label="{++}"];
        ${name_nodo}->${name_nodo}_incremento;
        `);
    }
}
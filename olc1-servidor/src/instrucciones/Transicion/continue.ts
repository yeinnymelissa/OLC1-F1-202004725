import { Instruccion } from "../../abstract/instruccion";
import { Errores } from "../../errores/errores";
import { Singleton } from "../../patronSingleton/singleton";
import { Entorno } from "../../simbolos/entorno";

export class Continue extends Instruccion {

    constructor(
        line: number,
        column: number
    ) {
        super(line, column)
    }

    public run(env: Entorno) {
        
        var singleton = Singleton.getInstance(); //instancia de la consola por posibles errores
        const error = new Errores(this.line, this.column, `la instrucción {continue} solo tiene sentido adentro de una declaración de ciclo`,"Semántico");
        singleton.add_errores(error);
    }

    public ast() {
        const singleton = Singleton.getInstance()
        //Si me ejecuto quiere decir que soy un error porque el break no se tiene que ejecutar solo es una clase bandera.
        const name_node = `instruccion_${this.line}_${this.column}_`
        singleton.add_consola(`
        ${name_node}[label="\\<Instrucción\\>\\nContinue"];        
        `)
    }
}
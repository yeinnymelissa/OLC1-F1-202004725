import { Instruccion } from "../abstract/instruccion";
import { Singleton } from "../patronSingleton/singleton";
import { Entorno } from "../simbolos/entorno";
import { Simbolo } from "../simbolos/simbolo";

export class GraficarTS extends Instruccion {
    constructor(
        line: number, 
        column : number
    ) {
        super(line,column);
    }

    public run(env: Entorno) {
        var singleton = Singleton.getInstance(); //instancia de la consola por posibles errores
        
        let simbolos_tmp: string= singleton.get_simbolos();

        singleton.add_graficarTs(simbolos_tmp)

        console.log(singleton.get_graficarTs())
        
    }
    public ast(): void {
        const s = Singleton.getInstance()
        const name_node = `instruccion_${this.line}_${this.column}_`
        s.addAst(`${name_node}[label="\\<Instruccion\\>\\nGraficar_TS"];`)
       
    }
}
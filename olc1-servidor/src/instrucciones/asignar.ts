import { Expresion } from "../abstract/expresion";
import { Instruccion } from "../abstract/instruccion";
import { Errores } from "../errores/errores";
import { Singleton } from "../patronSigleton/singleton";
import { Entorno } from "../simbolos/entorno";

export class Asignar extends Instruccion {
    constructor(
        public nombre: string,
        public expresion : Expresion,
        line: number, 
        column : number
    ) {
        super(line,column);
    }

    public run(env: Entorno) {
        var singleton = Singleton.getInstance(); //instancia de la consola por posibles errores
        const expresion = this.expresion.run(env)
        var bandera: boolean = true;
        
        var variable = env.get_variable(this.nombre)

        if (variable == null || variable == undefined){
            const error = new Errores(this.line, this.column, `Variable con el nombre '${this.nombre}' inexistente.`,"Error semántico");
            singleton.add_errores(error);
            bandera = false;
        } 

        if (!variable?.editable){
            const error = new Errores(this.line, this.column, `La asignación no se puede realizar, la variable con nombre '${this.nombre}' no es editable.`, "Semántico");
            singleton.add_errores(error);
            bandera = false;
        } 

        
        if (variable?.tipo != expresion.tipo) {
            const error = new Errores(this.line, this.column, `La asignación no se puede realizar, la variable con nombre '${this.nombre}' es de tipo [${singleton.getTipo(variable?.tipo)}] y se le esta tratando de asignar un tipo [${singleton.getTipo(expresion.tipo)}]`,"Semántico");
            singleton.add_errores(error);
            bandera = false;
            throw new Error("Los tipos no coinciden en la asiganción de valores de la variable");
        }

        if(bandera == true){
            env.actualizar_variable(this.nombre,this.expresion);
        }
        
    }
    public ast(): void {
        const consola = Singleton.getInstance()
        const nombre_nodo =`instruccion_${this.line}_${this.column}_`
        consola.addAst(`${nombre_nodo}[label="\\<Instruccion\\>\\nAsignacion"];\n`)
        consola.addAst(`${nombre_nodo}1[label="\\<Identificador\\>\\n{${this.nombre}}"];\n`)
        consola.addAst(`${nombre_nodo}->${nombre_nodo}1;\n`)
        consola.addAst(`${nombre_nodo}->${this.expresion.ast()}\n`)
       
    }
}
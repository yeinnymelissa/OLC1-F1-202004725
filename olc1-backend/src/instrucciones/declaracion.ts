import { Expresion } from "../abstract/expresion";
import { Instruccion } from "../abstract/instruccion";
import { Errores } from "../errores/errores";
import { Singleton } from "../patronSigleton/singleton";
import { Entorno } from "../simbolos/entorno";
import { Tipo } from "../simbolos/tipo";


export class Declaracion extends Instruccion {
    constructor(
        public nombres: [],
        public tipo: Tipo,
        public expresion : Expresion,
        public editable : boolean,
        line: number, 
        column : number
    ) {
        super(line,column);
    }

    public run(env: Entorno) {

        const singleton = Singleton.getInstance()

        


        const expresion= this.expresion.run(env);
        
        if(expresion.tipo != this.tipo){ //si se cumple esto es un error semántico.
            const error = new Errores(this.line, this.column, "Declaración inválida, no se puede declarar  un tipo "+singleton.getTipo(this.tipo)+" con un valor "+singleton.getTipo(expresion.tipo), "Semántico");
            singleton.add_errores(error);
            return;
        }

        for (let index = 0; index < this.nombres.length; index++) {
            const nombreVariable = this.nombres[index];
            const envActual= env.guardar_variable(nombreVariable, expresion.valor, this.tipo, true, env.recorridoAmbito, this.line, this.column);
            if(envActual == false){
                const error = new Errores(this.line, this.column,"declaración inválida, la variable "+nombreVariable+" declarada ya existe", "Semántico");
                singleton.add_errores(error);
                throw new Error("Error variable declarada ya existe");
            }
        }
        
    }
    
        
    public ast(): void {
        const consola = Singleton.getInstance();
        const nombreNodo = `instruccion_${this.line}_${this.column}_`
        consola.addAst(`${nombreNodo}[label="\\<Instruccion\\>\\nDeclaracion"];\n`)
        consola.addAst(`${nombreNodo}1[label="\\<Tipo\\>\\n${consola.getTipo(this.tipo)}"];\n`)
        consola.addAst(`${nombreNodo}2[label="\\<Nombre\\>\\n${this.nombres}"];\n`)
        consola.addAst(`${nombreNodo}->${nombreNodo}1;\n`)
        consola.addAst(`${nombreNodo}->${nombreNodo}2;\n`)
        consola.addAst(`${nombreNodo}->${this.expresion?.ast()}\n`)
    }
}
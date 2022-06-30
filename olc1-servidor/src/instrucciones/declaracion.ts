import { Expresion } from "../abstract/expresion";
import { Instruccion } from "../abstract/instruccion";
import { Errores } from "../errores/errores";
import { Singleton } from "../patronSingleton/singleton";
import { Entorno } from "../simbolos/entorno";
import { Tipo } from "../simbolos/tipo";


export class Declaracion extends Instruccion {
    constructor(
        public nombres: [],
        public tipo: Tipo,
        public expresion : Expresion | null,
        public editable : boolean,
        line: number, 
        column : number
    ) {
        super(line,column);
    }

    public valorTipo(tipo:Tipo): any {
        switch (tipo) {
            case Tipo.INT:
                return 0;
            case Tipo.DOUBLE:
                return 0.0;
            case Tipo.BOOLEAN:
                return true;
            case Tipo.CHAR:
                return '\u0000';
            case Tipo.STRING:
                return "";              
            default:
                return null;
        }
    }

    public run(env: Entorno) {

        const singleton = Singleton.getInstance()

        if (this.expresion != null) {

            const expresion= this.expresion.run(env);
        
            if(expresion.tipo != this.tipo){ //si se cumple esto es un error semántico.
                const error = new Errores(this.line, this.column, "Declaración inválida, no se puede declarar  un tipo "+singleton.getTipo(this.tipo)+" con un valor "+singleton.getTipo(expresion.tipo), "Semántico");
                singleton.add_errores(error);
                console.log(error)
                return;
            }

            for (let index = 0; index < this.nombres.length; index++) {
                const nombreVariable = this.nombres[index];
                const envActual= env.guardar_variable(nombreVariable, expresion.valor, this.tipo, this.editable, env.recorridoAmbito, this.line, this.column);
                if(envActual == false){
                    const error = new Errores(this.line, this.column,"Declaración inválida, la variable "+nombreVariable+" declarada ya existe.", "Semántico");
                    singleton.add_errores(error);
                    throw new Error("Error variable declarada ya existe");
                }
            }
        }else{ //si la declaración viene sin una valor de asignación entonces solo se ponen los default.
            /**Paso 1) Crear las variables con su valor por defecto según su tipo */
            for (let index = 0; index < this.nombres.length; index++) {
                const nombreVarActual = this.nombres[index];
                const envActual = env.guardar_variable(nombreVarActual, this.valorTipo(this.tipo), this.tipo, this.editable, env.recorridoAmbito, this.line, this.column);
                if(envActual == false){
                    const error = new Errores(this.line, this.column, "Declaración inválida, la variable "+nombreVarActual+" declarada ya existe.", "Error semántico");
                    singleton.add_errores(error);
                }
            }
        }
        
    }
    
        
    public ast(): void {
        const singleton = Singleton.getInstance();
        const nombreNodo = `instruccion_${this.line}_${this.column}_`
        singleton.addAst(`${nombreNodo}[label="\\<Instruccion\\>\\nDeclaracion"];\n`)
        singleton.addAst(`${nombreNodo}1[label="\\<Tipo\\>\\n${singleton.getTipo(this.tipo)}"];\n`)
        singleton.addAst(`${nombreNodo}2[label="\\<Nombre\\>\\n${this.nombres}"];\n`)
        singleton.addAst(`${nombreNodo}->${nombreNodo}1;\n`)
        singleton.addAst(`${nombreNodo}->${nombreNodo}2;\n`)
        singleton.addAst(`${nombreNodo}->${this.expresion?.ast()}\n`)
    }
}
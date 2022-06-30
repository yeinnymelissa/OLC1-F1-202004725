import { Expresion } from "../../abstract/expresion";
import { Instruccion } from "../../abstract/instruccion";
import { Errores } from "../../errores/errores";
import { Singleton } from "../../patronSingleton/singleton";
import { Entorno } from "../../simbolos/entorno";
import { Tipo } from "../../simbolos/tipo";

export class Vector extends Instruccion {
    constructor(
        public nombre: string,
        public tipo: Tipo,
        public expresion : Expresion[] | number | null,
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

            if(typeof this.expresion === 'number'){
                let vector: any[] = [];
                for(let i = 0; i < this.expresion; i++){
                    vector.push(this.valorTipo(this.tipo))
                }

                const envActual= env.guardar_variable(this.nombre, vector, this.tipo, this.editable, env.recorridoAmbito, this.line, this.column);
                if(envActual == false){
                    const error = new Errores(this.line, this.column,"Declaración inválida, la variable "+this.nombre+" declarada ya existe.", "Semántico");
                    singleton.add_errores(error);
                    throw new Error("Error variable declarada ya existe");
                }
            }else if(this.expresion instanceof Expresion){
                let vector: any[] = [];
                for (let index = 0; index < this.expresion.length; index++) {
                    const expresionVector = this.expresion[index];
                    const expresionRun= expresionVector.run(env);
                    if(expresionRun.tipo == this.tipo){
                        vector.push(expresionRun)
                    }
                }
                const envActual= env.guardar_variable(this.nombre, vector, this.tipo, this.editable, env.recorridoAmbito, this.line, this.column);
                if(envActual == false){
                    const error = new Errores(this.line, this.column,"Declaración inválida, la variable "+this.nombre+" declarada ya existe.", "Semántico");
                    singleton.add_errores(error);
                    throw new Error("Error variable declarada ya existe");
                }
            }
        }
        
    }
    
        
    public ast(): void {
        const consola = Singleton.getInstance();
        const nombreNodo = `instruccion_${this.line}_${this.column}_`
        consola.addAst(`${nombreNodo}[label="\\<Instruccion\\>\\nDeclaracion Vector"];\n`)
        consola.addAst(`${nombreNodo}1[label="\\<Tipo\\>\\n${consola.getTipo(this.tipo)}"];\n`)
        consola.addAst(`${nombreNodo}2[label="\\<Nombre\\>\\n${this.nombre}"];\n`)
        consola.addAst(`${nombreNodo}->${nombreNodo}1;\n`)
        consola.addAst(`${nombreNodo}->${nombreNodo}2;\n`)
    }
}
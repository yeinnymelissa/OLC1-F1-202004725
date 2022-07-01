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
        public tipo2: Tipo | null,
        public expresion : Expresion[] | string | null | Expresion,
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

    public tipoVector(tipo:Tipo): Tipo{
        switch (tipo) {
            case Tipo.INT:
                return Tipo.VECINT;
            case Tipo.DOUBLE:
                return Tipo.VECDOUBLE;
            case Tipo.BOOLEAN:
                return Tipo.VECBOOLEAN;
            case Tipo.CHAR:
                return Tipo.VECCHAR;
            case Tipo.STRING:
                return Tipo.VECSTRING;              
            default:
                return Tipo.error;
        }
    }

    public run(env: Entorno) {

        const singleton = Singleton.getInstance()

        
        
        if (this.expresion != null) {
            if(typeof this.expresion == 'string'){
                console.log("entre")
                if(this.tipo != this.tipo2){
                    const error = new Errores(this.line, this.column,"Se está asignando un tipo diferente al vector.", "Semántico");
                    singleton.add_errores(error);
                    console.log("No se pudo declarar vector")
                    throw new Error("Tipos no compatibles en el vector.");
                }
                let vector: any[] = [];
                for(let i = 0; i < parseInt(this.expresion); i++){
                    vector.push(this.valorTipo(this.tipo))
                }

                const envActual= env.guardar_variable(this.nombre, vector,this.tipoVector(this.tipo), this.editable, env.recorridoAmbito, this.line, this.column);
                if(envActual == false){
                    const error = new Errores(this.line, this.column,"Declaración inválida, la variable "+this.nombre+" declarada ya existe.", "Semántico");
                    singleton.add_errores(error);
                    console.log("No se pudo declarar vector")
                    throw new Error("Error variable declarada ya existe");
                }
            }else if(this.expresion instanceof Expresion){
                console.log("entre a expresion vector")
                const expresion = this.expresion.run(env)
                console.log(expresion.tipo)
                console.log(this.tipoVector(this.tipo))
                if(expresion.tipo == this.tipoVector(this.tipo)){
                    console.log("si es compatible")
                    var vector = expresion.valor
                    const envActual= env.guardar_variable(this.nombre, vector, this.tipoVector(this.tipo), this.editable, env.recorridoAmbito, this.line, this.column);
                    if(envActual == false){
                        const error = new Errores(this.line, this.column,"Declaración inválida, la variable "+this.nombre+" declarada ya existe.", "Semántico");
                        singleton.add_errores(error);
                        throw new Error("Error variable declarada ya existe");
                    }
                }else{
                    const error = new Errores(this.line, this.column,"Declaración inválida de vector, los tipos no son iguales.", "Semántico");
                    singleton.add_errores(error);
                    throw new Error("No se puede asignar al vector");
                }

            }else {
                console.log("entre expresion")
                let vector: any[] = [];
                for (let index = 0; index < this.expresion.length; index++) {
                    const expresionVector = this.expresion[index];
                    const expresionRun= expresionVector.run(env);
                    if(expresionRun.tipo == this.tipo){
                        vector.push(expresionRun.valor)
                    }else{
                        const error = new Errores(expresionVector.line, expresionVector.column,"No se puede agregar el valor "+expresionRun.valor+" porque los tipos de datos no son iguales.", "Semántico");
                        singleton.add_errores(error);
                        throw new Error("No se puede asignar al vector");
                    }
                }
                const envActual= env.guardar_variable(this.nombre, vector, this.tipoVector(this.tipo), this.editable, env.recorridoAmbito, this.line, this.column);
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
import { Instruccion } from "../abstract/instruccion";
import { Errores } from "../errores/errores";
import { Singleton } from "../patronSigleton/singleton";
import { Entorno } from "../simbolos/entorno";
import { Tipo } from "../simbolos/tipo";

export class Decremento extends Instruccion {
    constructor(
        public nombre: string,
        line: number, 
        column : number
    ) {
        super(line,column);
    }

    public run(env: Entorno) {

        var singleton = Singleton.getInstance(); 
        var variable = env.get_variable(this.nombre)

        if (variable == null || variable == undefined) {
            const error = new Errores( this.line, this.column, `No se puede decrementar una variable con asignación null.`,"Semántico");
            singleton.add_errores(error);
        }else{
            if(variable?.tipo == Tipo.INT || variable?.tipo == Tipo.DOUBLE){
                env.actualizar_variable(this.nombre, (variable.valor - 1));
            }else{
                const error = new Errores( this.line, this.column, `El decremento en este tipo de dato no es válido.`,"Semántico");
                singleton.add_errores(error);
            }
        }
        
        
    }
    public ast(): void {
        const consola = Singleton.getInstance()
        const name_nodo = `instruccion_${this.line}_${this.column}_`;
        consola.addAst(`
        ${name_nodo};
        ${name_nodo}[label="\\< Instrucción \\> \\n Decremento"];
        ${name_nodo}_identificador[label="\\< Identificador \\> \\n ${this.nombre}"];
        ${name_nodo}->${name_nodo}_identificador;
        ${name_nodo}_decremento[label="{--}"];
        ${name_nodo}->${name_nodo}_decremento;
        `);
    }
}
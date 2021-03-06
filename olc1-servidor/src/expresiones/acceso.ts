import { Expresion } from "../abstract/expresion"
import { Retorno } from "../abstract/retorno"
import { Errores } from "../errores/errores"
import { Singleton } from "../patronSingleton/singleton"
import { Entorno } from "../simbolos/entorno"
import { Tipo } from "../simbolos/tipo"

export class Acceso extends Expresion {
    constructor(
        private id: string,
        line: number,
        column: number

    ) {
        super(line, column) 
    }

    public run(env: Entorno): Retorno {

        const variable_ts= env.get_variable(this.id)


        if(variable_ts== null|| variable_ts== undefined){
            var singleton = Singleton.getInstance();
            const error = new Errores(this.line, this.column, "Variable inexistente", "Semántico");
            singleton.add_errores(error);
            console.log(error)
            return {valor: null, tipo: Tipo.error}
        }



        return {
            valor: variable_ts.valor,
            tipo: variable_ts.tipo
        }


    }

    public ast(): string {
        const name_nodo = `node_${this.line}_${this.column}_`
        return `
        ${name_nodo};
        ${name_nodo}[label="\\<Identificador\\>\\n{${this.id}}"];
        `
    }
}
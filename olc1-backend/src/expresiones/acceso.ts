import { Expresion } from "../abstract/expresion"
import { Retorno } from "../abstract/retorno"
import { Entorno } from "../simbolos/entorno"

export class Acceso extends Expresion {
    constructor(
        private id: string,
        line: number,
        column: number

    ) {
        super(line, column) 
    }

    public run(env: Entorno): Retorno {


        //preguntar si exite variable
        //sino existe 
        //error semanticos
        const variable_ts= env.get_variable(this.id)


        if(variable_ts== null|| variable_ts== undefined){
            //errores semaintics
            throw "Error semantico, esta variable no existe! :c"
        }



        return {
            value: variable_ts.value,
            type: variable_ts.type
        }


    }
}
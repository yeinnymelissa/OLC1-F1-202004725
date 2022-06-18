import { Expresion } from "../abstract/expresion"
import { Retorno } from "../abstract/retorno"
import { Entorno } from "../simbolos/entorno"
import { Tipo } from "../simbolos/tipo"

export class Literal extends Expresion {

    constructor(
        private value: any,
        private type: Tipo,
        line: number,
        column: number
    ) {
        super(line, column)
    }

    public run(env: Entorno): Retorno {
        
        if (this.type == Tipo.INT)
            return { value: Number(this.value), type: Tipo.INT }
        else if (this.type == Tipo.STRING){
            this.value = (this.value).replaceAll("\"","")
            return { value: this.value, type: Tipo.STRING }
        }
        else if (this.type == Tipo.BOOLEAN) {
            if (this.value == "true") return { value: Boolean(true), type: Tipo.BOOLEAN }
            else return { value: Boolean(false), type: Tipo.BOOLEAN }
        }else if (this.type == Tipo.DOUBLE){
            return { value: Number(this.value), type: Tipo.INT }
        }else if(this.type == Tipo.CHAR){
            this.value = (this.value).replaceAll("\'","")
            return { value: this.value, type: Tipo.CHAR }
        }else if(this.type == Tipo.NULL){
            return { value: null, type: Tipo.NULL }
        }
        else return { value: this.value, type: Tipo.error }

    }
}
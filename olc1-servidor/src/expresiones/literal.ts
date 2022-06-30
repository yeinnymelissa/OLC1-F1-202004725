import { Expresion } from "../abstract/expresion"
import { Retorno } from "../abstract/retorno"
import { Entorno } from "../simbolos/entorno"
import { Tipo } from "../simbolos/tipo"

export class Literal extends Expresion {

    constructor(
        private valor: any,
        private tipo: Tipo,
        line: number,
        column: number
    ) {
        super(line, column)
    }

    public run(env: Entorno): Retorno {
        
        if (this.tipo == Tipo.INT)
            return { valor: Number(this.valor), tipo: Tipo.INT }
        else if (this.tipo == Tipo.STRING){
            this.valor = (this.valor).replaceAll("\"","")
            return { valor: this.valor, tipo: Tipo.STRING }
        }
        else if (this.tipo == Tipo.BOOLEAN) {
            if (this.valor == "true") return { valor: Boolean(true), tipo: Tipo.BOOLEAN }
            else return { valor: Boolean(false), tipo: Tipo.BOOLEAN }
        }else if (this.tipo == Tipo.DOUBLE){
            return { valor: Number(this.valor), tipo: Tipo.DOUBLE }
        }else if(this.tipo == Tipo.CHAR){
            this.valor = (this.valor).replaceAll("\'","")
            return { valor: this.valor, tipo: Tipo.CHAR }
        }else if(this.tipo == Tipo.NULL){
            return { valor: null, tipo: Tipo.NULL }
        }
        else return { valor: this.valor, tipo: Tipo.error }

    }

    public ast(): string {
        const nombre = `node_${this.line}_${this.column}_`
        if (this.tipo == Tipo.STRING) return `
        ${nombre};
        ${nombre}[label="\\<Valor\\>\\n\\"${this.valor.toString()}\\""];
        `

        else return `
        ${nombre};
        ${nombre}[label="\\<Valor\\>\\n${this.valor.toString()}"];
        `
    }
}
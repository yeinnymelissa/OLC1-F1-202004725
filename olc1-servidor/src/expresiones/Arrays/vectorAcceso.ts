import { Expresion } from "../../abstract/expresion";
import { Retorno } from "../../abstract/retorno";
import { Errores } from "../../errores/errores";
import { Singleton } from "../../patronSingleton/singleton";
import { Entorno } from "../../simbolos/entorno";
import { Tipo } from "../../simbolos/tipo";

export class VectorAcceso extends Expresion {
    constructor(
        private id: string,
        private numeroAcceso : number,
        line: number,
        column: number

    ) {
        super(line, column) 
    }

    public run(env: Entorno): Retorno {


        const vector= env.get_variable(this.id)
        var singleton = Singleton.getInstance();

        if(vector== null|| vector== undefined){
            const error = new Errores(this.line, this.column, "Vector inexistente.", "Semántico");
            singleton.add_errores(error);
            console.log(error)
            return {valor: null, tipo: Tipo.error}
        }

        if(vector.tipo == Tipo.VECINT || vector.tipo == Tipo.VECSTRING || vector.tipo == Tipo.VECBOOLEAN || vector.tipo == Tipo.VECDOUBLE || vector.tipo == Tipo.VECCHAR){
            if(this.numeroAcceso < vector.valor.length){
                return {
                    valor: vector.valor[this.numeroAcceso],
                    tipo: this.getTipo(vector.tipo)
                }
            }else{
                const error = new Errores(this.line, this.column, "No existe la posicion "+this.numeroAcceso+" en el vector.", "Semántico");
                singleton.add_errores(error);
                console.log(error)
                return {valor: null, tipo: Tipo.error}
            }
        }else{
            const error = new Errores(this.line, this.column, "La variable no es un vector.", "Semántico");
            singleton.add_errores(error);
            console.log(error)
            return {valor: null, tipo: Tipo.error}
        }


    }

    public getTipo(tipo: Tipo | undefined): Tipo{
        switch(tipo){
            case Tipo.VECINT:
                return Tipo.INT;
            case Tipo.VECDOUBLE:
                return Tipo.DOUBLE;
            case Tipo.VECCHAR:
                return Tipo.CHAR;
            case Tipo.VECSTRING:
                return Tipo.STRING;
            case Tipo.VECBOOLEAN:
                return Tipo.BOOLEAN;
            default:
                return Tipo.error;
        }
    }

    public ast(): string {
        const name_nodo = `node_${this.line}_${this.column}_`
        return `
        ${name_nodo};
        ${name_nodo}[label="\\<Acceso a Vector\\>\\n{${this.id}\\n Posicion: {${this.numeroAcceso}}"];
        `
    }
}
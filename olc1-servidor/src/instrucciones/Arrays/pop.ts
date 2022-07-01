import { Expresion } from "../../abstract/expresion";
import { Instruccion } from "../../abstract/instruccion";
import { Errores } from "../../errores/errores";
import { Singleton } from "../../patronSingleton/singleton";
import { Entorno } from "../../simbolos/entorno";
import { Tipo } from "../../simbolos/tipo";

export class Pop extends Instruccion {
    constructor(
        public nombreVector: string,
        line: number, 
        column : number
    ) {
        super(line,column);
    }

    public run(env: Entorno) {
        var singleton = Singleton.getInstance();
        var vector = env.get_variable(this.nombreVector)

        if (vector == null || vector == undefined){
            const error = new Errores(this.line, this.column, `Variable con el nombre '${this.nombreVector}' inexistente.`,"Error semántico");
            singleton.add_errores(error);
            return
        } 

        if(vector != null){
            if(vector.tipo == Tipo.VECINT || vector.tipo == Tipo.VECSTRING || vector.tipo == Tipo.VECBOOLEAN || vector.tipo == Tipo.VECDOUBLE || vector.tipo == Tipo.VECCHAR){
                vector.valor.pop();
            }else{
                const error = new Errores(this.line, this.column, "La variable no es un vector.", "Semántico");
                singleton.add_errores(error);
                console.log(error)
            }
        }else{
            //no tiene que hacer la conversión y solo dar un error semántico
            const error = new Errores( this.line, this.column, `No es posible aplicar la funcion push() a un valor que no sea un vector.`, "Semántico");
            singleton.add_errores(error);
            return
        }
        
    }
    public ast(): void {
        const consola = Singleton.getInstance()
        const nombre_nodo =`instruccion_${this.line}_${this.column}_`
        consola.addAst(`${nombre_nodo}[label="\\<Instruccion\\>\\nPush"];\n`)
        consola.addAst(`${nombre_nodo}1[label="\\<Identificador\\>\\n{${this.nombreVector}}"];\n`)
        consola.addAst(`${nombre_nodo}->${nombre_nodo}1;\n`)
       
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

}
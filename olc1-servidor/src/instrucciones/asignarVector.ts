import { Expresion } from "../abstract/expresion";
import { Instruccion } from "../abstract/instruccion";
import { Errores } from "../errores/errores";
import { Singleton } from "../patronSingleton/singleton";
import { Entorno } from "../simbolos/entorno";
import { Tipo } from "../simbolos/tipo";

export class AsignarVector extends Instruccion {
    constructor(
        public nombre: string,
        public numeroAcceso: number,
        public expresion : Expresion,
        line: number, 
        column : number
    ) {
        super(line,column);
    }

    public run(env: Entorno) {
        var singleton = Singleton.getInstance(); //instancia de la consola por posibles errores
        const expresion = this.expresion.run(env)
        var bandera: boolean = true;
        
        var vector = env.get_variable(this.nombre)

        if (vector == null || vector == undefined){
            const error = new Errores(this.line, this.column, `Variable con el nombre '${this.nombre}' inexistente.`,"Error semántico");
            singleton.add_errores(error);
            console.log(error)
            bandera = false;
            return;
        } 

        if(vector.tipo == Tipo.VECINT || vector.tipo == Tipo.VECSTRING || vector.tipo == Tipo.VECBOOLEAN || vector.tipo == Tipo.VECDOUBLE || vector.tipo == Tipo.VECCHAR){
            if(this.numeroAcceso < vector.valor.length){
                if (this.getTipo(vector.tipo) != expresion.tipo) {
                    const error = new Errores(this.line, this.column, `La asignación no se puede realizar, ela vector con nombre '${this.nombre}' es de tipo [${this.getTipo(vector.tipo)}] y se le esta tratando de asignar un tipo [${singleton.getTipo(expresion.tipo)}]`,"Semántico");
                    singleton.add_errores(error);
                    bandera = false;
                    console.log(error)
                    throw new Error("Los tipos no coinciden en la asiganción de valores de la vector");
                }
                console.log(vector.valor[this.numeroAcceso])
                vector.valor[this.numeroAcceso] = expresion.valor;
                console.log(vector.valor[this.numeroAcceso])
            }else{
                const error = new Errores(this.line, this.column, "No existe la posicion "+this.numeroAcceso+" en el vector.", "Semántico");
                singleton.add_errores(error);
                console.log(error)
                return;
            }
        }else{
            const error = new Errores(this.line, this.column, "La variable no es un vector.", "Semántico");
            singleton.add_errores(error);
            console.log(error)
            return;
        }
        
        
    }
    public ast(): void {
        const consola = Singleton.getInstance()
        const nombre_nodo =`instruccion_${this.line}_${this.column}_`
        consola.addAst(`${nombre_nodo}[label="\\<Instruccion\\>\\nAsignacion"];\n`)
        consola.addAst(`${nombre_nodo}1[label="\\<Identificador\\>\\n{${this.nombre}}"];\n`)
        consola.addAst(`${nombre_nodo}->${nombre_nodo}1;\n`)
        consola.addAst(`${nombre_nodo}->${this.expresion.ast()}\n`)
       
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
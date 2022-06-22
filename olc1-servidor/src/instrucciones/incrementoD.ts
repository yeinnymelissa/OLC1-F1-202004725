import { Instruccion } from "../abstract/instruccion";
import { Entorno } from "../simbolos/entorno";

export class IncrementoD extends Instruccion {
    constructor(
        public nombre: string,
        line: number, 
        column : number
    ) {
        super(line,column);
    }

    public run(env: Entorno) {

        let variable = env.get_variable(this.nombre)?.value;

        if(variable.type == Number){
           env.actualizar_variable(this.nombre,++variable);
        }else{
            //error semantico
        }
        
    }
    public graficar(){
        //singleton, una funcion agregar reporte ast
        //
       
        
    }
}
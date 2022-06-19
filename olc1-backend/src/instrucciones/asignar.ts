import { Expresion } from "../abstract/expresion";
import { Instruccion } from "../abstract/instruccion";
import { Entorno } from "../simbolos/entorno";

export class Asignar extends Instruccion {
    constructor(
        public nombre: string,
        public expresion : Expresion,
        line: number, 
        column : number
    ) {
        super(line,column);
    }

    public run(env: Entorno) {
        
        env.actualizar_variable(this.nombre,this.expresion);
        
    }
    public graficar(){
        //singleton, una funcion agregar reporte ast
        //
       
        
    }
}
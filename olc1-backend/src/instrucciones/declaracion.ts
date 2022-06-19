import { Expresion } from "../abstract/expresion";
import { Instruccion } from "../abstract/instruccion";
import { Entorno } from "../simbolos/entorno";


export class Declaracion extends Instruccion {
    constructor(
        public nombre: string,
        public tipo: string,
        public expresion : Expresion,
        public editable : boolean,
        line: number, 
        column : number
    ) {
        super(line,column);
    }

    public run(env: Entorno) {
        //codigo analisis semantico
        console.log("Declarando nueva variable: "+ this.nombre);
        //console.log(this);


        const expresion= this.expresion.run(env);
        console.log(expresion);
        

        //preguntar si la variable esta libre

        if(env.buscar_variable(this.nombre)){
            //error semenaticos
            throw "Error semantico, la variable ya existe, no se puede repetir en este entorno"
        }


        //si los tipos son correctos o hacen match

        // if(x.type==){
        //     //ingreso de la variable a la tabla simbolos
        // }
        // else{
        //     //reporte de error semantico
        // }

        env.guardar_variable(this.nombre,expresion.value,expresion.type)
        

        
    }
}
import { Instruccion } from "../abstract/instruccion";
import { Entorno } from "../simbolos/entorno";

export class Bloque extends Instruccion {
    constructor(
        
        public instrucciones : any[],
        line: number, 
        column : number
    ) {
        super(line,column);
    }

    public run(env: Entorno) {

        //analisis semantivo 

        const new_env= new Entorno(env);


        // como acceder a otras tablas de simbolos padres
        // while(env!=null){
        //     //busqueda de dla variblea
        //     env = env.anterior
        // }


        for (const elemento  of this.instrucciones) {
            try {
                
                elemento.run(new_env)
            } catch (error) {
                //console.log(error);
                
            }
        }

        
    }
}
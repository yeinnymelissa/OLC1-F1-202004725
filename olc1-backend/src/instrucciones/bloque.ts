import { Instruccion } from "../abstract/instruccion";
import { Retorno } from "../abstract/retorno";
import { Entorno } from "../simbolos/entorno";
import { Tipo } from "../simbolos/tipo";

export class Bloque extends Instruccion {
    public recorridoAmbito: string = "";
    public break_Encontrado: boolean = false;
    public continue_Encontrado: boolean = false;
    public return_Encontrado: boolean = false;
    public valor_Return: Retorno = { valor: null, tipo: Tipo.VOID };
    constructor(
        public instrucciones : any[],
        line: number, 
        column : number
    ) {
        super(line,column);
    }

    public run(env: Entorno) {

        //analisis semantivo 

        const new_env= new Entorno(env, this.recorridoAmbito);


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

    public ast(): void {
        
    }
}
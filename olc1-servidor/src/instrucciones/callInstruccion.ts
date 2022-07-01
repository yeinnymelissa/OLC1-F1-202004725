import { Expresion } from "../abstract/expresion";
import { Instruccion } from "../abstract/instruccion";
import { Errores } from "../errores/errores";
import { Singleton } from "../patronSingleton/singleton";
import { Entorno } from "../simbolos/entorno";
import { Declaracion } from "./declaracion";
import { Asignar } from "./asignar";

export class LlamadaIns extends Instruccion {

    constructor(
        private nombre: string,
        private expresiones: Expresion [],
        line: number,
        column: number
    ) {
        super(line, column)
    }

    public run(env: Entorno) {
        var consola = Singleton.getInstance(); 
        const funcion_Buscada = env.get_metodos_funciones(this.nombre)?.valor
        console.log("funcion buscada: "+ funcion_Buscada)
        if (funcion_Buscada == null || funcion_Buscada == undefined) {
            const error = new Errores(this.line, this.column, `No existe una función con el nombre '${this.nombre}'.`, "Semántico");
            consola.add_errores(error);
            console.log(error)
            return;
        }
        
        if (this.expresiones.length != funcion_Buscada.parametros.length) {
            const error = new Errores(this.line, this.column, `La cantidad de parametros en la llamada no coincide con los existentes en la función '${this.nombre}'`,"Semántico");
            consola.add_errores(error);
            console.log(error)
            return;
        }

        var cont = 0;
        this.expresiones.forEach(element => {
            var parametro: Declaracion = funcion_Buscada.parametros[cont];
            var nombreParametro: string = "";
            parametro.nombres.forEach(elementPara => {
                nombreParametro = elementPara;
            });
            const actualizacion_Parametro:  Asignar = new Asignar(nombreParametro, element, 0, 0);
            actualizacion_Parametro.run(funcion_Buscada.ambienteFuncion);
            cont++;
        });

        funcion_Buscada.bloque!.recorridoAmbito = funcion_Buscada.ambienteFuncion.recorridoAmbito;

        funcion_Buscada.bloque?.run(funcion_Buscada.ambienteFuncion);
        
    }

    public ast() {
        const consola = Singleton.getInstance()
        const nombre_nodo =`instruccion_${this.line}_${this.column}_`
        consola.addAst(`${nombre_nodo}[label="\\<Instruccion\\>\\nLlamar Función\\n\\"{${this.nombre}}\\""];\n`)
    }
}
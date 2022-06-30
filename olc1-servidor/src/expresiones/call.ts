import { Expresion } from "../abstract/expresion";
import { Retorno } from "../abstract/retorno";
import { Errores } from "../errores/errores";
import { Asignar } from "../instrucciones/asignar";
import { Declaracion } from "../instrucciones/declaracion";
import { InsFuncion } from "../instrucciones/funcion";
import { Singleton } from "../patronSingleton/singleton";
import { Entorno } from "../simbolos/entorno";
import { Tipo } from "../simbolos/tipo";

export class Llamada extends Expresion {

    constructor(
        private nombre: string,
        private expresiones: Expresion [],
        line: number,
        column: number
    ) {
        super(line, column)
    }

    public run(env: Entorno): Retorno{
        var consola = Singleton.getInstance(); 
        const funcion_Buscada = env.get_metodos_funciones(this.nombre)?.valor
        var retorno: Retorno = { valor: null, tipo: Tipo.VOID }

        if (funcion_Buscada == null || funcion_Buscada == undefined) {
            const error = new Errores(this.line, this.column, `No existe una función con el nombre '${this.nombre}'.`, "Semántico");
            consola.add_errores(error);
            retorno = { valor: null, tipo: Tipo.error }
            return retorno
        }
        
        if (this.expresiones.length != funcion_Buscada.parametros.length) {
            const error = new Errores(this.line, this.column, `La cantidad de parametros en la llamada no coincide con los existentes en la función '${this.nombre}'`,"Semántico");
            consola.add_errores(error);
            retorno = { valor: null, tipo: Tipo.error }
            return retorno
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
        
        env.obtenerTodasLasFunciones().forEach(element => {
            funcion_Buscada.ambienteFuncion.guardar_funcion_metodo(element.name, element, element.tipo, false, element.recorridoFuncion, element.line, element.column);
        });

        funcion_Buscada.bloque?.execute(funcion_Buscada.ambienteFuncion);
        retorno = funcion_Buscada.bloque?.valor_Return;

        return retorno;
    }

    public ast() {
        const nombre = `node_${this.line}_${this.column}_`
        return `
        ${nombre};
        ${nombre}[label="\\<Llamada\\>\\n\\"{${this.nombre}}\\""];
        `
    }
}
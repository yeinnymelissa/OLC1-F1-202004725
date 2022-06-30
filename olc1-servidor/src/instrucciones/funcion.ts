import { Instruccion } from "../abstract/instruccion";
import { Errores } from "../errores/errores";
import { Singleton } from "../patronSingleton/singleton";
import { Entorno } from "../simbolos/entorno";
import { Tipo } from "../simbolos/tipo";
import { Bloque } from "./bloque";
import { Declaracion } from "./declaracion";

export class InsFuncion extends Instruccion {
    

    public ambienteFuncion: Entorno= new Entorno(null,"", -1);
    public recorridoFuncion: string = "";
    constructor(
        public name: string,
        public bloque: Bloque,
        public parametros: Declaracion [],
        public tipo: Tipo,
        line: number,
        column: number
    ) {
        super(line, column)
    }

    public run(env: Entorno) {
        const consola = Singleton.getInstance()
        let c = env.buscar_metodo_funcion(this.name)
        this.recorridoFuncion = env.recorridoAmbito;
        this.ambienteFuncion = new Entorno(env, "global -> "+this.name, consola.get_envID());

        consola.aumentarEnv()

        if (c){
            const error = new Errores(this.line, this.column, "No se puede declarar la funcion con el nombre \""+this.name+"\" porque ya existe.", "Semántico");
            consola.add_errores(error);
            return;
        } 
        

        //Se ejecuta el guardado de cada parametro en el ambiente de la función
        this.parametros.forEach(element => {
            element.run(this.ambienteFuncion)
        });
        

        //todo esta listo para guardar la función en la tabla de simbolos
        env.guardar_funcion_metodo(this.name, this, this.tipo, false, env.recorridoAmbito, this.line, this.column);
    }

    public ast() {
        const consola = Singleton.getInstance()
        const name_node = `instruccion_${this.line}_${this.column}_`
        consola.addAst(`
        ${name_node}[label="\\<Instruccion\\>\\nDeclaración de función"];
        ${name_node}1[label="\\<Bloque Función\\>"];
        ${name_node}->${name_node}1;
        ${name_node}1->instruccion_${this.bloque.line}_${this.bloque.column}_;`)
        this.bloque.ast()
    }
}
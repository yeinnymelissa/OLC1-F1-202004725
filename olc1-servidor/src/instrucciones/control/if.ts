import { Expresion } from "../../abstract/expresion";
import { Instruccion } from "../../abstract/instruccion";
import { Retorno } from "../../abstract/retorno";
import { Errores } from "../../errores/errores";
import { Singleton } from "../../patronSingleton/singleton";
import { Entorno } from "../../simbolos/entorno";
import { Tipo } from "../../simbolos/tipo";
import { Bloque } from "../bloque";

export class If extends Instruccion {

    /**
     * Estas variables es porque se generan nuevos ambitos con estas funciones y en caso de retornos
     * tiene que devolver algo.
     */
    public return_Encontrado: boolean = false;
    public valor_Return: Retorno = { valor: null, tipo: Tipo.VOID };

    constructor(
        private condition: Expresion,
        public bloque: Bloque,
        public else_ElseIf: Bloque | null,
        line: number,
        column: number
    ) {
        super(line, column)
    }

    public run(env: Entorno) {
        var singleton = Singleton.getInstance(); //instancia de la consola por posibles errores
        const expresion = this.condition.run(env)

        if (expresion.tipo != Tipo.BOOLEAN) {
            const error = new Errores( this.line, this.column, `La condición de la instruccion if no es de tipo booleana.`, "Semántico");
            singleton.add_errores(error);
            return;
        }

        if (expresion.valor) {
            this.bloque.recorridoAmbito = env.recorridoAmbito + " -> if / else if";
            this.bloque.run(env)
            if (this.bloque.return_Encontrado) { //este if para pasar el retorno de la instrucción return.
                /**Como se generan ámbitos en el if entonces de esta forma pasamos el valor de algún return */
                this.bloque.return_Encontrado = false;
                this.return_Encontrado = true;
                this.valor_Return = this.bloque.valor_Return;
                this.bloque.valor_Return = { valor: null, tipo: Tipo.VOID };
            }
        } else {
            if (this.else_ElseIf != null) {
                this.else_ElseIf.run(env)
                if (this.else_ElseIf instanceof Bloque && this.else_ElseIf.return_Encontrado) { //este if para pasar el retorno de la instrucción return.
                    /**Como se generan ámbitos en el if entonces de esta forma pasamos el valor de algún return */
                    this.else_ElseIf!.return_Encontrado = false;
                    this.return_Encontrado = true;
                    this.valor_Return = this.else_ElseIf!.valor_Return;
                    this.else_ElseIf!.valor_Return = { valor: null, tipo: Tipo.VOID };
                }
            }
        }

    }

    public ast() {
        const singleton = Singleton.getInstance()
        const name_node = `instruccion_${this.line}_${this.column}_`
        singleton.addAst(`
        ${name_node}[label="\\<Instruccion\\>\\nIf / Else if / Else"];
        ${name_node}1[label="\\<Sentencia if\\>"];
        ${name_node}2[label="\\<Sentencia else\\>"];
        ${name_node}->${name_node}1;
        ${name_node}->${name_node}2;
        ${name_node}1->instruccion_${this.bloque.line}_${this.bloque.column}_;`)
        this.bloque.ast()
        if (this.else_ElseIf != null) {
            singleton.addAst(`${name_node}2->instruccion_${this.else_ElseIf.line}_${this.else_ElseIf.column}_`)
            this.else_ElseIf.ast()
        }
    }
}
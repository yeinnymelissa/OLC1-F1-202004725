import { Expresion } from "../../abstract/expresion";
import { Instruccion } from "../../abstract/instruccion";
import { Retorno } from "../../abstract/retorno";
import { Errores } from "../../errores/errores";
import { Singleton } from "../../patronSingleton/singleton";
import { Entorno } from "../../simbolos/entorno";
import { Tipo } from "../../simbolos/tipo";
import { Bloque } from "../bloque";

export class For extends Instruccion {

    public return_Encontrado: boolean = false;
    public valor_Return: Retorno = { valor: null, tipo: Tipo.VOID };

    constructor(
        private declaracion: Expresion | Instruccion,
        private condition: Expresion,
        private iteracion: Expresion | Instruccion,
        public bloque: Bloque,
        line: number,
        column: number
    ) {
        super(line, column)
    }

    public run(env: Entorno) {
        
        var singleton = Singleton.getInstance(); //instancia de la singleton por posibles errores
        const newEnv = new Entorno(env, env.recorridoAmbito + " -> Sentencias for", singleton.get_envID())
        singleton.aumentarEnv()
        var retorno_Decla: Retorno;
        var retorno_Iter: Retorno;

        if (this.declaracion instanceof Expresion) {
            retorno_Decla = this.declaracion.run(newEnv);
            if (retorno_Decla.tipo == Tipo.error) {
                const error = new Errores( this.line, this.column, `Se requiere una declaracion o una asignacion.`, "Semántico");
                singleton.add_errores(error);
                return;
            }
        } else { //de lo contrario es una instrucción por lo que simplemente se tiene que ejecutar
            this.declaracion.run(newEnv);
        }

        var exec_Condicion = this.condition.run(newEnv)
        if (exec_Condicion.tipo != Tipo.BOOLEAN) {
            const error = new Errores( this.line, this.column, `La condición propuesta debe ser un booleano.`, "Semántico");
            singleton.add_errores(error);
            return;
        }

        while (exec_Condicion.valor == true && this.bloque?.break_Encontrado == false) {

            if (this.bloque != null && this.bloque != undefined) {
                this.bloque.recorridoAmbito = newEnv.recorridoAmbito + " -> Cuerpo for";
                this.bloque.run(newEnv)
            }

            /**Validaciones del {return} en el for  */
            if (this.bloque.return_Encontrado == true) {
                if (this.bloque.return_Encontrado == true) {
                    this.bloque.return_Encontrado = false;

                    this.return_Encontrado = true;
                    this.valor_Return = this.bloque.valor_Return;
                    this.bloque.valor_Return = { valor: null, tipo: Tipo.VOID };
                    break;
                }
            }

            //Ejecutar la iteración
            if (this.iteracion instanceof Expresion) {
                retorno_Iter = this.iteracion.run(newEnv);
                if (retorno_Iter.tipo == Tipo.error) {
                    const error = new Errores( this.line, this.column, `La instruccion debe ser un decremento o incremento.`, "Semántico");
                    singleton.add_errores(error);
                    return;
                }
            } else { //de lo contrario es una instrucción por lo que simplemente se tiene que ejecutar
                this.iteracion.run(newEnv);
            }

            exec_Condicion = this.condition.run(newEnv)
        }

        if (this.bloque != null || this.bloque != undefined) this.bloque.break_Encontrado = false;
    }

    public ast() {
        const singleton = Singleton.getInstance()
        const name_node = `instruccion_${this.line}_${this.column}_`
        singleton.addAst(`
        ${name_node}[label="\\<Instruccion\\>\\nFor"];
        ${name_node}Ambito[label="\\<Nuevo ámbito\\>\\n"];
        ${name_node}->${name_node}Ambito;
        ${name_node}1[label="\\<Declaración For\\>"];
        ${name_node}2[label="\\<Condición For\\>"];
        ${name_node}3[label="\\<Iteración For\\>"];
        ${name_node}4[label="\\<Cuerpo For\\>"];
        ${name_node}Ambito->${name_node}1;
        ${name_node}Ambito->${name_node}2;
        ${name_node}Ambito->${name_node}3;
        ${name_node}Ambito->${name_node}4;
        `)

        //Unión a la parte declaración
        if (this.declaracion instanceof Expresion) {
            singleton.addAst(`${name_node}1->${this.declaracion.ast()}`);
        } else {
            singleton.addAst(`${name_node}1->instruccion_${this.declaracion.line}_${this.declaracion.column}_;`);
            this.declaracion.ast();
        }

        //Unión a la parte condicional
        singleton.addAst(`
        ${name_node}2->${this.condition.ast()}
        `)

        //Unión a la parte iterativa
        if (this.iteracion instanceof Expresion) {
            singleton.addAst(`${name_node}3->${this.iteracion.ast()}
            `);
        } else {
            singleton.addAst(`${name_node}3->instruccion_${this.iteracion.line}_${this.iteracion.column}_;
            `);
            this.iteracion.ast()
        }

        //Conectando el cuerpo de for.
        singleton.addAst(`
        ${name_node}4->instruccion_${this.bloque?.line}_${this.bloque?.column}_;
        `)
        this.bloque?.ast()
    }
}
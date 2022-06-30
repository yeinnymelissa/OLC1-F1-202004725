import { Expresion } from "../../abstract/expresion";
import { Instruccion } from "../../abstract/instruccion";
import { Retorno } from "../../abstract/retorno";
import { Errores } from "../../errores/errores";
import { Singleton } from "../../patronSingleton/singleton";
import { Entorno } from "../../simbolos/entorno";
import { Tipo } from "../../simbolos/tipo";
import { Bloque } from "../bloque";

export class While extends Instruccion {

    public return_Encontrado: boolean = false;
    public valor_Return: Retorno = { valor: null, tipo: Tipo.VOID };

    constructor(
        public condicion:Expresion,
        public bloque: Bloque,
        line: number, 
        column : number
    ) {
        super(line,column);
    }

    public run(env: Entorno) {
        var singleton = Singleton.getInstance(); //instancia de la singleton por posibles errores

        var condicionEjecutada = this.condicion.run(env)
        if (condicionEjecutada.tipo != Tipo.BOOLEAN) {
            const error = new Errores( this.line, this.column, `La condición del ciclo while no es de tipo booleana.`, "Semántico");
            singleton.add_errores(error);
            return;
        }

        while (condicionEjecutada.valor == true && this.bloque?.break_Encontrado == false) {
            
            if(this.bloque != null && this.bloque != undefined){
                this.bloque.recorridoAmbito = env.recorridoAmbito+" -> Cuerpo while";
                this.bloque.run(env)   
            }

            if (this.bloque.return_Encontrado == true) {
                if (this.bloque.return_Encontrado == true) {
                    this.bloque.return_Encontrado = false;

                    this.return_Encontrado = true;
                    this.valor_Return = this.bloque.valor_Return;
                    this.bloque.valor_Return = { valor: null, tipo: Tipo.VOID };
                    break;
                }
            }

            condicionEjecutada = this.condicion.run(env)
        }

        if(this.bloque != null || this.bloque != undefined) this.bloque.break_Encontrado = false;
    }

    public ast(): void {
        const singleton = Singleton.getInstance()
        const name_node = `instruccion_${this.line}_${this.column}_`
        singleton.addAst(`
        ${name_node}[label="\\<Instruccion\\>\\nWhile"];
        ${name_node}Ambito[label="\\<Nuevo ámbito\\>\\n"];
        ${name_node}->${name_node}Ambito;
        ${name_node}1[label="\\<Condición While\\>"];
        ${name_node}2[label="\\<Cuerpo While\\>"];
        ${name_node}Ambito->${name_node}1;
        ${name_node}Ambito->${name_node}2;
        `)

        //Unión a la parte condicional
        singleton.addAst(`
        ${name_node}1->${this.condicion.ast()}
        `)

        //Conectando el cuerpo de for.
        singleton.addAst(`
        ${name_node}2->instruccion_${this.bloque?.line}_${this.bloque?.column}_;
        `)
        this.bloque?.ast()
    }
}
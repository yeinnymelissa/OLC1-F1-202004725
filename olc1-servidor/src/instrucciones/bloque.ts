import { Instruccion } from "../abstract/instruccion";
import { Retorno } from "../abstract/retorno";
import { Entorno } from "../simbolos/entorno";
import { Tipo } from "../simbolos/tipo";
import { Return } from "./Transicion/return";
import { Break } from "./Transicion/break";
import { Continue } from "./Transicion/continue";
import { If } from "./control/if";
import { Singleton } from "../patronSingleton/singleton";

export class Bloque extends Instruccion {
    public recorridoAmbito: string = "";
    public break_Encontrado: boolean = false;
    public continue_Encontrado: boolean = false;
    public return_Encontrado: boolean = false;
    public valor_Return: Retorno = { valor: null, tipo: Tipo.VOID };
    constructor(
        public instrucciones : Instruccion[],
        line: number, 
        column : number
    ) {
        super(line,column);
    }

    public run(env: Entorno) {
        var singleton = Singleton.getInstance();

        const newEnv = new Entorno(env, this.recorridoAmbito, singleton.get_envID())

        singleton.aumentarEnv()

        //Ejecutar las instrucciones del bloque.
        for (const instruccion of this.instrucciones) {

            /**Para cuando en el bloque la instrucción a ejecutar sea un return; */
            if (instruccion instanceof Return == true) {
                console.log("se encontro return")
                this.return_Encontrado = true;
                //Se ejecuta la expresión que trae el Return.
                const exec_Return = (<Return>instruccion).expresion?.run(newEnv);
                if (exec_Return != null && exec_Return != undefined) { //Si el return si venía con una expresión
                    this.valor_Return = exec_Return; //se actualiza el retorno de mi bloque
                }
                break;
            }

            if (instruccion instanceof Break == true) {
                console.log("se encontro break")
                this.break_Encontrado = true;
                break;
            }

            if (instruccion instanceof Continue == true) {
                console.log("se encontro continue")
                this.continue_Encontrado = true;
                break;
            }

            instruccion.run(newEnv);

            /**Los siguientes If son para validar los break dentro de if's*/
            if (instruccion instanceof If == true) {
                if ((<If>instruccion).bloque.break_Encontrado == true || (<If>instruccion).else_ElseIf?.break_Encontrado == true) {
                    (<If>instruccion).bloque.break_Encontrado = false;
                    if ((<If>instruccion).else_ElseIf != null) {
                        (<If>instruccion).else_ElseIf!.break_Encontrado = false;
                    }
                    this.break_Encontrado = true;
                    break;
                }
            }
            /**Los siguientes If son para validar los {continue} dentro de if's*/
            if (instruccion instanceof If == true) {
                if ((<If>instruccion).bloque.continue_Encontrado == true || (<If>instruccion).else_ElseIf?.continue_Encontrado == true) {
                    (<If>instruccion).bloque.continue_Encontrado = false;
                    if ((<If>instruccion).else_ElseIf != null) {
                        (<If>instruccion).else_ElseIf!.continue_Encontrado = false;
                    }
                    this.continue_Encontrado = true;
                    break;
                }
            }
            /**Los siguientes If son para validar los {return} dentro de if's*/
            if (instruccion instanceof If == true) {
                if ((<If>instruccion).return_Encontrado == true) {
                    (<If>instruccion).return_Encontrado = false;

                    this.return_Encontrado = true;
                    this.valor_Return = (<If>instruccion).valor_Return;
                    (<If>instruccion).valor_Return = { valor: null, tipo: Tipo.VOID };
                    break;
                } else if ((<If>instruccion).bloque.return_Encontrado == true) {
                    (<If>instruccion).bloque.return_Encontrado = false;

                    this.return_Encontrado = true;
                    this.valor_Return = (<If>instruccion).bloque.valor_Return;
                    (<If>instruccion).bloque.valor_Return = { valor: null, tipo: Tipo.VOID };
                    break;

                } else if ((<If>instruccion).return_Encontrado == true) {
                    if ((<If>instruccion).else_ElseIf != null) {
                        (<If>instruccion).return_Encontrado = false;
                        this.valor_Return = (<If>instruccion).valor_Return;
                        (<If>instruccion).valor_Return = { valor: null, tipo: Tipo.VOID };
                    }

                    this.return_Encontrado = true;
                    break;
                }
            }

        }

        
    }

    public ast(): void {
        const singleton = Singleton.getInstance()
        const name_node = `instruccion_${this.line}_${this.column}_`
        singleton.addAst(`
        ${name_node}[label="\\<Nuevo ámbito\\>"];        
        `)
        var cont = 0;
        var inst_line_anterior = 0;
        var inst_col_anterior = 0;
        this.instrucciones.forEach(instruccion => {
            if (cont == 0) {
                singleton.addAst(`${name_node}->instruccion_${instruccion.line}_${instruccion.column}_;`)
            } else {
                singleton.addAst(`instruccion_${inst_line_anterior}_${inst_col_anterior}_->instruccion_${instruccion.line}_${instruccion.column}_;`)
            }
            inst_line_anterior = instruccion.line;
            inst_col_anterior = instruccion.column;
            instruccion.ast()
            cont++;
        })
    }
}
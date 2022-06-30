import { Expresion } from "../abstract/expresion"
import { Retorno } from "../abstract/retorno"
import { Entorno } from "../simbolos/entorno"
import { Tipo } from "../simbolos/tipo"
import { opcionesAritmeticas } from "./opcionesAritmeticas"

export class Aritmeticas extends Expresion {

    constructor(
        private left: Expresion,
        private right: Expresion,
        private tipo: opcionesAritmeticas,
        line: number,
        column: number) {
        super(line, column)
    }

    public run(env: Entorno): Retorno {

        let result: Retorno ={
            valor:null,
            tipo:Tipo.error
        }

        const nodoIzq = this.left.run(env)
        const nodoDer = this.right.run(env)

        if (this.tipo == opcionesAritmeticas.MAS) {

            //INT CON INT
            if (nodoDer.tipo == Tipo.INT && nodoIzq.tipo == Tipo.INT) {
                result = { 
                    valor: (nodoIzq.valor + nodoDer.valor), 
                    tipo: Tipo.INT 
                }
            } // INT CON DOUBLE O DOUBLE CON INT
            else if (nodoDer.tipo == Tipo.INT && nodoIzq.tipo == Tipo.DOUBLE
                ||nodoDer.tipo == Tipo.DOUBLE && nodoIzq.tipo == Tipo.INT) {
                result = { 
                    valor: (nodoIzq.valor + nodoDer.valor), 
                    tipo: Tipo.DOUBLE 
                }
            } // STRING CON INT O INT CON STRING
            else if (nodoDer.tipo == Tipo.INT && nodoIzq.tipo == Tipo.STRING
                ||nodoDer.tipo == Tipo.STRING && nodoIzq.tipo == Tipo.INT) {
                result = { 
                    valor: (String(nodoIzq.valor) + String(nodoDer.valor)), 
                    tipo: Tipo.STRING 
                }
            } // CHAR CON INT
            else if (nodoIzq.tipo == Tipo.CHAR && nodoDer.tipo == Tipo.INT ) {
                result = { 
                    valor: (nodoIzq.valor.charCodeAt(0) + nodoDer.valor), 
                    tipo: Tipo.INT 
                }
            } // INT CON CHAR
            else if (nodoIzq.tipo == Tipo.INT && nodoDer.tipo == Tipo.CHAR ) {
                result = { 
                    valor: (nodoIzq.valor + nodoDer.valor.charCodeAt(0)), 
                    tipo: Tipo.INT 
                }
            } // STRING CON STRING 
            else if (nodoIzq.tipo == Tipo.STRING && nodoDer.tipo == Tipo.STRING) {
                result = { 
                    valor: (String(nodoIzq.valor) + String(nodoDer.valor)), 
                    tipo: Tipo.STRING 
                }
            } // DOUBLE CON DOUBLE
            else if (nodoIzq.tipo == Tipo.DOUBLE && nodoDer.tipo == Tipo.DOUBLE ) {
                result = { 
                    valor: (nodoIzq.valor + nodoDer.valor), 
                    tipo: Tipo.DOUBLE 
                }
            } // DOUBLE CON CHAR
            else if (nodoIzq.tipo == Tipo.DOUBLE && nodoDer.tipo == Tipo.CHAR ) {
                result = { 
                    valor: (nodoIzq.valor + nodoDer.valor.charCodeAt(0)), 
                    tipo: Tipo.DOUBLE 
                }
            } // CHAR CON DOUBLE
            else if (nodoIzq.tipo == Tipo.CHAR && nodoDer.tipo == Tipo.DOUBLE ) {
                result = { 
                    valor: (nodoIzq.valor.charCodeAt(0) + nodoDer.valor), 
                    tipo: Tipo.DOUBLE 
                }
            } // DOUBLE CON STRING O STRING CON DOUBLE
            else if (nodoDer.tipo == Tipo.DOUBLE && nodoIzq.tipo == Tipo.STRING
                ||nodoDer.tipo == Tipo.STRING && nodoIzq.tipo == Tipo.DOUBLE) {
                result = { 
                    valor: (String(nodoIzq.valor) + String(nodoDer.valor)), 
                    tipo: Tipo.STRING 
                }
            }// CHAR CON STRING O STRING CON CHAR
            else if (nodoDer.tipo == Tipo.CHAR && nodoIzq.tipo == Tipo.STRING
                ||nodoDer.tipo == Tipo.STRING && nodoIzq.tipo == Tipo.CHAR) {
                result = { 
                    valor: (String(nodoIzq.valor) + String(nodoDer.valor)), 
                    tipo: Tipo.STRING 
                }
            } // CHAR CON CHAR
            else if (nodoIzq.tipo == Tipo.CHAR && nodoDer.tipo == Tipo.CHAR ) {
                result = { 
                    valor: (nodoIzq.valor.charCodeAt(0) + nodoDer.valor.charCodeAt(0)), 
                    tipo: Tipo.INT 
                }
            }
            else if (nodoDer.tipo == Tipo.BOOLEAN && nodoIzq.tipo == Tipo.STRING
                ||nodoDer.tipo == Tipo.STRING && nodoIzq.tipo == Tipo.BOOLEAN) {
                result = { 
                    valor: (String(nodoIzq.valor) + String(nodoDer.valor)), 
                    tipo: Tipo.STRING 
                }
            }
            
            //demas validadionces para la operaciones aritmeticas
            
        }else if (this.tipo == opcionesAritmeticas.MENOS) {

            // INT CON INT
            if (nodoDer.tipo == Tipo.INT && nodoIzq.tipo == Tipo.INT) {
                result = { 
                    valor: (nodoIzq.valor - nodoDer.valor), 
                    tipo: Tipo.INT 
                }
            } // INT CON DOUBLE O DOUBLE CON INT
            else if (nodoDer.tipo == Tipo.INT && nodoIzq.tipo == Tipo.DOUBLE
                ||nodoDer.tipo == Tipo.DOUBLE && nodoIzq.tipo == Tipo.INT) {
                result = { 
                    valor: (nodoIzq.valor - nodoDer.valor), 
                    tipo: Tipo.DOUBLE 
                }
            } // CHAR CON INT
            else if (nodoIzq.tipo == Tipo.CHAR && nodoDer.tipo == Tipo.INT ) {
                result = { 
                    valor: (nodoIzq.valor.charCodeAt(0) - nodoDer.valor), 
                    tipo: Tipo.INT 
                }
            } // INT CON CHAR
            else if (nodoIzq.tipo == Tipo.INT && nodoDer.tipo == Tipo.CHAR ) {
                result = { 
                    valor: (nodoIzq.valor - nodoDer.valor.charCodeAt(0)), 
                    tipo: Tipo.INT 
                }
            } // DOUBLE CON DOUBLE
            else if (nodoIzq.tipo == Tipo.DOUBLE && nodoDer.tipo == Tipo.DOUBLE ) {
                result = { 
                    valor: (nodoIzq.valor - nodoDer.valor), 
                    tipo: Tipo.DOUBLE 
                }
            } // DOUBLE CON CHAR
            else if (nodoIzq.tipo == Tipo.DOUBLE && nodoDer.tipo == Tipo.CHAR ) {
                result = { 
                    valor: (nodoIzq.valor - nodoDer.valor.charCodeAt(0)), 
                    tipo: Tipo.DOUBLE 
                }
            } // CHAR CON DOUBLE
            else if (nodoIzq.tipo == Tipo.CHAR && nodoDer.tipo == Tipo.DOUBLE ) {
                result = { 
                    valor: (nodoIzq.valor.charCodeAt(0) - nodoDer.valor), 
                    tipo: Tipo.DOUBLE 
                }
            } // CHAR CON CHAR
            else if (nodoIzq.tipo == Tipo.CHAR && nodoDer.tipo == Tipo.CHAR ) {
                result = { 
                    valor: (nodoIzq.valor.charCodeAt(0) - nodoDer.valor.charCodeAt(0)), 
                    tipo: Tipo.INT 
                }
            }
            //en la resta unicamente quiero con numeros
            
        }else if (this.tipo == opcionesAritmeticas.MULTIPLICACION){

            //INT CON INT
            if (nodoDer.tipo == Tipo.INT && nodoIzq.tipo == Tipo.INT) {
                result = { 
                    valor: (nodoIzq.valor * nodoDer.valor), 
                    tipo: Tipo.INT 
                }
            } // INT CON DOUBLE O DOUBLE CON INT
            else if (nodoDer.tipo == Tipo.INT && nodoIzq.tipo == Tipo.DOUBLE
                ||nodoDer.tipo == Tipo.DOUBLE && nodoIzq.tipo == Tipo.INT) {
                result = { 
                    valor: (nodoIzq.valor * nodoDer.valor), 
                    tipo: Tipo.DOUBLE 
                }
            } // CHAR CON INT
            else if (nodoIzq.tipo == Tipo.CHAR && nodoDer.tipo == Tipo.INT ) {
                result = { 
                    valor: (nodoIzq.valor.charCodeAt(0) * nodoDer.valor), 
                    tipo: Tipo.INT 
                }
            } // INT CON CHAR
            else if (nodoIzq.tipo == Tipo.INT && nodoDer.tipo == Tipo.CHAR ) {
                result = { 
                    valor: (nodoIzq.valor * nodoDer.valor.charCodeAt(0)), 
                    tipo: Tipo.INT 
                }
            } // DOUBLE CON DOUBLE
            else if (nodoIzq.tipo == Tipo.DOUBLE && nodoDer.tipo == Tipo.DOUBLE ) {
                result = { 
                    valor: (nodoIzq.valor * nodoDer.valor), 
                    tipo: Tipo.DOUBLE 
                }
            } // DOUBLE CON CHAR
            else if (nodoIzq.tipo == Tipo.DOUBLE && nodoDer.tipo == Tipo.CHAR ) {
                result = { 
                    valor: (nodoIzq.valor * nodoDer.valor.charCodeAt(0)), 
                    tipo: Tipo.DOUBLE 
                }
            } // CHAR CON DOUBLE
            else if (nodoIzq.tipo == Tipo.CHAR && nodoDer.tipo == Tipo.DOUBLE ) {
                result = { 
                    valor: (nodoIzq.valor.charCodeAt(0) * nodoDer.valor), 
                    tipo: Tipo.DOUBLE 
                }
            } // CHAR CON CHAR
            else if (nodoIzq.tipo == Tipo.CHAR && nodoDer.tipo == Tipo.CHAR ) {
                result = { 
                    valor: (nodoIzq.valor.charCodeAt(0) * nodoDer.valor.charCodeAt(0)), 
                    tipo: Tipo.INT 
                }
            }
        }else if (this.tipo == opcionesAritmeticas.DIVISION){

            //INT CON INT
            if (nodoDer.tipo == Tipo.INT && nodoIzq.tipo == Tipo.INT) {
                result = { 
                    valor: (nodoIzq.valor / nodoDer.valor), 
                    tipo: Tipo.INT 
                }
            } // INT CON DOUBLE O DOUBLE CON INT
            else if (nodoDer.tipo == Tipo.INT && nodoIzq.tipo == Tipo.DOUBLE
                ||nodoDer.tipo == Tipo.DOUBLE && nodoIzq.tipo == Tipo.INT) {
                result = { 
                    valor: (nodoIzq.valor / nodoDer.valor), 
                    tipo: Tipo.DOUBLE 
                }
            } // CHAR CON INT
            else if (nodoIzq.tipo == Tipo.CHAR && nodoDer.tipo == Tipo.INT ) {
                result = { 
                    valor: (nodoIzq.valor.charCodeAt(0) / nodoDer.valor), 
                    tipo: Tipo.INT 
                }
            } // INT CON CHAR
            else if (nodoIzq.tipo == Tipo.INT && nodoDer.tipo == Tipo.CHAR ) {
                result = { 
                    valor: (nodoIzq.valor / nodoDer.valor.charCodeAt(0)), 
                    tipo: Tipo.INT 
                }
            } // DOUBLE CON DOUBLE
            else if (nodoIzq.tipo == Tipo.DOUBLE && nodoDer.tipo == Tipo.DOUBLE ) {
                result = { 
                    valor: (nodoIzq.valor / nodoDer.valor), 
                    tipo: Tipo.DOUBLE 
                }
            } // DOUBLE CON CHAR
            else if (nodoIzq.tipo == Tipo.DOUBLE && nodoDer.tipo == Tipo.CHAR ) {
                result = { 
                    valor: (nodoIzq.valor / nodoDer.valor.charCodeAt(0)), 
                    tipo: Tipo.DOUBLE 
                }
            } // CHAR CON DOUBLE
            else if (nodoIzq.tipo == Tipo.CHAR && nodoDer.tipo == Tipo.DOUBLE ) {
                result = { 
                    valor: (nodoIzq.valor.charCodeAt(0) / nodoDer.valor), 
                    tipo: Tipo.DOUBLE 
                }
            } // CHAR CON CHAR
            else if (nodoIzq.tipo == Tipo.CHAR && nodoDer.tipo == Tipo.CHAR ) {
                result = { 
                    valor: (nodoIzq.valor.charCodeAt(0) / nodoDer.valor.charCodeAt(0)), 
                    tipo: Tipo.INT 
                }
            }
        }else if (this.tipo == opcionesAritmeticas.POTENCIA){
            //INT CON INT
            if (nodoDer.tipo == Tipo.INT && nodoIzq.tipo == Tipo.INT) {
                result = { 
                    valor: (Math.pow(nodoIzq.valor,nodoDer.valor)), 
                    tipo: Tipo.DOUBLE 
                }
            } // INT CON DOUBLE O DOUBLE CON INT
            else if (nodoDer.tipo == Tipo.INT && nodoIzq.tipo == Tipo.DOUBLE
                ||nodoDer.tipo == Tipo.DOUBLE && nodoIzq.tipo == Tipo.INT) {
                result = { 
                    valor: (Math.pow(nodoIzq.valor,nodoDer.valor)), 
                    tipo: Tipo.DOUBLE 
                }
            } // CHAR CON INT
            else if (nodoIzq.tipo == Tipo.CHAR && nodoDer.tipo == Tipo.INT ) {
                result = { 
                    valor: (Math.pow(nodoIzq.valor.charCodeAt(0),nodoDer.valor)), 
                    tipo: Tipo.DOUBLE 
                }
            } // INT CON CHAR
            else if (nodoIzq.tipo == Tipo.INT && nodoDer.tipo == Tipo.CHAR ) {
                result = { 
                    valor: (Math.pow(nodoIzq.valor,nodoDer.valor.charCodeAt(0))), 
                    tipo: Tipo.DOUBLE 
                }
            } // DOUBLE CON DOUBLE
            else if (nodoIzq.tipo == Tipo.DOUBLE && nodoDer.tipo == Tipo.DOUBLE ) {
                result = { 
                    valor: (Math.pow(nodoIzq.valor,nodoDer.valor)), 
                    tipo: Tipo.DOUBLE 
                }
            } // DOUBLE CON CHAR
            else if (nodoIzq.tipo == Tipo.DOUBLE && nodoDer.tipo == Tipo.CHAR ) {
                result = { 
                    valor: (Math.pow(nodoIzq.valor,nodoDer.valor.charCodeAt(0))), 
                    tipo: Tipo.DOUBLE 
                }
            } // CHAR CON DOUBLE
            else if (nodoIzq.tipo == Tipo.CHAR && nodoDer.tipo == Tipo.DOUBLE ) {
                result = { 
                    valor: (Math.pow(nodoIzq.valor.charCodeAt(0),nodoDer.valor)), 
                    tipo: Tipo.DOUBLE 
                }
            } // CHAR CON CHAR
            else if (nodoIzq.tipo == Tipo.CHAR && nodoDer.tipo == Tipo.CHAR ) {
                result = { 
                    valor: (Math.pow(nodoIzq.valor.charCodeAt(0),nodoDer.valor.charCodeAt(0))), 
                    tipo: Tipo.DOUBLE 
                }
            }
        }else if (this.tipo == opcionesAritmeticas.MODULO){
            //INT CON INT
            if (nodoDer.tipo == Tipo.INT && nodoIzq.tipo == Tipo.INT) {
                result = { 
                    valor: (nodoIzq.valor % nodoDer.valor), 
                    tipo: Tipo.DOUBLE 
                }
            } // INT CON DOUBLE O DOUBLE CON INT
            else if (nodoDer.tipo == Tipo.INT && nodoIzq.tipo == Tipo.DOUBLE
                ||nodoDer.tipo == Tipo.DOUBLE && nodoIzq.tipo == Tipo.INT) {
                result = { 
                    valor: (nodoIzq.valor % nodoDer.valor), 
                    tipo: Tipo.DOUBLE 
                }
            } // CHAR CON INT
            else if (nodoIzq.tipo == Tipo.CHAR && nodoDer.tipo == Tipo.INT ) {
                result = { 
                    valor: (nodoIzq.valor.charCodeAt(0) % nodoDer.valor), 
                    tipo: Tipo.DOUBLE 
                }
            } // INT CON CHAR
            else if (nodoIzq.tipo == Tipo.INT && nodoDer.tipo == Tipo.CHAR ) {
                result = { 
                    valor: (nodoIzq.valor % nodoDer.valor.charCodeAt(0)), 
                    tipo: Tipo.DOUBLE 
                }
            } // DOUBLE CON DOUBLE
            else if (nodoIzq.tipo == Tipo.DOUBLE && nodoDer.tipo == Tipo.DOUBLE ) {
                result = { 
                    valor: (nodoIzq.valor % nodoDer.valor), 
                    tipo: Tipo.DOUBLE 
                }
            } // DOUBLE CON CHAR
            else if (nodoIzq.tipo == Tipo.DOUBLE && nodoDer.tipo == Tipo.CHAR ) {
                result = { 
                    valor: (nodoIzq.valor % nodoDer.valor.charCodeAt(0)), 
                    tipo: Tipo.DOUBLE 
                }
            } // CHAR CON DOUBLE
            else if (nodoIzq.tipo == Tipo.CHAR && nodoDer.tipo == Tipo.DOUBLE ) {
                result = { 
                    valor: (nodoIzq.valor.charCodeAt(0) % nodoDer.valor), 
                    tipo: Tipo.DOUBLE 
                }
            } // CHAR CON CHAR
            else if (nodoIzq.tipo == Tipo.CHAR && nodoDer.tipo == Tipo.CHAR ) {
                result = { 
                    valor: (nodoIzq.valor.charCodeAt(0) % nodoDer.valor.charCodeAt(0)), 
                    tipo: Tipo.DOUBLE 
                }
            }
        }else if (this.tipo == opcionesAritmeticas.NEGADO){
            //INT CON INT
            if(nodoDer.tipo == Tipo.INT){
                result = { valor: (-1 * nodoDer.valor), tipo: Tipo.INT}
            }else if(nodoDer.tipo == Tipo.DOUBLE){
                result = { valor: (-1 * nodoDer.valor), tipo: Tipo.DOUBLE}
            }
        }


        return result
    }

    public ast(): string {
        const name_nodo = `node_${this.left.line}_${this.right.column}_expresion`;

        if(this.tipo == opcionesAritmeticas.MAS){
            return `
            ${name_nodo};
            ${name_nodo}[label="\\< Expresión \\> \\n Suma"];
            ${name_nodo}->${this.left.ast()}
            ${name_nodo}_suma[label="{+}"];
            ${name_nodo}->${name_nodo}_suma;
            ${name_nodo}->${this.right.ast()}
            `
        }else if(this.tipo == opcionesAritmeticas.MENOS){
            return `
            ${name_nodo};
            ${name_nodo}[label="\\< Expresión \\> \\n Resta"];
            ${name_nodo}->${this.left.ast()}
            ${name_nodo}_resta[label="{-}"];
            ${name_nodo}->${name_nodo}_resta;
            ${name_nodo}->${this.right.ast()}
            `
        }else if(this.tipo == opcionesAritmeticas.MULTIPLICACION){
            return `
            ${name_nodo};
            ${name_nodo}[label="\\< Expresión \\> \\n Multiplicación"];
            ${name_nodo}->${this.left.ast()}
            ${name_nodo}_multiplicacion[label="{*}"];
            ${name_nodo}->${name_nodo}_multiplicacion;
            ${name_nodo}->${this.right.ast()}
            `
        } else if(this.tipo == opcionesAritmeticas.DIVISION){
            return `
            ${name_nodo};
            ${name_nodo}[label="\\< Expresión \\> \\n División"];
            ${name_nodo}->${this.left.ast()}
            ${name_nodo}_division[label="{/}"];
            ${name_nodo}->${name_nodo}_division;
            ${name_nodo}->${this.right.ast()}
            `
        }else if(this.tipo == opcionesAritmeticas.MODULO){
            return `
            ${name_nodo};
            ${name_nodo}[label="\\< Expresión \\> \\n Modulo"];
            ${name_nodo}->${this.left.ast()}
            ${name_nodo}_modulo[label="{%}"];
            ${name_nodo}->${name_nodo}_modulo;
            ${name_nodo}->${this.right.ast()}
            `
        }else if(this.tipo == opcionesAritmeticas.POTENCIA){
            return `
            ${name_nodo};
            ${name_nodo}[label="\\< Expresión \\> \\n Potencia"];
            ${name_nodo}->${this.left.ast()}
            ${name_nodo}_potencia[label="{**}"];
            ${name_nodo}->${name_nodo}_potencia;
            ${name_nodo}->${this.right.ast()}
            `
        }else if(this.tipo == opcionesAritmeticas.NEGADO){
            return `
            ${name_nodo};
            ${name_nodo}[label="\\< Expresión \\> \\n Negado"];
            ${name_nodo}_negado[label="{-}"];
            ${name_nodo}->${name_nodo}_negado;
            ${name_nodo}->${this.right.ast()}
            `
        }else{
            return ""
        }
    }
}
import { Expresion } from "../abstract/expresion"
import { Retorno } from "../abstract/retorno"
import { Entorno } from "../simbolos/entorno"
import { Tipo } from "../simbolos/tipo"
import { opcionesAritmeticas } from "./opcionesAritmeticas"

export class Aritmeticas extends Expresion {

    constructor(
        private left: Expresion,
        private right: Expresion,
        private type: opcionesAritmeticas,
        line: number,
        column: number) {
        super(line, column)
    }

    public run(env: Entorno): Retorno {

        let result: Retorno ={
            value:null,
            type:Tipo.error
        }

        const nodoIzq = this.left.run(env)
        const nodoDer = this.right.run(env)

        if (this.type == opcionesAritmeticas.MAS) {

            //INT CON INT
            if (nodoDer.type == Tipo.INT && nodoIzq.type == Tipo.INT) {
                result = { 
                    value: (nodoIzq.value + nodoDer.value), 
                    type: Tipo.INT 
                }
            } // INT CON DOUBLE O DOUBLE CON INT
            else if (nodoDer.type == Tipo.INT && nodoIzq.type == Tipo.DOUBLE
                ||nodoDer.type == Tipo.DOUBLE && nodoIzq.type == Tipo.INT) {
                result = { 
                    value: (nodoIzq.value + nodoDer.value), 
                    type: Tipo.DOUBLE 
                }
            } // STRING CON INT O INT CON STRING
            else if (nodoDer.type == Tipo.INT && nodoIzq.type == Tipo.STRING
                ||nodoDer.type == Tipo.STRING && nodoIzq.type == Tipo.INT) {
                result = { 
                    value: (String(nodoIzq.value) + String(nodoDer.value)), 
                    type: Tipo.STRING 
                }
            } // CHAR CON INT
            else if (nodoIzq.type == Tipo.CHAR && nodoDer.type == Tipo.INT ) {
                result = { 
                    value: (nodoIzq.value.charCodeAt(0) + nodoDer.value), 
                    type: Tipo.INT 
                }
            } // INT CON CHAR
            else if (nodoIzq.type == Tipo.INT && nodoDer.type == Tipo.CHAR ) {
                result = { 
                    value: (nodoIzq.value + nodoDer.value.charCodeAt(0)), 
                    type: Tipo.INT 
                }
            } // STRING CON STRING 
            else if (nodoIzq.type == Tipo.STRING && nodoDer.type == Tipo.STRING) {
                result = { 
                    value: (String(nodoIzq.value) + String(nodoDer.value)), 
                    type: Tipo.STRING 
                }
            } // DOUBLE CON DOUBLE
            else if (nodoIzq.type == Tipo.DOUBLE && nodoDer.type == Tipo.DOUBLE ) {
                result = { 
                    value: (nodoIzq.value + nodoDer.value), 
                    type: Tipo.DOUBLE 
                }
            } // DOUBLE CON CHAR
            else if (nodoIzq.type == Tipo.DOUBLE && nodoDer.type == Tipo.CHAR ) {
                result = { 
                    value: (nodoIzq.value + nodoDer.value.charCodeAt(0)), 
                    type: Tipo.DOUBLE 
                }
            } // CHAR CON DOUBLE
            else if (nodoIzq.type == Tipo.CHAR && nodoDer.type == Tipo.DOUBLE ) {
                result = { 
                    value: (nodoIzq.value.charCodeAt(0) + nodoDer.value), 
                    type: Tipo.DOUBLE 
                }
            } // DOUBLE CON STRING O STRING CON DOUBLE
            else if (nodoDer.type == Tipo.DOUBLE && nodoIzq.type == Tipo.STRING
                ||nodoDer.type == Tipo.STRING && nodoIzq.type == Tipo.DOUBLE) {
                result = { 
                    value: (String(nodoIzq.value) + String(nodoDer.value)), 
                    type: Tipo.STRING 
                }
            }// CHAR CON STRING O STRING CON CHAR
            else if (nodoDer.type == Tipo.CHAR && nodoIzq.type == Tipo.STRING
                ||nodoDer.type == Tipo.STRING && nodoIzq.type == Tipo.CHAR) {
                result = { 
                    value: (String(nodoIzq.value) + String(nodoDer.value)), 
                    type: Tipo.STRING 
                }
            } // CHAR CON CHAR
            else if (nodoIzq.type == Tipo.CHAR && nodoDer.type == Tipo.CHAR ) {
                result = { 
                    value: (nodoIzq.value.charCodeAt(0) + nodoDer.value.charCodeAt(0)), 
                    type: Tipo.INT 
                }
            }
            else if (nodoDer.type == Tipo.BOOLEAN && nodoIzq.type == Tipo.STRING
                ||nodoDer.type == Tipo.STRING && nodoIzq.type == Tipo.BOOLEAN) {
                result = { 
                    value: (String(nodoIzq.value) + String(nodoDer.value)), 
                    type: Tipo.STRING 
                }
            }
            
            //demas validadionces para la operaciones aritmeticas
            
        }else if (this.type == opcionesAritmeticas.MENOS) {

            // INT CON INT
            if (nodoDer.type == Tipo.INT && nodoIzq.type == Tipo.INT) {
                result = { 
                    value: (nodoIzq.value - nodoDer.value), 
                    type: Tipo.INT 
                }
            } // INT CON DOUBLE O DOUBLE CON INT
            else if (nodoDer.type == Tipo.INT && nodoIzq.type == Tipo.DOUBLE
                ||nodoDer.type == Tipo.DOUBLE && nodoIzq.type == Tipo.INT) {
                result = { 
                    value: (nodoIzq.value - nodoDer.value), 
                    type: Tipo.DOUBLE 
                }
            } // CHAR CON INT
            else if (nodoIzq.type == Tipo.CHAR && nodoDer.type == Tipo.INT ) {
                result = { 
                    value: (nodoIzq.value.charCodeAt(0) - nodoDer.value), 
                    type: Tipo.INT 
                }
            } // INT CON CHAR
            else if (nodoIzq.type == Tipo.INT && nodoDer.type == Tipo.CHAR ) {
                result = { 
                    value: (nodoIzq.value - nodoDer.value.charCodeAt(0)), 
                    type: Tipo.INT 
                }
            } // DOUBLE CON DOUBLE
            else if (nodoIzq.type == Tipo.DOUBLE && nodoDer.type == Tipo.DOUBLE ) {
                result = { 
                    value: (nodoIzq.value - nodoDer.value), 
                    type: Tipo.DOUBLE 
                }
            } // DOUBLE CON CHAR
            else if (nodoIzq.type == Tipo.DOUBLE && nodoDer.type == Tipo.CHAR ) {
                result = { 
                    value: (nodoIzq.value - nodoDer.value.charCodeAt(0)), 
                    type: Tipo.DOUBLE 
                }
            } // CHAR CON DOUBLE
            else if (nodoIzq.type == Tipo.CHAR && nodoDer.type == Tipo.DOUBLE ) {
                result = { 
                    value: (nodoIzq.value.charCodeAt(0) - nodoDer.value), 
                    type: Tipo.DOUBLE 
                }
            } // CHAR CON CHAR
            else if (nodoIzq.type == Tipo.CHAR && nodoDer.type == Tipo.CHAR ) {
                result = { 
                    value: (nodoIzq.value.charCodeAt(0) - nodoDer.value.charCodeAt(0)), 
                    type: Tipo.INT 
                }
            }
            //en la resta unicamente quiero con numeros
            
        }else if (this.type == opcionesAritmeticas.MULTIPLICACION){

            //INT CON INT
            if (nodoDer.type == Tipo.INT && nodoIzq.type == Tipo.INT) {
                result = { 
                    value: (nodoIzq.value * nodoDer.value), 
                    type: Tipo.INT 
                }
            } // INT CON DOUBLE O DOUBLE CON INT
            else if (nodoDer.type == Tipo.INT && nodoIzq.type == Tipo.DOUBLE
                ||nodoDer.type == Tipo.DOUBLE && nodoIzq.type == Tipo.INT) {
                result = { 
                    value: (nodoIzq.value * nodoDer.value), 
                    type: Tipo.DOUBLE 
                }
            } // CHAR CON INT
            else if (nodoIzq.type == Tipo.CHAR && nodoDer.type == Tipo.INT ) {
                result = { 
                    value: (nodoIzq.value.charCodeAt(0) * nodoDer.value), 
                    type: Tipo.INT 
                }
            } // INT CON CHAR
            else if (nodoIzq.type == Tipo.INT && nodoDer.type == Tipo.CHAR ) {
                result = { 
                    value: (nodoIzq.value * nodoDer.value.charCodeAt(0)), 
                    type: Tipo.INT 
                }
            } // DOUBLE CON DOUBLE
            else if (nodoIzq.type == Tipo.DOUBLE && nodoDer.type == Tipo.DOUBLE ) {
                result = { 
                    value: (nodoIzq.value * nodoDer.value), 
                    type: Tipo.DOUBLE 
                }
            } // DOUBLE CON CHAR
            else if (nodoIzq.type == Tipo.DOUBLE && nodoDer.type == Tipo.CHAR ) {
                result = { 
                    value: (nodoIzq.value * nodoDer.value.charCodeAt(0)), 
                    type: Tipo.DOUBLE 
                }
            } // CHAR CON DOUBLE
            else if (nodoIzq.type == Tipo.CHAR && nodoDer.type == Tipo.DOUBLE ) {
                result = { 
                    value: (nodoIzq.value.charCodeAt(0) * nodoDer.value), 
                    type: Tipo.DOUBLE 
                }
            } // CHAR CON CHAR
            else if (nodoIzq.type == Tipo.CHAR && nodoDer.type == Tipo.CHAR ) {
                result = { 
                    value: (nodoIzq.value.charCodeAt(0) * nodoDer.value.charCodeAt(0)), 
                    type: Tipo.INT 
                }
            }
        }else if (this.type == opcionesAritmeticas.DIVISION){

            //INT CON INT
            if (nodoDer.type == Tipo.INT && nodoIzq.type == Tipo.INT) {
                result = { 
                    value: (nodoIzq.value / nodoDer.value), 
                    type: Tipo.INT 
                }
            } // INT CON DOUBLE O DOUBLE CON INT
            else if (nodoDer.type == Tipo.INT && nodoIzq.type == Tipo.DOUBLE
                ||nodoDer.type == Tipo.DOUBLE && nodoIzq.type == Tipo.INT) {
                result = { 
                    value: (nodoIzq.value / nodoDer.value), 
                    type: Tipo.DOUBLE 
                }
            } // CHAR CON INT
            else if (nodoIzq.type == Tipo.CHAR && nodoDer.type == Tipo.INT ) {
                result = { 
                    value: (nodoIzq.value.charCodeAt(0) / nodoDer.value), 
                    type: Tipo.INT 
                }
            } // INT CON CHAR
            else if (nodoIzq.type == Tipo.INT && nodoDer.type == Tipo.CHAR ) {
                result = { 
                    value: (nodoIzq.value / nodoDer.value.charCodeAt(0)), 
                    type: Tipo.INT 
                }
            } // DOUBLE CON DOUBLE
            else if (nodoIzq.type == Tipo.DOUBLE && nodoDer.type == Tipo.DOUBLE ) {
                result = { 
                    value: (nodoIzq.value / nodoDer.value), 
                    type: Tipo.DOUBLE 
                }
            } // DOUBLE CON CHAR
            else if (nodoIzq.type == Tipo.DOUBLE && nodoDer.type == Tipo.CHAR ) {
                result = { 
                    value: (nodoIzq.value / nodoDer.value.charCodeAt(0)), 
                    type: Tipo.DOUBLE 
                }
            } // CHAR CON DOUBLE
            else if (nodoIzq.type == Tipo.CHAR && nodoDer.type == Tipo.DOUBLE ) {
                result = { 
                    value: (nodoIzq.value.charCodeAt(0) / nodoDer.value), 
                    type: Tipo.DOUBLE 
                }
            } // CHAR CON CHAR
            else if (nodoIzq.type == Tipo.CHAR && nodoDer.type == Tipo.CHAR ) {
                result = { 
                    value: (nodoIzq.value.charCodeAt(0) / nodoDer.value.charCodeAt(0)), 
                    type: Tipo.INT 
                }
            }
        }else if (this.type == opcionesAritmeticas.POTENCIA){
            //INT CON INT
            if (nodoDer.type == Tipo.INT && nodoIzq.type == Tipo.INT) {
                result = { 
                    value: (Math.pow(nodoIzq.value,nodoDer.value)), 
                    type: Tipo.DOUBLE 
                }
            } // INT CON DOUBLE O DOUBLE CON INT
            else if (nodoDer.type == Tipo.INT && nodoIzq.type == Tipo.DOUBLE
                ||nodoDer.type == Tipo.DOUBLE && nodoIzq.type == Tipo.INT) {
                result = { 
                    value: (Math.pow(nodoIzq.value,nodoDer.value)), 
                    type: Tipo.DOUBLE 
                }
            } // CHAR CON INT
            else if (nodoIzq.type == Tipo.CHAR && nodoDer.type == Tipo.INT ) {
                result = { 
                    value: (Math.pow(nodoIzq.value.charCodeAt(0),nodoDer.value)), 
                    type: Tipo.DOUBLE 
                }
            } // INT CON CHAR
            else if (nodoIzq.type == Tipo.INT && nodoDer.type == Tipo.CHAR ) {
                result = { 
                    value: (Math.pow(nodoIzq.value,nodoDer.value.charCodeAt(0))), 
                    type: Tipo.DOUBLE 
                }
            } // DOUBLE CON DOUBLE
            else if (nodoIzq.type == Tipo.DOUBLE && nodoDer.type == Tipo.DOUBLE ) {
                result = { 
                    value: (Math.pow(nodoIzq.value,nodoDer.value)), 
                    type: Tipo.DOUBLE 
                }
            } // DOUBLE CON CHAR
            else if (nodoIzq.type == Tipo.DOUBLE && nodoDer.type == Tipo.CHAR ) {
                result = { 
                    value: (Math.pow(nodoIzq.value,nodoDer.value.charCodeAt(0))), 
                    type: Tipo.DOUBLE 
                }
            } // CHAR CON DOUBLE
            else if (nodoIzq.type == Tipo.CHAR && nodoDer.type == Tipo.DOUBLE ) {
                result = { 
                    value: (Math.pow(nodoIzq.value.charCodeAt(0),nodoDer.value)), 
                    type: Tipo.DOUBLE 
                }
            } // CHAR CON CHAR
            else if (nodoIzq.type == Tipo.CHAR && nodoDer.type == Tipo.CHAR ) {
                result = { 
                    value: (Math.pow(nodoIzq.value.charCodeAt(0),nodoDer.value.charCodeAt(0))), 
                    type: Tipo.DOUBLE 
                }
            }
        }else if (this.type == opcionesAritmeticas.MODULO){
            //INT CON INT
            if (nodoDer.type == Tipo.INT && nodoIzq.type == Tipo.INT) {
                result = { 
                    value: (nodoIzq.value % nodoDer.value), 
                    type: Tipo.DOUBLE 
                }
            } // INT CON DOUBLE O DOUBLE CON INT
            else if (nodoDer.type == Tipo.INT && nodoIzq.type == Tipo.DOUBLE
                ||nodoDer.type == Tipo.DOUBLE && nodoIzq.type == Tipo.INT) {
                result = { 
                    value: (nodoIzq.value % nodoDer.value), 
                    type: Tipo.DOUBLE 
                }
            } // CHAR CON INT
            else if (nodoIzq.type == Tipo.CHAR && nodoDer.type == Tipo.INT ) {
                result = { 
                    value: (nodoIzq.value.charCodeAt(0) % nodoDer.value), 
                    type: Tipo.DOUBLE 
                }
            } // INT CON CHAR
            else if (nodoIzq.type == Tipo.INT && nodoDer.type == Tipo.CHAR ) {
                result = { 
                    value: (nodoIzq.value % nodoDer.value.charCodeAt(0)), 
                    type: Tipo.DOUBLE 
                }
            } // DOUBLE CON DOUBLE
            else if (nodoIzq.type == Tipo.DOUBLE && nodoDer.type == Tipo.DOUBLE ) {
                result = { 
                    value: (nodoIzq.value % nodoDer.value), 
                    type: Tipo.DOUBLE 
                }
            } // DOUBLE CON CHAR
            else if (nodoIzq.type == Tipo.DOUBLE && nodoDer.type == Tipo.CHAR ) {
                result = { 
                    value: (nodoIzq.value % nodoDer.value.charCodeAt(0)), 
                    type: Tipo.DOUBLE 
                }
            } // CHAR CON DOUBLE
            else if (nodoIzq.type == Tipo.CHAR && nodoDer.type == Tipo.DOUBLE ) {
                result = { 
                    value: (nodoIzq.value.charCodeAt(0) % nodoDer.value), 
                    type: Tipo.DOUBLE 
                }
            } // CHAR CON CHAR
            else if (nodoIzq.type == Tipo.CHAR && nodoDer.type == Tipo.CHAR ) {
                result = { 
                    value: (nodoIzq.value.charCodeAt(0) % nodoDer.value.charCodeAt(0)), 
                    type: Tipo.DOUBLE 
                }
            }
        }


        return result
    }


}
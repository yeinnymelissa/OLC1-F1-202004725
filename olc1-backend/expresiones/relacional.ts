import { Expresion } from "../abstract/expresion";
import { Retorno } from "../abstract/retorno";
import { Entorno } from "../simbolos/entorno";
import { Tipo } from "../simbolos/tipo";
import { opcionesRelacionales } from "./opcionesRelacionales";

export class Relacional extends Expresion {
    constructor(
      private left: Expresion,
      private right: Expresion,
      private type: opcionesRelacionales,
      line: number,
      column: number
    ) {
      super(line, column);
    }
  
    public run(env: Entorno): Retorno {
      let result: Retorno = {
        value: null,
        type: Tipo.error,
      };
  
      const nodoIzq = this.left.run(env);
      const nodoDer = this.right.run(env);
  
      if (this.type == opcionesRelacionales.MAYOR) {
        if (nodoDer.type == Tipo.INT && nodoIzq.type == Tipo.INT) {
          result = {
            value: nodoIzq.value > nodoDer.value,
            type: Tipo.BOOLEAN,
          };
        } else if(nodoIzq.type == Tipo.INT && nodoDer.type == Tipo.DOUBLE){
            result = {
                value: nodoIzq.value > nodoDer.value,
                type: Tipo.BOOLEAN,
              };
        } else if(nodoIzq.type == Tipo.INT && nodoDer.type == Tipo.CHAR){
            result = {
                value: nodoIzq.value > nodoDer.value.charCodeAt(0),
                type: Tipo.BOOLEAN,
              };
        } else if(nodoIzq.type == Tipo.DOUBLE && nodoDer.type == Tipo.INT){
            result = {
                value: nodoIzq.value > nodoDer.value,
                type: Tipo.BOOLEAN,
              }; 
        } else if(nodoIzq.type == Tipo.DOUBLE && nodoDer.type == Tipo.DOUBLE){
            result = {
                value: nodoIzq.value > nodoDer.value,
                type: Tipo.BOOLEAN,
              };
        } else if(nodoIzq.type == Tipo.DOUBLE && nodoDer.type == Tipo.CHAR){
            result = {
                value: nodoIzq.value > nodoDer.value.charCodeAt(0),
                type: Tipo.BOOLEAN,
              };
        }else if(nodoIzq.type == Tipo.CHAR && nodoDer.type == Tipo.CHAR){
            result = {
                value: nodoIzq.value.charCodeAt(0) > nodoDer.value.charCodeAt(0),
                type: Tipo.BOOLEAN,
              };
        }else if(nodoIzq.type == Tipo.CHAR && nodoDer.type == Tipo.INT){
            result = {
                value: nodoIzq.value.charCodeAt(0) > nodoDer.value,
                type: Tipo.BOOLEAN,
              };
        }else if(nodoIzq.type == Tipo.CHAR && nodoDer.type == Tipo.DOUBLE){
            result = {
                value: nodoIzq.value.charCodeAt(0) > nodoDer.value,
                type: Tipo.BOOLEAN,
              };
        }
      }else if (this.type == opcionesRelacionales.MENOR) {
          if (nodoDer.type == Tipo.INT && nodoIzq.type == Tipo.INT) {
            result = {
              value: nodoIzq.value < nodoDer.value,
              type: Tipo.BOOLEAN,
            };
          }
        }
      
      return result;
    }
  }
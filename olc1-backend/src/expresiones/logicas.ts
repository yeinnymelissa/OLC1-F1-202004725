import { Expresion } from "../abstract/expresion";
import { Retorno } from "../abstract/retorno";
import { Entorno } from "../simbolos/entorno";
import { Tipo } from "../simbolos/tipo";
import { opcionesLogicas } from "./opcionesLogicas";

export class Logicas extends Expresion {
    constructor(
      private left: Expresion,
      private right: Expresion,
      private type: opcionesLogicas,
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
  
      if (this.type == opcionesLogicas.NOT) {
        if (nodoIzq.value == true) {
          result = {
            value: false,
            type: Tipo.BOOLEAN,
          };
        } else if(nodoIzq.value == false){
            result = {
                value: false,
                type: Tipo.BOOLEAN,
              };
        } 
      }else if (this.type == opcionesLogicas.XOR) {
        if (nodoIzq.value == false && nodoDer.value == false) {
          result = {
            value: false,
            type: Tipo.BOOLEAN,
          };
        } else if(nodoIzq.value == false && nodoDer.value == true){
            result = {
                value: true,
                type: Tipo.BOOLEAN,
              };
        } else if(nodoIzq.value == true && nodoDer.value == false){
            result = {
                value: true,
                type: Tipo.BOOLEAN,
              };
        } else if(nodoIzq.value == true && nodoDer.value == true){
            result = {
                value: false,
                type: Tipo.BOOLEAN,
              }; 
        } 
        }else if (this.type == opcionesLogicas.AND) {
            if (nodoIzq.value == false && nodoDer.value == false) {
                result = {
                  value: false,
                  type: Tipo.BOOLEAN,
                };
              } else if(nodoIzq.value == false && nodoDer.value == true){
                  result = {
                      value: false,
                      type: Tipo.BOOLEAN,
                    };
              } else if(nodoIzq.value == true && nodoDer.value == false){
                  result = {
                      value: false,
                      type: Tipo.BOOLEAN,
                    };
              } else if(nodoIzq.value == true && nodoDer.value == true){
                  result = {
                      value: true,
                      type: Tipo.BOOLEAN,
                    }; 
              } 
          } else if (this.type == opcionesLogicas.OR) {
            if (nodoIzq.value == false && nodoDer.value == false) {
                result = {
                  value: false,
                  type: Tipo.BOOLEAN,
                };
              } else if(nodoIzq.value == false && nodoDer.value == true){
                  result = {
                      value: true,
                      type: Tipo.BOOLEAN,
                    };
              } else if(nodoIzq.value == true && nodoDer.value == false){
                  result = {
                      value: true,
                      type: Tipo.BOOLEAN,
                    };
              } else if(nodoIzq.value == true && nodoDer.value == true){
                  result = {
                      value: true,
                      type: Tipo.BOOLEAN,
                    }; 
              }
          }
      
      return result;
    }
  }
import { Expresion } from "../abstract/expresion";
import { Retorno } from "../abstract/retorno";
import { Entorno } from "../simbolos/entorno";
import { Tipo } from "../simbolos/tipo";
import { opcionesLogicas } from "./opcionesLogicas";

export class Logicas extends Expresion {
    constructor(
      private left: Expresion,
      private right: Expresion,
      private tipo: opcionesLogicas,
      line: number,
      column: number
    ) {
      super(line, column);
    }
  
    public run(env: Entorno): Retorno {
      let result: Retorno = {
        valor: null,
        tipo: Tipo.error,
      };
  
      const nodoIzq = this.left.run(env);
      const nodoDer = this.right.run(env);
  
      if (this.tipo == opcionesLogicas.NOT) {
        if (nodoDer.valor == true) {
          result = {
            valor: false,
            tipo: Tipo.BOOLEAN,
          };
        } else if(nodoDer.valor == false){
            result = {
                valor: false,
                tipo: Tipo.BOOLEAN,
              };
        } 
      }else if (this.tipo == opcionesLogicas.XOR) {
        if (nodoIzq.valor == false && nodoDer.valor == false) {
          result = {
            valor: false,
            tipo: Tipo.BOOLEAN,
          };
        } else if(nodoIzq.valor == false && nodoDer.valor == true){
            result = {
                valor: true,
                tipo: Tipo.BOOLEAN,
              };
        } else if(nodoIzq.valor == true && nodoDer.valor == false){
            result = {
                valor: true,
                tipo: Tipo.BOOLEAN,
              };
        } else if(nodoIzq.valor == true && nodoDer.valor == true){
            result = {
                valor: false,
                tipo: Tipo.BOOLEAN,
              }; 
        } 
        }else if (this.tipo == opcionesLogicas.AND) {
            if (nodoIzq.valor == false && nodoDer.valor == false) {
                result = {
                  valor: false,
                  tipo: Tipo.BOOLEAN,
                };
              } else if(nodoIzq.valor == false && nodoDer.valor == true){
                  result = {
                      valor: false,
                      tipo: Tipo.BOOLEAN,
                    };
              } else if(nodoIzq.valor == true && nodoDer.valor == false){
                  result = {
                      valor: false,
                      tipo: Tipo.BOOLEAN,
                    };
              } else if(nodoIzq.valor == true && nodoDer.valor == true){
                  result = {
                      valor: true,
                      tipo: Tipo.BOOLEAN,
                    }; 
              } 
          } else if (this.tipo == opcionesLogicas.OR) {
            if (nodoIzq.valor == false && nodoDer.valor == false) {
                result = {
                  valor: false,
                  tipo: Tipo.BOOLEAN,
                };
              } else if(nodoIzq.valor == false && nodoDer.valor == true){
                  result = {
                      valor: true,
                      tipo: Tipo.BOOLEAN,
                    };
              } else if(nodoIzq.valor == true && nodoDer.valor == false){
                  result = {
                      valor: true,
                      tipo: Tipo.BOOLEAN,
                    };
              } else if(nodoIzq.valor == true && nodoDer.valor == true){
                  result = {
                      valor: true,
                      tipo: Tipo.BOOLEAN,
                    }; 
              }
          }
      
      return result;
    }

    public ast(): string {
      const name_nodo = `node_${this.left.line}_${this.right.column}_expresion`;
      if (this.tipo == opcionesLogicas.NOT) {
        return `
        ${name_nodo};
        ${name_nodo}[label="\\< Expresión \\> \\n operación lógica"];
        ${name_nodo}_Not[label="{!}"];
        ${name_nodo}->${name_nodo}_Not;
        ${name_nodo}->${this.right.ast()}
        `
      }else if (this.tipo == opcionesLogicas.XOR) {
        return `
        ${name_nodo};
        ${name_nodo}[label="\\< Expresión \\> \\n operación lógica"];
        ${name_nodo}->${this.left.ast()}
        ${name_nodo}_Xor[label="{^}"];
        ${name_nodo}->${name_nodo}_Xor;
        ${name_nodo}->${this.right.ast()}
        `
      }else if (this.tipo == opcionesLogicas.AND) {
        return `
        ${name_nodo};
        ${name_nodo}[label="\\< Expresión \\> \\n operación lógica"];
        ${name_nodo}->${this.left.ast()}
        ${name_nodo}_And[label="{&&}"];
        ${name_nodo}->${name_nodo}_And;
        ${name_nodo}->${this.right.ast()}
        `
      } else if (this.tipo == opcionesLogicas.OR) {
        return `
        ${name_nodo};
        ${name_nodo}[label="\\< Expresión \\> \\n operación lógica"];
        ${name_nodo}->${this.left.ast()}
        ${name_nodo}_Or[label="{||}"];
        ${name_nodo}->${name_nodo}_Or;
        ${name_nodo}->${this.right.ast()}
        `
      }
      return "";
    }
  }
import { Expresion } from "../abstract/expresion";
import { Retorno } from "../abstract/retorno";
import { Entorno } from "../simbolos/entorno";
import { Tipo } from "../simbolos/tipo";
import { opcionesRelacionales } from "./opcionesRelacionales";

export class Relacional extends Expresion {
    constructor(
      private left: Expresion,
      private right: Expresion,
      private tipo: opcionesRelacionales,
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
  
      if (this.tipo == opcionesRelacionales.MAYOR) {
        if (nodoDer.tipo == Tipo.INT && nodoIzq.tipo == Tipo.INT) {
          if (nodoIzq.valor > nodoDer.valor) {
            result = {valor: true, tipo: Tipo.BOOLEAN}
          } else {
            result = {valor: false, tipo: Tipo.BOOLEAN}    
          }
        } else if(nodoIzq.tipo == Tipo.INT && nodoDer.tipo == Tipo.DOUBLE){
            if (nodoIzq.valor > nodoDer.valor) {
            result = {valor: true, tipo: Tipo.BOOLEAN}
          } else {
            result = {valor: false, tipo: Tipo.BOOLEAN}    
          }
        } else if(nodoIzq.tipo == Tipo.INT && nodoDer.tipo == Tipo.CHAR){
          if (nodoIzq.valor > nodoDer.valor.charCodeAt(0)) {
            result = {valor: true, tipo: Tipo.BOOLEAN}
          } else {
            result = {valor: false, tipo: Tipo.BOOLEAN}    
          }  
        } else if(nodoIzq.tipo == Tipo.DOUBLE && nodoDer.tipo == Tipo.INT){
          if (nodoIzq.valor > nodoDer.valor) {
            result = {valor: true, tipo: Tipo.BOOLEAN}
          } else {
            result = {valor: false, tipo: Tipo.BOOLEAN}    
          }
        } else if(nodoIzq.tipo == Tipo.DOUBLE && nodoDer.tipo == Tipo.DOUBLE){
          if (nodoIzq.valor > nodoDer.valor) {
            result = {valor: true, tipo: Tipo.BOOLEAN}
          } else {
            result = {valor: false, tipo: Tipo.BOOLEAN}    
          }
        } else if(nodoIzq.tipo == Tipo.DOUBLE && nodoDer.tipo == Tipo.CHAR){
          if (nodoIzq.valor > nodoDer.valor.charCodeAt(0)) {
            result = {valor: true, tipo: Tipo.BOOLEAN}
          } else {
            result = {valor: false, tipo: Tipo.BOOLEAN}    
          }  
        }else if(nodoIzq.tipo == Tipo.CHAR && nodoDer.tipo == Tipo.CHAR){
          if (nodoIzq.valor.charCodeAt(0)> nodoDer.valor.charCodeAt(0)) {
            result = {valor: true, tipo: Tipo.BOOLEAN}
          } else {
            result = {valor: false, tipo: Tipo.BOOLEAN}    
          }
        }else if(nodoIzq.tipo == Tipo.CHAR && nodoDer.tipo == Tipo.INT){
          if (nodoIzq.valor.charCodeAt(0) > nodoDer.valor) {
            result = {valor: true, tipo: Tipo.BOOLEAN}
          } else {
            result = {valor: false, tipo: Tipo.BOOLEAN}    
          }  
        }else if(nodoIzq.tipo == Tipo.CHAR && nodoDer.tipo == Tipo.DOUBLE){
          if (nodoIzq.valor.charCodeAt(0) > nodoDer.valor) {
            result = {valor: true, tipo: Tipo.BOOLEAN}
          } else {
            result = {valor: false, tipo: Tipo.BOOLEAN}    
          }  
        }
      }else if (this.tipo == opcionesRelacionales.MENOR) {
        if (nodoDer.tipo == Tipo.INT && nodoIzq.tipo == Tipo.INT) {
          if (nodoIzq.valor < nodoDer.valor) {
            result = {valor: true, tipo: Tipo.BOOLEAN}
          } else {
            result = {valor: false, tipo: Tipo.BOOLEAN}    
          }
        } else if(nodoIzq.tipo == Tipo.INT && nodoDer.tipo == Tipo.DOUBLE){
          if (nodoIzq.valor < nodoDer.valor) {
            result = {valor: true, tipo: Tipo.BOOLEAN}
          } else {
            result = {valor: false, tipo: Tipo.BOOLEAN}    
          }
        } else if(nodoIzq.tipo == Tipo.INT && nodoDer.tipo == Tipo.CHAR){
          if (nodoIzq.valor < nodoDer.valor.charCodeAt(0)) {
            result = {valor: true, tipo: Tipo.BOOLEAN}
          } else {
            result = {valor: false, tipo: Tipo.BOOLEAN}    
          }  
        } else if(nodoIzq.tipo == Tipo.DOUBLE && nodoDer.tipo == Tipo.INT){
          if (nodoIzq.valor < nodoDer.valor) {
            result = {valor: true, tipo: Tipo.BOOLEAN}
          } else {
            result = {valor: false, tipo: Tipo.BOOLEAN}    
          }
        } else if(nodoIzq.tipo == Tipo.DOUBLE && nodoDer.tipo == Tipo.DOUBLE){
          if (nodoIzq.valor < nodoDer.valor) {
            result = {valor: true, tipo: Tipo.BOOLEAN}
          } else {
            result = {valor: false, tipo: Tipo.BOOLEAN}    
          }
        } else if(nodoIzq.tipo == Tipo.DOUBLE && nodoDer.tipo == Tipo.CHAR){
          if (nodoIzq.valor < nodoDer.valor.charCodeAt(0)) {
            result = {valor: true, tipo: Tipo.BOOLEAN}
          } else {
            result = {valor: false, tipo: Tipo.BOOLEAN}    
          }
        }else if(nodoIzq.tipo == Tipo.CHAR && nodoDer.tipo == Tipo.CHAR){
          if (nodoIzq.valor.charCodeAt(0) <  nodoDer.valor.charCodeAt(0)) {
            result = {valor: true, tipo: Tipo.BOOLEAN}
          } else {
            result = {valor: false, tipo: Tipo.BOOLEAN}    
          }
        }else if(nodoIzq.tipo == Tipo.CHAR && nodoDer.tipo == Tipo.INT){
          if (nodoIzq.valor.charCodeAt(0) < nodoDer.valor) {
            result = {valor: true, tipo: Tipo.BOOLEAN}
          } else {
            result = {valor: false, tipo: Tipo.BOOLEAN}    
          }
        }else if(nodoIzq.tipo == Tipo.CHAR && nodoDer.tipo == Tipo.DOUBLE){
          if (nodoIzq.valor.charCodeAt(0) < nodoDer.valor) {
            result = {valor: true, tipo: Tipo.BOOLEAN}
          } else {
            result = {valor: false, tipo: Tipo.BOOLEAN}    
          }
        }
        }else if (this.tipo == opcionesRelacionales.MAYORIGUAL) {
          if (nodoDer.tipo == Tipo.INT && nodoIzq.tipo == Tipo.INT) {
            if (nodoIzq.valor >= nodoDer.valor) {
              result = {valor: true, tipo: Tipo.BOOLEAN}
            } else {
              result = {valor: false, tipo: Tipo.BOOLEAN}    
            }
          } else if(nodoIzq.tipo == Tipo.INT && nodoDer.tipo == Tipo.DOUBLE){
              if (nodoIzq.valor >= nodoDer.valor) {
              result = {valor: true, tipo: Tipo.BOOLEAN}
            } else {
              result = {valor: false, tipo: Tipo.BOOLEAN}    
            }
          } else if(nodoIzq.tipo == Tipo.INT && nodoDer.tipo == Tipo.CHAR){
            if (nodoIzq.valor >= nodoDer.valor.charCodeAt(0)) {
              result = {valor: true, tipo: Tipo.BOOLEAN}
            } else {
              result = {valor: false, tipo: Tipo.BOOLEAN}    
            }  
          } else if(nodoIzq.tipo == Tipo.DOUBLE && nodoDer.tipo == Tipo.INT){
            if (nodoIzq.valor >= nodoDer.valor) {
              result = {valor: true, tipo: Tipo.BOOLEAN}
            } else {
              result = {valor: false, tipo: Tipo.BOOLEAN}    
            }
          } else if(nodoIzq.tipo == Tipo.DOUBLE && nodoDer.tipo == Tipo.DOUBLE){
            if (nodoIzq.valor >= nodoDer.valor) {
              result = {valor: true, tipo: Tipo.BOOLEAN}
            } else {
              result = {valor: false, tipo: Tipo.BOOLEAN}    
            }
          } else if(nodoIzq.tipo == Tipo.DOUBLE && nodoDer.tipo == Tipo.CHAR){
            if (nodoIzq.valor >= nodoDer.valor.charCodeAt(0)) {
              result = {valor: true, tipo: Tipo.BOOLEAN}
            } else {
              result = {valor: false, tipo: Tipo.BOOLEAN}    
            }  
          }else if(nodoIzq.tipo == Tipo.CHAR && nodoDer.tipo == Tipo.CHAR){
            if (nodoIzq.valor.charCodeAt(0)>= nodoDer.valor.charCodeAt(0)) {
              result = {valor: true, tipo: Tipo.BOOLEAN}
            } else {
              result = {valor: false, tipo: Tipo.BOOLEAN}    
            }
          }else if(nodoIzq.tipo == Tipo.CHAR && nodoDer.tipo == Tipo.INT){
            if (nodoIzq.valor.charCodeAt(0) >= nodoDer.valor) {
              result = {valor: true, tipo: Tipo.BOOLEAN}
            } else {
              result = {valor: false, tipo: Tipo.BOOLEAN}    
            }  
          }else if(nodoIzq.tipo == Tipo.CHAR && nodoDer.tipo == Tipo.DOUBLE){
            if (nodoIzq.valor.charCodeAt(0) >= nodoDer.valor) {
              result = {valor: true, tipo: Tipo.BOOLEAN}
            } else {
              result = {valor: false, tipo: Tipo.BOOLEAN}    
            }  
          }
          } else if (this.tipo == opcionesRelacionales.MENORIGUAL) {
            if (nodoDer.tipo == Tipo.INT && nodoIzq.tipo == Tipo.INT) {
              if (nodoIzq.valor <= nodoDer.valor) {
                result = {valor: true, tipo: Tipo.BOOLEAN}
              } else {
                result = {valor: false, tipo: Tipo.BOOLEAN}    
              }
            } else if(nodoIzq.tipo == Tipo.INT && nodoDer.tipo == Tipo.DOUBLE){
              if (nodoIzq.valor <= nodoDer.valor) {
                result = {valor: true, tipo: Tipo.BOOLEAN}
              } else {
                result = {valor: false, tipo: Tipo.BOOLEAN}    
              }
            } else if(nodoIzq.tipo == Tipo.INT && nodoDer.tipo == Tipo.CHAR){
              if (nodoIzq.valor <= nodoDer.valor.charCodeAt(0)) {
                result = {valor: true, tipo: Tipo.BOOLEAN}
              } else {
                result = {valor: false, tipo: Tipo.BOOLEAN}    
              }  
            } else if(nodoIzq.tipo == Tipo.DOUBLE && nodoDer.tipo == Tipo.INT){
              if (nodoIzq.valor <= nodoDer.valor) {
                result = {valor: true, tipo: Tipo.BOOLEAN}
              } else {
                result = {valor: false, tipo: Tipo.BOOLEAN}    
              }
            } else if(nodoIzq.tipo == Tipo.DOUBLE && nodoDer.tipo == Tipo.DOUBLE){
              if (nodoIzq.valor <= nodoDer.valor) {
                result = {valor: true, tipo: Tipo.BOOLEAN}
              } else {
                result = {valor: false, tipo: Tipo.BOOLEAN}    
              }
            } else if(nodoIzq.tipo == Tipo.DOUBLE && nodoDer.tipo == Tipo.CHAR){
              if (nodoIzq.valor <= nodoDer.valor.charCodeAt(0)) {
                result = {valor: true, tipo: Tipo.BOOLEAN}
              } else {
                result = {valor: false, tipo: Tipo.BOOLEAN}    
              }
            }else if(nodoIzq.tipo == Tipo.CHAR && nodoDer.tipo == Tipo.CHAR){
              if (nodoIzq.valor.charCodeAt(0) <=  nodoDer.valor.charCodeAt(0)) {
                result = {valor: true, tipo: Tipo.BOOLEAN}
              } else {
                result = {valor: false, tipo: Tipo.BOOLEAN}    
              }
            }else if(nodoIzq.tipo == Tipo.CHAR && nodoDer.tipo == Tipo.INT){
              if (nodoIzq.valor.charCodeAt(0) <= nodoDer.valor) {
                result = {valor: true, tipo: Tipo.BOOLEAN}
              } else {
                result = {valor: false, tipo: Tipo.BOOLEAN}    
              }
            }else if(nodoIzq.tipo == Tipo.CHAR && nodoDer.tipo == Tipo.DOUBLE){
              if (nodoIzq.valor.charCodeAt(0) <= nodoDer.valor) {
                result = {valor: true, tipo: Tipo.BOOLEAN}
              } else {
                result = {valor: false, tipo: Tipo.BOOLEAN}    
              }
            }
          }else if (this.tipo == opcionesRelacionales.IGUAL) {
            if (nodoDer.tipo == Tipo.INT && nodoIzq.tipo == Tipo.INT) {
              if (nodoIzq.valor == nodoDer.valor) {
                result = {valor: true, tipo: Tipo.BOOLEAN}
              } else {
                result = {valor: false, tipo: Tipo.BOOLEAN}    
              }
            } else if(nodoIzq.tipo == Tipo.INT && nodoDer.tipo == Tipo.DOUBLE){
              if (nodoIzq.valor == nodoDer.valor) {
                result = {valor: true, tipo: Tipo.BOOLEAN}
              } else {
                result = {valor: false, tipo: Tipo.BOOLEAN}    
              }
            } else if(nodoIzq.tipo == Tipo.INT && nodoDer.tipo == Tipo.CHAR){
              if (nodoIzq.valor == nodoDer.valor.charCodeAt(0)) {
                result = {valor: true, tipo: Tipo.BOOLEAN}
              } else {
                result = {valor: false, tipo: Tipo.BOOLEAN}    
              }  
            } else if(nodoIzq.tipo == Tipo.DOUBLE && nodoDer.tipo == Tipo.INT){
              if (nodoIzq.valor == nodoDer.valor) {
                result = {valor: true, tipo: Tipo.BOOLEAN}
              } else {
                result = {valor: false, tipo: Tipo.BOOLEAN}    
              }
            } else if(nodoIzq.tipo == Tipo.DOUBLE && nodoDer.tipo == Tipo.DOUBLE){
              if (nodoIzq.valor == nodoDer.valor) {
                result = {valor: true, tipo: Tipo.BOOLEAN}
              } else {
                result = {valor: false, tipo: Tipo.BOOLEAN}    
              }
            } else if(nodoIzq.tipo == Tipo.DOUBLE && nodoDer.tipo == Tipo.CHAR){
              if (nodoIzq.valor == nodoDer.valor.charCodeAt(0)) {
                result = {valor: true, tipo: Tipo.BOOLEAN}
              } else {
                result = {valor: false, tipo: Tipo.BOOLEAN}    
              }
            }else if(nodoIzq.tipo == Tipo.CHAR && nodoDer.tipo == Tipo.CHAR){
              if (nodoIzq.valor.charCodeAt(0) == nodoDer.valor.charCodeAt(0)) {
                result = {valor: true, tipo: Tipo.BOOLEAN}
              } else {
                result = {valor: false, tipo: Tipo.BOOLEAN}    
              }
            }else if(nodoIzq.tipo == Tipo.CHAR && nodoDer.tipo == Tipo.INT){
              if (nodoIzq.valor.charCodeAt(0) == nodoDer.valor) {
                result = {valor: true, tipo: Tipo.BOOLEAN}
              } else {
                result = {valor: false, tipo: Tipo.BOOLEAN}    
              }
            }else if(nodoIzq.tipo == Tipo.STRING && nodoDer.tipo == Tipo.STRING){
              if (nodoIzq.valor == nodoDer.valor) {
                result = {valor: true, tipo: Tipo.BOOLEAN}
              } else {
                result = {valor: false, tipo: Tipo.BOOLEAN}    
              }
            }else if(nodoIzq.tipo == Tipo.BOOLEAN && nodoDer.tipo == Tipo.BOOLEAN){
              if (nodoIzq.valor == nodoDer.valor) {
                result = {valor: true, tipo: Tipo.BOOLEAN}
              } else {
                result = {valor: false, tipo: Tipo.BOOLEAN}    
              }
            }
          }else if (this.tipo == opcionesRelacionales.DIFERENTEDE) {
            if (nodoDer.tipo == Tipo.INT && nodoIzq.tipo == Tipo.INT) {
              if (nodoIzq.valor != nodoDer.valor) {
                result = {valor: true, tipo: Tipo.BOOLEAN}
              } else {
                result = {valor: false, tipo: Tipo.BOOLEAN}    
              }
            } else if(nodoIzq.tipo == Tipo.INT && nodoDer.tipo == Tipo.DOUBLE){
              if (nodoIzq.valor != nodoDer.valor) {
                result = {valor: true, tipo: Tipo.BOOLEAN}
              } else {
                result = {valor: false, tipo: Tipo.BOOLEAN}    
              }
            } else if(nodoIzq.tipo == Tipo.INT && nodoDer.tipo == Tipo.CHAR){
              if (nodoIzq.valor != nodoDer.valor.charCodeAt(0)) {
                result = {valor: true, tipo: Tipo.BOOLEAN}
              } else {
                result = {valor: false, tipo: Tipo.BOOLEAN}    
              }  
            } else if(nodoIzq.tipo == Tipo.DOUBLE && nodoDer.tipo == Tipo.INT){
              if (nodoIzq.valor != nodoDer.valor) {
                result = {valor: true, tipo: Tipo.BOOLEAN}
              } else {
                result = {valor: false, tipo: Tipo.BOOLEAN}    
              }
            } else if(nodoIzq.tipo == Tipo.DOUBLE && nodoDer.tipo == Tipo.DOUBLE){
              if (nodoIzq.valor != nodoDer.valor) {
                result = {valor: true, tipo: Tipo.BOOLEAN}
              } else {
                result = {valor: false, tipo: Tipo.BOOLEAN}    
              }
            } else if(nodoIzq.tipo == Tipo.DOUBLE && nodoDer.tipo == Tipo.CHAR){
              if (nodoIzq.valor != nodoDer.valor.charCodeAt(0)) {
                result = {valor: true, tipo: Tipo.BOOLEAN}
              } else {
                result = {valor: false, tipo: Tipo.BOOLEAN}    
              }
            }else if(nodoIzq.tipo == Tipo.CHAR && nodoDer.tipo == Tipo.CHAR){
              if (nodoIzq.valor.charCodeAt(0) != nodoDer.valor.charCodeAt(0)) {
                result = {valor: true, tipo: Tipo.BOOLEAN}
              } else {
                result = {valor: false, tipo: Tipo.BOOLEAN}    
              }
            }else if(nodoIzq.tipo == Tipo.CHAR && nodoDer.tipo == Tipo.INT){
              if (nodoIzq.valor.charCodeAt(0) != nodoDer.valor) {
                result = {valor: true, tipo: Tipo.BOOLEAN}
              } else {
                result = {valor: false, tipo: Tipo.BOOLEAN}    
              }
            }else if(nodoIzq.tipo == Tipo.STRING && nodoDer.tipo == Tipo.STRING){
              if (nodoIzq.valor != nodoDer.valor) {
                result = {valor: true, tipo: Tipo.BOOLEAN}
              } else {
                result = {valor: false, tipo: Tipo.BOOLEAN}    
              }
            }else if(nodoIzq.tipo == Tipo.BOOLEAN && nodoDer.tipo == Tipo.BOOLEAN){
              if (nodoIzq.valor != nodoDer.valor) {
                result = {valor: true, tipo: Tipo.BOOLEAN}
              } else {
                result = {valor: false, tipo: Tipo.BOOLEAN}    
              }
            }
          }
      
      return result;
    }

    public ast(): string {
      const name_nodo = `node_${this.left.line}_${this.right.column}_expresion`;
      
      if (this.tipo == opcionesRelacionales.MAYOR) {
        return `
        ${name_nodo};
        ${name_nodo}[label="\\< Expresión \\> \\n Operación relacional"];
        ${name_nodo}->${this.left.ast()}
        ${name_nodo}_MayorQue[label="{>}"];
        ${name_nodo}->${name_nodo}_MayorQue;
        ${name_nodo}->${this.right.ast()}
        `
      }else if (this.tipo == opcionesRelacionales.MENOR) {
        return `
        ${name_nodo};
        ${name_nodo}[label="\\< Expresión \\> \\n Operación relacional"];
        ${name_nodo}->${this.left.ast()}
        ${name_nodo}_MenorQue[label="{<}"];
        ${name_nodo}->${name_nodo}_MenorQue;
        ${name_nodo}->${this.right.ast()}
        `
      }else if (this.tipo == opcionesRelacionales.MAYORIGUAL) {
        return `
        ${name_nodo};
        ${name_nodo}[label="\\>= Expresión \\> \\n Operación relacional"];
        ${name_nodo}->${this.left.ast()}
        ${name_nodo}_MayorIgualQue[label="{>=}"];
        ${name_nodo}->${name_nodo}_MayorIgualQue;
        ${name_nodo}->${this.right.ast()}
        `
      }else if (this.tipo == opcionesRelacionales.MENORIGUAL) {
        return `
        ${name_nodo};
        ${name_nodo}[label="\\<= Expresión \\> \\n Operación relacional"];
        ${name_nodo}->${this.left.ast()}
        ${name_nodo}_MenorIgualQue[label="{<=}"];
        ${name_nodo}->${name_nodo}_MenorIgualQue;
        ${name_nodo}->${this.right.ast()}
        `
      }else if (this.tipo == opcionesRelacionales.IGUAL) {
        return `
        ${name_nodo};
        ${name_nodo}[label="\\< Expresión \\> \\n Operación relacional"];
        ${name_nodo}->${this.left.ast()}
        ${name_nodo}_igualacion[label="{==}"];
        ${name_nodo}->${name_nodo}_igualacion;
        ${name_nodo}->${this.right.ast()}
        `
      }else if (this.tipo == opcionesRelacionales.DIFERENTEDE) {
        return `
        ${name_nodo};
        ${name_nodo}[label="\\< Expresión \\> \\n Operación relacional"];
        ${name_nodo}->${this.left.ast()}
        ${name_nodo}_diferenciacion[label="{=!}"];
        ${name_nodo}->${name_nodo}_diferenciacion;
        ${name_nodo}->${this.right.ast()}
        `
      }else{
        return "";
      }
    }
  }
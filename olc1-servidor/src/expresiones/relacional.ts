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
          result = {
            valor: nodoIzq.valor > nodoDer.valor,
            tipo: Tipo.BOOLEAN,
          };
        } else if(nodoIzq.tipo == Tipo.INT && nodoDer.tipo == Tipo.DOUBLE){
            result = {
                valor: nodoIzq.valor > nodoDer.valor,
                tipo: Tipo.BOOLEAN,
              };
        } else if(nodoIzq.tipo == Tipo.INT && nodoDer.tipo == Tipo.CHAR){
            result = {
                valor: nodoIzq.valor > nodoDer.valor.charCodeAt(0),
                tipo: Tipo.BOOLEAN,
              };
        } else if(nodoIzq.tipo == Tipo.DOUBLE && nodoDer.tipo == Tipo.INT){
            result = {
                valor: nodoIzq.valor > nodoDer.valor,
                tipo: Tipo.BOOLEAN,
              }; 
        } else if(nodoIzq.tipo == Tipo.DOUBLE && nodoDer.tipo == Tipo.DOUBLE){
            result = {
                valor: nodoIzq.valor > nodoDer.valor,
                tipo: Tipo.BOOLEAN,
              };
        } else if(nodoIzq.tipo == Tipo.DOUBLE && nodoDer.tipo == Tipo.CHAR){
            result = {
                valor: nodoIzq.valor > nodoDer.valor.charCodeAt(0),
                tipo: Tipo.BOOLEAN,
              };
        }else if(nodoIzq.tipo == Tipo.CHAR && nodoDer.tipo == Tipo.CHAR){
            result = {
                valor: nodoIzq.valor.charCodeAt(0) > nodoDer.valor.charCodeAt(0),
                tipo: Tipo.BOOLEAN,
              };
        }else if(nodoIzq.tipo == Tipo.CHAR && nodoDer.tipo == Tipo.INT){
            result = {
                valor: nodoIzq.valor.charCodeAt(0) > nodoDer.valor,
                tipo: Tipo.BOOLEAN,
              };
        }else if(nodoIzq.tipo == Tipo.CHAR && nodoDer.tipo == Tipo.DOUBLE){
            result = {
                valor: nodoIzq.valor.charCodeAt(0) > nodoDer.valor,
                tipo: Tipo.BOOLEAN,
              };
        }
      }else if (this.tipo == opcionesRelacionales.MENOR) {
        if (nodoDer.tipo == Tipo.INT && nodoIzq.tipo == Tipo.INT) {
          result = {
            valor: nodoIzq.valor < nodoDer.valor,
            tipo: Tipo.BOOLEAN,
          };
        } else if(nodoIzq.tipo == Tipo.INT && nodoDer.tipo == Tipo.DOUBLE){
            result = {
                valor: nodoIzq.valor < nodoDer.valor,
                tipo: Tipo.BOOLEAN,
              };
        } else if(nodoIzq.tipo == Tipo.INT && nodoDer.tipo == Tipo.CHAR){
            result = {
                valor: nodoIzq.valor < nodoDer.valor.charCodeAt(0),
                tipo: Tipo.BOOLEAN,
              };
        } else if(nodoIzq.tipo == Tipo.DOUBLE && nodoDer.tipo == Tipo.INT){
            result = {
                valor: nodoIzq.valor < nodoDer.valor,
                tipo: Tipo.BOOLEAN,
              }; 
        } else if(nodoIzq.tipo == Tipo.DOUBLE && nodoDer.tipo == Tipo.DOUBLE){
            result = {
                valor: nodoIzq.valor < nodoDer.valor,
                tipo: Tipo.BOOLEAN,
              };
        } else if(nodoIzq.tipo == Tipo.DOUBLE && nodoDer.tipo == Tipo.CHAR){
            result = {
                valor: nodoIzq.valor < nodoDer.valor.charCodeAt(0),
                tipo: Tipo.BOOLEAN,
              };
        }else if(nodoIzq.tipo == Tipo.CHAR && nodoDer.tipo == Tipo.CHAR){
            result = {
                valor: nodoIzq.valor.charCodeAt(0) < nodoDer.valor.charCodeAt(0),
                tipo: Tipo.BOOLEAN,
              };
        }else if(nodoIzq.tipo == Tipo.CHAR && nodoDer.tipo == Tipo.INT){
            result = {
                valor: nodoIzq.valor.charCodeAt(0) < nodoDer.valor,
                tipo: Tipo.BOOLEAN,
              };
        }else if(nodoIzq.tipo == Tipo.CHAR && nodoDer.tipo == Tipo.DOUBLE){
            result = {
                valor: nodoIzq.valor.charCodeAt(0) < nodoDer.valor,
                tipo: Tipo.BOOLEAN,
              };
        }
        }else if (this.tipo == opcionesRelacionales.MAYORIGUAL) {
          if (nodoDer.tipo == Tipo.INT && nodoIzq.tipo == Tipo.INT) {
            result = {
              valor: nodoIzq.valor >= nodoDer.valor,
              tipo: Tipo.BOOLEAN,
            };
          } else if(nodoIzq.tipo == Tipo.INT && nodoDer.tipo == Tipo.DOUBLE){
              result = {
                  valor: nodoIzq.valor >= nodoDer.valor,
                  tipo: Tipo.BOOLEAN,
                };
          } else if(nodoIzq.tipo == Tipo.INT && nodoDer.tipo == Tipo.CHAR){
              result = {
                  valor: nodoIzq.valor >= nodoDer.valor.charCodeAt(0),
                  tipo: Tipo.BOOLEAN,
                };
          } else if(nodoIzq.tipo == Tipo.DOUBLE && nodoDer.tipo == Tipo.INT){
              result = {
                  valor: nodoIzq.valor >= nodoDer.valor,
                  tipo: Tipo.BOOLEAN,
                }; 
          } else if(nodoIzq.tipo == Tipo.DOUBLE && nodoDer.tipo == Tipo.DOUBLE){
              result = {
                  valor: nodoIzq.valor >= nodoDer.valor,
                  tipo: Tipo.BOOLEAN,
                };
          } else if(nodoIzq.tipo == Tipo.DOUBLE && nodoDer.tipo == Tipo.CHAR){
              result = {
                  valor: nodoIzq.valor >= nodoDer.valor.charCodeAt(0),
                  tipo: Tipo.BOOLEAN,
                };
          }else if(nodoIzq.tipo == Tipo.CHAR && nodoDer.tipo == Tipo.CHAR){
              result = {
                  valor: nodoIzq.valor.charCodeAt(0) >= nodoDer.valor.charCodeAt(0),
                  tipo: Tipo.BOOLEAN,
                };
          }else if(nodoIzq.tipo == Tipo.CHAR && nodoDer.tipo == Tipo.INT){
              result = {
                  valor: nodoIzq.valor.charCodeAt(0) >= nodoDer.valor,
                  tipo: Tipo.BOOLEAN,
                };
          }else if(nodoIzq.tipo == Tipo.CHAR && nodoDer.tipo == Tipo.DOUBLE){
              result = {
                  valor: nodoIzq.valor.charCodeAt(0) >= nodoDer.valor,
                  tipo: Tipo.BOOLEAN,
                };
          }
          } else if (this.tipo == opcionesRelacionales.MENORIGUAL) {
            if (nodoDer.tipo == Tipo.INT && nodoIzq.tipo == Tipo.INT) {
              result = {
                valor: nodoIzq.valor <= nodoDer.valor,
                tipo: Tipo.BOOLEAN,
              };
            } else if(nodoIzq.tipo == Tipo.INT && nodoDer.tipo == Tipo.DOUBLE){
                result = {
                    valor: nodoIzq.valor <= nodoDer.valor,
                    tipo: Tipo.BOOLEAN,
                  };
            } else if(nodoIzq.tipo == Tipo.INT && nodoDer.tipo == Tipo.CHAR){
                result = {
                    valor: nodoIzq.valor <= nodoDer.valor.charCodeAt(0),
                    tipo: Tipo.BOOLEAN,
                  };
            } else if(nodoIzq.tipo == Tipo.DOUBLE && nodoDer.tipo == Tipo.INT){
                result = {
                    valor: nodoIzq.valor <= nodoDer.valor,
                    tipo: Tipo.BOOLEAN,
                  }; 
            } else if(nodoIzq.tipo == Tipo.DOUBLE && nodoDer.tipo == Tipo.DOUBLE){
                result = {
                    valor: nodoIzq.valor <= nodoDer.valor,
                    tipo: Tipo.BOOLEAN,
                  };
            } else if(nodoIzq.tipo == Tipo.DOUBLE && nodoDer.tipo == Tipo.CHAR){
                result = {
                    valor: nodoIzq.valor <= nodoDer.valor.charCodeAt(0),
                    tipo: Tipo.BOOLEAN,
                  };
            }else if(nodoIzq.tipo == Tipo.CHAR && nodoDer.tipo == Tipo.CHAR){
                result = {
                    valor: nodoIzq.valor.charCodeAt(0) <= nodoDer.valor.charCodeAt(0),
                    tipo: Tipo.BOOLEAN,
                  };
            }else if(nodoIzq.tipo == Tipo.CHAR && nodoDer.tipo == Tipo.INT){
                result = {
                    valor: nodoIzq.valor.charCodeAt(0) <= nodoDer.valor,
                    tipo: Tipo.BOOLEAN,
                  };
            }else if(nodoIzq.tipo == Tipo.CHAR && nodoDer.tipo == Tipo.DOUBLE){
                result = {
                    valor: nodoIzq.valor.charCodeAt(0) <= nodoDer.valor,
                    tipo: Tipo.BOOLEAN,
                  };
            }
          }else if (this.tipo == opcionesRelacionales.IGUAL) {
            if (nodoDer.tipo == Tipo.INT && nodoIzq.tipo == Tipo.INT) {
              result = {
                valor: nodoIzq.valor == nodoDer.valor,
                tipo: Tipo.BOOLEAN,
              };
            } else if(nodoIzq.tipo == Tipo.INT && nodoDer.tipo == Tipo.DOUBLE){
                result = {
                    valor: nodoIzq.valor == nodoDer.valor,
                    tipo: Tipo.BOOLEAN,
                  };
            } else if(nodoIzq.tipo == Tipo.INT && nodoDer.tipo == Tipo.CHAR){
                result = {
                    valor: nodoIzq.valor == nodoDer.valor.charCodeAt(0),
                    tipo: Tipo.BOOLEAN,
                  };
            } else if(nodoIzq.tipo == Tipo.DOUBLE && nodoDer.tipo == Tipo.INT){
                result = {
                    valor: nodoIzq.valor == nodoDer.valor,
                    tipo: Tipo.BOOLEAN,
                  }; 
            } else if(nodoIzq.tipo == Tipo.DOUBLE && nodoDer.tipo == Tipo.DOUBLE){
                result = {
                    valor: nodoIzq.valor == nodoDer.valor,
                    tipo: Tipo.BOOLEAN,
                  };
            } else if(nodoIzq.tipo == Tipo.DOUBLE && nodoDer.tipo == Tipo.CHAR){
                result = {
                    valor: nodoIzq.valor == nodoDer.valor.charCodeAt(0),
                    tipo: Tipo.BOOLEAN,
                  };
            }else if(nodoIzq.tipo == Tipo.CHAR && nodoDer.tipo == Tipo.CHAR){
                result = {
                    valor: nodoIzq.valor.charCodeAt(0) == nodoDer.valor.charCodeAt(0),
                    tipo: Tipo.BOOLEAN,
                  };
            }else if(nodoIzq.tipo == Tipo.CHAR && nodoDer.tipo == Tipo.INT){
                result = {
                    valor: nodoIzq.valor.charCodeAt(0) == nodoDer.valor,
                    tipo: Tipo.BOOLEAN,
                  };
            }else if(nodoIzq.tipo == Tipo.STRING && nodoDer.tipo == Tipo.STRING){
                result = {
                    valor: nodoIzq.valor == nodoDer.valor,
                    tipo: Tipo.BOOLEAN,
                  };
            }else if(nodoIzq.tipo == Tipo.STRING && nodoDer.tipo == Tipo.STRING){
              result = {
                  valor: nodoIzq.valor == nodoDer.valor,
                  tipo: Tipo.BOOLEAN,
                };
            }else if(nodoIzq.tipo == Tipo.BOOLEAN && nodoDer.tipo == Tipo.BOOLEAN){
              result = {
                  valor: nodoIzq.valor == nodoDer.valor,
                  tipo: Tipo.BOOLEAN,
                };
            }
          }else if (this.tipo == opcionesRelacionales.DIFERENTEDE) {
            if (nodoDer.tipo == Tipo.INT && nodoIzq.tipo == Tipo.INT) {
              result = {
                valor: nodoIzq.valor != nodoDer.valor,
                tipo: Tipo.BOOLEAN,
              };
            } else if(nodoIzq.tipo == Tipo.INT && nodoDer.tipo == Tipo.DOUBLE){
                result = {
                    valor: nodoIzq.valor != nodoDer.valor,
                    tipo: Tipo.BOOLEAN,
                  };
            } else if(nodoIzq.tipo == Tipo.INT && nodoDer.tipo == Tipo.CHAR){
                result = {
                    valor: nodoIzq.valor != nodoDer.valor.charCodeAt(0),
                    tipo: Tipo.BOOLEAN,
                  };
            } else if(nodoIzq.tipo == Tipo.DOUBLE && nodoDer.tipo == Tipo.INT){
                result = {
                    valor: nodoIzq.valor != nodoDer.valor,
                    tipo: Tipo.BOOLEAN,
                  }; 
            } else if(nodoIzq.tipo == Tipo.DOUBLE && nodoDer.tipo == Tipo.DOUBLE){
                result = {
                    valor: nodoIzq.valor != nodoDer.valor,
                    tipo: Tipo.BOOLEAN,
                  };
            } else if(nodoIzq.tipo == Tipo.DOUBLE && nodoDer.tipo == Tipo.CHAR){
                result = {
                    valor: nodoIzq.valor != nodoDer.valor.charCodeAt(0),
                    tipo: Tipo.BOOLEAN,
                  };
            }else if(nodoIzq.tipo == Tipo.CHAR && nodoDer.tipo == Tipo.CHAR){
                result = {
                    valor: nodoIzq.valor.charCodeAt(0) != nodoDer.valor.charCodeAt(0),
                    tipo: Tipo.BOOLEAN,
                  };
            }else if(nodoIzq.tipo == Tipo.CHAR && nodoDer.tipo == Tipo.INT){
                result = {
                    valor: nodoIzq.valor.charCodeAt(0) != nodoDer.valor,
                    tipo: Tipo.BOOLEAN,
                  };
            }else if(nodoIzq.tipo == Tipo.STRING && nodoDer.tipo == Tipo.STRING){
                result = {
                    valor: nodoIzq.valor != nodoDer.valor,
                    tipo: Tipo.BOOLEAN,
                  };
            }else if(nodoIzq.tipo == Tipo.STRING && nodoDer.tipo == Tipo.STRING){
              result = {
                  valor: nodoIzq.valor != nodoDer.valor,
                  tipo: Tipo.BOOLEAN,
                };
            }else if(nodoIzq.tipo == Tipo.BOOLEAN && nodoDer.tipo == Tipo.BOOLEAN){
              result = {
                  valor: nodoIzq.valor != nodoDer.valor,
                  tipo: Tipo.BOOLEAN,
                };
            }
          }
      
      return result;
    }

    public ast(): string {
      return "";
    }
  }
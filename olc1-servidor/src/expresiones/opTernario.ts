import { Expresion } from "../abstract/expresion";
import { Instruccion } from "../abstract/instruccion";
import { Retorno } from "../abstract/retorno";
import { Errores } from "../errores/errores";
import { Singleton } from "../patronSingleton/singleton";
import { Entorno } from "../simbolos/entorno";
import { Tipo } from "../simbolos/tipo";

export class OpTernario extends Expresion {
    constructor(
        private condition: Expresion,
        public ins_verdadero: Expresion,
        public ins_falso: Expresion,
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
  
      const condicionTernario = this.condition.run(env);
      if(condicionTernario.tipo == Tipo.BOOLEAN){
            if(condicionTernario.valor == true){
                const ins_verdadero_run = this.ins_verdadero.run(env);
                result = {
                    valor: ins_verdadero_run.valor,
                    tipo: ins_verdadero_run.tipo,
                };
            }else{
                const ins_falso_run = this.ins_falso.run(env);
                result = {
                    valor: ins_falso_run.valor,
                    tipo: ins_falso_run.tipo,
                };
            }
      }else{
        var singleton = Singleton.getInstance();
        const error = new Errores(this.line, this.column, "La condición del operador ternario debe retornar un booleano", "Semántico");
        singleton.add_errores(error);
        return {valor: null, tipo: Tipo.error}
      }
  
      
      return result;
    }

    public ast(): string {
    
        const name_nodo = `node_${this.line}_${this.column}_`
        
        return `
            ${name_nodo};
            ${name_nodo} [label="\\<Expresion\\>\\n Operador ternario"];
            ${name_nodo}1[label="\\<Instruccion verdadera\\>"];
            ${name_nodo}2[label="\\<Instruccion falsa\\>"];
            ${name_nodo}->${name_nodo}1;
            ${name_nodo}->${name_nodo}2;
            ${name_nodo}->${this.condition.ast()};
            ${name_nodo}1->${this.ins_verdadero.ast()};
            ${name_nodo}2->${this.ins_falso.ast()};
        `
    }
  }
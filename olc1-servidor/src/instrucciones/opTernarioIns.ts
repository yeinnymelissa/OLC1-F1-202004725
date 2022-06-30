import { Expresion } from "../abstract/expresion";
import { Instruccion } from "../abstract/instruccion";
import { Errores } from "../errores/errores";
import { Singleton } from "../patronSingleton/singleton";
import { Entorno } from "../simbolos/entorno";
import { Tipo } from "../simbolos/tipo";

export class OpTernarioIns extends Instruccion {
    constructor(
        private condition: Expresion,
        public ins_verdadero: Instruccion,
        public ins_falso: Instruccion,
        line: number,
        column: number
    ) {
      super(line, column);
    }
  
    public run(env: Entorno) {
  
      const condicionTernario = this.condition.run(env);
      if(condicionTernario.tipo == Tipo.BOOLEAN){
            if(condicionTernario.valor == true){
                this.ins_verdadero.run(env);
            }else{
                this.ins_falso.run(env);
            }
      }else{
        var singleton = Singleton.getInstance();
        const error = new Errores(this.line, this.column, "La condición del operador ternario debe retornar un booleano", "Semántico");
        singleton.add_errores(error);
        return;
      }
  
      
    }

    public ast(): void {
        const s= Singleton.getInstance()
        const name_node = `instruccion_${this.line}_${this.column}_`
        s.addAst(`
        ${name_node} [label="\\<Instruccion\\>\\n Operador ternario"];
        ${name_node}1[label="\\<Instruccion verdadera\\>"];
        ${name_node}2[label="\\<Instruccion falsa\\>"];
        ${name_node}->${name_node}1;
        ${name_node}->${name_node}2;
        ${name_node}->${this.condition.ast()}
        ${name_node}1->instruccion_${this.ins_verdadero.line}_${this.ins_verdadero.column}_;;
        ${name_node}2->instruccion_${this.ins_falso.line}_${this.ins_falso.column}_;;
        `)
        this.ins_verdadero.ast();
        this.ins_falso.ast();
    }
  }
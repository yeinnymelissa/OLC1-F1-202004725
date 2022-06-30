import { Expresion } from "../../abstract/expresion";
import { Instruccion } from "../../abstract/instruccion";
import { Singleton } from "../../patronSingleton/singleton";
import { Entorno } from "../../simbolos/entorno";

export class Print extends Instruccion {
    constructor(        
        public expresion : Expresion,
        line: number, 
        column : number
    ) {
        super(line,column);
    }

    public run(env: Entorno) {

        //console.log(this.expresion) 
        //console.log("---------------");
        
        const tmp= this.expresion.run(env);
        //console.log(">>",tmp.valor); //esto es lo que tienen que mostrar al usuario
        
        const s= Singleton.getInstance()
        s.add_consola(tmp.valor)
        
    }

    public ast() {
        const singleton = Singleton.getInstance()
        const nombreNodo = `instruccion_${this.line}_${this.column}_`;
        singleton.addAst(`${nombreNodo}[label="\\<Instruccion\\>\\nprint"];\n`)
        if (this.expresion!= null){singleton.addAst(`    ${nombreNodo}->${this.expresion.ast()}\n`)}
    }
}
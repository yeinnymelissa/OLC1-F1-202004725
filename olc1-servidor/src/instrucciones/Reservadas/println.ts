import { Expresion } from "../../abstract/expresion";
import { Instruccion } from "../../abstract/instruccion";
import { Singleton } from "../../patronSingleton/singleton";
import { Entorno } from "../../simbolos/entorno";

export class Println extends Instruccion {
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
        console.log("prueba")
        console.log(tmp);
        console.log(tmp.tipo); 
        //console.log(">>",tmp.value); //esto es lo que tienen que mostrar al usuario
        
        const s= Singleton.getInstance()
        s.add_consola(tmp.valor+"\n")
        
    }

    public ast() {
        const singleton = Singleton.getInstance()
        const nombreNodo = `instruccion_${this.line}_${this.column}_`
        singleton.addAst(`${nombreNodo}[label="\\<Instruccion\\>\\nprintln"];\n`)
        if (this.expresion!= null){singleton.addAst(`    ${nombreNodo}->${this.expresion.ast()}\n`)}
    }
}
import { Expresion } from "../../abstract/expresion";
import { Instruccion } from "../../abstract/instruccion";
import { Singleton } from "../../patronSingleton/singleton";
import { Entorno } from "../../simbolos/entorno";
import { Tipo } from "../../simbolos/tipo";

export class Println extends Instruccion {
    constructor(        
        public expresion : Expresion | null,
        line: number, 
        column : number
    ) {
        super(line,column);
    }

    public run(env: Entorno) {
        const s= Singleton.getInstance()
        //console.log(this.expresion) 
        //console.log("---------------");
        if(this.expresion != null){
            const tmp= this.expresion.run(env);
            if(tmp.tipo == Tipo.VECINT || tmp.tipo == Tipo.VECBOOLEAN || tmp.tipo == Tipo.VECDOUBLE){
                s.add_consola("\[")
                for (let i = 0; i < tmp.valor.length; i++) {
                    if(i==0){
                        s.add_consola(tmp.valor[i])
                    }else{
                        s.add_consola(","+tmp.valor[i])
                    }
                }
                s.add_consola("\]\n")
            }else if(tmp.tipo == Tipo.VECSTRING){
                s.add_consola("\[")
                for (let i = 0; i < tmp.valor.length; i++) {
                    if(i==0){
                        s.add_consola(tmp.valor[i])
                    }else{
                        s.add_consola(", "+"\""+tmp.valor[i]+"\"")
                    }
                }
                s.add_consola("\]\n")
            }else if(tmp.tipo == Tipo.VECCHAR){
                s.add_consola("\[")
                for (let i = 0; i < tmp.valor.length; i++) {
                    if(i==0){
                        s.add_consola(tmp.valor[i])
                    }else{
                        s.add_consola(", "+"\'"+tmp.valor[i]+"\'")
                    }
                }
                s.add_consola("\]\n")
            }else{
                s.add_consola(tmp.valor+"\n")
            }
        }else{
            s.add_consola("\n")
        }
        
    }

    public ast() {
        const singleton = Singleton.getInstance()
        const nombreNodo = `instruccion_${this.line}_${this.column}_`
        singleton.addAst(`${nombreNodo}[label="\\<Instruccion\\>\\nprintln"];\n`)
        if (this.expresion!= null){singleton.addAst(`    ${nombreNodo}->${this.expresion.ast()}\n`)}
    }
}
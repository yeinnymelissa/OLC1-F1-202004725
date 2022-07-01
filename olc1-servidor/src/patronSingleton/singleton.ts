import { Errores } from "../errores/errores";
import { Simbolo } from "../simbolos/simbolo";
import { Tipo } from "../simbolos/tipo";

export class Singleton {

    private static instance: Singleton

    private consola: string = ""
    private ast: string = ""
    private errores: string = "";
    private simbolos: string = "";
    private contadorEnv: number = 1;
    private graficarTs: any[] = [];
    
    constructor() {
    }


    public static getInstance() :Singleton
    {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }

    public limpiarConsola(){
        this.consola = "";
        this.ast =  "";
        this.errores = "";
        this.simbolos = "";
        this.contadorEnv = 0;
        this.graficarTs = [];
    }

    public add_consola(data: string) {
        this.consola += data
    }
    public get_consola(): string {
        return this.consola
    }
    public set_consola(data: string) {
        this.consola = data
    }


    public add_errores(data: Errores) {
        this.errores +=
        "<tr>" +
        "<td>" + data.tipo + "</td>" +
        "<td>" + data.err + "</td>" +
        "<td>" + data.line + "</td>" +
        "<td>" + data.column + "</td>" +
        "</tr>";
    }
    public get_errores():string {
        return `
        <table class=\"table table-striped\" border=1 style="width: 75%;margin: 0 auto;" cellpadding ="5">
            <tr class=\"table-dark\">
                <th>Tipo de error</th>
                <th>Descripcion</th>
                <th>Línea</th>
                <th>Columna</th>
            </tr>${this.errores}
        </table>`;
    }

    public addAst(data: string){
        this.ast += data
    }

    public getAst(){
        return this.ast;
    }

    public add_simbolos(data: Simbolo) {
        this.simbolos +=
        "<tr>" +
        "<td>" + this.getTipo(data.tipo) + "</td>" +
        "<td>" + data.id + "</td>" +
        "<td>" + data.valor + "</td>" +
        "<td>" + data.numeroEnv + "</td>" +
        "<td>" + data.line + "</td>" +
        "<td>" + data.column + "</td>" +
        "</tr>";
    }
    public get_simbolos():string {
        return `
        <table class=\"table table-striped\" border=1 style="width: 75%;margin: 0 auto;" cellpadding ="5">
            <tr class=\"table-dark\">
                <th>Tipo</th>
                <th>Identificador</th>
                <th>Valor</th>
                <th>Identificador de entorno</th>
                <th>Línea</th>
                <th>Columna</th>
            </tr>${this.simbolos}
        </table>`;
    }

    public add_graficarTs(data: string) {
        this.graficarTs.push(data)
    }
    public get_graficarTs():any[]{
        return this.graficarTs
    }

    public get_envID(): number {
        return this.contadorEnv
    }

    public aumentarEnv(){
        this.contadorEnv += 1;
    }



    public getTipo(tipo: Tipo | undefined): string{
        switch(tipo){
            case Tipo.INT:
                return "int";
            case Tipo.DOUBLE:
                return "double";
            case Tipo.CHAR:
                return "char";
            case Tipo.STRING:
                return "string";
            case Tipo.BOOLEAN:
                return "boolean";
            case Tipo.VOID:
                return "void";
            case Tipo.VECINT:
                return "int[]";
            case Tipo.VECDOUBLE:
                return "double[]";
            case Tipo.VECCHAR:
                return "char[]";
            case Tipo.VECSTRING:
                return "string[]";
            case Tipo.VECBOOLEAN:
                return "boolean[]";
            default:
                return "error";
        }
    }

}
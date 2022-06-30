import { Singleton } from "../patronSigleton/singleton";
import { Simbolo } from "./simbolo";
import { Tipo } from "./tipo";

export class Entorno {
  
  private tablaSimbolos: Map<string, Simbolo>; //unicamente para variables, tienes q guardar funciones en otro map 
  private tablaSimbolos_metodos: Map<string, any>; //unicamente para metodos o funciones


  constructor(public anterior: Entorno | null, public recorridoAmbito: string) {
    this.tablaSimbolos = new Map();
    this.tablaSimbolos_metodos = new Map();
  }

  public getEnv(){
    return this.tablaSimbolos
  }

  public guardar_funcion(nombre: string, valor:any) {
    
    //verificar que no existan duplicados
    this.tablaSimbolos_metodos.set(nombre, valor);
  }

  public guardar_variable(nombre: string, valor: any, tipo: Tipo, editable: boolean, ambito: string, line: number, column: number): boolean {
    
    if(!this.buscar_variable(nombre)){
      let simbol:Simbolo = new Simbolo(valor, nombre, tipo,editable, ambito, line, column);
      this.tablaSimbolos.set(nombre, simbol);
      let singleton = Singleton.getInstance();
      singleton.add_simbolos(simbol)
      return true
    }
    console.log("esta variable ["+nombre+"] ya existe...");
    return false
  }

  public buscar_variable(nombre: string): boolean {
    for (let entry of Array.from(this.tablaSimbolos.entries())) {
        if (entry[0] == nombre) return true;
    }
    return false
  }
  public getTipo_variable(nombre: string): Tipo {
    for (let entry of Array.from(this.tablaSimbolos.entries())) {
        if (entry[0] == nombre) return entry[1].tipo;
    }
    return Tipo.error
  }
  public actualizar_variable(nombre: string, new_valor: any) {
    let env: Entorno | null = this;

      while (env != null) {
          if (env.tablaSimbolos.has(nombre)) {
              for (let entry of Array.from(env.tablaSimbolos.entries())) {
                  if (entry[0] == nombre) {
                      entry[1].valor = new_valor;
                      return
                  }
              }
          }
          env = env.anterior;
      }
  }


  public get_variable(nombre: string): Simbolo | undefined | null {
    let env: Entorno | null = this;
    while (env != null) {
        if (env.tablaSimbolos.has(nombre)) return env.tablaSimbolos.get(nombre);
        env = env.anterior;
    }
    return null;
}

public getTipo(tipo: Tipo): string{
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
      default:
          return "error";
  }
}

  /*public get_metodo(nombre: string): metodo | undefined | null {
    let env: Entorno | null = this;
    while (env != null) {
        if (env.tablaSimbolos_metodos.has(nombre)) return env.tablaSimbolos_metodos.get(nombre);
        env = env.anterior;
    }
    return null;
  }*/
  
}
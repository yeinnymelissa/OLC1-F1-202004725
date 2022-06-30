import { InsFuncion } from "../instrucciones/funcion";
import { Singleton } from "../patronSingleton/singleton";
import { Simbolo } from "./simbolo";
import { Tipo } from "./tipo";

export class Entorno {
  
  private tablaSimbolos: Map<string, Simbolo>; //unicamente para variables, tienes q guardar funciones en otro map 
  private tablaSimbolos_metodos_funciones: Map<string, any>; //unicamente para metodos o funciones


  constructor(
    public anterior: Entorno | null, 
    public recorridoAmbito: string,
    public id: number
  ) {
    this.tablaSimbolos = new Map();
    this.tablaSimbolos_metodos_funciones = new Map();
  }

  public getEnv(){
    return this.tablaSimbolos
  }

  public guardar_funcion(nombre: string, valor:any) {
    
    //verificar que no existan duplicados
    this.tablaSimbolos_metodos_funciones.set(nombre, valor);
  }

  public guardar_variable(nombre: string, valor: any, tipo: Tipo, editable: boolean, ambito: string, line: number, column: number): boolean {
    
    if(!this.buscar_variable(nombre)){
      let simbol:Simbolo = new Simbolo(valor, nombre, tipo,editable,this.id, ambito, line, column);
      this.tablaSimbolos.set(nombre, simbol);
      console.log(this.tablaSimbolos)
      let singleton = Singleton.getInstance();
      singleton.add_simbolos(simbol)
      return true
    }
    console.log("esta variable ["+nombre+"] ya existe...");
    return false
  }

  public guardar_funcion_metodo(nombre: string, valor: any, tipo: Tipo, editable: boolean, ambito: string, line: number, column: number): boolean {
    
    if(!this.buscar_metodo_funcion(nombre)){
      let simbol:Simbolo = new Simbolo(valor, nombre, tipo,editable,this.id, ambito, line, column);
      this.tablaSimbolos_metodos_funciones.set(nombre, simbol);
      let singleton = Singleton.getInstance();
      singleton.add_simbolos(simbol)
      return true
    }
    console.log("esta variable ["+nombre+"] ya existe...");
    return false
  }


  public buscar_metodo_funcion(nombre: string): boolean {
    for (let entry of Array.from(this.tablaSimbolos_metodos_funciones.entries())) {
        if (entry[0] == nombre) return true;
    }
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
      console.log("buscando")
        if (env.tablaSimbolos.has(nombre)){
          console.log("encontrado")
          return env.tablaSimbolos.get(nombre)
        }
        env = env.anterior;
    }
    return null;
}

public get_metodos_funciones(nombre: string): Simbolo | undefined | null {
  let env: Entorno | null = this;
  while (env != null) {
      if (env.tablaSimbolos_metodos_funciones.has(nombre)) return env.tablaSimbolos.get(nombre);
      env = env.anterior;
  }
  return null;
}

  public obtenerTodasLasFunciones(): InsFuncion[]{
    //lista que se retorna
    var listaFuncionesEncontrada: InsFuncion[] = []

    //revisar en las variables almacenadas
    var environmentActual: Entorno | null = this.anterior;

    for (let entry of Array.from(this.tablaSimbolos_metodos_funciones.entries())) {
        if (entry[1].valor instanceof InsFuncion) listaFuncionesEncontrada.push(entry[1].valor);
    }

    return listaFuncionesEncontrada;
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
        if (env.tablaSimbolos_metodos_funciones.has(nombre)) return env.tablaSimbolos_metodos_funciones.get(nombre);
        env = env.anterior;
    }
    return null;
  }*/
  
}
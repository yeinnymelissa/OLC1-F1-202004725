import { Simbolo } from "./simbolo";
import { Tipo } from "./tipo";

export class Entorno {
  
  private tablaSimbolos: Map<string, Simbolo>; //unicamente para variables, tienes q guardar funciones en otro map 
  private tablaSimbolos_metodos: Map<string, any>; //unicamente para metodos o funciones


  constructor(public anterior: Entorno | null) {
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

  public guardar_variable(nombre: string, valor: any, tipo: Tipo): boolean {
    
    if(!this.buscar_variable(nombre)){
      this.tablaSimbolos.set(nombre, new Simbolo(valor, nombre, tipo,true));
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
        if (entry[0] == nombre) return entry[1].type;
    }
    return Tipo.error
  }
  public actualizar_variable(nombre: string, new_valor: any) {
    for (let entry of Array.from(this.tablaSimbolos.entries())) {
      if (entry[0] == nombre) {
          if(entry[1].value.editable == true){
            entry[1].value = new_valor;
          }else{
            //error semantico
          }
      }
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

  /*public get_metodo(nombre: string): metodo | undefined | null {
    let env: Entorno | null = this;
    while (env != null) {
        if (env.tablaSimbolos_metodos.has(nombre)) return env.tablaSimbolos_metodos.get(nombre);
        env = env.anterior;
    }
    return null;
  }*/
  
}
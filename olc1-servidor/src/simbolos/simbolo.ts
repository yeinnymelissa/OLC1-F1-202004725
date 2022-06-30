import { Tipo } from "./tipo";

export class Simbolo {
  constructor(
    public valor: any, 
    public id: string, 
    public tipo: Tipo, 
    public editable: boolean,
    public numeroEnv: number,
    public ambito: string,
    public line: number,
    public column: number
    ){}
}
import { Tipo } from "./tipo";

export class Simbolo {
  constructor(
    public value: any, 
    public id: string, 
    public type: Tipo, 
    public editable: boolean) 
    {}
}
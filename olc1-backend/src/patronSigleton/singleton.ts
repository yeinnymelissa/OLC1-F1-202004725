export class Singleton {

    private static instance: Singleton

    private consola: string = ""
    private errores: any[] = []

    
    constructor() {
    }


    public static getInstance() :Singleton
    {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }


    public add_consola(data: string) {
        this.consola += data
    }
    public get_consola(): string {
        return this.consola
    }


    public add_errores(data: any) {
        this.errores.push(data)
    }
    public get_errores():any[] {
        return this.errores
    }



}
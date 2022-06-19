const parser = require('../src/gramatica/gramatica');
const {Singleton} = require('../src/patronSigleton/singleton');
const {Entorno} = require('../src/simbolos/entorno');
const {Metodo} = require('../src/instrucciones/metodo');

class Principal {
    inicio(req, res) {
        // el res.send es como el return de una funcion, es lo que se le manda al front 
        const data = req.body.datos;
        let single = Singleton.getInstance()
        single.set_consola("")
        try {
            const ast = parser.parse(data.toString());
            const env_padre = new Entorno(null);
            for (const elemento  of ast) {
                try {
                    
                    //preguntar si ese elemtno es de clase metodo o funciones
                    if(elemento instanceof Metodo){
                        elemento.run(env_padre)
                    }
                } catch (error) {
                    //console.log(error);
                    single.add_errores(error)
                    
                }
            }

            for (const elemento  of ast) {
                try {
                    //todas las intrucciones pero qu eno sean de clase metodo
                    if(!(elemento instanceof Metodo)){
                        elemento.run(env_padre)
                    }
                } catch (error) {
                    //console.log(error);
                    single.add_errores(error)
                    
                }
            }
            console.log(ast)
            res.send(single.get_consola());
        } catch (err) {
            res.send({
                err: true,
                mensaje: `Error en la línea ${err.hash.line}`,
            });
        }
    }

    errores(req, res) {
        
    }
}

const principal = new Principal();

module.exports = { principal };
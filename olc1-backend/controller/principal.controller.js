const parser = require('../src/gramatica/gramatica');
const {Singleton} = require('../src/patronSigleton/singleton')
class Principal {
    inicio(req, res) {
        // el res.send es como el return de una funcion, es lo que se le manda al front 
        const data = req.body.datos;
        try {
            const parseado = parser.parse(data.toString());
            console.log("hola")
            console.log(parseado)
            res.send(parseado);
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
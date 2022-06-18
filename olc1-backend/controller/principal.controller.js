const parser = require('../gramatica/gramatica')
class Principal{

    inicio(req, res){
        const data = req.body.datos;
        parser.parse(data.toString());
        res.send(data)
    }
}

const principal = new Principal()

module.exports = { principal }
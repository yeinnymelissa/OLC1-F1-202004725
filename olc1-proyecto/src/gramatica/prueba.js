var fs = require('fs');
var parser = require('./gramatica')

fs.readFile('./entrada.lf', (err, data) =>{
    if (err) throw err;
    parser.parse(data.toString());
});

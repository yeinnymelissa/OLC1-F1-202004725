var fs = require('fs');
var parser = require('./gramatica')

fs.readFile('./archivo.LF', (err, data) =>{
    if (err) throw err;
    parser.parse(data.toString());
});

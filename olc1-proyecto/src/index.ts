const parser = require('./gramatica/gramatica');
const fs = require("fs");

try {

    const entrada = fs.readFileSync("src/entrada.lf")
    parser.parse(entrada.toString());
} catch (error) {
    console.log(error);
}


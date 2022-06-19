const parser = require('../src/gramatica/gramatica');
const {Singleton} = require('../src/patronSigleton/singleton');
const {Entorno} = require('../src/simbolos/entorno');
const {Metodo} = require('../src/instrucciones/metodo');
const fs = require("fs");

class Principal {
    inicio(req, res) {
        // el res.send es como el return de una funcion, es lo que se le manda al front 
        const data = req.body.datos;
        let single = Singleton.getInstance()
        single.set_consola("")
        
        try {
            const ast = parser.parse(data.toString());
            const env_padre = new Entorno(null);
            try {
                
                let inicio = "<HTML>\n";
                inicio += "<HEAD>\n";
                inicio += "<title>Reporte de Errores</title>\n";
                inicio += "<meta charset=\"utf-8\">\n";
                inicio += "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n";
                inicio += "<link href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css\" rel=\"stylesheet\" integrity=\"sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3\" crossorigin=\"anonymous\">\n";
                inicio += "</HEAD>\n";
                inicio += "<BODY style=\"background-color: #87cefa;\">\n";
                inicio += "<div class=\"container\">\n";
                inicio += "<br>\n";
                inicio += "<div class=\"row\">\n";
                inicio += "<div class=\"col\"></div>\n";
                inicio += "<div class=\"col bg-light\"><H1 align=\"center\"><b>Reporte de Errores</b></H1> </div>\n";
                inicio += "<div class=\"col\"></div>\n";
                inicio += "</div>\n";

                let html = "<div class=\"row\">\n";
                html += "<div class=\"col-2\"></div>\n";
                html += "<div class=\"col-8\"><H6><b>Tabla de Errores</b></H6>\n";
                html += "<br>\n";
                html += "<TABLE class=\"table table-bordered\">\n";
                html += "<TR class=\"table-primary\"><TD align=\"center\"><b> No. </b></TD><TD align=\"center\"><b> Tipo de error </b></TD><TD align=\"center\"><b> Descripcion </b></TD><TD align=\"center\"><b> Fila </b></TD><TD align=\"center\"><b> Columna </b></TD></TR>\n";       
                
                let contador = 1;
                if(parser.errores.length > 0){
                    parser.errores.forEach(element => {
                        html += "<TR>\n";
                        html += "<TD class=\"table-info\" align=\"center\">"+contador+"</TD>\n";
                        html += "<TD class=\"table-info\" align=\"center\">"+element.tipo+"</TD>\n";
                        html += "<TD class=\"table-info\" align=\"center\">"+element.err+".</TD>\n";
                        html += "<TD class=\"table-info\" align=\"center\">"+element.line+"</TD>\n";
                        html += "<TD class=\"table-info\" align=\"center\">"+element.column+"</TD>\n";
                        html += "</TR>\n";
                        contador++;
                    });
                }
                html += "</TABLE></div>";
                html += "<div class=\"col-2\"></div>";
                html += "</div>";

                let pie = "<H6> Estudiante: Yeinny Melissa Catalan de León </H6>\n";
                pie += "</div>\n";
                pie +="<script src=\"js/bootstrap.bundle.min\"></script>\n";
                pie +="</BODY>\n";
                pie +="</HTML>\n";
                let prueba = inicio + html + pie
                let promesa = new Promise((resolve, reject)=>{
                    fs.writeFile('../olc1-proyecto/src/components/reporteErrores.html', prueba, (error) =>{
                        if(error){
                            reject(error);
                        }else{
                            resolve();
                        }
                    })
                })

                promesa.then(()=>{
                    console.log("Archivo creado con éxito")
                }).catch((error)=>{
                    console.log('Ha ocurrido un error: ', error)
                })
            } catch (error) {
                console.log(error);
                
            }
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
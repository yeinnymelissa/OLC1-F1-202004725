import * as React from 'react';
import FileSaver from "file-saver";
import axios from 'axios';
import { Graphviz } from 'graphviz-react';
import { useState } from 'react';

function Editor(){

    let contador = 0;
    const [astGraph, setAstGraph] = useState("digraph {a -> b; c; d -> c; a -> d;}");

    function leerArchivo(e) {

        const li_ = document.querySelectorAll('.li');

        li_.forEach((cadaLi, i)=>{
            if(li_[i].classList.contains("active")){
                const text = document.querySelector('#code'+i)
                var archivo = e.target.files[0];
                var tmppath = URL.createObjectURL(e.target.files[0]);
                console.log(tmppath)
                if (!archivo) {
                return;
                }
                var lector = new FileReader();
                lector.onload = function(e) {
                var contenido = e.target.result;
                text.value = contenido;
                };
                lector.readAsText(archivo);
            }
        })
    }
      

    function newTab(){

    
        const li_ = document.querySelectorAll('.li');
        const bloque = document.querySelectorAll('.bloque');
    
        li_.forEach((cadaLi, i)=>{
            li_[i].classList.remove('active');
            bloque[i].classList.remove('show');
            bloque[i].classList.remove('active');
        })
    
        contador++;
        const tabs = document.querySelector("#tabs");
        const li = document.createElement("li");
        li.classList.add("nav-item");
    
        var roleP = document.createAttribute("role");
        roleP.value = "presentation";
        li.setAttributeNode(roleP);
    
        const button = document.createElement("button");
    
        button.className = "li nav-link";
    
        button.id = "ventana"+contador+"-tab";
    
        var data_bs_toggle = document.createAttribute("data-bs-toggle");
        data_bs_toggle.value = "tab";
        button.setAttributeNode(data_bs_toggle);
    
        var data_bs_target = document.createAttribute("data-bs-target");
        data_bs_target.value = "#ventana"+contador;
        button.setAttributeNode(data_bs_target);
    
        var aria_controls = document.createAttribute("aria-controls");
        aria_controls.value = "ventana"+contador;
        button.setAttributeNode(aria_controls);
    
        button.type = "button";
    
    
        button.innerHTML = 'LFScript '+ contador;
    
        li.appendChild(button);
    
        tabs.appendChild(li);
    
        const tabsContent = document.querySelector("#myTabContent");
    
        const div = document.createElement("div");
    
        div.className = "bloque tab-pane fade";
        
        div.id = "ventana"+contador;
    
        var role = document.createAttribute("role");
        role.value = "tabpanel";
        div.setAttributeNode(role);    
    
        var aria_labelledby = document.createAttribute("aria-labelledby");
        aria_labelledby.value = "ventana"+contador+"-tab";
        div.setAttributeNode(aria_labelledby);   
        
        const text_ventana = document.createElement("textarea");
    
        text_ventana.id = "code"+contador;
    
        text_ventana.name = "code"+contador;

        text_ventana.className = "text";
    
        var columna = document.createAttribute("cols");
        columna.value = "30";
        text_ventana.setAttributeNode(columna);   
    
        var fila = document.createAttribute("rows");
        fila.value = "16";
        text_ventana.setAttributeNode(fila);   
        
        
        div.appendChild(text_ventana);
      
        tabsContent.appendChild(div)
    
        var ob = document.querySelector('#ventana'+contador+'-tab');
        ob.classList.add("active");
    
        var ob2 = document.querySelector('#ventana'+contador);
        ob2.classList.add("show");
        ob2.classList.add("active");
        
    
    }

    function guardarComo(){
        const li_ = document.querySelectorAll('.li');

        li_.forEach((cadaLi, i)=>{
            if(li_[i].classList.contains("active")){
                const text = document.querySelector('#code'+i)
                let blob = new Blob([text.value], {
                    type: "text/plain;charset=utf-8"
                });
                FileSaver.saveAs(blob, "archivoLFScript.LF");
            }
        })
        
    }

    function run(){
        const li_ = document.querySelectorAll('.li');

        li_.forEach((cadaLi, i)=>{
            if(li_[i].classList.contains("active")){
                const text = document.querySelector('#code'+i)
                const body = {datos: text.value}
                const consola = document.querySelector('#console');

                axios
                    .post('http://localhost:8000/run', body)

                    .then(({ data }) => {
                        consola.innerHTML = '';
                        if (data.err) {
                            return;
                        }

                        consola.innerHTML = data;
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        })
    }

    function reporteErrores(){
        const errores = document.querySelector('#body-err');
        axios
            .post('http://localhost:8000/errores')
            .then(({ data }) => {
                //si sale bien ejecuta esto
                errores.innerHTML = '';
                if (data.err) {
                    return;
                }

                errores.innerHTML = data;
            })
            .catch((err) => {
                //si sale mal ejecuta esto
                console.log(err);
            });
    }

    function graficaTS(){
        axios
            .post('http://localhost:8000/grafica')
            .then(({ data }) => {
                //si sale bien ejecuta esto
                if (data.err) {
                    return;
                }
                setAstGraph(data)
            })
            .catch((err) => {
                //si sale mal ejecuta esto
                console.log(err);
            });
    }

    function reporteTablaSimbolos(){
        const botonesCarrusel = document.querySelector('#botonesCarrusel');
        const contenidoCarrusel = document.querySelector('#contenidoCarrusel');
        axios
            .post('http://localhost:8000/tablaSimbolos')
            .then(({ data }) => {
                //si sale bien ejecuta esto
                /*<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <div className="carousel-item active">
                    <p className="d-block w-100">
                    Hola</p>
                </div>*/ 
                var botones = "";
                var carrusel = "";
                for (var i = 0; i < data.length; i++) {
                    if(i === 0){
                        botones += "<button type=\"button\" data-bs-target=\"#carouselExampleIndicators\" data-bs-slide-to=\""+i+"\" class=\"active\" aria-current=\"true\" aria-label=\"Slide"+i+ "\"></button>\n"
                        carrusel += "<div class=\"carousel-item active\">\n <div class=\"d-block w-100\">\n " +data[i]+"\n</div> \n</div>\n"
                    }else{
                        botones += "<button type=\"button\" data-bs-target=\"#carouselExampleIndicators\" data-bs-slide-to=\""+i+"\" aria-label=\"Slide"+i+ "\"></button>\n"
                        carrusel += "<div class=\"carousel-item\">\n <div class=\"d-block w-100\">\n " +data[i]+"\n</div> \n</div>\n"
                    }
                }
                if (data.err) {
                    return;
                }

                botonesCarrusel.innerHTML = botones;
                contenidoCarrusel.innerHTML = carrusel;
            })
            .catch((err) => {
                //si sale mal ejecuta esto
                console.log(err);
            });
    }
    
    return (
        <div className='todo'>
            <div className="botones">
                <input type="file" accept='.LF' id="abrir" className="btn btn-primary izq" onChange={leerArchivo}/>
                <div className="dropdown izq">
                    <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                        Guardar
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                        <li><button className="dropdown-item" type="button">Guardar</button></li>
                        <li><button className="dropdown-item" type="button" onClick={guardarComo}>Guardar como...</button></li>
                    </ul>
                </div>
                <div className="dropdown izq">
                    <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                        Reportes
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                        <li><button className="dropdown-item" type="button" data-bs-toggle="modal" data-bs-target="#reporteAST" onClick={graficaTS}>Reporte AST</button></li>
                        <li><button className="dropdown-item" type="button" data-bs-toggle="modal" data-bs-target="#reporteErrores" onClick={reporteErrores}>Reporte de errores</button></li>
                        <li><button className="dropdown-item" type="button" data-bs-toggle="modal" data-bs-target="#reporteTS" onClick={reporteTablaSimbolos}>Reporte TS</button></li>
                    </ul>
                </div>       
                <button type="button" className="btn btn-primary izq" onClick={run}>Run</button>         
            </div>
            <div className="modal fade" id="reporteAST" tabIndex="-1" aria-labelledby="reporteASTLabel" aria-hidden="true">
                <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="reporteASTLabel">Reporte AST</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body" id='body-ast'>
                        <Graphviz dot={astGraph} />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Cerrar</button>
                    </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="reporteErrores" tabIndex="-1" aria-labelledby="reporteErroresLabel" aria-hidden="true">
                <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="reporteErroresLabel">Reporte de Errores</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body" id='body-err'>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Cerrar</button>
                    </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="reporteTS" tabIndex="-1" aria-labelledby="reporteTSLabel" aria-hidden="true">
                <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="reporteTSLabel">Reportes TS</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body color-ts" id='body-ts'>
                    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-indicators" id='botonesCarrusel'>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div className="carousel-inner" id='contenidoCarrusel'>
                            <div className="carousel-item active">
                                <p className="d-block w-100">
                                Hola</p>
                            </div>
                            <div className="carousel-item">
                                <p className="d-block w-100">
                                Hola</p>
                            </div>
                            <div className="carousel-item">
                            <p className="d-block w-100">
                                Hola</p>
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Cerrar</button>
                    </div>
                    </div>
                </div>
            </div>
            <div className="editCom">
                <div className="editorE">
                    <ul className="nav nav-tabs prueba" id="myTab" role="tablist">
                        <div id="tabs" className="nav nav-tabs">
                            <li className="nav-item" role="presentation">
                                <button className="li nav-link active" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">LFScript</button>
                            </li>
                        </div>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="new-tab" type="button" role="new-tab" onClick={newTab}>+</button>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="bloque tab-pane fade show active" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                            <textarea className="text" name="prueba" id="code0"></textarea>
                        </div>
                    </div>        
                </div>
                <div id="consola" className="consola">
                    <textarea id='console' name="textarea" readOnly>
                    </textarea>
                </div>            
            </div>
        </div>
    );
}

export default Editor
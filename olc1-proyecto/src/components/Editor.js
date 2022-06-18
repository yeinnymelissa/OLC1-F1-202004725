import * as React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import FileSaver from "file-saver";
import { useState } from 'react';
import Tab from './Tab';

function Editor(){

    let contador = 0;

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
                FileSaver.saveAs(blob, "archivoLFScript.lf");
            }
        })
        
    }

    function run(){
        const li_ = document.querySelectorAll('.li');

        li_.forEach((cadaLi, i)=>{
            if(li_[i].classList.contains("active")){
                const text = document.querySelector('#code'+i)
                const body = {datos: text.value}
                fetch('http://localhost:4000/run', {
                    mode: 'no-cors',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }, method: "POST", 
                    body
                }).then(res => res.json()).then(res => console.log(res)).catch(error => console.log(error))
            }
        })
    }
    
    return (
        <div className='todo'>
            <div className="botones">
                <input type="file" accept='.lf' id="abrir" className="btn btn-primary izq" onChange={leerArchivo}/>
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
                        <li><button className="dropdown-item" type="button">Reporte AST</button></li>
                        <li><button className="dropdown-item" type="button">Reporte de errores</button></li>
                        <li><button className="dropdown-item" type="button">Reporte TS</button></li>
                    </ul>
                </div>       
                <button type="button" className="btn btn-primary izq" onClick={run}>Run</button>         
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
                            <textarea className="text" name="prueba" id="code0" cols="30" rows="16"></textarea>
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
import * as React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import FileSaver from "file-saver";
import { useState } from 'react';
import Tab from './Tab';

function Editor(){
    
    const [valueCode, setvalueCode] = useState("");

    function leerArchivo(e) {

        const li_ = document.querySelectorAll('.li');
        const editor = document.querySelectorAll('.editor-codigo');

        li_.forEach((cadaLi, i)=>{
            if(li_[i].classList.contains("active")){
                var archivo = e.target.files[0];
                var tmppath = URL.createObjectURL(e.target.files[0]);
                console.log(tmppath)
                if (!archivo) {
                return;
                }
                var lector = new FileReader();
                lector.onload = function(e) {
                var contenido = e.target.result;
                setvalueCode(contenido);
                };
                lector.readAsText(archivo);
            }
        })
    }
      
      function mostrarContenido(contenido) {
        setvalueCode(contenido);
      }

    const [tabList, setTabList] = useState([{ tab:""}]);
    const [tabContentList, setTabContentList] = useState([{ tabContent:""}]);

    const handleTabAdd = () => {
        const li_ = document.querySelectorAll('.li');
        const bloque = document.querySelectorAll('.bloque');
        const editor = document.querySelectorAll('.editor-codigo');
        li_.forEach((cadaLi, i)=>{
            console.log(li_[i])
            li_[i].classList.remove('active');
            bloque[i].classList.remove('show');
            bloque[i].classList.remove('active');
        })
    
        setTabList([...tabList, { tab:"" }]);
        setTabContentList([...tabContentList, { tabContent:"" }]);

        console.log(li_)

        li_.forEach((cadaLi, i)=>{
            li_[i].id = "lps"+i+"-tab";
            var data_bs_target = document.createAttribute("data-bs-target");
            data_bs_target.value = "#lps"+i;
            li_[i].setAttributeNode(data_bs_target);
            var aria_controls = document.createAttribute("aria-controls");
            aria_controls.value = "lps"+i;
            li_[i].setAttributeNode(aria_controls);
            bloque[i].id="lps"+i;
            var aria_labelledby = document.createAttribute("aria-labelledby");
            aria_labelledby.value = "lps"+i+"-tab";
            bloque[i].setAttributeNode(aria_labelledby);
            editor[i].id= "editor-codigo"+i;
        });
        
    };

    function guardarComo(){
        var blob = new Blob([valueCode], {
            type: "text/plain;charset=utf-8"
        });
        FileSaver.saveAs(blob, "archivoLFScript.lf");
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
            </div>
            <div className="editCom">
                <div className="editorE">
                    <ul className="nav nav-tabs prueba" id="myTab" role="tablist">
                        <div id="tabs" className="nav nav-tabs">
                            {tabList.map((singleTab, index) => (
                                <Tab key={index} id="lps-tab" data_target="#lps" ariaControls="lps" />
                            ))}
                        </div>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="new-tab" type="button" role="new-tab" onClick={handleTabAdd}>+</button>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        {tabContentList.map((singleTabContent, index) => (
                            <div key={index} className="bloque tab-pane fade show active" id="lps" role="tabpanel" codevalue="" aria-labelledby="lps-tab">
                                <CodeMirror
                                    value={valueCode}
                                    options={{
                                        mode: 'jsx',
                                    }}
                                    height="395px"
                                    onChange={(value, viewUpdate) => {
                                        console.log('value:', value);
                                    }}
                                    autoFocus="true"
                                    id='lps-code'
                                    className='editor-codigo'
                                />
                            </div>
                        ))}
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
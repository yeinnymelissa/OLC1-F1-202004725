var contador = 0; 

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

    var columna = document.createAttribute("cols");
    columna.value = "30";
    text_ventana.setAttributeNode(columna);   

    var fila = document.createAttribute("rows");
    fila.value = "10";
    text_ventana.setAttributeNode(fila);   
    
    
    div.appendChild(text_ventana);
  
    tabsContent.appendChild(div)

    var ob = document.querySelector('#ventana'+contador+'-tab');
    ob.classList.add("active");

    var ob2 = document.querySelector('#ventana'+contador);
    ob2.classList.add("show");
    ob2.classList.add("active");
    

    const myTextarea = document.querySelector('#code'+contador);

    let editor_ventana = CodeMirror.fromTextArea(myTextarea, {
        lineNumbers: true
    });  
    

}

const myTextarea = document.querySelector('#prueba');

// Instanciamos el editor de código con la librería de CodeMirror
// código traído de la CDN.
let editor = CodeMirror.fromTextArea(myTextarea, {
    lineNumbers: true
  
});

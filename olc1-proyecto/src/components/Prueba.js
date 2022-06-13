
function Prueba(){
    const myTextarea = document.querySelector('#prueba');

    // Instanciamos el editor de código con la librería de CodeMirror
    // código traído de la CDN.
    let editor = CodeMirror.fromTextArea(myTextarea, {
        lineNumbers: true
    
    });
    return(
        <textarea name="prueba" id="prueba" cols="30" rows="10"></textarea>
    );
}

export default Prueba
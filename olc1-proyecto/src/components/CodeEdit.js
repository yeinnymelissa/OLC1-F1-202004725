import CodeMirror from '@uiw/react-codemirror';
function CodeEdit(){
    return (
        <CodeMirror
            value=""
            options={{
                keyMap: 'sublime',
                mode: 'jsx',
            }}
        />
    );
}
export default CodeEdit
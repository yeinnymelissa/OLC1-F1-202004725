import MainRouter from './router/MainRouter';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Superior from './components/Superior';
import Botones from './components/Botones';
import Editor from './components/Editor';

function App() {
  return <BrowserRouter>
    <Superior />
    <Botones />
    <Editor />
  </BrowserRouter>
}

export default App;

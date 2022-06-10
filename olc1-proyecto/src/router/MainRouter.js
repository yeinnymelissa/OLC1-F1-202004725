import { Routes, Route } from 'react-router-dom';
import Superior from "../components/Superior";

function MainRouter(){
    return( 
        <Routes>
            <Route path="/" element={<Superior />}/>
        </Routes>
    );
}

export default MainRouter;
import { useContext } from 'react';
import { QuizContext } from './context/QuizContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Edit from './pages/Edit';
import Add from './pages/Add';
const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/add' element={<Add />} />
                    <Route path='/edit' element={<Edit />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;

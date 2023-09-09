import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Edit from './pages/Edit';
import Add from './pages/Add';
import Slideshow from './pages/Slideshow';
import { QuizProvider } from './context/QuizContext';
const App: React.FC = () => {
    return (
        <QuizProvider>
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/add' element={<Add />} />
                        <Route path='/quizzes/:id' element={<Edit />} />
                        <Route
                            path='/slideshow/quizzes/:id'
                            element={<Slideshow />}
                        />
                    </Routes>
                </BrowserRouter>
            </div>
        </QuizProvider>
    );
};

export default App;

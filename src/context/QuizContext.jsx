import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
export const QuizContext = createContext();
export const QuizProvider = ({ children }) => {
    const [quizzes, setQuizzes] = useState([]);

    return (
        <QuizContext.Provider value={{ quizzes, setQuizzes }}>
            {children}
        </QuizContext.Provider>
    );
};

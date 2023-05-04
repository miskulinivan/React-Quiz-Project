import { createContext, useState } from 'react';
export const QuizContext = createContext();
export const QuizProvider = ({ children }) => {
    const [test, setTest] = useState('jabuka');
    return (
        <QuizContext.Provider value={{ test }}>{children}</QuizContext.Provider>
    );
};

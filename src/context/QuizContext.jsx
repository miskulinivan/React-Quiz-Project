import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuizzes } from '../hooks/useQuizzes';
import Swal from 'sweetalert2';
export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
    const { allQuizzes } = useQuizzes();
    const [quizzes, setQuizzes] = useState([]);
    const [reusableQuestions, setReusableQuestions] = useState([]);

    useEffect(() => {
        // Once quizzes has loaded, extract all questions into reusableQuestions
        const allQuestions = quizzes.reduce(
            (acc, quiz) => [...acc, ...quiz.questions],
            []
        );
        // Use map to assign new IDs to each question
        const newQuestions = allQuestions.map((question, index) => ({
            ...question,
            id: index + 1,
        }));
        setReusableQuestions(newQuestions);
    }, [quizzes]);

    useEffect(() => {
        setQuizzes(allQuizzes);
    }, [allQuizzes]);
    return (
        <QuizContext.Provider
            value={{
                quizzes,
                setQuizzes,
                reusableQuestions,
                setReusableQuestions,
                Swal,
            }}
        >
            {children}
        </QuizContext.Provider>
    );
};

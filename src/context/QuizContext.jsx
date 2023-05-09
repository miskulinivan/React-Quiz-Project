import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetQuizzes } from '../hooks/useGetQuizzes';
import Swal from 'sweetalert2';
export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
    const { allQuizzes } = useGetQuizzes();
    const [quizzes, setQuizzes] = useState([]);
    const [reusableQuestions, setReusableQuestions] = useState([]);

    useEffect(() => {
        const allQuestions = quizzes.reduce(
            (acc, quiz) => [...acc, ...quiz.questions],
            []
        );

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

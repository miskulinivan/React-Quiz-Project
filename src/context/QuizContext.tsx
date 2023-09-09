import { createContext, useState, ReactNode, useEffect, Dispatch, SetStateAction } from 'react';

import { IQuestion, IQuiz } from '../types/types';

interface QuizContextProps {
    reusableQuestions: IQuestion[];
    setReusableQuestions: (questions: IQuestion[]) => void;
    allQuizzes: IQuiz[];
    setAllQuizzes: Dispatch<SetStateAction<IQuiz[]>>;
}

export const QuizContext = createContext<QuizContextProps>({} as QuizContextProps);

interface QuizProviderProps {
    children: ReactNode;
}

export const QuizProvider = ({ children }: QuizProviderProps) => {
    const [reusableQuestions, setReusableQuestions] = useState<IQuestion[]>([]);
    const [allQuizzes, setAllQuizzes] = useState<IQuiz[]>([]);

    useEffect(() => {
        const allQuestions = allQuizzes.reduce(
            (acc: IQuestion[], quiz) => [...acc, ...quiz.questions],
            []
        );

        const newQuestions = allQuestions.map((question: IQuestion, index: number) => ({
            ...question,
            id: index + 1,
        }));
        setReusableQuestions(newQuestions);
    }, [allQuizzes]);

    return (
        <QuizContext.Provider
            value={{
                reusableQuestions,
                setReusableQuestions,
                setAllQuizzes,
                allQuizzes,
            }}
        >
            {children}
        </QuizContext.Provider>
    );
};

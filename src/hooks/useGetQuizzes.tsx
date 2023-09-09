import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { IQuiz } from '../types/types';
import { QuizContext } from '../context/QuizContext';

export const useGetQuizzes = (
    id: number | null = null
): {
    quiz: IQuiz | null;
    error: any;
    allQuizzes: IQuiz[];
    isLoading: boolean;
} => {
    const [error, setError] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [quiz, setQuiz] = useState<IQuiz | null>(null);

    const { allQuizzes, setAllQuizzes } = useContext(QuizContext);

    useEffect(() => {
        const fetchData = async () => {
            const url = id
                ? `http://localhost:3000/quizzes/${id}`
                : `http://localhost:3000/quizzes`;

            try {
                setIsLoading(true);

                const response = await axios.get(url);
                const data = response.data;

                if (id) {
                    setQuiz(data);
                } else {
                    setAllQuizzes(data);
                }

                setIsLoading(false);
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
        };

        fetchData();

        console.log('all quizzes', allQuizzes);
    }, [id]);

    return { quiz, error, allQuizzes, isLoading };
};

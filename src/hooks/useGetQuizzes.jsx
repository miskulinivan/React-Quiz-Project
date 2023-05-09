import axios from 'axios';
import { useEffect, useState } from 'react';

export const useGetQuizzes = (id = null) => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [quiz, setQuiz] = useState({});

    const [allQuizzes, setAllQuizzes] = useState([]);
    useEffect(() => {
        const url = id
            ? `http://localhost:3000/quizzes/${id}`
            : `http://localhost:3000/quizzes`;

        setIsLoading(true);

        axios
            .get(url)
            .then((res) => {
                id ? setQuiz(res.data) : setAllQuizzes(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                setError(err);
                setIsLoading(false);
            });
    }, [id, error]);

    return { quiz, error, allQuizzes, isLoading };
};

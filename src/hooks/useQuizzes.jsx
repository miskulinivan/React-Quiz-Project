import axios from 'axios';
import { useEffect, useState } from 'react';

export const useQuizzes = (id = null) => {
    // make the id parameter optional with a default value of null
    const [error, setError] = useState(null);
    const [currentQuiz, setCurrentQuiz] = useState({});
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        const url = id
            ? `http://localhost:3000/quizzes/${id}`
            : `http://localhost:3000/quizzes`;
        // use the id to form the URL only if it's provided, else use a URL without an id

        axios
            .get(url)
            .then((res) => {
                id ? setCurrentQuiz(res.data) : setQuizzes(res.data);
            })
            .catch((err) => setError(err));
    }, [quizzes]); // make the id parameter part of the dependency array

    return { currentQuiz, error, quizzes };
};

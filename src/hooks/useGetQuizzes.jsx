import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { QuizContext } from '../context/QuizContext';

export const useGetQuizzes = (id = null) => {
    // make the id parameter optional with a default value of null
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [quiz, setQuiz] = useState({});
    /*  const { setQuizzes } = useContext(QuizContext);
     */
    const [allQuizzes, setAllQuizzes] = useState([]);
    useEffect(() => {
        const url = id
            ? `http://localhost:3000/quizzes/${id}`
            : `http://localhost:3000/quizzes`;
        // use the id to form the URL only if it's provided, else use a URL without an id

        setIsLoading(true); // set isLoading to true before making the request

        axios
            .get(url)
            .then((res) => {
                id ? setQuiz(res.data) : setAllQuizzes(res.data);
                setIsLoading(false); // set isLoading to false after the data has been set
            })
            .catch((err) => {
                setError(err);
                setIsLoading(false); // set isLoading to false in case of an error
            });
    }, [id, error]); // make the id parameter part of the dependency array

    return { quiz, error, allQuizzes, isLoading };
};

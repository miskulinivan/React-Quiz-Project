import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { QuizContext } from '../context/QuizContext';
import Quizzes from '../components/Quizzes';
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const navigate = useNavigate();
    const { quizzes, setQuizzes } = useContext(QuizContext);

    useEffect(() => {
        axios
            .get('http://localhost:3000/quizzes')
            .then((res) => setQuizzes(res.data))
            .catch((err) => console.log(err));
    }, []);

    {
        console.log('quizzes', quizzes);
    }
    return (
        <div className='max-w-screen-lg w-11/12 my-0 mx-auto text-center mt-10'>
            <h2 className='text-5xl font-bold'>Quiz Maker</h2>
            <div className='flex justify-end px-10 py-2 '>
                <button
                    onClick={() => navigate('/add')}
                    className='text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
                >
                    Add Quiz
                </button>
            </div>
            <div>
                <Quizzes />
            </div>
        </div>
    );
};

export default Home;

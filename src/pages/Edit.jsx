import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { QuizContext } from '../context/QuizContext';
import { useQuizzes } from '../hooks/useQuizzes';
const Edit = () => {
    const { id } = useParams();
    const [currentQuiz, setCurrentQuiz] = useState({});
    const navigate = useNavigate();
    const { quiz, error } = useQuizzes(id);

    useEffect(() => {
        setCurrentQuiz(quiz);
    }, [quiz]);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .put(`http://localhost:3000/quizzes/${id}`, currentQuiz)
            .then((res) => {
                console.log(res.data);
                alert('Updated sucessfully');
                navigate('/');
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <div className='mx-auto max-w-md w-11/12'>
                <h1 className='text-2xl font-bold mb-4 p-4'>Add a new quiz</h1>
                <form onSubmit={handleSubmit}>
                    <div className='mb-4 p-4'>
                        <label
                            htmlFor='name'
                            className='block text-gray-700 font-bold mb-2'
                        >
                            Quiz name
                        </label>
                        <input
                            type='text'
                            id='name'
                            value={currentQuiz.name}
                            onChange={(e) =>
                                setCurrentQuiz({
                                    ...currentQuiz,
                                    [e.target.id]: e.target.value,
                                })
                            }
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            /*  required */
                        />
                    </div>
                    {currentQuiz.questions?.map((question, index) => {
                        return (
                            <div
                                key={question.id}
                                className='border-4 rounded-xl border-gray-700  p-4 mb-4 '
                            >
                                <div className='mb-4'>
                                    <label
                                        htmlFor='question'
                                        className='block text-gray-700 font-bold mb-2'
                                    >
                                        Edit {index + 1}. question
                                    </label>
                                    <input
                                        type='text'
                                        id='question'
                                        value={question.question}
                                        onChange={(e) => {
                                            const updatedQuestions = [
                                                ...currentQuiz.questions,
                                            ];
                                            updatedQuestions[index] = {
                                                ...question,
                                                question: e.target.value,
                                            };
                                            setCurrentQuiz({
                                                ...currentQuiz,
                                                questions: updatedQuestions,
                                            });
                                        }}
                                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                        /*  required */
                                    />
                                </div>
                                <div className='mb-4'>
                                    <label
                                        htmlFor='answer'
                                        className='block text-gray-700 font-bold mb-2'
                                    >
                                        Edit {index + 1}. answer
                                    </label>
                                    <input
                                        type='text'
                                        id='answer'
                                        value={question.answer}
                                        onChange={(e) => {
                                            const updatedQuestions = [
                                                ...currentQuiz.questions,
                                            ];
                                            updatedQuestions[index] = {
                                                ...question,
                                                answer: e.target.value,
                                            };
                                            setCurrentQuiz({
                                                ...currentQuiz,
                                                questions: updatedQuestions,
                                            });
                                        }}
                                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                        /*  required */
                                    />
                                </div>
                                {/*  <div className='flex justify-between'>
                                    <button
                                        type='submit'
                                        className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                                    >
                                        Edit
                                    </button>
                                </div> */}
                            </div>
                        );
                    })}
                    <button
                        type='submit'
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                    >
                        Finish editing
                    </button>
                </form>
                <div className='flex justify-center'>
                    <Link
                        className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline
'
                        to='/'
                    >
                        Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Edit;

import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Add = () => {
    const [quiz, setQuiz] = useState({
        id: 0,
        name: '',
        questions: [],
        questionText: '',
        answerText: '',
    });
    const [lastId, setLastId] = useState(0);
    const navigate = useNavigate();

    const newQuiz = {
        id: quiz.id,
        name: quiz.name,
        questions: quiz.questions,
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:3000/quizzes', newQuiz)
            .then((res) => {
                alert('Quiz added!');
                setQuiz({
                    id: lastId + 1,
                    name: '',
                    questions: [],
                    questionText: '',
                    answerText: '',
                });
                setLastId(lastId + 1);
                navigate('/');
            })
            .catch((err) => console.log(err));
    };

    const handleAddQuestion = (e) => {
        e.preventDefault();
        const question = {
            id: quiz.questions.length + 1,
            question: quiz.questionText,
            answer: quiz.answerText,
        };
        setQuiz({
            ...quiz,
            questions: [...quiz.questions, question],
            questionText: '',
            answerText: '',
        });
    };

    return (
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
                        value={quiz.name}
                        onChange={(e) =>
                            setQuiz({ ...quiz, name: e.target.value })
                        }
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        /*  required */
                    />
                </div>
                <div className='border-4 rounded-xl border-gray-700 p-4 mb-4 '>
                    <div className='mb-4 '>
                        <label
                            htmlFor='question'
                            className='block text-gray-700 font-bold mb-2'
                        >
                            Add a question
                        </label>
                        <input
                            type='text'
                            id='question'
                            value={quiz.questionText}
                            onChange={(e) =>
                                setQuiz({
                                    ...quiz,
                                    questionText: e.target.value,
                                })
                            }
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            /*  required */
                        />
                    </div>
                    <div className='mb-4'>
                        <label
                            htmlFor='answer'
                            className='block text-gray-700 font-bold mb-2'
                        >
                            Answer
                        </label>
                        <input
                            type='text'
                            id='answer'
                            value={quiz.answerText}
                            onChange={(e) =>
                                setQuiz({ ...quiz, answerText: e.target.value })
                            }
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            /*  required */
                        />
                    </div>
                </div>
                <div className='flex justify-between'>
                    <button
                        type='button'
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                        onClick={handleAddQuestion}
                    >
                        Add question
                    </button>
                    <button
                        type='submit'
                        className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                    >
                        Add quiz
                    </button>
                </div>
            </form>
            <div className='flex justify-center '>
                <Link
                    className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline
'
                    to='/'
                >
                    Home
                </Link>
            </div>
        </div>
    );
};

export default Add;

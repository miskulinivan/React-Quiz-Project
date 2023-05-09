import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { QuizContext } from '../context/QuizContext';

const Add = () => {
    /*  const { quizzes } = useContext(QuizContext); */
    const [error, setError] = useState(false);
    const { reusableQuestions, setReusableQuestions, Swal } =
        useContext(QuizContext);
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
        if (quiz.questions.length < 1 || quiz.questions.answerText < 1) {
            setError(true);
        } else {
            axios
                .post('http://localhost:3000/quizzes', newQuiz)
                .then((res) => {
                    Swal.fire({
                        position: 'top',
                        icon: 'success',
                        title: 'Quiz added!',
                        showConfirmButton: false,
                        timer: 1300,
                    });
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
        }
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
        setReusableQuestions([
            ...reusableQuestions,
            {
                id: reusableQuestions.length + 1,
                question: question.question,
                answer: question.answer,
            },
        ]);
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
                    <div className='mb-4'>
                        <label
                            htmlFor='question'
                            className='block text-gray-700 font-bold mb-2'
                        >
                            Add a question
                        </label>
                        <input
                            type='text'
                            id='question'
                            list='questions'
                            value={quiz.questionText}
                            onChange={(e) => {
                                setQuiz({
                                    ...quiz,
                                    questionText: e.target.value,
                                });
                                setError(false);
                            }}
                            onBlur={(e) => {
                                const selectedQuestion = reusableQuestions.find(
                                    (question) =>
                                        question.question === e.target.value
                                );
                                if (selectedQuestion) {
                                    setQuiz({
                                        ...quiz,
                                        questionText: selectedQuestion.question,
                                        answerText: selectedQuestion.answer,
                                    });
                                }
                            }}
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            /*  required */
                        />
                        <datalist id='questions'>
                            {reusableQuestions.map((question) => (
                                <option
                                    key={question.id}
                                    value={question.question}
                                />
                            ))}
                        </datalist>
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
                <div className='h-[30px]'>
                    {error && (
                        <p className='bg-red text-1xl px-4 py-1 text-red-500'>
                            Fill in the inputs
                        </p>
                    )}
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

import axios from 'axios';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizContext } from '../context/QuizContext';

const Quiz = ({ quiz }) => {
    const { setQuizzes, Swal } = useContext(QuizContext);
    const navigate = useNavigate();

    const handleDeleteQuiz = (e, id) => {
        e.stopPropagation();

        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`http://localhost:3000/quizzes/${id}`)
                    .then((res) => {
                        console.log('Deleted sucessfully');
                        setQuizzes((prevQuiz) =>
                            prevQuiz.filter((quiz) => quiz.id !== id)
                        );
                        Swal.fire(
                            'Deleted!',
                            'Quiz has been deleted.',
                            'success'
                        );
                    })
                    .catch((err) => console.log(err));
            }
        });
    };

    const handleSlideshow = (e, id) => {
        e.stopPropagation();
        navigate(`/slideshow/quizzes/${id}`);
    };
    return (
        <div
            onClick={() => navigate(`/quizzes/${quiz.id}`)}
            className='rounded-lg flex justify-between px-10 py-2 items-center border-b-4 border-indigo-500  hover:cursor-pointer hover:shadow-[0px_20px_20px_10px_#00000024] my-4  sm:flex-col'
        >
            <p className='text-3xl font-bold sm:mb-2'>{quiz.name}</p>
            <div className='flex justify-center items-center'>
                <button
                    onClick={(e) => handleSlideshow(e, quiz.id)}
                    className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                >
                    Slideshow
                </button>
                <button
                    onClick={(e) => handleDeleteQuiz(e, quiz.id)}
                    className='text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default Quiz;

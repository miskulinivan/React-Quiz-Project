import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { useQuizzes } from '../hooks/useQuizzes';
const Slideshow = () => {
    const { id } = useParams();
    const [currentQuiz, setCurrentQuiz] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);

    const { quiz, error } = useQuizzes(id);

    useEffect(() => {
        setCurrentQuiz(quiz);
    }, [quiz]);

    const prevIndex = () => {
        const isFirstSlide = currentIndex === 0;
        setCurrentIndex(
            isFirstSlide ? currentQuiz.questions.length - 1 : currentIndex - 1
        );
        setShowAnswer(false);
    };

    const nextIndex = () => {
        const isLastSlide = currentIndex === currentQuiz.questions.length - 1;
        setCurrentIndex(isLastSlide ? 0 : currentIndex + 1);
        setShowAnswer(false);
    };

    const toggleShowAnswer = () => {
        setShowAnswer(!showAnswer);
    };

    return (
        <div className='max-w-[1400] h-[780px] w-2/3 m-auto py-16 px-4 relative group'>
            <div className='w-full h-full rounded-2xl bg-center bg-cover duration-500'>
                <div className='w-full h-full rounded-2xl bg-center bg-cover duration-500 '>
                    <div className='text-center'>
                        <h1 className='text-6xl mt-5'>{currentQuiz.name}</h1>
                        <div className='flex justify-center'>
                            {currentQuiz.questions && (
                                <div className='mt-5'>
                                    <h2 className='text-2xl mt-5'>
                                        {
                                            currentQuiz.questions[currentIndex]
                                                .question
                                        }
                                    </h2>
                                    {showAnswer && (
                                        <p>
                                            {
                                                currentQuiz.questions[
                                                    currentIndex
                                                ].answer
                                            }
                                        </p>
                                    )}
                                    <button
                                        onClick={toggleShowAnswer}
                                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'
                                    >
                                        Show Answer
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* left arrow */}
            <div
                onClick={() => prevIndex()}
                className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'
            >
                <BsChevronCompactLeft size={30} />
            </div>
            {/* right arrow */}
            <div
                onClick={() => nextIndex()}
                className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'
            >
                <BsChevronCompactRight size={30} />
            </div>
            <Link to='/'>Home</Link>
        </div>
    );
};

export default Slideshow;

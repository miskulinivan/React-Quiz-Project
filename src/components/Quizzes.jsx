import { useContext } from 'react';
import { QuizContext } from '../context/QuizContext';
import Quiz from './Quiz';

const Quizzes = () => {
    const { quizzes } = useContext(QuizContext);
    {
        console.log('quizzes', quizzes);
    }
    return (
        <div>
            {quizzes.map((quiz) => (
                <Quiz key={quiz.id} quiz={quiz} />
            ))}
        </div>
    );
};

export default Quizzes;

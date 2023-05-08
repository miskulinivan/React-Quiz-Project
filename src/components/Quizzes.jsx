import Quiz from './Quiz';
import { useQuizzes } from '../hooks/useQuizzes';
const Quizzes = () => {
    const { quizzes } = useQuizzes();
    return (
        <div>
            {quizzes.map((quiz) => (
                <Quiz key={quiz.id} quiz={quiz} />
            ))}
        </div>
    );
};

export default Quizzes;

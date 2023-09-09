import Quiz from './Quiz';
import { IQuiz } from '../types/types';
import { Dispatch, SetStateAction } from 'react';

interface QuizzesProps {
    allQuizzes: IQuiz[];
    setAllQuizzes: Dispatch<SetStateAction<IQuiz[]>>;
}

const Quizzes = ({ allQuizzes, setAllQuizzes }: QuizzesProps) => {
    return (
        <div>
            {allQuizzes?.map((quiz: IQuiz) => (
                <Quiz key={quiz.id} quiz={quiz} setAllQuizzes={setAllQuizzes} />
            ))}
        </div>
    );
};

export default Quizzes;

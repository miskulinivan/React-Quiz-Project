import Quiz from './Quiz';

const Quizzes = ({ quizzes }) => {
    return (
        <div>
            {quizzes.map((quiz) => (
                <Quiz key={quiz.id} quiz={quiz} />
            ))}
        </div>
    );
};

export default Quizzes;

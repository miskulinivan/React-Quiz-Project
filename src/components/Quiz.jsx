import axios from 'axios';

const Quiz = ({ quiz }) => {
    const handleDeleteQuiz = (id) => {
        axios
            .delete(`http://localhost:3000/quizzes/${id}`)
            .then((res) => {
                console.log('Deleted sucessfully');
            })
            .catch((err) => console.log(err));
    };
    return (
        <div className='flex justify-between px-10 py-2 items-center border-b-4 border-indigo-500'>
            <p className='text-3xl font-bold'>{quiz.name}</p>
            <div className='flex justify-center items-center'>
                <button className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
                    Start
                </button>
                <button
                    onClick={() => handleDeleteQuiz(quiz.id)}
                    className='text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default Quiz;
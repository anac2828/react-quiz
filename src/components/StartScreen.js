import { useQuiz } from '../context/QuizContext'

// Start screen displays when the quiz status is 'ready' once the data is loaded
function StartScreen() {
  const { startQuiz, numQuestions } = useQuiz()

  // Start button will call the dispatch funtion to change the status to active
  return (
    <div className='start'>
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <button className='btn btn-ui' onClick={() => startQuiz()}>
        Let's start
      </button>
    </div>
  )
}

export default StartScreen

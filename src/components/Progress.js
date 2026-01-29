import { useQuiz } from '../context/QuizContext'

function Progress() {
  //   const hasAnswered = answer !== null;
  // hasAnswered ? index + 1 : index
  const {
    index,
    numQuestions,
    totalPoints,
    maxPossiblePoints,
    userSelectedAnswer,
  } = useQuiz()
  return (
    <header className='progress'>
      {/* progress is an HTML element that shows the progress of a task */}
      <progress
        max={numQuestions}
        // if userSelectedAnswer !== null returns false Number function will turn it into a 0 and if True to 1.
        value={index + Number(userSelectedAnswer !== null)}
      ></progress>
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{totalPoints}</strong> / {maxPossiblePoints} points
      </p>
    </header>
  )
}

export default Progress

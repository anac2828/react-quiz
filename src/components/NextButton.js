import { useQuiz } from '../context/QuizContext'

function NextButton() {
  const {
    userSelectedAnswer,
    index,
    numQuestions,
    displayNextQuestion,
    quizFinished,
  } = useQuiz()
  // The button will not render when no questions have been answered
  if (userSelectedAnswer === null) return null

  // Display NEXT BUTTON if it is not the last question
  if (index < numQuestions - 1)
    return (
      <div>
        <button className='btn btn-ui' onClick={() => displayNextQuestion()}>
          Next
        </button>
      </div>
    )

  // FINISHED BUTTON on the last question
  if (index === numQuestions - 1)
    return (
      <div>
        <button className='btn btn-ui' onClick={() => quizFinished()}>
          Finished
        </button>
      </div>
    )

  // // RESTART BUTTON
  // if (status === 'finished')
  //   return (
  //     <div>
  //       <button className='btn' onClick={() => restartQuiz()}>
  //         Restart Quiz
  //       </button>
  //     </div>
  //   );
}

export default NextButton

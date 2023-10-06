import { useQuiz } from '../context/QuizContext';

function NextButton() {
  const {
    answer,
    index,
    numQuestions,
    status,
    displayNextQuestion,
    quizFinished,
    restartQuiz,
  } = useQuiz();
  // The button will not render when no questions have been answered
  if (answer === null) return null;

  // NEXT BUTTON
  if (index < numQuestions - 1)
    return (
      <div>
        <button className='btn btn-ui' onClick={() => displayNextQuestion()}>
          Next
        </button>
      </div>
    );

  // FINISHED BUTTON
  if (index === numQuestions - 1)
    return (
      <div>
        <button className='btn btn-ui' onClick={() => quizFinished()}>
          Finished
        </button>
      </div>
    );

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

export default NextButton;

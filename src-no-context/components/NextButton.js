function NextButton({ dispatch, answer, index, numQuestions, status }) {
  // The button will not render when no questions have been answered
  if (answer === null) return null;

  // NEXT BUTTON
  if (index < numQuestions - 1)
    return (
      <div>
        <button
          className='btn btn-ui'
          onClick={() => dispatch({ type: 'nextQuestion' })}>
          Next
        </button>
      </div>
    );

  // FINISHED BUTTON
  if (index === numQuestions - 1)
    return (
      <div>
        <button
          className='btn btn-ui'
          onClick={() => dispatch({ type: 'finished' })}>
          Finished
        </button>
      </div>
    );

  // RESTART BUTTON
  if (status === 'finished')
    return (
      <div>
        <button className='btn' onClick={() => dispatch({ type: 'restart' })}>
          Restart Quiz
        </button>
      </div>
    );
}

export default NextButton;

function NextButton({ dispatch, answer, index, numQuestions }) {
  // The button will not render when no questions have been answered
  if (answer === null) return null;
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
}

export default NextButton;

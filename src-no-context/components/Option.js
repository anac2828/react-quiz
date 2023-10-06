// Will be render in the Questions component
function Option({ question, dispatch, answer }) {
  // when the button is clicked the answer will not be nulled and the button will be disabled and correct styles applyed
  const hasAnswered = answer !== null;
  return (
    <div className='options'>
      {question.options.map((option, index) => (
        <button
          disabled={hasAnswered}
          key={option}
          // First ternary applies the answer class when the button is clicked. Second applies the classes if the answer is correct.
          className={`btn btn-option ${index === answer ? 'answer' : ''} ${
            hasAnswered
              ? index === question.correctOption
                ? 'correct'
                : 'wrong'
              : ''
          }`}
          onClick={() => dispatch({ type: 'newAnswer', payload: index })}>
          {option}
        </button>
      ))}
    </div>
  );
}

export default Option;

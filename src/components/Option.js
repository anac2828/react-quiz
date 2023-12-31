import { useQuiz } from '../context/QuizContext';

// Will be render in the Questions component
function Option() {
  const { answer, question, selectedAnswer } = useQuiz();
  // when the button is clicked the answer will not be nulled and the  button will be disabled and correct styles applyed
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
          onClick={() => selectedAnswer(index)}>
          {option}
        </button>
      ))}
    </div>
  );
}

export default Option;

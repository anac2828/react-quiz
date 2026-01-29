import { useQuiz } from '../context/QuizContext'

// Will be render in the Questions component
function Option() {
  // userSelectedAnswer holds the index of the selected answer or null if none selected
  const { userSelectedAnswer, question, selectedAnswer } = useQuiz()
  // Check if an answer has been selected and disabled buttons if so. 'null' means no answer selected
  const hasSelectedAnswer = userSelectedAnswer !== null

  return (
    // Mapping through the options (possible answers) array to create buttons for each option
    <div className='options'>
      {question.options.map((option, index) => (
        <button
          disabled={hasSelectedAnswer}
          key={option}
          // If index matches userSelectedAnswer, we apply the 'answer' which indents the button
          // If hasSelectedAnswer is true, we check if the index (option index) matches the correctOption index to apply correct(green)/wrong(yellow) classes
          className={`btn btn-option ${index === userSelectedAnswer ? 'answer' : ''} ${
            hasSelectedAnswer
              ? index === question.correctOption
                ? 'correct'
                : 'wrong'
              : ''
          }`}
          onClick={() => selectedAnswer(index)}
        >
          {option}
        </button>
      ))}
    </div>
  )
}

export default Option

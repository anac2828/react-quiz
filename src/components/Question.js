import { useQuiz } from '../context/QuizContext'
import Option from './Option'

// Displays the current question and its options (answers) when status is 'active'
function Question() {
  const { question } = useQuiz()

  return (
    <div>
      <h4>{question.question}</h4>
      <Option />
    </div>
  )
}

export default Question

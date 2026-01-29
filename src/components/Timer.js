import { useEffect } from 'react'
import { useQuiz } from '../context/QuizContext'

// Displays the timer during the quiz when status is 'active'
function Timer() {
  const { secondsRemaining, startTimer } = useQuiz()
  const mins = Math.floor(secondsRemaining / 60)
  const seconds = secondsRemaining % 60

  // Start time will be called every second by the useEffect
  useEffect(() => {
    const id = setInterval(() => {
      // startTimer dispatches the 'tick' action every second
      startTimer()
    }, 1000)

    // will clear interval on unmount so the timer stops
    return () => clearInterval(id)
  }, [startTimer])

  return (
    <div className='timer'>
      {mins < 10 && '0'}
      {mins}:{seconds < 10 && '0'}
      {seconds}
    </div>
  )
}

export default Timer

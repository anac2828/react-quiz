import { useEffect } from 'react';
import { useQuiz } from '../context/QuizContext';

function Timer() {
  const { secondsRemaining, startTimer } = useQuiz();
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(() => {
    const id = setInterval(() => {
      startTimer();
    }, 1000);

    return () => clearInterval(id);
  }, [startTimer]);

  return (
    <div className='timer'>
      {mins < 10 && '0'}
      {mins}:{seconds < 10 && '0'}
      {seconds}
    </div>
  );
}

export default Timer;

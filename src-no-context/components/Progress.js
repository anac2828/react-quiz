function Progress({
  index,
  numQuestions,
  totalPoints,
  maxPossiblePoints,
  answer,
}) {
  //   const hasAnswered = answer !== null;
  // hasAnswered ? index + 1 : index
  return (
    <header className='progress'>
      <progress
        max={numQuestions}
        // if answer !== null returns false Number function will turn it into a 0 and if True to 1.
        value={index + Number(answer !== null)}></progress>
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{totalPoints}</strong> / {maxPossiblePoints} points
      </p>
    </header>
  );
}

export default Progress;

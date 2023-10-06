import NextButton from './NextButton';

function FinishedScreen({ totalPoints, maxPossiblePoints, highscore, status }) {
  const percentage = (totalPoints / maxPossiblePoints) * 100;

  let emoji;

  if (percentage === 100) emoji = '🥇';
  if (percentage >= 80 && percentage < 100) emoji = '🥈';
  if (percentage >= 50 && percentage < 80) emoji = '🥉';
  if (percentage >= 0 && percentage < 50) emoji = '🙁';
  if (percentage === 0) emoji = '🤦‍♂️';

  return (
    <>
      <p className='result'>
        {emoji} You scored{' '}
        <strong>
          {totalPoints} out of {maxPossiblePoints} ({Math.ceil(percentage)}%)
        </strong>
      </p>
      <p className='highscore'>(Highscore: {highscore})</p>
    </>
  );
}

export default FinishedScreen;

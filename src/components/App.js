import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';
import NextButton from './NextButton';
import Progress from './Progress';
import FinishedScreen from './FinishedScreen';

const initialState = {
  questions: [],
  // loading, error, ready, active, finished
  status: 'loading',
  // will use the index to pull the question from the array
  index: 0,
  // the answer recieved is marked by the index of button clicked
  answer: null,
  totalPoints: 0,
  highscore: 0,
  reset: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload,
        status: 'ready',
      };
    case 'dataFailed':
      return { ...state, status: 'error' };
    case 'start':
      return { ...state, status: 'active' };
    case 'newAnswer':
      // payload is an index of the button clicked
      const curQuestion = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        totalPoints:
          action.payload === curQuestion.correctOption
            ? state.totalPoints + curQuestion.points
            : state.totalPoints,
      };
    case 'nextQuestion':
      return { ...state, index: state.index + 1, answer: null };
    case 'finished':
      return {
        ...state,
        status: 'finished',
        highscore:
          state.totalPoints > state.highscore
            ? state.totalPoints
            : state.highscore,
      };
    default:
      throw new Error('Action unknown');
  }
}

export default function App() {
  // const [state, dispatch] = useReducer(reducer, initialState);
  // nested distructuring
  const [
    { questions, status, index, answer, totalPoints, highscore },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  // will rund only on fload
  useEffect(() => {
    fetch('http://localhost:8000/questions')
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'dataReceived', payload: data }))
      .catch((err) => dispatch({ type: 'dataFailed' }));
  }, []);

  return (
    <div className='app'>
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && (
          // Start button will call the dispatch funtion to change the status to active
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === 'active' && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              totalPoints={totalPoints}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton
              dispatch={dispatch}
              answer={answer}
              index={index}
              numQuestions={numQuestions}
            />
          </>
        )}
        {status === 'finished' && (
          <FinishedScreen
            totalPoints={totalPoints}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
          />
        )}
      </Main>
    </div>
  );
}

import { useEffect } from 'react';
import { useQuiz } from '../context/QuizContext';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';
import NextButton from './NextButton';
import Progress from './Progress';
import FinishedScreen from './FinishedScreen';
import Timer from './Timer';
import Footer from './Footer';

// const SECS_PER_QUESTION = 30;

// const initialState = {
//   questions: [],
//   // loading, error, ready, active, finished
//   status: 'loading',
//   // will use the index to pull the question from the array
//   index: 0,
//   // the answer recieved is marked by the index of button clicked
//   answer: null,
//   totalPoints: 0,
//   highscore: 0,
//   secondsRemaining: null,
// };

// function reducer(state, action) {
//   switch (action.type) {
//     case 'dataReceived':
//       return {
//         ...state,
//         questions: action.payload,
//         status: 'ready',
//       };
//     case 'dataFailed':
//       return { ...state, status: 'error' };
//     case 'start':
//       return {
//         ...state,
//         status: 'active',
//         secondsRemaining: state.questions.length * SECS_PER_QUESTION,
//       };
//     case 'newAnswer':
//       // payload is an index of the button clicked
//       const curQuestion = state.questions.at(state.index);
//       return {
//         ...state,
//         answer: action.payload,
//         totalPoints:
//           action.payload === curQuestion.correctOption
//             ? state.totalPoints + curQuestion.points
//             : state.totalPoints,
//       };
//     case 'nextQuestion':
//       return { ...state, index: state.index + 1, answer: null };
//     case 'finished':
//       return {
//         ...state,
//         status: 'finished',
//         highscore:
//           state.totalPoints > state.highscore
//             ? state.totalPoints
//             : state.highscore,
//       };
//     case 'restart':
//       return {
//         ...initialState,
//         questions: state.questions,
//         status: 'ready',
//       };
//     case 'tick':
//       return {
//         ...state,
//         secondsRemaining: state.secondsRemaining - 1,
//         status: state.secondsRemaining === 0 ? 'finished' : state.status,
//       };
//     default:
//       throw new Error('Action unknown');
//   }
// }

export default function App() {
  // const [state, dispatch] = useReducer(reducer, initialState);
  // nested distructuring
  // const [
  //   {
  //     questions,
  //     status,
  //     index,
  //     answer,
  //     totalPoints,
  //     highscore,
  //     secondsRemaining,
  //   },
  //   dispatch,
  // ] = useReducer(reducer, initialState);

  const { questions, status } = useQuiz();

  // const numQuestions = questions.length;
  // const maxPossiblePoints = questions.reduce(
  //   (prev, cur) => prev + cur.points,
  //   0
  // );

  return (
    <div className='app'>
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen />}
        {status === 'active' && (
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === 'finished' && (
          <>
            <FinishedScreen />
            <NextButton />
          </>
        )}
      </Main>
    </div>
  );
}

import { createContext, useContext, useReducer, useEffect } from 'react';

const QuizContext = createContext();

const SECS_PER_QUESTION = 30;

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
  secondsRemaining: null,
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
      return {
        ...state,
        status: 'active',
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
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
    case 'restart':
      return {
        ...initialState,
        questions: state.questions,
        status: 'ready',
      };
    case 'tick':
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? 'finished' : state.status,
      };
    default:
      throw new Error('Action unknown');
  }
}

function QuizProvider({ children }) {
  const [
    {
      questions,
      status,
      index,
      answer,
      totalPoints,
      highscore,
      secondsRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  console.log(status);
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );
  const question = questions[index];

  // will run only on first load
  useEffect(() => {
    fetch('http://localhost:8000/questions')
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'dataReceived', payload: data }))
      .catch((err) => dispatch({ type: 'dataFailed' }));
  }, []);

  function startQuiz() {
    dispatch({ type: 'start' });
  }

  function startTimer() {
    dispatch({ type: 'tick' });
  }

  function selectedAnswer(optionIndex) {
    dispatch({ type: 'newAnswer', payload: optionIndex });
  }

  function displayNextQuestion() {
    dispatch({ type: 'nextQuestion' });
  }

  function quizFinished() {
    dispatch({ type: 'finished' });
  }

  function restartQuiz() {
    dispatch({ type: 'restart' });
  }

  return (
    <QuizContext.Provider
      value={{
        questions,
        question,
        status,
        index,
        answer,
        selectedAnswer,
        totalPoints,
        highscore,
        secondsRemaining,
        startQuiz,
        numQuestions,
        maxPossiblePoints,
        startTimer,
        displayNextQuestion,
        quizFinished,
        restartQuiz,
      }}>
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error('Context is being used outside Provider.');

  return context;
}

export { QuizProvider, useQuiz };

import { createContext, useContext, useReducer, useEffect } from 'react'

const QuizContext = createContext()

const SECS_PER_QUESTION = 30

const initialState = {
  questions: [],
  //Different status: loading, error, ready, active, finished
  status: 'loading',
  // will use the index to pull the question from the array
  index: 0,
  // The answer selected by the user and stored as an index
  userSelectedAnswer: null,
  totalPoints: 0,
  highscore: 0,
  secondsRemaining: null,
}

function reducer(state, action) {
  switch (action.type) {
    // Data received from the server using useEffect
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload,
        status: 'ready',
      }
    case 'dataFailed':
      return { ...state, status: 'error' }
    // start is dispatched when the user clicks the start button
    case 'start':
      return {
        ...state,
        status: 'active',
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      }
    // When the user selects an answer
    case 'newAnswer':
      // payload is an index of the option (answer) clicked
      const curQuestion = state.questions.at(state.index)
      return {
        ...state,
        userSelectedAnswer: action.payload,
        // Add points if the answer is correct
        totalPoints:
          action.payload === curQuestion.correctOption
            ? state.totalPoints + curQuestion.points
            : state.totalPoints,
      }
    // When the user clicks the next button to go to the next question and reset the selected answer
    case 'nextQuestion':
      return { ...state, index: state.index + 1, userSelectedAnswer: null }
    // When the user finishes the quiz
    case 'finished':
      return {
        ...state,
        status: 'finished',
        highscore:
          state.totalPoints > state.highscore
            ? state.totalPoints
            : state.highscore,
      }
    // Restart button on the finished screen
    case 'restart':
      return {
        ...initialState,
        questions: state.questions,
        status: 'ready',
      }
    case 'tick':
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? 'finished' : state.status,
      }
    default:
      throw new Error('Action unknown')
  }
}

function QuizProvider({ children }) {
  // REDUCER
  const [
    {
      questions,
      status,
      index,
      userSelectedAnswer,
      totalPoints,
      highscore,
      secondsRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState)

  // DERIVED STATE
  const numQuestions = questions.length
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0,
  )
  const question = questions[index]

  // SIDE EFFECTS - Data fetching when the component mounts for the first time
  useEffect(() => {
    fetch('http://localhost:8000/questions')
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'dataReceived', payload: data }))
      .catch((err) => dispatch({ type: 'dataFailed' }))
  }, [])

  // ACTION CREATORS
  function startQuiz() {
    dispatch({ type: 'start' })
  }

  function startTimer() {
    dispatch({ type: 'tick' })
  }

  function selectedAnswer(optionIndex) {
    dispatch({ type: 'newAnswer', payload: optionIndex })
  }

  function displayNextQuestion() {
    dispatch({ type: 'nextQuestion' })
  }

  function quizFinished() {
    dispatch({ type: 'finished' })
  }

  function restartQuiz() {
    dispatch({ type: 'restart' })
  }

  // PROVIDER

  return (
    <QuizContext.Provider
      value={{
        questions,
        question,
        status,
        index,
        userSelectedAnswer,
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
      }}
    >
      {children}
    </QuizContext.Provider>
  )
}

// CUSTOM HOOK to use the QuizContext

function useQuiz() {
  const context = useContext(QuizContext)
  if (context === undefined)
    throw new Error('Context is being used outside Provider.')

  return context
}

export { QuizProvider, useQuiz }

import { useReducer } from 'react';

const inititalState = { count: 0, step: 1 };

function reducer(state, action) {
  // action comes from the dispatch. The state is the count variable
  switch (action.type) {
    case 'dec':
      // creates a new object with the current state and the properties you want to overwrite
      return { ...state, count: state.count - state.step };

    case 'inc':
      return { ...state, count: state.count + state.step };
    case 'setCount':
      return { ...state, count: action.paylaod };
    case 'setStep':
      return { ...state, step: action.payload };
    case 'reset':
      return inititalState;
    default:
      throw new Error('Unkown action');
  }
}

function DateCounter() {
  // More advaned and complex way of managing state. Returns the current state and the dispatch function that can be used to update the state.

  const [state, dispatch] = useReducer(reducer, inititalState);

  const { count, step } = state;

  // This mutates the date object.
  const date = new Date('june 21 2027');
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: 'dec' });
  };

  const inc = function () {
    dispatch({ type: 'inc' });
  };

  const defineCount = function (e) {
    dispatch({ type: 'setCount', payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    dispatch({ type: 'setStep', payload: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({ type: 'reset' });
  };

  return (
    <div className='counter'>
      <div>
        <input
          type='range'
          min='0'
          max='10'
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;

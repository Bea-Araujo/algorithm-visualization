"use client";

import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { Section } from "./styles";

export default function Page() {
  const sortedArray = [...new Array(1000)].map((_, index) => index);

  const [targetValue, setTargetValue] = useState(8)

  const [iteration, setIteration] = useState(0)

  class Indexes{
    min: number
    max: number
    guess: number
    
    constructor(){
      this.min = 0
      this.max = sortedArray.length - 1
      this.guess = getRoundAvg(0, sortedArray.length - 1)
    }
  }

  type indexesAction = {
    type: string,
  }

  function indexReducer(state: Indexes, action: indexesAction) {
    switch (action.type){
      case 'increaseMin':
        return {...state, min: state.guess + 1}
      case 'decreaseMax': 
        return {...state, max: state.guess - 1}
      case 'updateGuess':
        return {...state, guess: getRoundAvg(state.min , state.max)}
      case 'assessTarget':
        return sortedArray[state.guess] == targetValue ? {...state, max: state.guess, min: state.guess} : {...state}
      case 'reset':
        return new Indexes()
    }
    console.log(state)
    return state
  }

  const [indexes, dispatch] = useReducer(indexReducer, new Indexes())

  function getRoundAvg(a: number, b: number){
    return Math.round(Math.floor((a + b) / 2))
  }

  function getMaxNumberOfIterations(){
    return Math.log2(sortedArray.length)
  }
  
  const reachedTarget = useMemo(() => sortedArray[indexes.guess] == targetValue, [targetValue, indexes.guess, sortedArray])
  
  // console.table([
  //   ['max index', maxIndex],
  //   ['min index', minIndex],
  //   ['guess', guess]
  // ])

  function reset(){
    setIteration(0)
    dispatch({ type: 'reset' })
  }
  
  function nextStep(){
    setIteration((prev) => prev + 1)
    
    if (indexes.max == indexes.min) return
    if (sortedArray[indexes.guess] < targetValue) dispatch({ type: 'increaseMin' })
    if (sortedArray[indexes.guess] > targetValue) dispatch({ type: 'decreaseMax' })
    
    dispatch({ type: 'updateGuess' })
    dispatch({type: 'assessTarget'})
  }

  const [automatic, setAuto] = useState(false)
  function toggleAuto(){
    setAuto((auto) => !auto)
  }

  useEffect(() => {
    if(sortedArray[indexes.guess] == targetValue || !automatic) {
      return setAuto(false)
    }
    setTimeout(() => {
      setIteration((iteration) => iteration + 1)
      nextStep()
    }, 500)
  }, [automatic, iteration])

  return (
    <main>
      <Section>
        <h1>Binary Search</h1>
        <p>
          Iteration nº{iteration}
        </p>

        <div>
          {reachedTarget}
        </div>

        {reachedTarget? 'Congratulations!' : ''}

        <button onClick={nextStep}>Next</button>
        <button onClick={toggleAuto}>Auto</button>
        <button onClick={reset}>Reset</button>

        <div className="grid">
          <p>min</p>
          <p>max</p>
          <p>guess</p>
          <p>target</p>
          <p>{indexes.min}</p>
          <p>{indexes.max}</p>
          <p>{indexes.guess}  -  {sortedArray[indexes.guess]}</p>
          <p>{targetValue}</p>
        </div>

        <div className="circles-container">
          {sortedArray.map((el, i) => {
            return <div 
              className={`
                circle 
                ${el == targetValue && 'target'} 
                ${i == indexes.guess && "guess"}
                ${i < indexes.min || i > indexes.max ? 'inactive' : 'active'}
                `} 
              key={el}>
                {el}
              </div>;
          })}
        </div>
      </Section>
    </main>
  );
}

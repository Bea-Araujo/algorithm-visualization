"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Section } from "./styles";

export default function Page() {
  const sortedArray = [...new Array(10)].map((_, index) => index);

  const [targetValue, setTargetValue] = useState(8)

  const [minIndex, setMinIndex] = useState(0)
  const [maxIndex, setMaxIndex] = useState(sortedArray.length - 1)
  const [guess, setGuess] = useState(Math.round(Math.floor((maxIndex + minIndex) / 2)))
  
  const reachedTarget = useMemo(() => sortedArray[guess] == targetValue, [targetValue, guess, sortedArray])
  
  // console.table([
  //   ['max index', maxIndex],
  //   ['min index', minIndex],
  //   ['guess', guess]
  // ])

  function reset(){
    const min = 0
    const max = sortedArray.length - 1
    setMinIndex(0)
    setMaxIndex(sortedArray.length - 1)
    setGuess(Math.round(Math.floor((max + min) / 2)))
  }
  
  function nextStep(){
    console.log('a')
    let min = minIndex
    let max = maxIndex

    if (sortedArray[guess] < targetValue) {
      min = guess + 1
      setMinIndex(() => min)
    }
    else if (sortedArray[guess] > targetValue) {
      max = guess - 1
      setMaxIndex(() => max)
    }

    if (maxIndex != minIndex) {
      const nextGuess = Math.round(Math.floor((max + min) / 2))
      setGuess(() => nextGuess)
      if(min == nextGuess || max == nextGuess) {
        setMinIndex(() => nextGuess)
        setMaxIndex(() => nextGuess)
      }
    }
  }

  function automatic(){
    let x = 0
    const intervalId = setInterval(() => {
      (() => nextStep())()
      console.log('ab')
      if(sortedArray[guess] == targetValue) clearInterval(intervalId)
    }, 1000)

    while (x<5){
      console.log(x)
      console.log(guess)
      console.log(minIndex)
      console.log(maxIndex)
      console.log(sortedArray[guess] == targetValue)
      // setTimeout(nextStep, 3000);
      
      x++
    }
    // clearInterval(intervalId)
  }

  return (
    <main>
      <Section>
        <h1>Binary Search</h1>
        <p>
          {guess}
        </p>

        <div>
          {reachedTarget}
        </div>

        {reachedTarget? 'Congratulations!' : ''}

        <button onClick={nextStep}>Next</button>
        <button onClick={automatic}>Auto</button>
        <button onClick={reset}>Reset</button>

        <div className="circles-container">
          {sortedArray.map((el, i) => {
            return <div 
              className={`
                circle 
                ${el == targetValue && 'target'} 
                ${i == guess && "guess"}
                ${i < minIndex || i > maxIndex ? 'inactive' : 'active'}
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

"use client";

import { useEffect, useState } from "react";
import { Section } from "./styles";

export default function Page() {
  const [unsortedArray, setUnsortedArray] = useState(
    [...new Array(10)].map(() => 0)
  );
  const [step, setStep] = useState(0);
  const [observedIndex, setObservedIndex] = useState(0)
  const [automatic, setAutomatic] = useState(false)

  const [comparedIndex, setComparedIndex] = useState(1)

  function randomizeNumbers() {
    setUnsortedArray((array) =>
    //   array.map(() => Math.round(Math.random() * 100))
    [57, 37, 77, 58, 61, 99, 70, 44, 47, 5]
    );
  }

  function findMinimum(startIndex: number){
    let minimumValue = unsortedArray[startIndex]
    let minimumValueIndex = startIndex
    for (let i = startIndex + 1; i < unsortedArray.length ; i++) {
        setTimeout(() => {
            setComparedIndex(() => i)
        }, 1000)
        if (unsortedArray[i] >= minimumValue) continue;
        minimumValue = unsortedArray[i]
        minimumValueIndex = i
    }
    return minimumValueIndex
  }

  function swap(lesserIndex: number, greaterIndex: number){
    const tempLesser = unsortedArray[lesserIndex];
    const tempGreater = unsortedArray[greaterIndex];
    setUnsortedArray((array) => {
        array[lesserIndex] = tempGreater;    
        array[greaterIndex] = tempLesser;
    
        return [...array]
    })
  }
  
  function selectionSort(){
    const min = findMinimum(observedIndex)
    if (min == observedIndex) return setObservedIndex((prev) => prev + 1)
    swap(min, observedIndex)
    setObservedIndex((prev) => prev + 1)
  }

  function advanceStep(){
    if (step >= unsortedArray.length - 1) return
    setStep(prev => prev + 1)
    selectionSort()
  }

  function toggleAuto() {
    setAutomatic((prev) => !prev)
  }

  useEffect(() => {
    randomizeNumbers()
  }, [])

  useEffect(() => {
    if(step == unsortedArray.length - 1 || !automatic) {
      return setAutomatic(false)
    }
    setTimeout(() => {
      advanceStep()
    }, 500)
  }, [step, automatic])

  return (
    <main>
      <Section>
        <h1>Selection sort</h1>
        <p>
          Selection sort works by finding the smallest element and bringing it
          to the first index of the iteration.
        </p>

        <div className='grid'>
            <p>Step {step}</p>
            <p>observed Index {observedIndex}</p>
            <p>compared Index {comparedIndex}</p>
        </div>

        <button onClick={randomizeNumbers}>Randomize</button>
        <button onClick={advanceStep}>Next</button>
        <button onClick={toggleAuto}>Auto</button>

        <div className="circles-container">
          {unsortedArray.map((el, i) => {
            return (
              <div
                className={`
                circle 
                ${observedIndex == i && 'target'}
                ${comparedIndex == i && 'compared'}
                `}
                key={`${el}-${i}`}
              >
                {el}
              </div>
            );
          })}
        </div>
      </Section>
    </main>
  );
}

'use client'
import { useRef, useState } from "react";
import { Container } from "./styles";

export default function Page(){
    const [minSize, setMinSize] = useState(560)
    const [size, setSize] = useState(280)
    const [quadrantSize, setQuadrantSize] = useState(560)

    const [squares, setSquares] = useState<number[][]>([])

    function sierpinskiGasket(){
        if (quadrantSize == minSize) {
            console.log('Min size reached')
            return
        }

        

        setSquares((squares) => {
            squares.push([1])
            squares.push([1])
            squares.push([0])
            squares.push([1])

            return squares
        })

        setQuadrantSize(quadrantSize => Math.round(quadrantSize/2))
    }

    return (
        <main>
            <p>Min size: {minSize}px</p>
            <p>Quadrant size: {quadrantSize}px</p>
            <button onClick={sierpinskiGasket}>Run</button>
        <Container $size={size}>
        </Container>
        </main>
    )
}
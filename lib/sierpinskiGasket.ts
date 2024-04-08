
const size = 560;
const min = 280;

let call = 0
function sierpinskiGasket(quadrantSize){
    if (quadrantSize <= min) {
        return {
            upperRight: 1,
            upperLeft: 1,
            lowerLeft: 0,
            lowerRight: 1,
        }
    }

    const newQuadrantSize = quadrantSize / 2;
    console.log(newQuadrantSize)

    return {
        upperRight: sierpinskiGasket(newQuadrantSize),
        upperLeft: sierpinskiGasket(newQuadrantSize),
        lowerLeft: 0,
        lowerRight: sierpinskiGasket(newQuadrantSize),
    }
}

// console.log(sierpinskiGasket(min))
// console.log(sierpinskiGasket(2 * min))
console.log(sierpinskiGasket(3 * min))
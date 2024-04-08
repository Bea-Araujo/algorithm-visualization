
const swap = function(array: number[], firstIndex: number, secondIndex: number) {
    const temp = array[firstIndex];
    array[firstIndex] = array[secondIndex];
    array[secondIndex] = temp;
};

const indexOfMinimum = function(array: number[], startIndex: number) {
    var minValue = array[startIndex];
    var minIndex = startIndex;

    for(let i = minIndex + 1; i < array.length; i++) {
        if(array[i] >= minValue) continue
        
        minIndex = i;
        minValue = array[i];
    } 
    return minIndex;
}; 

const selectionSort = function(array: number[]) {
    for (let i = 0; i < array.length; i++) {
        const minIndex = indexOfMinimum(array, i);
        if (minIndex == i) continue
        swap(array, minIndex, i)
    }
  
  	return;
};
function insert(array: number[], rightIndex: number, value: number) {
    let i = rightIndex;
    for (i; i >= 0 && array[i] > value; i--) {
        array[i + 1] = array[i] 
    }
    array[i + 1] = value
    return array
}

function insertSort(array: number[]){
    for(let i = 1; i < array.length; i++){
        insert(array, i - 1 ,array[i])
    }
}

var doSearch = function(array: number[], targetValue: number) {
    var min = 0;
	var max = array.length - 1;

    var guess;
    
    while (true) {
        if (max < min) return -1
        guess = Math.round(Math.floor((max + min) / 2));
        if (array[guess] == targetValue) break;
        if (array[guess] < targetValue) min = guess + 1
        else if (array[guess] > targetValue) max = guess - 1
    }

    return guess;
};

const caseA = doSearch([ 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97 ],73 )
console.log(caseA)


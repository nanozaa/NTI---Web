// Question 1: Check if Array is Sorted
function isSortedAscending(arr) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) {
      return false;
    }
  }
  return true;
}

// Question 2: Return Numbers Greater Than a Value
function numbersGreaterThan(arr, value) {
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > value) {
      result.push(arr[i]);
    }
  }

  return result;
}

console.log("Sorted check:");
console.log(isSortedAscending([1, 2, 3, 4, 5]));
console.log(isSortedAscending([1, 3, 2, 4]));

console.log("Numbers greater than value:");
console.log(numbersGreaterThan([10, 5, 20, 3, 15], 8));
console.log(numbersGreaterThan([2, 4, 6], 10));

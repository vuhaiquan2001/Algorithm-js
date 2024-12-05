var n = 100000;
var min = 1;
var max = 9999;
var arr = Array.from({ length: n }, () => Math.floor(Math.random() * (max - min + 1)) + 1);
// const arr = [12, 11, 13, 5, 6, 7];
console.time("timer");
// Partition function
function partition(arr, low, high) {
  // Choose the pivot
  let pivot = arr[high];

  // Index of smaller element and indicates
  // the right position of pivot found so far
  let i = low - 1;

  // Traverse arr[low..high] and move all smaller
  // elements to the left side. Elements from low to
  // i are smaller after every iteration
  for (let j = low; j <= high - 1; j++) {
    if (arr[j] < pivot) {
      i++;
      swap(arr, i, j);
    }
  }

  // Move pivot after smaller elements and
  // return its position
  swap(arr, i + 1, high);
  return i + 1;
}

// Swap function
function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

// The QuickSort function implementation
function quickSort(arr, low, high) {
  if (low < high) {
    // pi is the partition return index of pivot
    let pi = partition(arr, low, high);

    // Recursion calls for smaller elements
    // and greater or equals elements
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}

quickSort(arr, 0, n - 1);
console.timeEnd("timer");
console.log(arr);

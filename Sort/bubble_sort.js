var n = 100000;
var min = 1;
var max = 9999;
var arr = Array.from({ length: n }, () => Math.floor(Math.random() * (max - min + 1)) + 1);
// var arr = [7, 3, 5, 2];
console.time("timer");
function bubbleSort(arr) {
  for (let i = 0; i <= arr.length - 1; i++) {
    // Chạy hết i + 1 tới hết kích thước
    for (let j = i + 1; j <= arr.length - 1; j++) {
      // Nổi bọt giá trị đó nên tại i
      if (arr[i] > arr[j]) {
        // swap
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }
  }
  return arr;
}
const sortedArr = bubbleSort(arr);
console.timeEnd("timer");
console.log(sortedArr);

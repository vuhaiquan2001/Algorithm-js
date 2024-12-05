var n = 100000;
var min = 1;
var max = 9999;
var arr = Array.from({ length: n }, () => Math.floor(Math.random() * (max - min + 1)) + 1);
// arr = [7, 3, 5, 2];
console.time("timer");
function selectionSort(arr) {
  for (let i = 0; i <= arr.length - 1; i++) {
    // khởi tạo với i
    let minIndex = i;
    // Tìm ra giá trị nhỏ nhất
    for (let j = i + 1; j <= arr.length - 1; j++) {
      // Nếu giá trị tại j < minIndex thì minIndex = j
      if (arr[minIndex] > arr[j]) {
        minIndex = j;
      }
    }

    // Đảo vị trí khi tìm thấy giá trị nhỏ nhất với i và giá trị tại chỗ nhỏ nhất bằng giá trị tại i
    const temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
  }
  return arr;
}
const sortedArr = selectionSort(arr);
console.timeEnd("timer");
console.log(sortedArr);

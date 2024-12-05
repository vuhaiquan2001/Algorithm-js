var n = 100000;
var min = 1;
var max = 9999;
var arr = Array.from({ length: n }, () => Math.floor(Math.random() * (max - min + 1)) + 1);
// var arr = [7, 3, 5, 2];
console.time("timer");
function insertionSort(arr) {
  for (let i = 1; i <= arr.length - 1; i++) {
    // lấy key tại i để làm giá trị so sánh
    let key = arr[i];
    // so sánh với các giá trị tại vị trí nhỏ hơn i (đã được xắp xếp)
    let j = i - 1;
    // so sánh lần lượt giá trị trước đó với key
    // Nếu giá trị trước đó lớn hơn key (key nhỏ hơn), thì sẽ thay đổi giá trị tại j + 1 = giá trị lớn hơn đó
    while (j >= 0 && arr[j] > key) {
      // thay thế giá trị tiếp theo của j bằng giá trị lớn hơn đó (đẩy giá trị lớn hơn ra sau)
      arr[j + 1] = arr[j];
      // giảm j đi
      j -= 1;
    }
    // Nếu đã lặp hết mảng đã xắp sếp
    // hoặc các giá trị đã xắp sếp đó không lớn hơn giá trị tại phần chưa sắp xếp
    // thay thế giá trị j + 1 = key
    arr[j + 1] = key;
  }
  return arr;
}
const sortedArr = insertionSort(arr);
console.timeEnd("timer");
console.log(sortedArr);

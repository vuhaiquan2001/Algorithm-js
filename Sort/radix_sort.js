// Thời gian: O(d⋅(n+b)), với 𝑑 là số chữ số tối đa, n là số phần tử, b là cơ sở.
// Không gian: Yêu cầu bộ nhớ phụ để lưu các nhóm.
// UD: Hiệu quả với các danh sách có số lượng phần tử lớn nhưng độ dài chữ số nhỏ. Ổn định.
// ND: Chỉ hoạt động tốt với dữ liệu có cấu trúc (như số nguyên hoặc chuỗi ký tự có độ dài cố định).
// ND: Cần thêm bộ nhớ cho các thuật toán phụ trợ (như Counting Sort).
var n = 100000;
var min = 1;
var max = 9999;
var arr = Array.from({ length: n }, () => Math.floor(Math.random() * (max - min + 1)) + 1);
// arr = [7, 3, 5, 2];
console.time("timer");
// Lấy ra số lớn nhất
function getMaxNumber(arr) {
  // Khởi tạo với giá trị max là đầu mảng
  let max = arr[0];
  // Lặp từ phần tử thứ 2
  for (let i = 1; i <= arr.length - 1; i++) {
    // Nếu giá trị tại i > max thì lấy giá trị tại i, không giữ nguyên
    max = max < arr[i] ? arr[i] : max;
  }
  return max;
}
// Làm phawrnt mảng
function flattenArray(arr) {
  let result = [];
  for (let i = 0; i <= arr.length - 1; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flattenArray(arr[i]));
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}
// arr mảng giá trị, digitPlace là đơn vị hiện tại
function countingSort(arr, digitPlace) {
  // Tạo hashMap hoặc arr để lưu giá trị theo các số đơn vị từ 0 -9
  var buckets = Array.from({ length: 10 }, () => []);
  for (let i = 0; i <= arr.length - 1; i++) {
    // Lấy ra chữ số đơn vị tại
    const digit = Math.floor((arr[i] / digitPlace) % 10);
    buckets[digit].push(arr[i]);
  }
  // return flattenArray(buckets.reverse()); // Nếu xắp xếp giảm giần thì chỉ cần đảo ngược buckets
  return flattenArray(buckets);
}

function radixSort(arr) {
  // Lấy số lớn nhất
  const maxNum = getMaxNumber(arr);
  // Lặp từ hàng đơn vị (i = 1), tới hàng chục, trăm...(*10)
  // đệ hàng số tối đa
  for (let i = 1; Math.floor(maxNum / i) > 0; i *= 10) {
    arr = countingSort(arr, i);
  }

  return arr;
}
const sortedArr = radixSort(arr);
console.timeEnd("timer");

console.log(sortedArr);

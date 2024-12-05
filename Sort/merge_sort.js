var n = 100000;
var min = 1;
var max = 9999;
var arr = Array.from({ length: n }, () => Math.floor(Math.random() * (max - min + 1)) + 1);
// const arr = [12, 11, 13, 5, 6, 7];
console.time("timer");
function merge(arr, left, mid, right) {
  // Độ dài của mảng trái và phải
  const n1 = mid - left + 1;
  const n2 = right - mid;
  // Tạo mảng trái phải với độ dài tương ứng
  const L = new Array(n1);
  const R = new Array(n2);
  // Copy dữ liệu vào 2 mảng
  // Copy từ left tới hết độ dài của mảng trái
  for (let i = 0; i < n1; i++) L[i] = arr[left + i];
  // Copy từ giữa mảng + 1(mid lằm trong left) tới hết độ dài của mảng phải
  for (let j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];
  // Tạo
  let i = 0,
    j = 0; //Điều kiện lặp
  let k = left; //
  // Xắp xếp
  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      arr[k] = L[i];
      i++;
    } else {
      arr[k] = R[j];
      j++;
    }
    k++;
  }
  // Sao chép phần tử còn lại của mảng L vào array
  while (i < n1) {
    arr[k] = L[i];
    i++;
    k++;
  }
  // Sao chép phần tử còn lại của mảng R vào array
  while (j < n2) {
    arr[k] = R[j];
    j++;
    k++;
  }
}
function mergeSort(arr, left, right) {
  // Dừng khi mảng không tách được nữa (left và right bằng nhau hoặc left > right)
  if (left >= right) return;
  // Xác định index của middle
  // Tại sao không dùng arr.length - 1/2 ? vì đây là đệ quy, cần tính mid của khoảng đang xử lý chứ không phải mảng gốc
  const mid = Math.floor(left + (right - left) / 2);
  // Tách mảng trái ra
  mergeSort(arr, left, mid);
  // Tách mảng phải
  mergeSort(arr, mid + 1, right);
  // Merge mảng lại
  merge(arr, left, mid, right);
}
mergeSort(arr, 0, arr.length - 1);
console.timeEnd("timer");
console.log(arr);

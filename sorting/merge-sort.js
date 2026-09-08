/**
 * 归并排序（Merge Sort）
 *
 * 原理：分治思想。先把数组递归地一分为二，直到子数组长度为 1，
 *   再两两合并成有序数组，逐步归并回完整数组。
 *   - 时间复杂度：始终 O(n log n)（最稳定，不受输入影响）
 *   - 空间复杂度：O(n)（需要额外临时数组）
 *   - 稳定性：稳定
 *
 * 运行：node merge-sort.js
 */

function mergeSort(arr) {
  const a = arr.slice(); // 拷贝一份，避免修改原数组

  // 合并 a[left..mid] 和 a[mid+1..right] 两个有序区间
  function merge(left, mid, right) {
    const tmp = [];
    let i = left;
    let j = mid + 1;

    while (i <= mid && j <= right) {
      if (a[i] <= a[j]) tmp.push(a[i++]);
      else tmp.push(a[j++]);
    }
    while (i <= mid) tmp.push(a[i++]);
    while (j <= right) tmp.push(a[j++]);

    // 写回原数组
    for (let k = 0; k < tmp.length; k++) {
      a[left + k] = tmp[k];
    }
  }

  function sort(left, right) {
    if (left >= right) return;
    const mid = (left + right) >> 1; // 等价于 Math.floor((left+right)/2)
    sort(left, mid);
    sort(mid + 1, right);
    merge(left, mid, right);
  }

  sort(0, a.length - 1);
  return a;
}

/* ===== 演示 ===== */
function randomArray(n, max = 100) {
  return Array.from({ length: n }, () => Math.floor(Math.random() * max));
}

function isSorted(arr) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) return false;
  }
  return true;
}

const sample = randomArray(12);
console.log("原始数组:", sample);
const sorted = mergeSort(sample);
console.log("排序结果:", sorted);
console.log("正确性校验:", isSorted(sorted) ? "✓ 通过" : "✗ 失败");

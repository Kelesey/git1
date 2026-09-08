/**
 * 快速排序（Quick Sort）
 *
 * 原理：分治思想。选取一个基准值（pivot），把数组分成
 *   “小于基准”和“大于等于基准”两部分，再递归排序两边。
 *   - 时间复杂度：平均 O(n log n)、最坏 O(n²)（基准选得极端时）
 *   - 空间复杂度：O(log n)（递归栈）
 *   - 稳定性：不稳定
 *
 * 运行：node quick-sort.js
 */

function quickSort(arr) {
  const a = arr.slice(); // 拷贝一份，避免修改原数组

  // Lomuto 划分：返回基准值的最终位置
  function partition(left, right) {
    const pivot = a[right];
    let i = left - 1; // i 指向“小于基准”区域的末尾

    for (let j = left; j < right; j++) {
      if (a[j] < pivot) {
        i++;
        [a[i], a[j]] = [a[j], a[i]];
      }
    }
    // 把基准值放到正确位置
    [a[i + 1], a[right]] = [a[right], a[i + 1]];
    return i + 1;
  }

  function sort(left, right) {
    if (left >= right) return;
    const p = partition(left, right);
    sort(left, p - 1);
    sort(p + 1, right);
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
const sorted = quickSort(sample);
console.log("排序结果:", sorted);
console.log("正确性校验:", isSorted(sorted) ? "✓ 通过" : "✗ 失败");

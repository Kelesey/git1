/**
 * 冒泡排序（Bubble Sort）
 *
 * 原理：重复遍历数组，相邻两两比较，把较大的元素“冒泡”到末尾。
 *   - 时间复杂度：最好 O(n)（已有序时）、平均/最坏 O(n²)
 *   - 空间复杂度：O(1)（原地排序）
 *   - 稳定性：稳定
 *
 * 运行：node bubble-sort.js
 */

function bubbleSort(arr) {
  const a = arr.slice(); // 拷贝一份，避免修改原数组
  const n = a.length;

  for (let i = 0; i < n - 1; i++) {
    let swapped = false; // 本轮是否发生过交换
    for (let j = 0; j < n - 1 - i; j++) {
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swapped = true;
      }
    }
    // 本轮没有交换，说明数组已经有序，提前结束
    if (!swapped) break;
  }

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
const sorted = bubbleSort(sample);
console.log("排序结果:", sorted);
console.log("正确性校验:", isSorted(sorted) ? "✓ 通过" : "✗ 失败");

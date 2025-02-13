export function mergeSortedTree<T>(
  a: T[],
  b: T[],
  cmp: (a: T, b: T) => boolean
) {
  const result: T[] = [];
  let aIndex = 0;
  let bIndex = 0;
  while (a[aIndex] || b[bIndex]) {
    if (!a[aIndex]) {
      result.push(b[bIndex]);
      bIndex++;
      continue;
    }
    if (!b[bIndex]) {
      result.push(a[aIndex]);
      aIndex++;
      continue;
    }

    if (cmp(a[aIndex], b[bIndex])) {
      result.push(b[bIndex]);
      bIndex++;
    } else {
      result.push(a[aIndex]);
      aIndex++;
    }
  }
  return result;
}

export function binarySearch<T>(array: T[], cmp: (el: T) => number) {
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const comparisonResult = cmp(array[mid]);

    if (comparisonResult === 0) {
      return mid;
    } else if (comparisonResult > 0) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
}

export function sortedSearchInRegion<T>(
  array: T[],
  i: number,
  cmp: (el: T) => boolean,
  success?: (el: T, index: number) => void
) {
  if (success) {
    success(array[i], i);
  }
  let start = i;
  let end = i;

  for (let j = i; j < array.length; j++) {
    if (cmp(array[j])) {
      end = j;
      if (success) {
        success(array[j], j);
      }
    } else {
      break;
    }
  }
  for (let j = i; j >= 0; j--) {
    if (cmp(array[j])) {
      start = j;
      if (success) {
        success(array[j], j);
      }
    } else {
      break;
    }
  }
  return [start, end];
}

export function manyBinarySearch<T>(
  array: T[],
  cmp: (el: T) => number,
  success?: (el: T) => void
) {
  const index = binarySearch(array, cmp);
  if (index === undefined) {
    return;
  }
  return sortedSearchInRegion(array, index, (el) => cmp(el) === 0, success);
}

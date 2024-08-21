export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

//quick sort
export function getQuickSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return animations;
  quickSortHelper(array, 0, array.length - 1, animations);
  return animations;
}

function quickSortHelper(mainArray, startIdx, endIdx, animations) {
  if (startIdx < endIdx) {
    const pivotIdx = partition(mainArray, startIdx, endIdx, animations);
    quickSortHelper(mainArray, startIdx, pivotIdx - 1, animations);
    quickSortHelper(mainArray, pivotIdx + 1, endIdx, animations);
  }
}

function partition(mainArray, startIdx, endIdx, animations) {
  const pivotValue = mainArray[endIdx];
  let pivotIdx = startIdx;
  
  for (let i = startIdx; i < endIdx; i++) {
    // Compare the current element with the pivot
    animations.push([i, endIdx]);
    // Revert the color of the compared elements
    animations.push([i, endIdx]);

    if (mainArray[i] < pivotValue) {
      // Swap elements if the current element is less than the pivot
      animations.push([i, pivotIdx, mainArray[i], mainArray[pivotIdx]]);
      swap(mainArray, i, pivotIdx);
      pivotIdx++;
    } else {
      // No swap, just push a dummy animation for consistency
      animations.push([-1, -1, -1, -1]);
    }
  }

  // Swap the pivot element with the element at the pivot index
  animations.push([pivotIdx, endIdx, mainArray[pivotIdx], mainArray[endIdx]]);
  swap(mainArray, pivotIdx, endIdx);

  return pivotIdx;
}

function swap(array, i, j) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}



export function getHeapSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return animations;
  
  const n = array.length;

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(array, n, i, animations);
  }

  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end
    animations.push([0, i, array[0], array[i]]);
    swap(array, 0, i);

    // Call max heapify on the reduced heap
    heapify(array, i, 0, animations);
  }

  return animations;
}

function heapify(array, n, i, animations) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  // Compare left child with the largest
  if (left < n && array[left] > array[largest]) {
    largest = left;
  }

  // Compare right child with the largest
  if (right < n && array[right] > array[largest]) {
    largest = right;
  }

  // If the largest is not the root
  if (largest !== i) {
    animations.push([i, largest, array[i], array[largest]]);
    swap(array, i, largest);

    // Recursively heapify the affected subtree
    heapify(array, n, largest, animations);
  } else {
    // No swap, just push a dummy animation for consistency
    animations.push([-1, -1, -1, -1]);
  }
}


//bubble sort
export function getBubbleSortAnimations(array) {
  const animations = [];
  let arrLength = array.length;
  
  while (arrLength >= 2) {
    for (let i = 1; i < arrLength; i++) {
      let k = i - 1;
      // Push the comparison pair to change their color
      animations.push([k, i]);
      // Push again to revert their color
      animations.push([k, i]);
      
      if (array[i] < array[k]) {
        // Push the swap animation
        animations.push([k, array[i]]);
        animations.push([i, array[k]]);
        
        // Swap the elements
        let temp = array[i];
        array[i] = array[k];
        array[k] = temp;
      } else {
        // No swap, push a dummy animation to keep consistency
        animations.push([-1, -1]);
        animations.push([-1, -1]);
      }
    }
    arrLength--;
  }
  
  return animations;
}


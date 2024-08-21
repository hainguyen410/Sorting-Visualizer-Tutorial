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
  quickSortHelper(array, 0, array.length - 1, animations);
  return animations;
}

function quickSortHelper(array, startIdx, endIdx, animations) {
  if (startIdx >= endIdx) return;

  const pivotIdx = partition(array, startIdx, endIdx, animations);

  quickSortHelper(array, startIdx, pivotIdx - 1, animations);
  quickSortHelper(array, pivotIdx + 1, endIdx, animations);
}

function partition(array, startIdx, endIdx, animations) {
  let pivot = array[endIdx];
  let i = startIdx - 1;

  for (let j = startIdx; j < endIdx; j++) {
    animations.push([j, endIdx, 'compare']); // Comparing current element with the pivot
    animations.push([j, endIdx, 'revert']); // Reverting the comparison color

    if (array[j] < pivot) {
      i++;
      animations.push([i, array[j], 'swap']); // Swap operation
      animations.push([j, array[i], 'swap']); // Swap operation
      swap(array, i, j);
    }
  }

  animations.push([i + 1, array[endIdx], 'swap']); // Final swap to place pivot correctly
  animations.push([endIdx, array[i + 1], 'swap']); // Final swap to place pivot correctly
  swap(array, i + 1, endIdx);

  return i + 1;
}

function swap(array, i, j) {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

// Example usage:
// const array = [5, 3, 8, 4, 2];
// const animations = getQuickSortAnimations(array);





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


/**
 * NOTES:
  * Here are some of the assumptions I made before solving this problem:
  * I assume there are always going to be 3 arrays with 3 elements each => 3 x 3 array.
  * I assume each element in each array is always going to be either the numbers 0 or 1.
  * 
  * The steps I took to implementing my solution:
  * I rearranged the array by stacking them on top of each other to achieve something like the below
		with each number representing the indexes of the element in that position.
  * [0, 1, 2]
  * [3, 4, 5]
  * [6, 7, 8]
  * 
  * I then took the index of each element in the above arrays and stored them in a Map
    with each index being the key, pointing to the index of its adjacent elements stored in an array.
  * Using the indexes 0 and 4 as examples, they are stored in the Map like this:
    {
      0: [1, 3]
      4: [1, 3, 5, 7]
    }
  *
  * Initialize a counter to keep track of the number of days.
  * Merge each of the 3 input arrays into a single array.
  * Iterate over the merged array and check if an element has an updated state (1).
  * If yes, move to the next element.
  * If not, using the Map, check to see if the non-updated element has any adjacent element that is updated.
  * If yes, update the element to a 1 and move on to the next element.
  * If not, move to the next element.
  * The first iteration of the loop represents a day so counter incremented by 1.
  * Keep iterating until all elements in the merged array are updated.
	* Return the counter
 */

type MapType = Map<number, number[]>

const getIndexesOfAdjacentElements = (): MapType => {
	const adjacentElementsIndexes: MapType = new Map()
	adjacentElementsIndexes.set(0, [1, 3])
	adjacentElementsIndexes.set(1, [0, 2, 4])
	adjacentElementsIndexes.set(2, [1, 5])
	adjacentElementsIndexes.set(3, [0, 4, 6])
	adjacentElementsIndexes.set(4, [1, 3, 5, 7])
	adjacentElementsIndexes.set(5, [2, 4, 8])
	adjacentElementsIndexes.set(6, [3, 7])
	adjacentElementsIndexes.set(7, [6, 8, 4])
	adjacentElementsIndexes.set(8, [5, 7])

	return adjacentElementsIndexes
}

const updateAllServers = (
	array1: number[],
	array2: number[],
	array3: number[]
): number => {
	const adjacentElementsIndexes = getIndexesOfAdjacentElements()
	let mergedArray = [...array1, ...array2, ...array3]
	let numberOfDays: number = 0

	while (true) {
		// Check if every element has an updated state of 1
		let allServersUpdated = mergedArray.every(element => element === 1)

		if (!allServersUpdated) {
			mergedArray = mergedArray.map((element, index, array) => {
				if (element === 0) {
					// Get the indexes of all adjacent elements for the current element
					const adjacentElements = adjacentElementsIndexes.get(index)

					// Loop to see if any of them has updated state (1)
					adjacentElements?.forEach(elem => {
						if (array[elem] === 1) {
							element = 1
							return
						}
					})
				}

				return element
			})

			numberOfDays++
		} else {
			break
		}
	}

	return numberOfDays
}

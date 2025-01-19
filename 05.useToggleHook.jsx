import React, { useEffect, useState } from 'react'
// Implement the useToggle() hook in React that
// accepts an array of values and the start index and toggles the next value in the array.
// If the index reaches to the last index of the array, reset the index.
function useToggle(values, startIndex = 0) {
	const [index, setIndex] = useState(startIndex)
	// the toggle handler
	const toggle = () => {
		setIndex((prevIndex) =>
			prevIndex + 1 <= values.length - 1 ? prevIndex + 1 : startIndex
		)
	}
	return [values[index], toggle]
}
function App() {
	// call the hook which returns, the current value and the toggled function
	const [currentValue, toggleValue] = useToggle(['a', 'b', 'c', 'd'], 0)
	return (
		<button onClick={toggleValue}> "currentValue" : {currentValue}</button>
	)
}

export default App

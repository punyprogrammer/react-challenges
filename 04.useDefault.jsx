import React, { useEffect, useState } from 'react'

function useDefault(initialValue, defaultValue = null) {
	// This hook will set value to default value if the value becomes null or undefined
	const [value, setValue] = useState(initialValue)
	if (typeof value === 'undefined' || value === null) {
		return [defaultValue, setValue]
	}
	return [value, setValue]
}

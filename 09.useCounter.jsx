import { useState, useCallback } from 'react';

function useCounter(startingValue = 0, options = {}) {
  const { min = -Infinity, max = Infinity } = options;

  // Validate the starting value
  if (typeof startingValue !== 'number') {
    throw new Error('Starting value must be a number.');
  }
  if (typeof min === 'number' && startingValue < min) {
    throw new Error(`Starting value (${startingValue}) should not be less than min (${min}).`);
  }
  if (typeof max === 'number' && startingValue > max) {
    throw new Error(`Starting value (${startingValue}) should not be greater than max (${max}).`);
  }

  const [count, setCount] = useState(startingValue);

  // Memoized increment function
  const increment = useCallback(() => {
    setCount((prevCount) => {
      const newCount = prevCount + 1;
      return newCount > max ? max : newCount;
    });
  }, [max]);

  // Memoized decrement function
  const decrement = useCallback(() => {
    setCount((prevCount) => {
      const newCount = prevCount - 1;
      return newCount < min ? min : newCount;
    });
  }, [min]);

  // Memoized set function
  const set = useCallback((value) => {
    if (typeof value !== 'number') {
      throw new Error('Value must be a number.');
    }
    if (value < min || value > max) {
      throw new Error(`Value (${value}) must be between min (${min}) and max (${max}).`);
    }
    setCount(value);
  }, [min, max]);

  // Memoized reset function
  const reset = useCallback(() => {
    setCount(startingValue);
  }, [startingValue]);

  return [
    count,
    {
      increment,
      decrement,
      set,
      reset,
    },
  ];
}

export default useCounter;

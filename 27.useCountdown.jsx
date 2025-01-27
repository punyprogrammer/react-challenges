import * as React from "react";
function useCountdown(endTime, { interval = 1000, onTick, onComplete }) {
  const [remainingTime, setRemainingTime] = React.useState(
    Math.max(0, endTime - Date.now()) // Initial remaining time
  );

  React.useEffect(() => {
    // Stop the effect if `endTime` has already passed
    if (remainingTime <= 0) {
      onComplete?.();
      return;
    }

    const timerId = setInterval(() => {
      const currentTime = Date.now();
      const timeLeft = Math.max(0, endTime - currentTime);

      // Update remaining time
      setRemainingTime(timeLeft);

      // Call onTick with the updated time
      onTick?.(timeLeft);

      // Clear the interval if the countdown is complete
      if (timeLeft === 0) {
        clearInterval(timerId);
        onComplete?.();
      }
    }, interval);

    // Cleanup function to clear the interval on unmount or dependency changes
    return () => clearInterval(timerId);
  }, [endTime, interval, onTick, onComplete]);

  return remainingTime; // Return the remaining time
}

export default function App() {
  const [endTime, setEndTime] = React.useState(new Date(Date.now() + 10000));
  const [complete, setComplete] = React.useState(false);

  const count = useCountdown(endTime, {
    interval: 1000,
    onTick: () => console.log("tick"),
    onComplete: (time) => setComplete(true),
  });

  const handleClick = (time) => {
    if (complete === true) return;
    const nextTime = endTime.getTime() + time;
    setEndTime(new Date(nextTime));
  };

  return (
    <section>
      <header>
        <h1>useCountdown</h1>
      </header>
      <span className="countdown">{count}</span>
      {complete === false && (
        <div className="button-row">
          <button onClick={() => handleClick(5000)}>+5s</button>
          <button onClick={() => handleClick(10000)}>+10s</button>
          <button onClick={() => handleClick(15000)}>+15s</button>
        </div>
      )}
    </section>
  );
}

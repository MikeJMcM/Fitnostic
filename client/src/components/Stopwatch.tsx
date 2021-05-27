import React from 'react';
import useTimer from '../hooks/useTimer';
import { formatTime } from '../utils';
import './Stopwatch.css';

const Stopwatch = () => {
  const { timer, isActive, handleToggle, reset } = useTimer(0)

  return (
    <div>
    <div className="Stopwatch box" onClick={handleToggle}>
    <p>{formatTime(timer)}</p>

      </div>
      {/* <button onClick={reset} disabled={!isActive}>Reset</button> */}
    </div>
  );
}

export default Stopwatch;
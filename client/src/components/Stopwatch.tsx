import React from 'react';
import useTimer from '../hooks/useTimer';
import { formatTime } from '../utils';
import './Stopwatch.css';

const Stopwatch = () => {
  const { timer, isActive, isPaused, handleToggle, reset } = useTimer(0)



  return (
    <div>
    <div className="Stopwatch box" onClick={handleToggle}>
    <p>{formatTime(timer)}</p>
         {/* <h3>React Stopwatch</h3>
        <div className='stopwatch-card'>
          <p>{formatTime(timer)}</p>
          <div className='buttons'>
            {
              !isActive && !isPaused ?
                <button onClick={handleStart}>Start</button>
                : (
                  isPaused ? <button onClick={handlePause}>Pause</button> :
                    <button onClick={handleResume}>Resume</button>
                )
            }
            <button onClick={handleReset} disabled={!isActive}>Reset</button>
          </div>
        </div>  */}
      </div>
      <button onClick={reset} disabled={!isActive}>Reset</button>
    </div>
  );
}

export default Stopwatch;
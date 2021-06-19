import { MouseEventHandler } from 'react';
import useTimer from '../hooks/useTimer';
import './Stopwatch.css';

type StopwatchProps = {
  timer:number,
  handleToggle:MouseEventHandler<HTMLDivElement>
}

const Stopwatch = (props: StopwatchProps) => {
  
  const formatTime = (milliseconds: number) => {
    if(milliseconds % 1000 == 0) console.log(milliseconds);
    
    let seconds = milliseconds / 1000;
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    let formatSeconds = `${Math.floor(seconds) % 60}s`;
    let formatMinutes = minutes > 0 ? `${minutes % 60}m ` : '';
    let formatHours = hours > 0 ? `${hours}h ` : '';

    return `${formatHours}${formatMinutes}${formatSeconds}`
  }

  return (
    <div>
    <div className="Stopwatch box" onClick={props.handleToggle}>
    <p>{formatTime(props.timer)}</p>

      </div>
      {/* <button onClick={reset} disabled={!isActive}>Reset</button> */}
    </div>
  );
}

export default Stopwatch;
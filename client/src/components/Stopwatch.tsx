import useTimer from '../hooks/useTimer';
import { formatTime } from '../utils';
import './Stopwatch.css';

const Stopwatch = ({initialState}: {initialState: number}) => {
  const { timer, handleToggle, reset } = useTimer(initialState)

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
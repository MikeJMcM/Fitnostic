import { useState, useEffect, useContext } from 'react';
import { PlanContext } from '../context/PlanContext';
import { DispatchType, WorkoutStatus } from '../interfaces/WorkoutPlans';

type TimerProps = {
  initialState:number,
  isActive:boolean
}


const useTimer = (props:TimerProps) => {
    const [timer, setTimer] = useState(props.initialState);
    const [isActive, setIsActive] = useState(props.isActive);
    const { state , dispatch } = useContext(PlanContext);

    const handleToggle = () => {
        dispatch( {type: DispatchType.SET_STATUS, status: WorkoutStatus.InProgress} );
        setIsActive(!isActive);
    }

    function reset() {
        setTimer(0);
        setIsActive(false);
    }

    useEffect(() => {
      const pause = () => {
        setIsActive(false);
      }

        let interval: number | null = null;
        if(state.data.status === WorkoutStatus.Done) pause();
        if (isActive) {
          interval = window.setInterval(() => {
            setTimer(ms => ms + 100);
          }, 100);
        } else if (!isActive && timer !== 0) {
          window.clearInterval(interval || 0);
        }
        return () => window.clearInterval(interval || 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [isActive, timer, state.data.status]);

    return { timer, setTimer, isActive, setIsActive, handleToggle, reset }
}

export default useTimer
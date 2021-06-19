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
        let newStatus = (state.data.status === WorkoutStatus.Paused ? WorkoutStatus.Started : WorkoutStatus.Paused);
        setIsActive(newStatus === WorkoutStatus.Paused ? false : true);
        dispatch( {type: DispatchType.SET_STATUS, status: newStatus} );
    }

    function reset() {
        setTimer(0);
        setIsActive(false);
        dispatch( {type: DispatchType.SET_STATUS, status:WorkoutStatus.Paused} );
    }

    useEffect(() => {
      const pause = () => {
        setIsActive(false);
        dispatch( {type: DispatchType.SET_STATUS, status:WorkoutStatus.Paused} );
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
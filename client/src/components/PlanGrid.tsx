import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Stopwatch from './Stopwatch';
import CurrentSetCheckbox from './CurrentSetCheckbox';
import InteractiveList from './InteractiveList';
import { DispatchType, WorkoutStatus } from '../interfaces/WorkoutPlans';
import { useContext, useState } from 'react';
import { PlanContext } from '../context/PlanContext';
import PlanMenu from './PlanMenu';
import useTimer from '../hooks/useTimer';

export default function PlanGrid() {
  const { timer, setTimer, setIsActive, handleToggle, reset } = useTimer({initialState:0, isActive:false});
const [planId, setPlanId] = useState<number>(1);
const { state , dispatch } = useContext(PlanContext);

const fetchPlan = async () => {
  console.log(state);
  let ignore = false;
  dispatch({type: DispatchType.REQUEST});
  try{
    const response = await fetch(`/api/plans/${planId}`);
    const data = await response.json();

    setTimer(0);
    dispatch({type: DispatchType.SET_STATUS, status: WorkoutStatus.PreStart});
    dispatch({ type: DispatchType.SUCCESS, results: data });

  } catch (e) {
    dispatch({ type: DispatchType.FAILURE, error: e })
  }
  return () => { ignore = true; }
};

const startPlan = async () => {
  let ignore = false;
  try{
    dispatch({type: DispatchType.SET_STATUS, status: WorkoutStatus.InProgress});
    setIsActive(true);
  } catch (e) {
    dispatch({ type: DispatchType.FAILURE, error: e })
  }
  return () => { ignore = true; }
}

//TODO new display for done (stats, rating of workout etc)
  return state.data.status === WorkoutStatus.InProgress || state.data.status === WorkoutStatus.Done
  ? (<div>
    <PlanMenu/>
    <h1>{state.data.name}</h1>
        <Grid container spacing={3}>
            <Grid item xs>
              <CurrentSetCheckbox currentSet={state.data.sets[state.data.currentSetIndex]} currentTime={timer}/>
            </Grid>
            <Grid item xs>
              <Stopwatch timer={timer} handleToggle={handleToggle}/>
            </Grid>
            <Grid item xs>
              <InteractiveList sets={state.data.sets}/>
            </Grid>
        </Grid>
        <Button variant="contained" onClick= {() => { fetchPlan() }}>Test load plan 1</Button>
    </div>)
  : (<div>
    <h1>{state.data.name}</h1>
    <InteractiveList sets={state.data.sets}/>
    <Button variant="contained" onClick= {() => { startPlan() }}>Start</Button>
  </div>)
      
}
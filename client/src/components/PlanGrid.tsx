import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Stopwatch from './Stopwatch';
import CurrentSetCheckbox from './CurrentSetCheckbox';
import InteractiveList from './InteractiveList';
import { ClientSideWorkoutPlan, DispatchType, WorkoutSet } from '../interfaces/WorkoutPlans';
import { useContext, useEffect, useState } from 'react';
import { PlanContext } from '../context/PlanContext';
import PlanMenu from './PlanMenu';

export default function PlanGrid() {
const [planId, setPlanId] = useState<number>(1);
const { state , dispatch } = useContext(PlanContext);

const fetchPlan = async () => {
  let ignore = false;
  dispatch({type: DispatchType.REQUEST});
  try{
    const response = await fetch(`/api/plans/${planId}`);
    const data = await response.json();
    dispatch({ type: DispatchType.SUCCESS, results: data });
  } catch (e) {
    dispatch({ type: DispatchType.FAILURE, error: e })
  }
  return () => { ignore = true; }
};

//TODO replace props with context (should I?)
  return (
      <div>
        <PlanMenu/>
            <Grid container spacing={3}>
                <Grid item xs>
                  <CurrentSetCheckbox currentSet={state.data.sets[state.data.currentSetIndex]}/>
                </Grid>
                <Grid item xs>
                  <Stopwatch initialState={state.data.time}/>
                </Grid>
                <Grid item xs>
                  <InteractiveList sets={state.data.sets}/>
                </Grid>
            </Grid>
            <Button variant="contained" onClick= {() => { fetchPlan() }}>Test load plan 1</Button>
        </div>
    )
}
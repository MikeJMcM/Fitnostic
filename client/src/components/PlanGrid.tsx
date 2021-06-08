import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Stopwatch from './Stopwatch';
import { makeStyles } from '@material-ui/core/styles';
import CurrentItemCheckbox from './CurrentItemCheckbox';
import InteractiveList from './InteractiveList';
import { ClientSideWorkoutPlan, DispatchType, WorkoutSet } from '../interfaces/WorkoutPlans';
import { useContext, useEffect, useState } from 'react';
import { PlanContext } from '../context/PlanContext';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    }
  }));

type PlanGridProps = {
  plan: ClientSideWorkoutPlan,
  status: string
}

export default function PlanGrid() {
const classes = useStyles();
const [planId, setPlanId] = useState<number>(1);
const { state , dispatch } = useContext(PlanContext);

//example dispatch call
const fetchPlan = async () => {
  let ignore = false;
  dispatch({type: DispatchType.REQUEST});
  try{
    const response = await fetch(`/api/plans/${planId}`);
    const data = await response.json();
    dispatch({ type: DispatchType.SUCCESS, results: data }); 
    console.log(state);
  } catch (e) {
    dispatch({ type: DispatchType.FAILURE, error: e })
  }
  return () => { ignore = true; }
};

const nextWorkoutSet = async () => {
  let ignore = false;
  try{
    dispatch({ type: DispatchType.NEXT_SET }); 
    console.log(state);
  } catch (e) {
    dispatch({ type: DispatchType.FAILURE, error: e })
  }
  return () => { ignore = true; }
};

const prevWorkoutSet = async () => {
  let ignore = false;
  try{
    dispatch({ type: DispatchType.PREV_SET }); 
    console.log(state);
  } catch (e) {
    dispatch({ type: DispatchType.FAILURE, error: e })
  }
  return () => { ignore = true; }
};

//TODO replace props with context (should I?)
  return (
      <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs>
                  <CurrentItemCheckbox currentSet={state.data.sets[0]}/>
                </Grid>
                <Grid item xs>
                  <Stopwatch initialState={state.data.time}/>
                </Grid>
                <Grid item xs>
                  <InteractiveList sets={state.data.sets}/>
                </Grid>
            </Grid>
            <Button variant="contained" onClick= {() => { fetchPlan() }}>Test load plan 1</Button>
            <Button variant="contained" onClick= {() => { nextWorkoutSet() }}>set bottom set to Done</Button>
            <Button variant="contained" onClick= {() => { prevWorkoutSet() }}>set top set to not Done</Button>
        </div>
    )
}
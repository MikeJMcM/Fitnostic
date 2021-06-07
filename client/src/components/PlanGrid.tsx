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
const [currentSet, setCurrentSet] = useState<WorkoutSet>();
const [currentTime, setCurrentTime] = useState<number>();
const [remainingSets, setremainingSets] = useState<WorkoutSet[]>();
const { state ,dispatch } = useContext(PlanContext);

// useEffect(() => {
//   let ignore = false;
 
//   dispatch({ type: 'request' });
//   fetch(`/api/plans/${planId}`)
//   .then((results) => {
//     console.log(results); 
//     if (!ignore) 
//       dispatch({ type: 'success', results: results.json() }); 
//   },
//   (error) => 
//   dispatch({ type: 'failure', error }),
//   )
 
//   return () => { ignore = true; }
//   }, [planId]);

//example dispatch call
const fetchPlan = async () => {
  let ignore = false;
  dispatch({type: DispatchType.REQUEST});
  try{
    const response = await fetch(`/api/plans/${planId}`);
    const data = await response.json();
    console.log(planId);
    console.log(data);
    dispatch({ type: DispatchType.SUCCESS, results: data }); 
    console.log(state);
  } catch (e) {
    dispatch({ type: DispatchType.FAILURE, error: e })
  }
  return () => { ignore = true; }
};
  //either State.data? can be left as optional 
  //OR
  //use useStates with handlefunctions that call sets to update the values once fetchs are done (or on future change state functions)
  //currently trying 2nd approach using https://codesandbox.io/s/context-reducer-ts-9ctis?file=/src/List.tsx
  return (
      <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs>
                  <CurrentItemCheckbox currentSet={state.data.currentSet}/>
                </Grid>
                <Grid item xs>
                  <Stopwatch initialState={state.data.time}/>
                </Grid>
                <Grid item xs>
                  <InteractiveList sets={state.data.remainingSets}/>
                </Grid>
            </Grid>
            <Button variant="contained" onClick= {() => { fetchPlan() }}>Default</Button>
        </div>
    )
}
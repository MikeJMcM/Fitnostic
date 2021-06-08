import React, { useReducer, createContext, Dispatch } from "react";
import { ClientSideWorkoutPlan, DispatchType, WorkoutPlan, WorkoutStatus } from "../interfaces/WorkoutPlans";
import { findLastIndex } from '../utils'


const initialPlan: WorkoutPlan = {
    "id":1,
    "name":"HIIT 300",
    "sets":[{"name":"Burpees","reps":25, "done": false},{"name":"Bodyweight Squats","reps":50, "done": false},{"name":"Pushups","reps":50, "done": false},{"name":"Jump Squats","reps":50, "done": false},{"name":"V Ups","reps":50, "done": false},{"name":"Mountain Climbers","reps":50, "done": false},{"name":"Burpees","reps":25, "done": false}]
}
const initialState: ClientSideWorkoutPlan = {
    name: initialPlan.name,
    time: 0,
    status: WorkoutStatus.Paused,
    sets: initialPlan.sets,
    plan: initialPlan
}

type State = {
    data: ClientSideWorkoutPlan;
    isLoading: boolean;
    error?: string;
   }

type Action = 
   | { type: 'REQUEST' }
   | { type: 'SUCCESS', results: WorkoutPlan} 
   | { type: 'FAILURE', error:string }
   | { type: 'NEXT_SET' }
   | { type: 'PREV_SET' };

//TODO dont load new plan in SUCCESS if there is unsaved changes, for now just overwrite
function fetchPlanReducer(state: State, action: Action): State {
    switch (action.type) {
        case DispatchType.REQUEST:
            return { isLoading: true, data: { ...state.data } };
        case DispatchType.SUCCESS:
            return { isLoading: true, data: {plan: action.results, 
                                            name: action.results.name, 
                                            time: 0, 
                                            status: WorkoutStatus.Paused, 
                                            sets: action.results.sets}};
        case DispatchType.FAILURE:
            return { isLoading: true, data: { ...state.data }, error: action.error };
        case DispatchType.NEXT_SET:
            if(state.data.sets.every(x => x.done))
                return { isLoading: true, data: { ...state.data } };
            const nextSetToMarkAsDoneIndex = state.data.sets.findIndex(x => !x.done);
            state.data.plan.sets[nextSetToMarkAsDoneIndex].done = true;
            return { isLoading: true, data: {...state.data}};
        case DispatchType.PREV_SET:
            if(state.data.sets.every(x => !x.done))
                return { isLoading: true, data: { ...state.data } };
            const nextSetToMarkAsNotDoneIndex = findLastIndex(state.data.sets, x => x.done);
            state.data.plan.sets[nextSetToMarkAsNotDoneIndex].done = false;
            return { isLoading: true, data: {...state.data}};
        default:
            return state;
    }
}

export const PlanContext = createContext<{state: State; dispatch: Dispatch<Action>}>({state: {isLoading: false, data: initialState},dispatch: () => null});

export const PlanContextProvider = (props: { children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }) => {
    const [state, dispatch] = useReducer(fetchPlanReducer, {isLoading: false, data: initialState});
  
    return (
      <PlanContext.Provider value={{state, dispatch}}>
        {props.children}
      </PlanContext.Provider>
    );
  };

function init(loading: boolean) {
    return { isLoading: loading };
}


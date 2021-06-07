import React, { useReducer, createContext, Dispatch } from "react";
import { ClientSideWorkoutPlan, DispatchType, WorkoutPlan, WorkoutStatus } from "../interfaces/WorkoutPlans";



const initialPlan: WorkoutPlan = {
    "id":1,
    "name":"HIIT 300",
    "sets":[{"name":"Burpees","reps":25},{"name":"Bodyweight Squats","reps":50},{"name":"Pushups","reps":50},{"name":"Jump Squats","reps":50},{"name":"V Ups","reps":50},{"name":"Mountain Climbers","reps":50},{"name":"Burpees","reps":25}]
}
const initialState: ClientSideWorkoutPlan = {
    name: initialPlan.name,
    time: 0,
    status: WorkoutStatus.Paused,
    currentSet: initialPlan.sets.shift(),
    remainingSets: initialPlan.sets,
    completedSets: [],
    plan: initialPlan
}

type State = {
    data: ClientSideWorkoutPlan;
    isLoading: boolean;
    error?: string;
   }

type Action = 
   | { type: 'request' }
   | { type: 'success', results: WorkoutPlan} 
   | { type: 'failure', error:string };

//TODO dont load new plan in SUCCESS if there is unsaved changes, for now just overwrite
function fetchPlanReducer(state: State, action: Action): State {
    switch (action.type) {
        case DispatchType.REQUEST:
            return { isLoading: true, data: state.data };
        case DispatchType.SUCCESS:
            return { isLoading: true, data: {...initialState, plan: action.results, name: action.results.name, currentSet: action.results.sets.shift(), remainingSets: action.results.sets} };
        case DispatchType.FAILURE:
            return { isLoading: true, data: state.data, error: action.error };
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


export interface BaseWorkoutPlan {
    name: string;
    sets: WorkoutSet[];
}

export interface WorkoutPlan extends BaseWorkoutPlan{
    id: number;
    completionTime: number;
}

export interface WorkoutSet {
    name: string;
    reps: number;
    done: boolean;
    doneTime: number;
}

export interface WorkoutPlans {
    [key: number]: WorkoutPlan;
  }
//TODO clean this up so it matches server models exactly
  export interface ClientSideWorkoutPlan {
    name: string,
    time: number,
    currentSetIndex: number,
    status: WorkoutStatus,
    sets: WorkoutSet[],
    plan: WorkoutPlan
}
export enum WorkoutStatus {
    Paused,
    Started,
    Done
}

export enum DispatchType {
     REQUEST = 'REQUEST',
     SUCCESS = 'SUCCESS',
     FAILURE = 'FAILURE',
     INITIAL = 'INITIAL',
     FETCH_PLAN = 'FETCH_PLAN',
     NEXT_SET = 'NEXT_SET',
     PREV_SET = 'PREV_SET',
     UPDATE_TIME = 'UPDATE_TIME'
}
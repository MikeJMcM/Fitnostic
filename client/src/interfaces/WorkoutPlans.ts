export interface BaseWorkoutPlan {
    name: string;
    sets: WorkoutSet[];
}

export interface WorkoutPlan extends BaseWorkoutPlan{
    id: number;
}

export interface WorkoutSet {
    name: string;
    reps: number;
}

export interface WorkoutPlans {
    [key: number]: WorkoutPlan;
  }

  export interface ClientSideWorkoutPlan {
    name: string,
    time: number,
    status: WorkoutStatus,
    currentSet?: WorkoutSet,
    remainingSets: WorkoutSet[],
    completedSets: WorkoutSet[],
    plan: WorkoutPlan
}
export enum WorkoutStatus {
    Paused,
    Started,
    Done
}

export enum DispatchType {
     REQUEST = 'request',
     SUCCESS = 'success',
     FAILURE = 'failure',
     INITIAL = 'INITIAL',
     FETCH_PLAN = 'FETCH_PLAN',
     NEXT_SET = 'NEXT_SET',
     PREV_SET = 'PREV_SET'
}
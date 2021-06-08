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
    done: boolean;
}

export interface WorkoutPlans {
    [key: number]: WorkoutPlan;
  }

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
     PREV_SET = 'PREV_SET'
}
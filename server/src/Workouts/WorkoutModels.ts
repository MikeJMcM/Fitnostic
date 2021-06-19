export interface BaseWorkoutPlan {
    name: string;
    completionTime: number;
    sets: WorkoutSet[];
}

export interface WorkoutPlan extends BaseWorkoutPlan{
    id: number;
    
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

  //TODO dont duplicate interfaces jesus christ, combine client and server interfaces to 1 reference
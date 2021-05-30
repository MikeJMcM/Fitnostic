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
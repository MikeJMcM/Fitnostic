
/**
 * Data Model Interfaces
 */

import { WorkoutPlan, BaseWorkoutPlan, WorkoutPlans } from "./WorkoutModels";


/**
 * In-Memory Store //temp for testing before setting up mongodb TODO REMOVE
 */
let workoutPlans: WorkoutPlans = {
  1: {id: 1, name: "HIIT 300", completionTime:0, sets: [
      {
          "name":"Burpees",
          "reps":25,
          "done":false,
          "doneTime":0
      },
      {
          "name":"Bodyweight Squats",
          "reps":50,
          "done":false,
          "doneTime":0
      },
      {
          "name":"Pushups",
          "reps":50,
          "done":false,
          "doneTime":0
      },
      {
          "name":"Jump Squats",
          "reps":50,
          "done":false,
          "doneTime":0
      },
      {
          "name":"V Ups",
          "reps":50,
          "done":false,
          "doneTime":0
      },
      {
          "name":"Mountain Climbers",
          "reps":50,
          "done":false,
          "doneTime":0
      },
      {
          "name":"Burpees",
          "reps":25,
          "done":false,
          "doneTime":0
      }
  ]}
};

/**
 * Service Methods
 */
 export const findAll = async (): Promise<WorkoutPlan[]> => Object.values(workoutPlans);

 export const find = async (id: number): Promise<WorkoutPlan> => workoutPlans[id]!;

 export const create = async (newItem: BaseWorkoutPlan): Promise<WorkoutPlan> => {
    const id = new Date().valueOf();
  
    workoutPlans[id] = {
      id,
      ...newItem,
    };
  
    return workoutPlans[id]!;
};

export const update = async (
    id: number,
    itemUpdate: BaseWorkoutPlan
  ): Promise<WorkoutPlan | null> => {
    const item = await find(id);
  
    if (!item) {
      return null;
    }
  
    workoutPlans[id] = { id, ...itemUpdate };
  
    return workoutPlans[id]!;
};


export const remove = async (id: number): Promise<null | void> => {
    const item = await find(id);
  
    if (!item) {
      return null;
    }
  
    delete workoutPlans[id];
  };
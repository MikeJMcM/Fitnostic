/**
 * Required External Modules and Interfaces
 */
import express, {Request, Response} from 'express';
import * as WorkoutService from './WorkoutService';
import {BaseWorkoutPlan, WorkoutPlan} from './WorkoutModels';

/**
 * Router Definition
 */
export const workoutController = express.Router();

/**
 * Controller Definitions
 */

// GET items
workoutController.get("/", async (_req: Request, res: Response) => {
    try {
        const plans: WorkoutPlan[] = await WorkoutService.findAll();

        res.status(200).send(plans);
    } catch (e) {
        res.status(500).send(e.message);
    }
})
// GET items/:id
workoutController.get("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id!, 10);

    try{
        const plan: WorkoutPlan = await WorkoutService.find(id);

        if(plan) {
            return res.status(200).send(plan);
        }
        res.status(404).send("Plan not found");

    } catch (e) {
        res.status(500).send(e.message);
    }
})
// POST items
workoutController.post("/", async (req: Request, res: Response) => {
    try{
        const plan: BaseWorkoutPlan = req.body;
        const newPlan = await WorkoutService.create(plan);

        res.status(201).json(newPlan);

    } catch (e) {
        res.status(500).send(e.message);
    }
})
// PUT items/:id
workoutController.put("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id!, 10);

    try{
        const planUpdate: WorkoutPlan = req.body;
        const existingPlan: WorkoutPlan = await WorkoutService.find(id);

        if(existingPlan) {
            const updatedPlan = await WorkoutService.update(id, planUpdate);
            return res.status(200).json(updatedPlan);
        }
        
        const newPlan = await WorkoutService.create(planUpdate);
        res.status(201).json(newPlan);
    } catch (e) {
        res.status(500).send(e.message);
    }
})

// DELETE items/:id
workoutController.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id!, 10);
        await WorkoutService.remove(id);

        res.sendStatus(204);
    } catch (e) {
        res.status(500).send(e.message);
    }
})
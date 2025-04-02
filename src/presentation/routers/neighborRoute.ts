import express, { Router } from 'express';
import { NeighborController } from '../controllers/neighborController';

export default function setupNeighborRoutes(neighborController: NeighborController): Router{
    const router = Router()

    router.post('/availability', neighborController.availableTimeslots)
    router.post('/skills', neighborController.addSkills)
    router.post('/location', neighborController.availableLocation)
    
    router.get('/availability/:id', neighborController.getTimeslots)
    router.get('/skills/:id', neighborController.getSkills)
    router.get('/location/:id',neighborController.fetchLocation)
    
    return router
}
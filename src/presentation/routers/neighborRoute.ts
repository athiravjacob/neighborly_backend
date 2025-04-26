import express, { Router } from 'express';
import { NeighborController } from '../controllers/neighborController';
import verifyToken from '../middleware/authMiddleware';

export default function setupNeighborRoutes(neighborController: NeighborController): Router{
    const router = Router()

    router.post('/availability', verifyToken(['neighbor']) ,neighborController.availableTimeslots)
    router.post('/skills',verifyToken(['neighbor']), neighborController.addSkills)
    router.post('/location',verifyToken(['neighbor']), neighborController.availableLocation)
    router.patch('/uploadId',verifyToken(['neighbor']),neighborController.uploadId)
    
    router.get('/availability/:id',verifyToken(['neighbor']), neighborController.getTimeslots)
    router.get('/skills/:id',verifyToken(['neighbor']), neighborController.getSkills)
    router.get('/location/:id',verifyToken(['neighbor']), neighborController.fetchLocation)
    

    router.get('/available-neighbors',verifyToken(['user']), neighborController.availableNeighbors)
    router.get('/check-service-availability',verifyToken(['user']), neighborController.checkServiceAvailability)
    router.get('/fetchStatus',verifyToken(['neighbor']),neighborController.fetchVerificationStatus)
    return router
}
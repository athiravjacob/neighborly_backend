import express, { Router } from 'express';
import { NeighborController } from '../controllers/neighborController';
import verifyToken from '../middleware/authMiddleware';

export default function setupNeighborRoutes(neighborController: NeighborController): Router {
    const router = Router();
  
    // Availability
    router.post('/:neighborId/timeslots', verifyToken(['neighbor']), neighborController.availableTimeslots);
    router.get('/:neighborId/timeslots', verifyToken(['neighbor']), neighborController.getTimeslots);
  
    // Skills
    router.post('/:neighborId/skills', verifyToken(['neighbor']), neighborController.addSkills);
    router.get('/:neighborId/skills', verifyToken(['neighbor']), neighborController.getSkills);
  
    // Location
    router.post('/:neighborId/location', verifyToken(['neighbor']), neighborController.availableLocation);
    router.get('/:neighborId/location', verifyToken(['neighbor']), neighborController.fetchLocation);
  
    // Verification
    router.patch('/:neighborId/verification', verifyToken(['neighbor']), neighborController.uploadId);
    router.get('/:neighborId/verification/status', verifyToken(['neighbor']), neighborController.fetchVerificationStatus);
  
    // For users: finding neighbors & checking service
    router.get('/available', verifyToken(['user']), neighborController.availableNeighbors);
    router.get('/service-availability', verifyToken(['user']), neighborController.checkServiceAvailability);
  
    // Wallet
    router.get('/:neighborId/wallet', verifyToken(['neighbor']), neighborController.fetchWallet);
    
   //  Tasks
    router.get('/:neighborId/tasks',verifyToken(['neighbor','user']),neighborController.fetchAssignedTasks)
    return router;
  }
  
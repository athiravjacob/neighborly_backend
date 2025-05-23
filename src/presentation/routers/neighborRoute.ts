import express, { Router } from 'express';
import { NeighborController } from '../controllers/neighborController';
import verifyToken from '../middleware/authMiddleware';
import { Routes } from '../../shared/constants/routes';

export default function setupNeighborRoutes(neighborController: NeighborController): Router {
  const router = Router();

  // Availability
  router
    .route(Routes.NEIGHBORS.TIMESLOTS)
    .post(verifyToken(['neighbor']), neighborController.availableTimeslots)
    .get(verifyToken(['neighbor']), neighborController.getTimeslots);

  // Skills
  router
    .route(Routes.NEIGHBORS.SKILLS)
    .post(verifyToken(['neighbor']), neighborController.addSkills)
    .get(verifyToken(['neighbor']), neighborController.getSkills);

  // Location
  router
    .route(Routes.NEIGHBORS.LOCATION)
    .post(verifyToken(['neighbor']), neighborController.availableLocation)
    .get(verifyToken(['neighbor']), neighborController.fetchLocation);

  // Verification
  router
    .route(Routes.NEIGHBORS.VERIFICATION)
    .patch(verifyToken(['neighbor']), neighborController.uploadId);
  
  router
    .route(Routes.NEIGHBORS.VERIFICATION_STATUS)
    .get(verifyToken(['neighbor']), neighborController.fetchVerificationStatus);

  // For users
  router
    .route(Routes.NEIGHBORS.AVAILABLE)
    .get(verifyToken(['user']), neighborController.availableNeighbors);

  router
    .route(Routes.NEIGHBORS.SERVICE_AVAILABILITY)
    .get(verifyToken(['user']), neighborController.checkServiceAvailability);

  // Wallet
  router
    .route(Routes.NEIGHBORS.WALLET)
    .get(verifyToken(['neighbor']), neighborController.fetchWallet);

  // Transaction History
  router
    .route(Routes.NEIGHBORS.PAYMENT_HISTORY)
    .get(neighborController.getTransactionHistory);

  // Tasks 
  router
    .route(Routes.NEIGHBORS.TASKS)
    .get(verifyToken(['neighbor', 'user']), neighborController.fetchAssignedTasks);

  return router;
}

  
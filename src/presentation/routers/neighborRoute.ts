import express, { Router } from 'express';
import { NeighborController } from '../controllers/neighborController';
import verifyToken from '../middleware/authMiddleware';
import { Routes } from '../../shared/constants/routes';
import { Container } from '../../di/container';

export default function setupNeighborRoutes(neighborController: NeighborController): Router {
  const router = Router();

  // Schedule
  router
    .route(Routes.NEIGHBORS.SCHEDULE)
    .post(verifyToken(['neighbor'],Container.checkUserBanStatusUsecase), neighborController.weeklySchedule)
    .get(verifyToken(['neighbor'],Container.checkUserBanStatusUsecase), neighborController.getWeeklySchedule);

  // Skills
  router
    .route(Routes.NEIGHBORS.SKILLS)
    .post(verifyToken(['neighbor'],Container.checkUserBanStatusUsecase), neighborController.addSkills)
    .get(verifyToken(['neighbor'],Container.checkUserBanStatusUsecase), neighborController.getSkills);

  // Location
  router
    .route(Routes.NEIGHBORS.LOCATION)
    .post(verifyToken(['neighbor'],Container.checkUserBanStatusUsecase), neighborController.availableLocation)
    .get(verifyToken(['neighbor'],Container.checkUserBanStatusUsecase), neighborController.fetchLocation);

  // Verification
  router
    .route(Routes.NEIGHBORS.VERIFICATION)
    .patch(verifyToken(['neighbor'],Container.checkUserBanStatusUsecase), neighborController.uploadId);
  
  router
    .route(Routes.NEIGHBORS.VERIFICATION_STATUS)
    .get(verifyToken(['neighbor'],Container.checkUserBanStatusUsecase), neighborController.fetchVerificationStatus);

  // For users
  router
    .route(Routes.NEIGHBORS.AVAILABLE)
    .get(verifyToken(['user'],Container.checkUserBanStatusUsecase), neighborController.availableNeighbors);

  router
    .route(Routes.NEIGHBORS.SERVICE_AVAILABILITY)
    // .get(verifyToken(['user'],Container.checkUserBanStatusUsecase), neighborController.checkServiceAvailability);

  // Wallet
  router
    .route(Routes.NEIGHBORS.WALLET)
    .get(verifyToken(['neighbor'],Container.checkUserBanStatusUsecase), neighborController.fetchWallet);

  // Transaction History
  router
    .route(Routes.NEIGHBORS.PAYMENT_HISTORY)
    .get(neighborController.getTransactionHistory);

  // Tasks 
  router
    .route(Routes.NEIGHBORS.TASKS)
    .get(verifyToken(['neighbor', 'user'],Container.checkUserBanStatusUsecase), neighborController.fetchAssignedTasks);

  return router;
}

  
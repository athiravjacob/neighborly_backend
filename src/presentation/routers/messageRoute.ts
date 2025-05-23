import { Router } from "express";
import { MessageController } from "../controllers/messageController";
import { Routes } from "../../shared/constants/routes";

export default function setupMessageRoutes(messageController: MessageController): Router {
  const router = Router();

  router.post(Routes.MESSAGES.SEND, messageController.sendMessage);
  router.get(Routes.MESSAGES.CONVERSATION, messageController.getConversation);

  return router;
}

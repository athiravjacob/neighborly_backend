import { Router } from "express";
import { MessageController } from "../controllers/messageController";

export default function setupMessageRoutes(messageController: MessageController): Router {
  const router = Router();

  router.post("/", messageController.sendMessage);
  router.get("/:userId1/:userId2", messageController.getConversation);

  return router;
}

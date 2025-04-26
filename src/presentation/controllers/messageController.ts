// presentation/controllers/messageController.ts

import { Request, Response, NextFunction } from "express";
import { SendMessageUseCase } from "../../application/usecases/message/sendMessageUsecase";
import { IMessageRepository } from "../../domain/interface/repositories/IMessageRepository";
import { GetMessagesUseCase } from "../../application/usecases/message/getMessageUsecase";
import { successResponse } from "../../shared/utils/responseHandler";


export class MessageController {
    constructor(
        private sendMessageUseCase: SendMessageUseCase,
        private getMessagesUseCase: GetMessagesUseCase
      ) {}

  sendMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { senderId, receiverId, content } = req.body;
      const message = await this.sendMessageUseCase.execute(senderId, receiverId, content);
      successResponse(res,200,"message send",message)

    } catch (err) {
      next(err);
    }
  };

  getConversation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId1, userId2 } = req.params;
      const messages = await this.getMessagesUseCase.execute(userId1, userId2);
      res.status(200).json(messages);
    } catch (err) {
      next(err);
    }
  };
}

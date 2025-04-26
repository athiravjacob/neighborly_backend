import { Message } from "../../../domain/entities/Message";
import { IMessageRepository } from "../../../domain/interface/repositories/IMessageRepository";

export class SendMessageUseCase {
  constructor(private messageRepo: IMessageRepository) {}

  async execute(senderId: string, receiverId: string, content: string): Promise<Message|undefined> {
    const message = new Message(
      undefined,
      senderId,
      receiverId,
      content,
      new Date(),
    );

    return await this.messageRepo.saveMessage(message);
  }
}

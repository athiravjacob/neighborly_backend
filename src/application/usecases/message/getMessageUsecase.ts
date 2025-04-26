import { Message } from "../../../domain/entities/Message";
import { IMessageRepository } from "../../../domain/interface/repositories/IMessageRepository";


export class GetMessagesUseCase {
  constructor(private messageRepo: IMessageRepository) {}

  async execute(user1Id: string, user2Id: string): Promise<Message[]> {
    return await this.messageRepo.getMessagesBetweenUsers(user1Id, user2Id);
  }
}

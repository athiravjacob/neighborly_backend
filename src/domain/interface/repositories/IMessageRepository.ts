import { Message } from "../../entities/Message";


export interface IMessageRepository {
  saveMessage(message: Message): Promise<Message |undefined>;
  getMessagesBetweenUsers(user1Id: string, user2Id: string): Promise<Message[]>;
}

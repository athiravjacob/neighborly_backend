import { Message } from "../../domain/entities/Message";
import { IMessageRepository } from "../../domain/interface/repositories/IMessageRepository";
import { MessageModel } from "../model/messageModel";


export class MessageRepository implements IMessageRepository {
  async saveMessage(message: Message): Promise<Message | undefined> {
    try {
      const created = await MessageModel.create({
        senderId: message.senderId,
        receiverId: message.receiverId,
        content: message.content,
        timestamp: message.timestamp,
      });
  
      if (!created) throw new Error("Error creating message");
  
      return JSON.parse(JSON.stringify(created));
    } catch (error) {
      console.error(error);
      return undefined; 
    }
  }
  

  async getMessagesBetweenUsers(user1Id: string, user2Id: string): Promise<Message[]> {
    const messages = await MessageModel.find({
      $or: [
        { senderId: user1Id, receiverId: user2Id },
        { senderId: user2Id, receiverId: user1Id }
      ]
    }).sort({ timestamp: 1 });

    return messages.map(msg => new Message(
      msg._id.toString(),
      msg.senderId.toString(),
      msg.receiverId.toString(),
      msg.content,
      msg.timestamp,
    ));
  }
}

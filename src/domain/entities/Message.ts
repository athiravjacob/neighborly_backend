
export class Message {
    constructor(
      public id: string | undefined,
      public senderId: string,
      public receiverId: string,
      public content: string,
      public timestamp: Date = new Date(),
    ) {}
  }
  
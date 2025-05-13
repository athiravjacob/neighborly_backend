import { Socket } from 'socket.io';
import { generateRoomId } from '../../shared/utils/generateRoomId';

export const chatSocketHandler = (socket: Socket) => {
  // console.log('User connected:', socket.id);

  socket.on('start-chat', (userId: string, neighborId: string) => {
    const roomId = generateRoomId(userId, neighborId);
    socket.join(roomId);
    // console.log(`User ${userId} joined room ${roomId}`);

    // socket.to(roomId).emit('message', {
    //   sender: 'System',
    //   text: 'Chat started!',
    // });
  });

  socket.on('send-message', (userId: string, neighborId: string, message: string) => {
    const roomId = generateRoomId(userId, neighborId);
    socket.to(roomId).emit('message', {
      sender: userId,
      text: message,
    });
    // console.log(`Message from ${userId} to ${neighborId}: ${message}`);
  });

  socket.on('disconnect', () => {
    // console.log('User disconnected:', socket.id);
  });
};

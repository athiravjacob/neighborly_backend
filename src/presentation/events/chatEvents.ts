import { Socket } from 'socket.io';
import { generateRoomId } from '../../shared/utils/generateRoomId';


export const chatSocketHandler = (socket: Socket) => {
  console.log('User connected:', socket.id);

  socket.on('start-chat', (userId: string, neighborId: string) => {
    const roomId = generateRoomId(userId, neighborId);
    socket.join(roomId);
    console.log(`User ${userId} joined room ${roomId}`);

    // Send system message to all room members, including the user who joined
    socket.nsp.to(roomId).emit('message', {
      sender: 'System',
    });
  });

  socket.on('send-message', (userId: string, neighborId: string, message: string) => {
    const roomId = generateRoomId(userId, neighborId);
    console.log(`Message from ${userId} to ${neighborId} in room ${roomId}: ${message}`);

    // Broadcast to all room members, including the sender
    socket.nsp.to(roomId).emit('message', {
      sender: userId,
      text: message,
    });
  });

  socket.on('typing', (userId: string, neighborId: string) => {
    const roomId = generateRoomId(userId, neighborId);
    console.log(`User ${userId} is typing in room ${roomId}`);
    socket.to(roomId).emit('typing');
  });

  socket.on('stop-typing', (userId: string, neighborId: string) => {
    const roomId = generateRoomId(userId, neighborId);
    console.log(`User ${userId} stopped typing in room ${roomId}`);
    socket.to(roomId).emit('stop-typing');
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
};

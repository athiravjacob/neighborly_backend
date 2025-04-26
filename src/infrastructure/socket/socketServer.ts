import { Server } from 'socket.io';
import http from 'http';
import { chatSocketHandler } from '../../presentation/events/chatEvents';

let io: Server;

export const initSocketServer = (server: http.Server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.ORGIN_URI,
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    chatSocketHandler(socket);
  });
};

export const getIO = (): Server => {
  if (!io) throw new Error("Socket.io not initialized!");
  return io;
};

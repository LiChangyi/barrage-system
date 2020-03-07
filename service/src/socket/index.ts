import * as IO from 'socket.io';
import { Server } from 'http';

import logger from '../utils/log4';

export default (server: Server) => {
  const io = IO(server);
  logger.info('socket 已启动');

  io.on('connection', (socket) => {
    socket.on('addBarrage', (msg) => {
      io.emit('receiveBarrage', msg);
    });
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
}
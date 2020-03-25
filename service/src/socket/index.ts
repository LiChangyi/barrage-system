import * as jwt from 'jsonwebtoken';
import { Socket } from 'socket.io';
import { Server } from 'http';
import * as _ from 'lodash';

import logger from '../utils/log4';
import { TOKEN_SUFFIX } from '../utils/constant';
import { Room } from '../model/room';
import redis from '../lib/redis';
import { ITokenUser } from '../types';
import { Types } from 'mongoose';
import { barrage2DB } from '../business';
import { Barrage, IBarrage } from '../model/barrage';
import auth from './auth';
import roomVerify from './roomVerify';

let io: any = null;

export default (server: Server) => {
  logger.info('socket 已启动');
  if (io) {
    return;
  }
  io = require('socket.io')(server);
  io.use(auth);
  io.use(roomVerify);
  io.on('connection', async (socket: Socket) => {
    socket.emit('systemMsg', {
      type: 'connectSuccsss',
      message: '连接服务成功'
    });
    
    socket.on('addBarrage', (params) => {
      const { uid, nickname } = socket.user;
      const _id = Types.ObjectId();
      const room = socket.currentRoom;
      const barrage: IBarrage = new Barrage({ 
        _id,
        content: params.content,
        color: params.color,
        user: uid,
        room 
      });
      barrage2DB(barrage);
      io.to(`room:${room}`).emit('receiveBarrage', Object.assign(barrage.toJSON(), { nickname }));
    });
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
}
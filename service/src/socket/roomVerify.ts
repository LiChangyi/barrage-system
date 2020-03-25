import { Socket } from "socket.io";
import * as _ from 'lodash';

import redis from "../lib/redis";

// socket 中间件, 房间验证
export default async (socket: Socket, next: any) => {
  let roomQuery = _.get(socket.handshake, 'query.room', '');
  let room = roomQuery;
  try {
    // 加入到房间
    if (roomQuery === 'own') {
      room = await redis().getAsync(`userRoom:${socket.user.uid}`);
    }
    const roomStr = `room:${room}`;
    const roomStatus = await redis().getAsync(roomStr);
    if (!roomStatus) {
      throw new Error();
    }
    socket.join(roomStr);
  } catch(err) {
    if (roomQuery === 'own') {
      next(new Error('roomError:房间未开启，请前往个人中心进行开启'));
    } else {
      next(new Error('roomError:加入房间失败'));
    }
    return
  }
  socket.currentRoom = room;
  next();
}
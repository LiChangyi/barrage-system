// websocket 处理
import { ipcRenderer } from 'electron';
import io from 'socket.io-client';
import { message } from 'antd';
import _ from 'lodash';

import { BASE_API, DISPLAY_WINDOW_ADD_ONE_BARRAGE } from '../utils/constant';
import store from '../store';
import { receiveOneBarrage } from '../store/barrage/action';

let socket = null;
// 重连时的message回调
let reconnectingMsgHide = null;

// 初始化事件
const initEvents = () => {
  socket.on('connect', () => {
    if (reconnectingMsgHide) {
      reconnectingMsgHide();
    }
    message.success('连接弹幕服务成功!');
  });
  socket.on('receiveBarrage', (data) => {
    store.dispatch(receiveOneBarrage(data));
    // 通知 display window
    const { open, openWindow } = store.getState().barrageConfigure.toJSON();
    if (open && openWindow) {
      ipcRenderer.send(DISPLAY_WINDOW_ADD_ONE_BARRAGE, data);
    }
  });
  socket.on('reconnecting', (num) => {
    reconnectingMsgHide = message.loading({
      content: `与弹幕服务器进行重连，第${num}次`,
      duration: 0,
      key: 'reconnecting'
    });
  });
};

// 发送mock弹幕
export const sendMockBarrage = (num = 100) => {
  if (socket) {
    for (let i = 0; i < num; i++) {
      // eslint-disable-next-line no-loop-func
      setTimeout(() => {
        socket.emit('addBarrage', {
          id: _.uniqueId(),
          nickname: `李昌义${i}`,
          content: `弹幕内容_${i}`,
          color: 'red'
        });
      }, _.random(1000, 5000));
    }
  }
};

// 创建连接
export const openConnect = () => {
  if (!socket) {
    socket = io(BASE_API);
    initEvents();
  }
  if (!socket.connected) {
    socket.open();
  }
};

// 断开连接
export const closeConnect = () => {
  if (!socket) {
    return true;
  }
  socket.close();
  if (reconnectingMsgHide) {
    reconnectingMsgHide();
  }
  message.success('成功关闭弹幕');
  return true;
};

export default {};

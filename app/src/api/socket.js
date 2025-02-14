// websocket 处理
import io from 'socket.io-client';
import { message } from 'antd';

import store from '../store';
import { receiveOneBarrage } from '../store/barrage/action';
import { syncBarrageToDisplayWin } from '../utils/showBarrageDisplayWin';

let socket = null;
// 重连时的message回调
let reconnectingMsgHide = null;

// 断开连接
export const closeConnect = () => {
  // message.success('断开连接成功');
  if (!socket) {
    return true;
  }
  socket.close();
  if (reconnectingMsgHide) {
    reconnectingMsgHide();
  }
  return true;
};

// 初始化事件
const initEvents = () => {
  socket.on('connect', () => {
    if (reconnectingMsgHide) {
      reconnectingMsgHide();
    }
  });
  socket.on('receiveBarrage', (data) => {
    store.dispatch(receiveOneBarrage(data));
    // 通知 display window
    const { openWindow } = store.getState().barrageConfigure.toJSON();
    if (openWindow) {
      syncBarrageToDisplayWin(data);
    }
  });
  socket.on('reconnect_attempt', () => {
    const { token } = store.getState().user.toJS();
    socket.io.opts.extraHeaders = {
      token
    };
  });
  socket.on('reconnecting', (num) => {
    reconnectingMsgHide = message.loading({
      content: `与弹幕服务器进行重连，第${num}次`,
      duration: 0,
      key: 'reconnecting'
    });
  });
  const systemMsgNotic = (data) => {
    if (['tokenError', 'roomError'].includes(data.type)) {
      message.error(data.message);
    } else if (['connectSuccsss'].includes(data.type)) {
      message.success('加入房间成功');
    } else {
      message.info(data.type + data.message);
    }
  };
  socket.on('systemMsg', (data) => {
    systemMsgNotic(data);
  });
  socket.on('error', (data) => {
    const [type, msg] = data.split(':');
    closeConnect();
    systemMsgNotic({ type, message: msg });
  });
};

// 创建连接
export const openConnect = (room = 'own') => {
  if (!socket) {
    const { serviceApi = '' } = store.getState().barrageConfigure.toJS();
    const { token } = store.getState().user.toJS();
    socket = io(serviceApi, {
      transportOptions: {
        polling: {
          extraHeaders: {
            token
          }
        }
      },
      query: {
        room
      }
    });
    initEvents();
    return;
  }
  if (!socket.connected) {
    socket.open();
  }
};

// 发送弹幕
export const sendBarrage = (data) => {
  socket.emit('addBarrage', data);
};

// 发送模拟弹幕
export const sendMockBarrage = () => {
  for (let i = 0; i < 1000; i++) {
    const data = {
      color: '#000',
      content: `测试弹幕${i}`,
      createAt: '2020-04-16T13:49:12.716Z',
      room: {
        _id: '5e6e2f7ef38942838cd77a89',
        roomname: '李昌义的直播间'
      },
      user: {
        _id: '5e5e3f06a7f6b11b1498dc16',
        username: 'licy',
        nickname: '李昌义'
      },
      __v: 0,
      _id: `5e9862587e8f9dafa895d04${i}`
    };
    store.dispatch(receiveOneBarrage(data));
    // 通知 display window
    syncBarrageToDisplayWin(data);
  }
};

export default {};

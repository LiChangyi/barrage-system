export const barragePositionMap = [
  {
    value: 'full',
    name: '全屏'
  },
  {
    value: 'half',
    name: '半屏'
  }
];

export const barrageDefaultConfigure = {
  position: 'full',
  colorful: true,
  open: true,
  openWindow: false
};

// 保存弹幕设置到本地的KEY
export const BARRAGE_CONFIGURE = 'barrageConfigure';

export const BASE_API = 'http://127.0.0.1:3000';

// display window 控制显示IPC event
export const DISPLAY_WINDOW_SHOW = 'IPC/DISPLAY_WINDOW_SHOW';
export const DISPLAY_WINDOW_HIDE = 'IPC/DISPLAY_WINDOW_HIDE';
// 修改display window显示弹幕的高度
export const CHANGE_DISPLAY_WINDOW_H = 'IPC/CHANGE_DISPLAY_WINDOW_H';
export const DISPLAY_WINDOW_ADD_ONE_BARRAGE = 'IPC/DISPLAY_WINDOW_ADD_ONE_BARRAGE';
// display window 接收主进程发送的数据
export const DISPLAY_WINDOW_RECEIVE = 'IPC/DISPLAY_WINDOW_RECEIVE';

export default {};

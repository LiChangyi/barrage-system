export const barrageDefaultConfigure = {
  position: 'full',
  colorful: true,
  openWindow: false,
  serviceApi: 'http://127.0.0.1:3000',
  fontColor: '#000'
};

// 保存弹幕窗口到本地的KEY
export const BARRAGE_CONFIGURE = 'barrageConfigure';
// 保存用户数据到本地
export const SAVE_USERINFO = 'userinfo';
// 用户名正则
export const USERNAME_REG = /^[a-zA-Z][a-zA-Z0-9]{3,11}$/;
// 密码正则
export const PASSWORD_REG = /^[a-zA-Z0-9]{6,12}$/;
// URL正则
export const URL_REG = /https?:\/\/([^/:]+)(:\d*)?/;

// display window 控制显示IPC event
export const DISPLAY_WINDOW_SHOW = 'IPC/DISPLAY_WINDOW_SHOW';
export const DISPLAY_WINDOW_HIDE = 'IPC/DISPLAY_WINDOW_HIDE';
// 修改display window显示弹幕的高度
export const CHANGE_DISPLAY_WINDOW_H = 'IPC/CHANGE_DISPLAY_WINDOW_H';
export const DISPLAY_WINDOW_ADD_ONE_BARRAGE = 'IPC/DISPLAY_WINDOW_ADD_ONE_BARRAGE';
// display window 接收主进程发送的数据
export const DISPLAY_WINDOW_RECEIVE = 'IPC/DISPLAY_WINDOW_RECEIVE';

export default { };

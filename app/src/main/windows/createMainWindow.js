import { BrowserWindow } from 'electron';
import path from 'path';
import isDev from '../../utils/isDev';

export default () => {
  const window = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      // 处理跨域，桌面端处理
      webSecurity: false
    }
  });
  window.webContents.openDevTools({ mode: 'detach' });
  const url = isDev() ? 'http://localhost:8080' : `file://${path.resolve(__dirname, '..')}/dist/renderer/index.html`;
  window.loadURL(url);

  return window;
};

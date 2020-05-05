import { BrowserWindow, app } from 'electron';
import isDev from '../../utils/isDev';

export default () => {
  const window = new BrowserWindow({
    width: 1000,
    height: 600,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      // 处理跨域，桌面端处理
      webSecurity: false
    }
  });

  let url = `file://${app.getAppPath()}/dist/renderer/index.html`;
  if (isDev()) {
    window.webContents.openDevTools({ mode: 'detach' });
    url = 'http://127.0.0.1:8080';
  }
  window.loadURL(url);

  return window;
};

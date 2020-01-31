import { BrowserWindow, screen } from 'electron';
import path from 'path';
import isDev from '../../utils/isDev';

export default () => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  const window = new BrowserWindow({
    width,
    height,
    transparent: true,
    frame: false,
    resizable: false,
    alwaysOnTop: true,
    center: true,
    skipTaskbar: true,
    autoHideMenuBar: true,
    focusable: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  window.setAlwaysOnTop(true, 'pop-up-menu');
  window.maximize();
  window.setIgnoreMouseEvents(true);
  // window.webContents.openDevTools({ mode: 'detach' });

  const url = isDev() ? 'http://localhost:8080/display' : `file://${path.resolve(__dirname, '..')}/dist/index.html/display`;
  window.loadURL(url);

  return window;
};

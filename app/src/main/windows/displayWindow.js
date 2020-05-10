import { BrowserWindow, screen } from 'electron';
import path from 'path';
import isDev from '../../utils/isDev';

// eslint-disable-next-line import/no-mutable-exports
export let displayWindow = null;
export const openDisplayWindow = () => {
  if (displayWindow) {
    if (displayWindow.open) {
      displayWindow.open();
    }
    return;
  }
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

  const url = isDev() ? 'http://127.0.0.1:8080/display' : `file://${path.resolve(__dirname, '..')}/dist/renderer/index.html/display`;
  window.loadURL(url);

  displayWindow = window;
  displayWindow.on('closed', () => {
    displayWindow = null;
  });
};

export const closeDisplayWindow = () => {
  if (displayWindow) {
    displayWindow.close();
  }
};


export default {};

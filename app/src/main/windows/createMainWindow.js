import { BrowserWindow } from 'electron';
import path from 'path';
import isDev from '../../utils/isDev';

export default () => {
  const window = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  const url = isDev() ? 'http://localhost:8080' : `file://${path.resolve(__dirname, '..')}/dist/index.html`;
  window.loadURL(url);

  return window;
};

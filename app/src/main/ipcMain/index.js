import { ipcMain } from 'electron';

import {
  closeDisplayWindow,
  openDisplayWindow,
  displayWindow
} from '../windows/displayWindow';
import {
  DISPLAY_WINDOW_SHOW,
  DISPLAY_WINDOW_HIDE,
  CHANGE_DISPLAY_WINDOW_H,
  DISPLAY_WINDOW_RECEIVE,
  DISPLAY_WINDOW_ADD_ONE_BARRAGE
} from '../../utils/constant';

ipcMain.on(DISPLAY_WINDOW_SHOW, () => {
  openDisplayWindow();
});

ipcMain.on(DISPLAY_WINDOW_HIDE, () => {
  closeDisplayWindow();
});

ipcMain.on(CHANGE_DISPLAY_WINDOW_H, (e, data) => {
  if (displayWindow) {
    displayWindow.send(DISPLAY_WINDOW_RECEIVE, data);
  }
});

ipcMain.on(DISPLAY_WINDOW_ADD_ONE_BARRAGE, (e, data) => {
  if (displayWindow) {
    displayWindow.send(DISPLAY_WINDOW_RECEIVE, { name: 'addBarrage', value: data });
  }
});

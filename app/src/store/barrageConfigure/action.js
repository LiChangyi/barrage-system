/* eslint-disable no-unreachable */
import { ipcRenderer } from 'electron';

import { SET_BARRAGR_CONFIGURE } from './actionTypes';
import { openConnect, closeConnect, sendMockBarrage } from '../../api/socket';
import { DISPLAY_WINDOW_SHOW, DISPLAY_WINDOW_HIDE, CHANGE_DISPLAY_WINDOW_H } from '../../utils/constant';

export const setBarrageConfigure = (data) => {
  return (dispatch, getState) => {
    const { open, openWindow } = getState().barrageConfigure.toJSON();
    const { name, value } = data;
    if (name === 'open') {
      if (value) {
        openConnect();
        sendMockBarrage(100);
        if (openWindow) {
          ipcRenderer.send(DISPLAY_WINDOW_SHOW);
        }
      } else {
        closeConnect();
        ipcRenderer.send(DISPLAY_WINDOW_HIDE);
      }
    }
    if (name === 'openWindow') {
      if (!open) {
        return;
      }
      if (value) {
        ipcRenderer.send(DISPLAY_WINDOW_SHOW);
      } else {
        ipcRenderer.send(DISPLAY_WINDOW_HIDE);
      }
    }
    if (['position', 'colorful'].includes(name)) {
      ipcRenderer.send(CHANGE_DISPLAY_WINDOW_H, {
        name, value
      });
    }
    dispatch({
      type: SET_BARRAGR_CONFIGURE,
      data
    });
  };
};

export default {};

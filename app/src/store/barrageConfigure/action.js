/* eslint-disable no-unreachable */
import { ipcRenderer } from 'electron';

import { SET_BARRAGE_CONFIGURE } from './actionTypes';
import { DISPLAY_WINDOW_SHOW, DISPLAY_WINDOW_HIDE, CHANGE_DISPLAY_WINDOW_H } from '../../utils/constant';
import { setKeywordTrie } from '../../utils/showBarrageDisplayWin';

export const setBarrageConfigure = (data) => {
  return (dispatch) => {
    const { name, value } = data;

    if (name === 'openWindow') {
      if (value) {
        setKeywordTrie();
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
      type: SET_BARRAGE_CONFIGURE,
      data
    });
  };
};

export default {};

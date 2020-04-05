import { ipcRenderer } from 'electron';

import { DISPLAY_WINDOW_ADD_ONE_BARRAGE } from './constant';
import store from '../store';
import { createTrie, matchStr } from './func';

// 这里创建2颗树，一颗是不显示的，一颗是屏蔽的
let noDisplayTrie = null;
let filterKeyTrie = null;

export const setKeywordTrie = () => {
  // 构造一下 keyword trie
  const noDisplayWords = [];
  const filterKeyWords = [];
  store.getState().filterConfigure.toJS().forEach((o) => {
    if (o.status) {
      if (o.type === 'noDisplay') {
        noDisplayWords.push(o.rule);
      } else {
        filterKeyWords.push(o.rule);
      }
    }
  });
  noDisplayTrie = createTrie(noDisplayWords);
  filterKeyTrie = createTrie(filterKeyWords);
};

export const syncBarrageToDisplayWin = (data) => {
  let content = data.content.replace(/(\n)/g, '');
  // 大于30个字符的弹幕不显示
  if (content.length > 30) {
    return;
  }
  const noDisplayRes = matchStr(noDisplayTrie, content);
  if (noDisplayRes.length) {
    return;
  }
  const filterKeyRes = matchStr(filterKeyTrie, content);
  if (filterKeyRes.length) {
    filterKeyRes.forEach((o) => {
      content = content.substring(0, o.start) + '*'.repeat(o.len) + content.substring(o.start + o.len);
    });
  }
  ipcRenderer.send(DISPLAY_WINDOW_ADD_ONE_BARRAGE, { ...data, ...{ content } });
};

export default {};

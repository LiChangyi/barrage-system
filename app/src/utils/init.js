import store from '../store';
import { initFilterRule } from '../store/filterConfigure/action';

let isInit = true;
// 初始化一些需要获取的数据或者事件
export default () => {
  if (!isInit) {
    return;
  }
  // 初始化规则设置
  store.dispatch(initFilterRule);
  isInit = false;
};

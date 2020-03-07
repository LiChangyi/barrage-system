import { remote } from 'electron';

const { getGlobal } = remote;

// 同步数据到全局变量中
export const syncDataToGobal = (data) => {
  Object.keys(data).forEach((key) => {
    getGlobal('barrageConfigure')[key] = data[key];
  });
};

export default {};

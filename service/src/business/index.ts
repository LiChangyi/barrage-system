import * as _ from 'lodash';

import { IBarrage, Barrage } from "../model/barrage";
import logger from '../utils/log4';

// 采用防抖进行批量的弹幕数据存储 防抖 5000 ms，最多等待10000ms
let batchBarrages: IBarrage[] = [];
const barrage2DBDebounce = _.debounce(async () => {
  const num: number = (await Barrage.insertMany(batchBarrages)).length;
  batchBarrages = [];
  logger.info(`批量存储弹幕：已存储${num}条弹幕到mongoDB中`);
}, 5000, { 'maxWait': 10000 });

export const barrage2DB = (barrage: IBarrage) => {
  batchBarrages.push(barrage);
  barrage2DBDebounce();
};


export default {};

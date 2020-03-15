import { fromJS } from 'immutable';
import _ from 'lodash';

import { SET_BARRAGR_CONFIGURE } from './actionTypes';
import { readFile, saveFile } from '../../FileStorage';
import { BARRAGE_CONFIGURE, barrageDefaultConfigure } from '../../utils/constant';
import { syncDataToGobal } from '../../utils/func';

const fileConfigure = readFile(BARRAGE_CONFIGURE);

const tempData = {
  position: _.get(fileConfigure, 'position', barrageDefaultConfigure.position),
  colorful: _.get(fileConfigure, 'colorful', barrageDefaultConfigure.colorful),
  serviceApi: _.get(fileConfigure, 'serviceApi', barrageDefaultConfigure.serviceApi),
  open: false,
  openWindow: false,
};
const defaultState = fromJS(tempData);

syncDataToGobal(tempData);

export default (state = defaultState, action) => {
  if (action.type === SET_BARRAGR_CONFIGURE) {
    const { name, value } = action.data;
    const update = { [name]: value };
    const data = state.merge(fromJS(update));
    if (['position', 'colorful', 'serviceApi'].includes(name)) {
      const saveData = _.pick(data.toJSON(), ['position', 'colorful', 'serviceApi']);
      // 保存数据到本地
      saveFile(BARRAGE_CONFIGURE, saveData);
      // 同步到全局变量中
      syncDataToGobal(saveData);
    }
    return data;
  }
  return state;
};

import React from 'react';
import { connect } from 'react-redux';
import { Switch, Radio } from 'antd';

import BarrageBox from './BarrageBox';
import { barragePositionMap } from '../../utils/constant';
import { setBarrageConfigure } from '../../store/barrageConfigure/action';
import './index.scss';

const preCls = 'home';

const Home = ({ barrageConfigure, propsSetBarrageConfigure }) => {
  return (
    <div className={preCls}>
      <BarrageBox
        open={barrageConfigure.open}
      />
      <div className={`${preCls}-tool`}>
        <div className={`${preCls}-tool-item`}>
          <span className={`${preCls}-tool-item-label`}>弹幕位置</span>
          <Radio.Group
            name="position"
            value={barrageConfigure.position}
            onChange={propsSetBarrageConfigure}
          >
            {barragePositionMap.map(({ value, name }) => (
              <Radio.Button key={value} value={value}>{name}</Radio.Button>
            ))}
          </Radio.Group>
        </div>
        <div className={`${preCls}-tool-item`}>
          <span className={`${preCls}-tool-item-label`}>多彩字体</span>
          <Switch
            name="colorful"
            checked={barrageConfigure.colorful}
            checkedChildren="开"
            unCheckedChildren="关"
            onChange={(val) => propsSetBarrageConfigure('colorful', val)}
          />
        </div>
        <div className={`${preCls}-tool-item`}>
          <span className={`${preCls}-tool-item-label`}>弹幕</span>
          <Switch
            name="open"
            checked={barrageConfigure.open}
            checkedChildren="开"
            unCheckedChildren="关"
            onChange={(val) => propsSetBarrageConfigure('open', val)}
          />
        </div>
        <div className={`${preCls}-tool-item`}>
          <span className={`${preCls}-tool-item-label`}>桌面弹幕</span>
          <Switch
            disabled={!barrageConfigure.open}
            name="openWindow"
            checked={barrageConfigure.open && barrageConfigure.openWindow}
            checkedChildren="开"
            unCheckedChildren="关"
            onChange={(val) => propsSetBarrageConfigure('openWindow', val)}
          />
        </div>
      </div>
    </div>
  );
};

export default connect(
  (state) => ({
    barrageConfigure: state.barrageConfigure.toJS()
  }),
  (dispatch) => ({
    propsSetBarrageConfigure(key, val = '') {
      let name = key;
      let value = val;
      if (typeof key !== 'string') {
        name = key.target.name;
        value = key.target.value;
      }
      dispatch(setBarrageConfigure({ name, value }));
    }
  })
)(Home);

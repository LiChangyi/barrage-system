import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Switch,
  Input,
  Button,
  Tooltip,
  Popover,
  Select
} from 'antd';
import {
  FontColorsOutlined,
  BorderBottomOutlined,
  BorderVerticleOutlined
} from '@ant-design/icons';
import * as _ from 'lodash';

import BarrageBox from './BarrageBox';
import { setBarrageConfigure } from '../../store/barrageConfigure/action';
import './index.scss';
import { sendBarrage, openConnect } from '../../api/socket';

const preCls = 'home';

const barragePositions = [
  {
    name: 'full',
    label: '全屏',
    icon: <BorderBottomOutlined />
  },
  {
    name: 'half',
    label: '半屏',
    icon: <BorderVerticleOutlined />
  }
];

const COLORS = ['#000', '#ff5500', '#2db7f5', '#87d068', '#108ee9'];

const Home = ({ barrageConfigure, propsSetBarrageConfigure }) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
    // 连接 socket
    openConnect();
  }, []);
  const handleSend = () => {
    if (!_.trim(inputValue)) {
      return;
    }
    sendBarrage({
      content: _.trim(inputValue),
      color: barrageConfigure.fontColor
    });
    setInputValue('');
    inputRef.current.focus();
  };
  const handleKeyPress = (e) => {
    if (e.charCode === 13 && !e.shiftKey) {
      handleSend();
    }
  };

  let BarrageOpenBtnDom = (
    <Switch
      name="openWindow"
      checked={barrageConfigure.openWindow}
      checkedChildren="弹幕"
      unCheckedChildren="弹幕"
      onChange={(val) => propsSetBarrageConfigure('openWindow', val)}
    />
  );
  if (barrageConfigure.openWindow) {
    BarrageOpenBtnDom = (
      <Popover
        placement="top"
        content={(
          <div className={`${preCls}-position-box`}>
            {
              barragePositions.map(({
                name,
                label,
                icon
              }) => (
                // eslint-disable-next-line jsx-a11y/interactive-supports-focus
                <div
                  key={name}
                  role="button"
                  className={`${preCls}-position-item`}
                  style={{ color: barrageConfigure.position === name ? '#40a9ff' : '' }}
                  onClick={() => propsSetBarrageConfigure('position', name)}
                  onKeyPress={() => {}}
                >
                  {icon}
                  <span className={`${preCls}-position-item-label`}>{label}</span>
                </div>
              ))
            }
          </div>
        )}
        trigger="hover"
      >
        {BarrageOpenBtnDom}
      </Popover>
    );
  }
  return (
    <div className={preCls}>
      <BarrageBox />
      <div className={`${preCls}-footer`}>
        <Input.TextArea
          ref={inputRef}
          className={`${preCls}-chat-box`}
          onKeyPress={handleKeyPress}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className={`${preCls}-tool`}>
          <div className={`${preCls}-btns`}>
            <div className={`${preCls}-tool-item`}>
              <Tooltip
                title={`彩色弹幕：${barrageConfigure.colorful ? '开' : '关'}`}
              >
                <FontColorsOutlined
                  style={{ color: barrageConfigure.colorful ? '#40a9ff' : '' }}
                  onClick={() => propsSetBarrageConfigure('colorful', !barrageConfigure.colorful)}
                />
              </Tooltip>
            </div>
            <div className={`${preCls}-tool-item`}>
              {BarrageOpenBtnDom}
            </div>
          </div>
          <div className={`${preCls}-tool-right`}>
            <Select
              style={{ background: barrageConfigure.fontColor, width: '60px' }}
              onChange={(val) => propsSetBarrageConfigure('fontColor', val)}
              dropdownClassName={`${preCls}-select-color`}
            >
              {COLORS.map((color) => (
                <Select.Option
                  key={color}
                  style={{ background: color }}
                  value={color}
                >
                  &nbsp;
                </Select.Option>
              ))}
            </Select>
            <Button onClick={handleSend} type="primary">发送(Enter)</Button>
          </div>
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

import React, { useEffect, useState } from 'react';
import { Input, Switch, message } from 'antd';
import _ from 'lodash';

import { getRoomDetail, updateRoom } from '../../../api/room';
import './index.scss';

const preCls = 'room';

const Room = () => {
  const [roomInfo, setRoomInfo] = useState({});
  useEffect(() => {
    getRoomDetail()
      .then(({ data }) => {
        setRoomInfo(data);
      });
  }, []);

  const handleSave = () => {
    const { roomname } = roomInfo;
    updateRoom(roomInfo._id, { roomname })
      .then(() => {
        message.success('修改名称成功');
      });
  };

  const handleRoomNameChange = (e) => {
    const val = e.target.value;
    setRoomInfo(_.assign({}, roomInfo, { roomname: val }));
  };

  const handleStatusChange = (val) => {
    const text = val ? '启用' : '关闭';
    message.loading(`${text}中请稍等`, 0);
    updateRoom(roomInfo._id, { status: val })
      .then(() => {
        message.success(`成功${text}`);
        setRoomInfo(_.assign({}, roomInfo, { status: val }));
      });
  };

  return (
    <div className={preCls}>
      <Input
        addonBefore="弹幕间名称"
        value={roomInfo.roomname}
        addonAfter={
          // eslint-disable-next-line
          <span className={`${preCls}-btn`} onClick={handleSave}>保存</span>
        }
        onChange={handleRoomNameChange}
        onPressEnter={handleSave}
      />
      <div className={`${preCls}-switch-wrap`}>
        <Switch
          checkedChildren="当前直播间状态：启用"
          unCheckedChildren="当前直播间状态：关闭"
          checked={roomInfo.status}
          onChange={handleStatusChange}
        />
      </div>
    </div>
  );
};

export default Room;

import React from 'react';
import { Button, Modal, message } from 'antd';
import { connect } from 'react-redux';

import { setUser } from '../../store/user/action';
import Login from './Login';
import Room from './Room';
import './index.scss';

const preCls = 'user';

const User = ({ user, propsSetUser }) => {
  const { token = '', nickname } = user;
  // 未登录显示登录界面
  if (!token) {
    return (
      <Login
        propsSetUser={propsSetUser}
      />
    );
  }

  // 退出登录
  const logout = () => {
    Modal.confirm({
      title: '退出登录',
      content: '确定退出当前账号吗？',
      onOk: () => {
        propsSetUser({});
        message.success('退出当前账号成功');
      }
    });
  };
  return (
    <div className={preCls}>
      <div className={`${preCls}-userinfo`}>
        <span className={`${preCls}-userinfo-name`}>
          欢迎你，
          {nickname}
        </span>
        <Button
          onClick={logout}
        >
          退出登录
        </Button>
      </div>
      <Room />
    </div>
  );
};

export default connect(
  (state) => ({
    user: state.user.toJS(),
  }),
  (dispatch) => ({
    propsSetUser(data) {
      dispatch(setUser(data));
    }
  })
)(User);

import React, { useState } from 'react';
import {
  Button,
  Modal,
  message,
  Input
} from 'antd';
import { connect } from 'react-redux';

import { setUser } from '../../store/user/action';
import Login from './Login';
import Room from './Room';
import './index.scss';
import { updatePwdApi } from '../../api/user';

const preCls = 'user';

const User = ({ user, propsSetUser }) => {
  const { token = '', nickname } = user;
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pwdData, setPwdData] = useState({
    originalPassword: '',
    password: '',
    rePassword: ''
  });
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

  const changePwd = () => {
    const { originalPassword, password, rePassword } = pwdData;
    if (password !== rePassword) {
      message.error('2次密码输入不一致');
      return;
    }
    setLoading(true);
    updatePwdApi({ originalPassword, password })
      .then(() => {
        message.success('修改成功');
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className={preCls}>
      <div className={`${preCls}-userinfo`}>
        <span className={`${preCls}-userinfo-name`}>
          欢迎你，
          {nickname}
        </span>
        <span>
          <Button
            onClick={() => setModalVisible(true)}
          >
            修改密码
          </Button>
          <Button
            onClick={logout}
            type="danger"
          >
            退出登录
          </Button>
        </span>
      </div>
      <Room />
      <Modal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        title={<h3>修改密码</h3>}
        onOk={changePwd}
        confirmLoading={loading}
      >
        <Input.Password value={pwdData.originalPassword} onChange={(e) => setPwdData({ ...pwdData, originalPassword: e.target.value })} placeholder="原始密码" />
        <Input.Password value={pwdData.password} onChange={(e) => setPwdData({ ...pwdData, password: e.target.value })} placeholder="新密码" />
        <Input.Password value={pwdData.rePassword} onChange={(e) => setPwdData({ ...pwdData, rePassword: e.target.value })} placeholder="重复密码" />
      </Modal>
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

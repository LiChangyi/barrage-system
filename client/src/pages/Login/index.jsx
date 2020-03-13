import React, { useContext } from 'react';
import {
  Form,
  Input,
  Button,
  message
} from 'antd';

import { USERNAME_REG, PASSWORD_REG } from '../../common/constants';
import { UserInfoContext } from '../..';
import { getToken } from '../../api/user';
import './index.scss';
import { saveUserInfo } from '../../util/tool';

const preCls = 'login';
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const btnLayout = {
  wrapperCol: { span: 24 }
};

const Login = ({ history }) => {
  const { setUserInfo } = useContext(UserInfoContext);
  const onFinish = (values) => {
    getToken(values)
      .then(({ data }) => {
        message.success('登录成功');
        setUserInfo(data);
        saveUserInfo(data);
        history.push('/');
      });
  };

  return (
    <div className={preCls}>
      <div className={`${preCls}-header`}>
        <h1 className={`${preCls}-title`}>用户登录</h1>
      </div>
      <Form
        {...layout}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              validator(rule, value) {
                if (value && USERNAME_REG.test(value)) {
                  return Promise.resolve();
                }
                return Promise.reject('username 应该在4~12位之间首字母且不能为数字');
              }
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              validator(rule, value) {
                if (value && PASSWORD_REG.test(value)) {
                  return Promise.resolve();
                }
                return Promise.reject('password 应该在6~12位之间');
              }
            }
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...btnLayout}>
          <Button style={{ width: 150, margin: '0 auto' }} type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
      <div className={`${preCls}-info`}>
        <p>弹幕系统·用户端</p>
        <p>成都大学2020届李昌义本科毕业设计</p>
      </div>
    </div>
  );
};

export default Login;

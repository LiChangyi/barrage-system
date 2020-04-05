import React from 'react';
import {
  Form,
  Input,
  Button,
  message,
  Checkbox
} from 'antd';
import { connect } from 'react-redux';
import _ from 'lodash';

import {
  USERNAME_REG,
  PASSWORD_REG,
  SAVE_USERINFO,
  URL_REG
} from '../../../utils/constant';
import { getToken } from '../../../api/user';
import './index.scss';
import { saveFile, readFile } from '../../../FileStorage';
import { setBarrageConfigure } from '../../../store/barrageConfigure/action';

const localUserinfo = readFile(SAVE_USERINFO) || {};
const preCls = 'login';
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const btnLayout = {
  wrapperCol: { span: 24 }
};
const tailLayout = {
  wrapperCol: { offset: 17, span: 7 },
};

const Login = ({ propsSetUser, barrageConfigure, propsSetBarrageConfigure }) => {
  const onFinish = (values) => {
    const { remember, serviceApi } = values;
    propsSetBarrageConfigure('serviceApi', serviceApi);
    getToken(_.pick(values, ['username', 'password']))
      .then(({ data }) => {
        message.success('登录成功');
        // 修改store
        propsSetUser(data);
        // 登录成功保存账号到本地
        if (remember) {
          saveFile(SAVE_USERINFO, _.pick(values, ['username', 'password', 'remember']));
        } else {
          saveFile(SAVE_USERINFO, {});
        }
      });
  };
  let initialValues = { remember: true };
  if (_.get(localUserinfo, 'remember', false)) {
    initialValues = localUserinfo;
  }
  const { serviceApi } = barrageConfigure;
  initialValues.serviceApi = serviceApi;
  return (
    <div className={preCls}>
      <div className={`${preCls}-wrap`}>
        <Form
          {...layout}
          initialValues={initialValues}
          onFinish={onFinish}
        >
          <Form.Item
            label="service api"
            name="serviceApi"
            rules={[
              {
                validator(rule, value) {
                  if (value && URL_REG.test(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject('service api 应该域名加端口的形式');
                }
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="username"
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
            label="password"
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
          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Form.Item {...btnLayout}>
            <Button style={{ width: 150, margin: '0 auto' }} type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
        <div className={`${preCls}-info`}>
          <p>弹幕系统·桌面端</p>
          <p>成都大学2020届李昌义本科毕业设计</p>
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
    propsSetBarrageConfigure(name, value = '') {
      dispatch(setBarrageConfigure({ name, value }));
    }
  })
)(Login);

import React, { useState } from 'react';
import {
  Form, Select, Switch, Row, Col, Button, message
} from 'antd';
import _ from 'lodash';
import Store from 'electron-store';

import './index.scss';
import {
  barragePositionMap, fontSizeMenu, tailFormItemLayout, formItemLayout, BARRAGE_CONFIGURE
} from '../../utils/constant';

const FormItem = Form.Item;
const preCls = 'home';

const Home = ({ form }) => {
  const [loading, setLoading] = useState(false);
  const { getFieldDecorator, getFieldValue } = form;
  const store = new Store();

  const barrageConfigure = store.get(BARRAGE_CONFIGURE);
  // 保存配置
  const saveConfigure = () => {
    const { validateFieldsAndScroll } = form;
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return;
      }
      setLoading(true);
      store.set(BARRAGE_CONFIGURE, values);
      message.success('保存配置成功');
      setLoading(false);
    });
  };
  return (
    <div className={preCls}>
      <Form
        {...formItemLayout}
      >
        <FormItem label="弹幕位置">
          {getFieldDecorator('position', {
            initialValue: _.get(barrageConfigure, 'position', 'full')
          })(
            <Select>
              {barragePositionMap.map(({ key, name }) => {
                return (<Select.Option key={key} value={key}>{name}</Select.Option>);
              })}
            </Select>
          )}
        </FormItem>
        <FormItem label="字体大小">
          <Row>
            <Col span={6}>
              {getFieldDecorator('fontSizeMin', {
                initialValue: _.get(barrageConfigure, 'fontSizeMin', fontSizeMenu[0])
              })(
                <Select>
                  {fontSizeMenu.map((size) => (
                    <Select.Option key={size}>{size}</Select.Option>
                  ))}
                </Select>
              )}
            </Col>
            <Col span={2} style={{ textAlign: 'center' }}>~</Col>
            <Col span={6}>
              {getFieldDecorator('fontSizeMax', {
                initialValue: _.get(barrageConfigure, 'fontSizeMax', fontSizeMenu[fontSizeMenu.length - 1])
              })(
                <Select>
                  {fontSizeMenu.map((size) => (
                    <Select.Option
                      key={size}
                      disabled={getFieldValue('fontSizeMin') > size}
                    >
                      {size}
                    </Select.Option>
                  ))}
                </Select>
              )}
            </Col>
          </Row>
        </FormItem>
        <FormItem label="彩色字体">
          {getFieldDecorator('isColorful', {
            valuePropName: 'checked',
            initialValue: _.get(barrageConfigure, 'isColorful', true)
          })(
            <Switch checkedChildren="开" unCheckedChildren="关" />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout} style={{ textAlign: 'right' }}>
          <Button type="primary" loading={loading} onClick={saveConfigure}>保存</Button>
        </FormItem>
      </Form>
    </div>
  );
};

export default Form.create()(Home);

import React, { useEffect } from 'react';
import {
  Drawer,
  Form,
  Input,
  Button,
  Switch,
  Select,
} from 'antd';
import { useDispatch } from 'react-redux';

import { addOneFilterRule, updateFilterRule } from '../../../store/filterConfigure/action';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 16 }
};

const defaultFormValue = {
  type: 'noDisplay',
  status: true
};
const submitTextMap = {
  new: '添加',
  edit: '保存'
};

const Edit = ({
  visible,
  onClose,
  editData
}) => {
  const { rule, type } = editData;
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    form.resetFields(['rule', 'type', 'status']);
  }, [editData]);

  const handleSubmit = (values) => {
    if (type === 'new') {
      dispatch(addOneFilterRule(values));
    } else {
      dispatch(updateFilterRule(rule._id, values));
    }
  };
  return (
    <Drawer
      placement="right"
      closable={false}
      visible={visible}
      onClose={onClose}
      getContainer={false}
    >
      <Form
        {...layout}
        form={form}
        name="basic"
        initialValues={{ ...defaultFormValue, ...rule }}
        onFinish={handleSubmit}
      >
        <Form.Item
          label="规则"
          name="rule"
          rules={[
            { required: true, message: 'Please input rule!' },
            {
              pattern: new RegExp('^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9_]){1,20}$'),
              message: '规则应该在中文英文或者数字且在1~20个字符'
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="类型"
          name="type"
        >
          <Select>
            <Select.Option value="noDisplay">整条不显示</Select.Option>
            <Select.Option value="filterKey">屏蔽命中词</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="状态"
          name="status"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button
            type="primary"
            htmlType="submit"
          >
            {submitTextMap[type]}
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default React.memo(Edit);

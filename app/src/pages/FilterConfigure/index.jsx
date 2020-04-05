import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  Table,
  Popconfirm,
  Input
} from 'antd';
import moment from 'moment';
import { PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';

import Edit from './Edit';
import { deleteFilterRule } from '../../store/filterConfigure/action';

const typeMap = {
  noDisplay: '整条不显示',
  filterKey: '屏蔽命中词'
};

const FilterConfigure = () => {
  const [editVisible, setEditVisible] = useState(false);
  const [editData, setEditData] = useState({
    rule: {},
    type: 'new'
  });

  const list = useSelector((state) => state.filterConfigure).toJS();
  const dispatch = useDispatch();
  const column = [
    {
      title: '序号',
      width: 80,
      dataIndex: 'index',
      render: (...args) => args[2] + 1
    },
    {
      title: '规则',
      dataIndex: 'rule',
      filterDropdown: ({ setSelectedKeys, confirm, clearFilters }) => (
        <Input.Search
          key="search-input-key"
          placeholder="Search rule"
          onSearch={(val) => { if (val !== '') { setSelectedKeys([val]); confirm(); } else { clearFilters(); } }}
          enterButton
          style={{ width: 200, marginBottom: 8 }}
        />
      ),
      filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value, record) => record.rule
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase())
    },
    {
      title: '规则类型',
      dataIndex: 'type',
      width: '120px',
      filters: Object.keys(typeMap).map((key) => ({ text: typeMap[key], value: key })),
      filterMultiple: false,
      onFilter: (val, record) => val === record.type,
      render: (val) => typeMap[val] || '-'
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: '100px',
      filters: [
        { text: '已开启', value: true },
        { text: '未开启', value: false },
      ],
      filterMultiple: false,
      onFilter: (val, record) => val === record.status,
      render: (val) => (
        val ? (
          <>
            <span className="status-point" style={{ backgroundColor: '#87d068' }} />
            <span style={{ color: '#87d068' }}>已启用</span>
          </>
        ) : (
          <>
            <span className="status-point" style={{ backgroundColor: '#ccc' }} />
            <span style={{ color: '#ccc' }}>未启用</span>
          </>
        )
      )
    },
    {
      title: '创建时间',
      dataIndex: 'createAt',
      width: '150px',
      render: (val) => moment(val).format('YYYY-MM-DD HH:mm:SS'),
    },
    {
      title: (
        <>
          操作
          <PlusCircleOutlined
            className="add-btn"
            onClick={() => { setEditData({ rule: {}, type: 'new' }); setEditVisible(true); }}
          />
        </>
      ),
      dataIndex: 'operation',
      width: 180,
      render: (val, rows) => (
        <>
          <Button type="primary" onClick={() => { setEditData({ rule: rows, type: 'edit' }); setEditVisible(true); }}>编辑</Button>
          <Popconfirm title="确认删除吗" onConfirm={() => dispatch(deleteFilterRule(rows._id))}>
            <Button type="primary" danger style={{ marginLeft: 12 }}>删除</Button>
          </Popconfirm>
        </>
      ),
    }
  ];

  return (
    <>
      <Table
        columns={column}
        dataSource={list}
        rowKey="_id"
        pagination={false}
        scroll={{ y: 520 }}
      />
      <Edit
        visible={editVisible}
        editData={editData}
        onClose={() => setEditVisible(false)}
      />
    </>
  );
};

export default FilterConfigure;

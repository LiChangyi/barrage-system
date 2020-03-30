import React, { useState, useEffect } from 'react';
import {
  Table,
  DatePicker,
  Input,
  Select,
  Tooltip
} from 'antd';
import moment from 'moment';
import _ from 'lodash';

import { getBarrageList } from '../../api/barrage';
import './index.scss';

const { RangePicker } = DatePicker;
const { Search } = Input;
const { Option } = Select;
const preCls = 'barrage-list';

const useTableList = (filter) => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setLoading(true);
    getBarrageList(filter)
      .then(({ data }) => {
        setList(data.list);
        setCount(data.count);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [filter]);

  return [
    {
      loading,
      list,
      count
    }
  ];
};

const formatStr = 'YYYY-MM-DD HH:mm:ss';
const searchTypes = [
  {
    name: 'content',
    label: '按内容'
  },
  {
    name: 'nickname',
    label: '按用户名'
  },
  {
    name: 'userId',
    label: '按用户ID'
  }
];

const SelectBefore = ({ filter, setFilter }) => {
  return (
    <Select
      value={filter.searchType}
      style={{ width: 110 }}
      onChange={(val) => setFilter({ ...filter, searchType: val })}
    >
      {searchTypes.map(({ name, label }) => (<Option key={name} value={name}>{label}</Option>))}
    </Select>
  );
};

const generateColumns = (filter, setFilter) => (
  [
    {
      key: 'user',
      title: '发送者',
      dataIndex: 'user',
      width: '100px',
      render: (user) => (
        <Tooltip placement="right" title="点击搜索此用户">
          <span
            role="button"
            className={`${preCls}-table-user`}
            onClick={() => {
              const uid = _.get(user, '_id', '');
              if (uid) {
                setFilter({ ...filter, searchType: 'userId', search: uid });
              }
            }}
          >
            {_.get(user, 'nickname', '-')}
          </span>
        </Tooltip>
      )
    },
    {
      key: 'room',
      title: '房间名',
      dataIndex: 'room',
      width: '200px',
      render: (room) => _.get(room, 'roomname', '-')
    },
    {
      key: 'content',
      title: '内容',
      dataIndex: 'content',
      render: (content, row) => (<div className={`${preCls}-table-content`} style={{ color: row.color }}>{content}</div>)
    },
    {
      key: 'createAt',
      title: '发送时间',
      dataIndex: 'createAt',
      width: '200px',
      render: (createAt) => moment(createAt).format(formatStr)
    }
  ]
);

const BarrageList = () => {
  const [filter, setFilter] = useState({
    page: 1,
    size: 10,
    type: 'send',
    searchType: 'content',
    search: '',
    startAt: moment().startOf('month').valueOf(),
    endAt: moment().valueOf()
  });
  const [search, setSearch] = useState('');
  useEffect(() => {
    setSearch(filter.search);
  }, [filter.search]);
  const [
    {
      loading,
      list,
      count,
    }
  ] = useTableList(filter);

  return (
    <div className={preCls}>
      <div className={`${preCls}-header`}>
        <RangePicker
          showTime
          allowClear={false}
          value={[
            moment(filter.startAt),
            moment(filter.endAt)
          ]}
          ranges={{
            Today: [moment().startOf('day'), moment()],
            'This month': [moment().startOf('month'), moment()]
          }}
          format={formatStr}
          onChange={([start, end]) => {
            setFilter({ ...filter, startAt: start.valueOf(), endAt: end.valueOf() });
          }}
        />
        <Search
          addonBefore={<SelectBefore filter={filter} setFilter={setFilter} />}
          placeholder="查询内容..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onSearch={() => setFilter({ ...filter, search })}
          style={{ width: 400 }}
          enterButton
        />
      </div>
      <Table
        columns={generateColumns(filter, setFilter)}
        loading={loading}
        dataSource={list}
        rowKey="_id"
        scroll={{ y: 430 }}
        pagination={{
          pageSize: filter.size,
          current: filter.page,
          total: count,
          pageSizeOptions: ['5', '10', '20', '50'],
          showQuickJumper: true,
          showSizeChanger: true,
          showTotal: (total, range) => `当前:${range[0]}-${range[1]} 共 ${total} 条`,
          onChange: (page) => setFilter({ ...filter, page }),
          onShowSizeChange: (page, size) => setFilter({ ...filter, page, size })
        }}
      />
    </div>
  );
};

export default React.memo(BarrageList);

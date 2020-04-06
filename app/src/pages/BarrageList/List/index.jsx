import React, { useEffect, useState } from 'react';
import { Table, Tooltip } from 'antd';
import moment from 'moment';
import _ from 'lodash';

import { getBarrageList } from '../../../api/barrage';

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

const List = ({ filter, setFilter }) => {
  const [
    {
      loading,
      list,
      count,
    }
  ] = useTableList(filter);
  const column = [
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
      render: (createAt) => moment(createAt).format('YYYY-MM-DD HH:mm:ss')
    }
  ];
  return (
    <Table
      columns={column}
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
  );
};

export default List;

import React, { useState, useEffect } from 'react';
import {
  DatePicker,
  Input,
  Select,
  Tooltip
} from 'antd';
import { UnorderedListOutlined, AreaChartOutlined } from '@ant-design/icons';
import moment from 'moment';

import Charts from './Charts';
import List from './List';
import './index.scss';

const { RangePicker } = DatePicker;
const { Search } = Input;
const { Option } = Select;
const preCls = 'barrage-list';


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

const BarrageList = () => {
  const [filter, setFilter] = useState({
    page: 1,
    size: 10,
    searchType: 'content',
    search: '',
    startAt: moment().startOf('month').valueOf(),
    endAt: moment().valueOf()
  });
  const [showChart, setShowChart] = useState(false);
  const [search, setSearch] = useState('');
  useEffect(() => {
    setSearch(filter.search);
  }, [filter.search]);

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
          style={{ width: 380 }}
          enterButton
        />
        <div className={`${preCls}-header-icon`}>
          <Tooltip placement="left" title={`切换成${showChart ? '列表' : '图表'}`}>
            {showChart ? (
              <UnorderedListOutlined
                onClick={() => setShowChart(false)}
              />
            ) : (
              <AreaChartOutlined
                onClick={() => setShowChart(true)}
              />
            )}
          </Tooltip>
        </div>
      </div>
      {
        showChart ? (
          <Charts
            filter={filter}
          />
        ) : (
          <List
            filter={filter}
            setFilter={setFilter}
          />
        )
      }
    </div>
  );
};

export default React.memo(BarrageList);

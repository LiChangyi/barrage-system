import React, { useState, useEffect } from 'react';
import _ from 'lodash';

import './index.scss';
import { getOpenRoomListApi } from '../../api/room';

const preCls = 'home';

const Home = ({ history }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getOpenRoomListApi()
      .then((res) => {
        setData(res.data);
      });
  }, []);

  return (
    <div className={preCls}>
      <h2 className={`${preCls}-title`}>房间列表</h2>
      <div className={`${preCls}-wrap`}>
        {data.map((item) => (
          <div
            className={`${preCls}-item`}
            key={item._id}
            onClick={() => history.push(`/room/${item._id}`)}
          >
            <div className={`${preCls}-item-roomname`}>{item.roomname}</div>
            <div className={`${preCls}-item-nickname`}>
              {_.get(item, 'user.nickname', '-')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

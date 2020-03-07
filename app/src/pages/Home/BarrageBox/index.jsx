import React from 'react';
import { ExclamationCircleFilled } from '@ant-design/icons';

const preCls = 'home';
const data = [];

for (let i = 0; i < 30; i++) {
  data.push({
    id: i,
    username: `李昌义${i}`,
    context: `${10000 + i * 1000}`
  });
}

const BarrageBox = ({ open }) => {
  if (!open) {
    return (
      <div className={`${preCls}-barrage ${preCls}-no-open`}>
        <div className={`${preCls}-no-open-wrap`}>
          <ExclamationCircleFilled />
          <span className={`${preCls}-no-open-message`}>
            弹幕开关未打开
          </span>
        </div>
      </div>
    );
  }
  return (
    <div className={`${preCls}-barrage`}>
      {data.map((item) => (
        <div key={item.id} className={`${preCls}-barrage-item`}>
          <span className={`${preCls}-barrage-item-username`}>
            {item.username}
            :
          </span>
          <span className={`${preCls}-barrage-item-context`}>{item.context}</span>
        </div>
      ))}
    </div>
  );
};

export default BarrageBox;

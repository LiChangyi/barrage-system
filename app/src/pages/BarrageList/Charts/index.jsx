import React, { useEffect, useState } from 'react';

import MyECharts from '../../../components/MyECharts';
import { getBarrageStatApi } from '../../../api/barrage';
import { generateEChartOptionForContent, generateEChartOptionForCount } from '../util';

const useGetStat = (filter) => {
  const [loading, setLoading] = useState(false);
  const [countStat, setCountStat] = useState([]);
  const [contentStat, setContentStat] = useState([]);
  useEffect(() => {
    setLoading(true);
    getBarrageStatApi(filter)
      .then(({ data }) => {
        setCountStat(data.countStat);
        setContentStat(data.contentStat);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [filter]);
  return {
    loading,
    countStat,
    contentStat
  };
};

const Charts = ({ filter }) => {
  const { loading, countStat, contentStat } = useGetStat(filter);
  return (
    <div>
      <div style={{ height: 300 }}>
        <MyECharts
          loading={loading}
          option={generateEChartOptionForCount(countStat)}
        />
      </div>
      <div style={{ height: 220 }}>
        <MyECharts
          loading={loading}
          option={generateEChartOptionForContent(contentStat)}
        />
      </div>
    </div>
  );
};

export default React.memo(Charts);

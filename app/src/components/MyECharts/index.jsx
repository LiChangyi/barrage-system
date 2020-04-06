import React, { useRef, useEffect } from 'react';
// 按需引入
import echarts from 'echarts/lib/echarts';
// 基础图表
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/pie';
// 组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

const COLORS = [
  '#7da9fc',
  '#8ed5f1',
  '#ff8787',
  '#faaf2b',
  '#fad337',
  '#505f7a',
  '#95a5a6',
  '#2fcb71',
  '#169f85',
  '#9a6bff',
];

const defaultLoading = {
  text: '',
  color: '#7da9fc',
  textColor: '#000',
  maskColor: 'rgba(255, 255, 255, 0.8)',
  zlevel: 0
};

const MyECharts = ({ loading = false, bindEvents = [], option = {} }) => {
  const chartRef = useRef(null);
  useEffect(() => {
    const myChart = echarts.init(chartRef.current, { color: COLORS });
    bindEvents.forEach((item) => {
      const [type, callback] = item;
      myChart.on(type, callback);
    });
    if (loading) {
      myChart.showLoading(defaultLoading);
    } else {
      myChart.hideLoading();
      myChart.setOption(option);
    }
  });
  return (
    <div
      style={{ height: '100%', width: '100%' }}
      ref={chartRef}
    />
  );
};

export default React.memo(MyECharts);

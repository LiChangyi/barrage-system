import echarts from 'echarts/lib/echarts';
import moment from 'moment';

// 生成弹幕个数图表的option
export const generateEChartOptionForContent = (data) => {
  const parseData = data
    .map((o) => ({ name: o._id, value: o.total }))
    .concat(
      new Array(data.length).fill({
        value: 0,
        name: '',
        itemStyle: {
          normal: {
            color: 'transparent'
          }
        },
        label: {
          show: false
        },
        labelLine: {
          show: false
        }
      })
    );
  return {
    title: {
      text: 'Top10',
      left: 'center',
      bottom: 10,
      textStyle: {
        fontSize: 16,
        color: '#000'
      }
    },
    legend: {
      show: false
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}'
    },
    series: [
      {
        type: 'pie',
        startAngle: 0,
        radius: [41, 153.75],
        center: ['50%', '0'],
        roseType: 'area',
        avoidLabelOverlap: false,
        data: parseData,
        label: {
          formatter: "{@[' + dimension + ']}条 ({d}%)",
          fontSize: 14,
          emphasis: {
            fontSize: 16
          }
        }
      }
    ]
  };
};

export const generateEChartOptionForCount = (data) => {
  const xData = [];
  const yData = [];
  data.forEach((item) => {
    xData.push(moment(item._id).format('YYYY-MM-DD HH:mm:SS'));
    yData.push(item.total);
  });

  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        lineStyle: {
          color: '#57617B'
        }
      }
    },
    grid: {
      left: '1%',
      right: '2%',
      bottom: '8%',
      top: '5%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        axisLine: {
          lineStyle: {
            color: '#57617B'
          }
        },
        data: xData
      }
    ],
    yAxis: [
      {
        type: 'value',
        min: 0,
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(87, 97, 123, 1)'
          }
        },
        axisLabel: {
          textStyle: {
            fontSize: 12
          }
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(87, 97, 123, 0.1)'
          }
        }
      }
    ],
    series: [
      {
        type: 'line',
        smooth: true,
        lineStyle: {
          normal: {
            width: 2
          }
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: 'rgba(82, 191, 255, 0.3)'
                },
                {
                  offset: 0.8,
                  color: 'rgba(82, 191, 255, 0)'
                }
              ],
              false
            ),
            shadowColor: 'rgba(228, 139, 76, 0.1)',
            shadowBlur: 10
          }
        },
        symbolSize: 4,
        itemStyle: {
          normal: {
            color: 'rgb(82, 191, 255)',
            borderColor: '#e48b4c'
          }
        },
        data: yData
      }
    ]
  };
};

export default {};

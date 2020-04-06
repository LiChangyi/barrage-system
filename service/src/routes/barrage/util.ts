// 接收开始和结束日期，返回需要显示数据的粒度
export const calcGranularity = (start: number, end: number): number => {
  const diff = end - start;
  if (diff > 2592000000) {
    // 大于1个月(30 * 24 * 60 * 60 * 1000) ；粒度为每月
    return 7;
  } else if (diff > 86400000) {
    // 大于1天(24 * 60 * 60 * 1000);粒度为每天
    return 10;
  } else if (diff > 3600000) {
    // 大于1小时(60 * 60 * 1000);粒度为每小时
    return 13
  } else {
    // 其他为分钟刻度
    return 16;
  }
}
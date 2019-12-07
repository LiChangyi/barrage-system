/**
 * 这个是属于当前路由下面的工具函数
 */

// 转变时间
export const convertTime = (startAt: number, interval: number): string => {
  const nowAt: number = new Date().getTime();
  // 获取的是 ms，需要转换
  const remain: number = Number(startAt) + (interval * 1000) - nowAt;
  return `${Math.round(remain / 1000)}s`;
};

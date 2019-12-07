/**
 * 用于保存一些常量
 */

// 密码 md5 加密的混淆
export const MD5_SUFFIX = 'm8x69abOLPDGrUt9OvsqvU4g';
// jwt 生成 token 的 secret
export const TOKEN_SUFFIX = 'mS11Y1FdX8Nvw8rlSOQLeNNe';
// token 的过期时间
export const TOKEN_EXPIRES = '1h';
// 密码输入错误锁定
export const PWD_ERROR = {
  count: 5,
  // 十分钟
  time: 600
};


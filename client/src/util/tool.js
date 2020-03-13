// 保存 userInfo 数据到 localStorage
export const saveUserInfo = (data) => {
  window.localStorage.setItem('userinfo', JSON.stringify(data));
};

// 从 localStorage 获取数据
export const readUserInfo = () => {
  const data = window.localStorage.getItem('userinfo') || '{}';
  try {
    return JSON.parse(data);
  } catch (err) {
    return {};
  }
};

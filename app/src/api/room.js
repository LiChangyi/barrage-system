import axios from './index';

// 获取自己的房间信息
export const getRoomDetail = () => {
  return axios.get('/api/room/detail');
};

// 修改房间数据
export const updateRoom = (id, data) => {
  return axios.patch(`/api/room/${id}`, data);
};

export default {};

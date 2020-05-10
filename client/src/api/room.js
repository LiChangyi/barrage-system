import axios from './index';

// 获取当前已开启的房间
export const getOpenRoomListApi = () => {
  return axios.get('/api/room/list');
};

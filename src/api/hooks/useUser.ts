import {useQuery} from '@tanstack/react-query';
import {API_ENDPOINTS} from '@/api/endpoints';
import apiClient from '@/api/client';

// 유저 정보 조회
const getUserInfo = async () => {
  const {data} = await apiClient.get(API_ENDPOINTS.USER.INFO);
  return data.result;
};

export const useUserInfo = () => {
  return useQuery({queryKey: ['userInfo'], queryFn: getUserInfo});
};

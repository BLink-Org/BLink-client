import {useQuery} from '@tanstack/react-query';
import {API_ENDPOINTS} from '@/api/endpoints';
import apiClient from '@/api/client';

const getHealthCheck = async () => {
  const {data} = await apiClient.get(API_ENDPOINTS.TEST.HEALTH);
  return data;
};

export const useHealthCheck = () => {
  return useQuery({queryKey: ['healthCheck'], queryFn: getHealthCheck});
};

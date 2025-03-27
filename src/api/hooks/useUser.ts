import {useMutation, useQuery} from '@tanstack/react-query';
import {API_ENDPOINTS} from '@/api/endpoints';
import apiClient from '@/api/client';
import {type FundingStatusSchema, type UserInfoSchema} from '@/types';

// 유저 정보 조회
const getUserInfo = async (): Promise<UserInfoSchema> => {
  const {data} = await apiClient.get(API_ENDPOINTS.USER.INFO);
  return data.result;
};

export const useUserInfo = () => {
  return useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
  });
};

// 계정 삭제 신청
const deleteUserAccount = async () => {
  await apiClient.patch(API_ENDPOINTS.USER.DELETE_ACCOUNT);
};

export const useDeleteUserAccount = (options = {}) => {
  return useMutation({
    mutationFn: deleteUserAccount,
    onError: error => {
      console.warn('Delete User Account error:', error);
    },
    ...options,
  });
};

// 계정 삭제 철회
const cancelDeleteUserAccount = async () => {
  await apiClient.patch(API_ENDPOINTS.USER.CANCEL_DELETE_ACCOUNT);
};

export const useCancelDeleteUserAccount = (options = {}) => {
  return useMutation({
    mutationFn: cancelDeleteUserAccount,
    onError: error => {
      console.warn('Cancel Delete User Account error:', error);
    },
    ...options,
  });
};

// 펀딩 상태 조회
const getFundingStatus = async (): Promise<FundingStatusSchema> => {
  const {data} = await apiClient.get(API_ENDPOINTS.USER.FUNDING_STATUS);
  return data.result;
};

export const useGetFundingStatus = () => {
  return useQuery({
    queryKey: ['fundingStatus'],
    queryFn: getFundingStatus,
  });
};

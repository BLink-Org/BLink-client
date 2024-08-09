import {useMutation} from '@tanstack/react-query';
import apiClient from '@/api/client';
import {API_ENDPOINTS} from '@/api/endpoints';
import {type TokensSchema} from '@/types';

// 구글 로그인
const loginWithGoogle = async (idToken: string): Promise<TokensSchema> => {
  const {data} = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN_GOOGLE, {
    idToken,
  });
  return data.result;
};

export const useGoogleLogin = (options = {}) => {
  return useMutation({
    mutationFn: loginWithGoogle,
    onError: error => {
      console.log('Google Login error:', error);
    },
    ...options,
  });
};

// 토큰 재발급
const refreshTokens = async (refreshToken: string): Promise<TokensSchema> => {
  const {data} = await apiClient.post(API_ENDPOINTS.AUTH.REISSUE, {
    refreshToken,
  });
  return data.result;
};

export const useRefreshTokens = () => {
  return useMutation({
    mutationFn: refreshTokens,
    onSuccess: data => {
      console.log('Refresh Token success:', data);
    },
    onError: error => {
      console.log('Refresh Token error:', error);
    },
  });
};

// 로그아웃
const logout = async (refreshToken: string) => {
  const {data} = await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT, {
    refreshToken,
  });
  return data;
};

export const useLogout = () => {
  return useMutation({
    mutationFn: logout,
    onSuccess: data => {
      console.log('Logout success:', data);
    },
    onError: error => {
      console.log('Logout error:', error);
    },
  });
};

import {useMutation} from '@tanstack/react-query';
import apiClient from '@/api/client';
import {API_ENDPOINTS} from '@/api/endpoints';
import {
  type GoogleLoginArgs,
  type AppleLoginArgs,
  type TokensSchema,
} from '@/types';

// 구글 로그인
const loginWithGoogle = async (
  payload: GoogleLoginArgs,
): Promise<TokensSchema> => {
  const {data} = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN_GOOGLE, payload);
  return data.result;
};

export const useGoogleLogin = (options = {}) => {
  return useMutation({
    mutationFn: loginWithGoogle,
    ...options,
  });
};

// 애플 로그인
const loginWithApple = async (payload: AppleLoginArgs) => {
  const {data} = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN_APPLE, payload);
  return data.result;
};

export const useAppleLogin = (options = {}) => {
  return useMutation({
    mutationFn: loginWithApple,
    ...options,
  });
};

// 토큰 재발급
export const refreshTokenDirectly = async (
  refreshToken: string,
): Promise<TokensSchema> => {
  try {
    const {data} = await apiClient.post(API_ENDPOINTS.AUTH.REISSUE, {
      refreshToken,
    });
    if (data.result) {
      return data.result;
    } else {
      throw new Error('No result in response');
    }
  } catch (error) {
    console.error('Failed to refresh token:', error);
    throw error;
  }
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
  });
};

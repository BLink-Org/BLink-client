import {useMutation} from '@tanstack/react-query';
import apiClient from '@/api/client';
import {API_ENDPOINTS} from '@/api/endpoints';
import {type AppleLoginArgs, type TokensSchema} from '@/types';

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

// 애플 로그인
const loginWithApple = async (payload: AppleLoginArgs) => {
  const {data} = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN_APPLE, payload);
  return data.result;
};

export const useAppleLogin = (options = {}) => {
  return useMutation({
    mutationFn: loginWithApple,
    onError: error => {
      console.log('Apple Login error:', error);
    },
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
    onSuccess: data => {
      console.log('Logout success:', data);
    },
    onError: error => {
      console.log('Logout error:', error);
    },
  });
};

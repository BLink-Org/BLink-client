import {useMutation} from '@tanstack/react-query';
import apiClient from '@/api/client';
import {API_ENDPOINTS} from '@/api/endpoints';

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

const loginWithGoogle = async (idToken: string): Promise<TokenResponse> => {
  const {data} = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN_GOOGLE, {
    idToken,
  });
  return data.result;
};

export const useGoogleLogin = () => {
  return useMutation({
    mutationFn: loginWithGoogle,
    onError: error => {
      console.log('Google Login error:', error);
    },
  });
};

const refreshTokens = async (refreshToken: string): Promise<TokenResponse> => {
  const {data} = await apiClient.post<TokenResponse>(
    API_ENDPOINTS.AUTH.REISSUE,
    {refreshToken},
  );
  return data;
};

export const useRefreshTokens = () => {
  return useMutation({
    mutationFn: refreshTokens,
    onError: error => {
      console.log('Refresh Token error:', error);
    },
  });
};

import {useMutation} from '@tanstack/react-query';
import {CLIENT_ID, REDIRECT_URI} from '@env';
import apiClient from '@/api/client';
import {API_ENDPOINTS} from '@/api/endpoints';

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

const getTokens = async (code: string): Promise<TokenResponse> => {
  const {data} = await apiClient.get(
    API_ENDPOINTS.AUTH.GOOGLE.replace(':code', code),
  );
  return data.result;
};

export const useGetTokens = () => {
  return useMutation({
    mutationFn: getTokens,
    onError: error => {
      console.log('Get Tokens error:', error);
    },
  });
};

export const generateGoogleAuthUrl = (): string => {
  const responseType = 'code';
  const scope = 'profile%20email';
  return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${responseType}&scope=${scope}`;
};

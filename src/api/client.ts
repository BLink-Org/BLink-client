import axios, {type AxiosRequestConfig} from 'axios';
import {API_URL} from '@env';
import {useUserStore} from '@/store/useUserStore';
import {signOut} from '@/utils/auth-utils';
import {refreshTokenDirectly} from '@/api/hooks/useAuth';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
apiClient.interceptors.request.use(
  async config => {
    const {accessToken} = useUserStore.getState();
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  async error => {
    return await Promise.reject(error);
  },
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  response => response,
  async error => {
    const {
      config,
      response: {status},
    } = error;

    // 401 Unauthorized 오류 처리
    if (status === 401) {
      const originalRequest = config as AxiosRequestConfig;
      const {refreshToken} = useUserStore.getState();

      if (!refreshToken) {
        console.warn('Refresh token not found, logging out...');
        await signOut();
        return await Promise.reject(error);
      }

      try {
        // 리프레시 토큰 요청
        const tokenResponse = await refreshTokenDirectly(refreshToken);

        // 새로운 토큰이 있을 경우
        if (tokenResponse) {
          const newAccessToken = tokenResponse.accessToken;
          const newRefreshToken = tokenResponse.refreshToken;

          // 새로 발급받은 토큰 저장
          await useUserStore
            .getState()
            .setTokens(newAccessToken, newRefreshToken);

          // 원래의 요청에 새로운 액세스 토큰 설정
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          }

          return await apiClient(originalRequest);
        } else {
          // 리프레시 토큰도 만료된 경우
          console.warn('Refresh token expired, logging out...');
          await signOut();
        }
      } catch (refreshError) {
        // 리프레시 토큰 갱신 실패 경우
        console.warn('Refresh token request failed, logging out...');
        await signOut();
        return await Promise.reject(refreshError);
      }
    }
    return await Promise.reject(error);
  },
);

export default apiClient;

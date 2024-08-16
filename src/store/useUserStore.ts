import {create} from 'zustand';
import EncryptedStorage from 'react-native-encrypted-storage';

interface UserState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean | null;
  setTokens: (accessToken: string, refreshToken: string) => Promise<void>;
  clearTokens: () => Promise<void>;
  loadTokens: () => Promise<void>;
}

export const useUserStore = create<UserState>(set => ({
  accessToken: null,
  refreshToken: null,
  isAuthenticated: null,

  // 토큰 저장
  setTokens: async (accessToken: string, refreshToken: string) => {
    await EncryptedStorage.setItem('accessToken', accessToken);
    await EncryptedStorage.setItem('refreshToken', refreshToken);
    set({
      accessToken,
      refreshToken,
      isAuthenticated: true,
    });
  },

  // 토큰 삭제 및 로그아웃
  clearTokens: async () => {
    await EncryptedStorage.removeItem('accessToken');
    await EncryptedStorage.removeItem('refreshToken');
    set({
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    });
  },

  // 토큰 로드
  loadTokens: async () => {
    const accessToken = await EncryptedStorage.getItem('accessToken');
    const refreshToken = await EncryptedStorage.getItem('refreshToken');
    if (accessToken && refreshToken) {
      set({
        accessToken,
        refreshToken,
        isAuthenticated: true,
      });
    } else {
      set({
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
      });
    }
  },
}));

import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {THEMES, type Theme} from '@/constants/theme';

interface ThemeStore {
  theme: Theme;
  setTheme: (themeNumber: number) => void;
  asyncSetTheme: (themeNumber: number) => Promise<void>;
  restoreTheme: () => void;
  getSavedTheme: () => Promise<number | null>;
}

export const useThemeStore = create<ThemeStore>(set => ({
  theme: THEMES[1], // 기본테마 -> 1번
  setTheme: (themeNumber: number) => {
    set({theme: THEMES[themeNumber]});
  },
  asyncSetTheme: async (themeNumber: number) => {
    await AsyncStorage.setItem('theme', themeNumber.toString());
    set({theme: THEMES[themeNumber]});
  },
  restoreTheme: () => {
    void (async () => {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme !== null) {
        set({theme: THEMES[parseInt(savedTheme, 10)]});
      }
    })();
  },
  getSavedTheme: async () => {
    const savedTheme = await AsyncStorage.getItem('theme');
    return savedTheme ? parseInt(savedTheme, 10) : null;
  },
}));

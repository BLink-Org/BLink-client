import {create} from 'zustand';

interface BottomButtonSizeState {
  buttonHeight: number;
  setButtonHeight: (height: number) => void;
}

export const useBottomButtonSizeStore = create<BottomButtonSizeState>(set => ({
  buttonHeight: 58,
  setButtonHeight: (height: number) => set({buttonHeight: height}),
}));

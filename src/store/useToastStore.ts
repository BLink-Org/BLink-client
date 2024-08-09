import {create} from 'zustand';

interface ToastState {
  toast: string | null;
  showModal: (id: string) => void;
  closeModal: (id: string) => void;
}

export const useToastStore = create<ToastState>(set => ({
  toast: null,
  showModal: (id: string) => set({toast: id}),
  closeModal: (id: string) =>
    set(state => {
      if (state.toast === id) {
        return {toast: null};
      }
      return state;
    }),
}));

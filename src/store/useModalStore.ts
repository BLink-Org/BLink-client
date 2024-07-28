import {create} from 'zustand';

interface ModalState {
  modals: string | null;
  showModal: (id: string) => void;
  closeModal: (id: string) => void;
}

export const useModalStore = create<ModalState>(set => ({
  modals: null,
  showModal: (id: string) => set({modals: id}),
  closeModal: (id: string) =>
    set(state => {
      if (state.modals === id) {
        return {modals: null};
      }
      return state;
    }),
}));

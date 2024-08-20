import { create } from 'zustand';

interface State {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}

export const useLoadingStore = create<State>()((set) => ({
  isLoading: false,
  setIsLoading: (value) => set({ isLoading: value }),
}));

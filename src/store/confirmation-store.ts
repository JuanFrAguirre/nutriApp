import { create } from 'zustand';

interface State {
  isOpen: boolean;
  message: string;
  openConfirmation: (
    message: string,
    onConfirm: (textValue?: string) => any,
    showText?: boolean,
  ) => void;
  closeConfirmation: () => void;
  onConfirm: (textValue?: string) => void;
  showText: boolean;
  textValue: string;
  setTextValue: (textValue: string) => void;
}

export const useConfirmationStore = create<State>()((set, get) => ({
  isOpen: false,
  message: '',
  onConfirm: () => {},
  onCancel: () => {},
  openConfirmation: (message, onConfirm, showText) => {
    set({
      isOpen: true,
      message,
      onConfirm,
      showText,
      textValue: '',
    });
  },
  closeConfirmation: () => set({ isOpen: false }),
  showText: false,
  textValue: '',
  setTextValue: (textValue) => set({ textValue }),
}));

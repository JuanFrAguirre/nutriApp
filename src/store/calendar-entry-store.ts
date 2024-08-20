import { dateToString } from '@/utils';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
  date: string;
  setDate: (newDate: string) => void;
}

export const useCalendarEntryStore = create<State>()(
  persist(
    (set, get) => ({
      date: dateToString(new Date()),
      setDate: (newDate) => {
        set({ date: newDate });
      },
    }),
    { name: 'calendar-entry' },
  ),
);

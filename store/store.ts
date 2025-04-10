import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist } from "zustand/middleware";

type Session = {
  id: string;
  duration: number; // in minutes
  date: string; // ISO string
};

interface MeditationState {
    sessions: Session[];
    addSession: (duration: number) => void;
    clearSessions: () => void;
  
    isDarkMode: boolean;
    toggleDarkMode: () => void;
  }
  export const useMeditationStore = create<MeditationState>()(
    persist(
      (set, get) => ({
        sessions: [],
        addSession: (duration) => {
          const newSession: Session = {
            id: Date.now().toString(),
            duration,
            date: new Date().toISOString(),
          };
          set({ sessions: [...get().sessions, newSession] });
        },
        clearSessions: () => set({ sessions: [] }),
  
        // Dark mode state
        isDarkMode: false,
        toggleDarkMode: () => set({ isDarkMode: !get().isDarkMode }),
      }),
      {
        name: "meditation-sessions",
        storage: AsyncStorage,
      }
    )
  );
  
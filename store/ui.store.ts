import { create } from 'zustand';

interface UiState {
  sidebarOpen: boolean;
  setSidebarOpen: (val: boolean) => void;
  toggleSidebar: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  sidebarOpen: false,
  setSidebarOpen: (val) => set({ sidebarOpen: val }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));

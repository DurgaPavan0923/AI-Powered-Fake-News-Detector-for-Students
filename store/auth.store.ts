import { create } from 'zustand';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Student' | 'Admin';
  onboarded: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, role?: 'Student' | 'Admin') => Promise<void>;
  register: (name: string, email: string) => Promise<void>;
  logout: () => void;
  toggleRole: () => void;
  setOnboarded: (val: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => {
  // Safe localStorage helper
  const getStoredUser = () => {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem('factlens_user');
    const user = stored ? JSON.parse(stored) : {
      id: 'usr_1',
      name: 'Alex Mercer',
      email: 'alex.mercer@academy.edu',
      role: 'Student',
      onboarded: true
    };
    if (user) {
      document.cookie = `factlens_user_session=${encodeURIComponent(JSON.stringify(user))}; path=/; max-age=604800; SameSite=Lax`;
    }
    return user;
  };

  return {
    user: getStoredUser(),
    isAuthenticated: typeof window !== 'undefined' ? !!localStorage.getItem('factlens_user') || true : true,
    isLoading: false,
    login: async (email, role = 'Student') => {
      set({ isLoading: true });
      await new Promise(r => setTimeout(r, 600));
      const user: User = {
        id: 'usr_' + Math.random().toString(36).substr(2, 4),
        name: email.split('@')[0].split('.').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' '),
        email,
        role,
        onboarded: true
      };
      localStorage.setItem('factlens_user', JSON.stringify(user));
      document.cookie = `factlens_user_session=${encodeURIComponent(JSON.stringify(user))}; path=/; max-age=604800; SameSite=Lax`;
      set({ user, isAuthenticated: true, isLoading: false });
    },
    register: async (name, email) => {
      set({ isLoading: true });
      await new Promise(r => setTimeout(r, 600));
      const user: User = {
        id: 'usr_' + Math.random().toString(36).substr(2, 4),
        name,
        email,
        role: 'Student',
        onboarded: false
      };
      localStorage.setItem('factlens_user', JSON.stringify(user));
      document.cookie = `factlens_user_session=${encodeURIComponent(JSON.stringify(user))}; path=/; max-age=604800; SameSite=Lax`;
      set({ user, isAuthenticated: true, isLoading: false });
    },
    logout: () => {
      localStorage.removeItem('factlens_user');
      document.cookie = 'factlens_user_session=; path=/; max-age=0; SameSite=Lax';
      set({ user: null, isAuthenticated: false });
    },
    toggleRole: () => set((state) => {
      if (!state.user) return {};
      const newUser = { ...state.user, role: state.user.role === 'Student' ? 'Admin' : ('Student' as const) };
      localStorage.setItem('factlens_user', JSON.stringify(newUser));
      document.cookie = `factlens_user_session=${encodeURIComponent(JSON.stringify(newUser))}; path=/; max-age=604800; SameSite=Lax`;
      return { user: newUser };
    }),
    setOnboarded: (val) => set((state) => {
      if (!state.user) return {};
      const newUser = { ...state.user, onboarded: val };
      localStorage.setItem('factlens_user', JSON.stringify(newUser));
      document.cookie = `factlens_user_session=${encodeURIComponent(JSON.stringify(newUser))}; path=/; max-age=604800; SameSite=Lax`;
      return { user: newUser };
    })
  };
});
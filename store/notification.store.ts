import { create } from 'zustand';

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'alert';
  read: boolean;
  time: string;
}

interface NotificationState {
  notifications: SystemNotification[];
  addNotification: (noti: Omit<SystemNotification, 'id' | 'read' | 'time'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
}

const DEFAULT_NOTIFICATIONS: SystemNotification[] = [
  {
    id: 'not_1',
    title: 'Verification Complete',
    message: 'Your analysis of Kepler-452b Observations has finished. Click to see findings.',
    type: 'success',
    read: false,
    time: '5m ago'
  },
  {
    id: 'not_2',
    title: 'Suspicious Article Detected',
    message: 'The analysis on Diabetes Tea Cure returned a High Misinformation risk warning.',
    type: 'alert',
    read: false,
    time: '2h ago'
  },
  {
    id: 'not_3',
    title: 'Admin Policy Update',
    message: 'A new set of 12 academic databases has been whitelisted for factual verification.',
    type: 'info',
    read: true,
    time: '1d ago'
  }
];

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: DEFAULT_NOTIFICATIONS,
  addNotification: (noti) => set((state) => [
    {
      ...noti,
      id: 'not_' + Math.random().toString(36).substr(2, 4),
      read: false,
      time: 'Just now'
    },
    ...state.notifications
  ] as any),
  markAsRead: (id) => set((state) => ({
    notifications: state.notifications.map(n => n.id === id ? { ...n, read: true } : n)
  })),
  markAllAsRead: () => set((state) => ({
    notifications: state.notifications.map(n => ({ ...n, read: true }))
  })),
  clearAll: () => set({ notifications: [] })
}));
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Notification, NotificationType, NotificationAction } from '../types/notification';
import { Agreement } from '../types/agreement';
import { Todo } from '../types/todo';
import { useAuth } from './AuthContext';

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (message: string, type?: 'success' | 'error' | 'info', duration?: number) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = localStorage.getItem('notifications');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const addNotification = useCallback((
    message: string,
    type: 'success' | 'error' | 'info' = 'success',
    duration: number = 5000
  ) => {
    const newNotification: Notification = {
      id: crypto.randomUUID(),
      type: 'info',
      message,
      timestamp: new Date().toISOString(),
      read: false,
      metadata: {
        userId: user?.id,
        userName: user?.name,
        userRole: user?.role,
        timestamp: new Date().toISOString(),
      }
    };

    setNotifications(prev => [newNotification, ...prev]);

    // Auto-remove notification after duration
    if (duration > 0) {
      setTimeout(() => {
        removeNotification(newNotification.id);
      }, duration);
    }
  }, [user]);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        removeNotification,
        clearAllNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
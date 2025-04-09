import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Notification, NotificationType, NotificationAction } from '../types/notification';
import { Agreement } from '../types/agreement';
import { Todo } from '../types/todo';
import { useAuth } from './AuthContext';

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (type: NotificationType, action: NotificationAction, entity: Agreement | Todo, location?: string) => void;
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

  const getNotificationDetails = (
    type: NotificationType,
    action: NotificationAction,
    entity: Agreement | Todo,
    location?: string
  ) => {
    const isAgreement = type === 'agreement';
    const title = isAgreement ? (entity as Agreement).element : (entity as Todo).title;
    const listName = location || 'General';

    let actionText = '';
    switch (action) {
      case 'created':
        actionText = 'fue creado';
        break;
      case 'updated':
        actionText = 'fue actualizado';
        break;
      case 'deleted':
        actionText = 'fue eliminado';
        break;
    }

    const description = isAgreement
      ? `${title} ${actionText} en ${listName}`
      : `Tarea "${title}" ${actionText} en la lista "${listName}"`;

    return {
      title,
      description,
      metadata: {
        listName,
        userId: user?.id,
        userName: user?.name,
        userRole: user?.role,
        timestamp: new Date().toISOString(),
      }
    };
  };

  const addNotification = useCallback((
    type: NotificationType,
    action: NotificationAction,
    entity: Agreement | Todo,
    location?: string
  ) => {
    const details = getNotificationDetails(type, action, entity, location);
    
    const newNotification: Notification = {
      id: crypto.randomUUID(),
      type,
      action,
      title: details.title,
      description: details.description,
      timestamp: new Date().toISOString(),
      read: false,
      entityId: entity.id,
      entityType: type === 'agreement' ? 'agreement' : 'todo',
      entityData: entity,
      metadata: details.metadata,
    };

    setNotifications(prev => [newNotification, ...prev]);
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
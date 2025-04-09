import { Agreement } from './agreement';
import { Todo } from './todo';
import { UserRole } from './user';

export type NotificationType = 'agreement' | 'todo' | 'list';
export type NotificationAction = 'created' | 'deleted' | 'updated' | 'completed';

export interface NotificationMetadata {
  listName: string;
  userId?: string;
  userName?: string;
  userRole?: UserRole;
  timestamp: string;
}

export interface Notification {
  id: string;
  type: NotificationType;
  action: NotificationAction;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  entityId: string;
  entityType: 'agreement' | 'todo' | 'list';
  entityData: Partial<Agreement | Todo>;
  metadata: NotificationMetadata;
}
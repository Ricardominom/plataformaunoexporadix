import React, { memo } from 'react';
import {
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Divider,
  Tooltip,
  Avatar,
} from '@mui/material';
import {
  FileText,
  CheckSquare,
  Trash2,
  CheckCircle2,
  X,
  Check,
  List as ListIcon,
} from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

interface NotificationPanelProps {
  onClose: () => void;
}

export const NotificationPanel = memo<NotificationPanelProps>(({ onClose }) => {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAllNotifications,
  } = useNotification();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'agreement':
        return <FileText size={18} />;
      case 'todo':
        return <CheckSquare size={18} />;
      case 'list':
        return <ListIcon size={18} />;
      default:
        return null;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'created':
        return '#30d158';
      case 'deleted':
        return '#ff2d55';
      case 'updated':
        return '#0071e3';
      case 'completed':
        return '#5856d6';
      default:
        return 'var(--text-primary)';
    }
  };

  return (
    <Box
      sx={{
        width: 380,
        maxHeight: '80vh',
        backgroundColor: 'var(--surface-primary)',
        borderRadius: '12px',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
      }}
      className="glass-effect"
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--border-color)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontSize: '1rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
            }}
          >
            Notificaciones
          </Typography>
          {unreadCount > 0 && (
            <Typography
              sx={{
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
              }}
            >
              ({unreadCount})
            </Typography>
          )}
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {unreadCount > 0 && (
            <Button
              size="small"
              onClick={markAllAsRead}
              startIcon={<Check size={16} />}
              sx={{
                fontSize: '0.75rem',
                textTransform: 'none',
                color: 'var(--text-secondary)',
                '&:hover': {
                  backgroundColor: 'var(--hover-bg)',
                  color: 'var(--text-primary)',
                },
              }}
            >
              Marcar todo como leído
            </Button>
          )}
          <IconButton
            size="small"
            onClick={onClose}
            sx={{
              color: 'var(--text-secondary)',
              '&:hover': {
                backgroundColor: 'var(--hover-bg)',
                color: 'var(--text-primary)',
              },
            }}
          >
            <X size={16} />
          </IconButton>
        </Box>
      </Box>

      {/* Notifications List */}
      {notifications.length > 0 ? (
        <>
          <List sx={{ flex: 1, overflowY: 'auto', py: 0 }}>
            {notifications.map((notification, index) => (
              <React.Fragment key={notification.id}>
                <ListItem
                  sx={{
                    py: 2,
                    px: 2,
                    backgroundColor: notification.read
                      ? 'transparent'
                      : 'var(--surface-secondary)',
                    '&:hover': {
                      backgroundColor: 'var(--hover-bg)',
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    {getNotificationIcon(notification.type)}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ mb: 0.5 }}>
                        <Typography
                          sx={{
                            fontSize: '0.875rem',
                            fontWeight: notification.read ? 400 : 500,
                            color: 'var(--text-primary)',
                          }}
                        >
                          {notification.description}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {notification.metadata?.userName && (
                          <Avatar
                            sx={{
                              width: 20,
                              height: 20,
                              fontSize: '0.75rem',
                              backgroundColor: 'var(--status-info-bg)',
                              color: 'var(--status-info-text)',
                            }}
                          >
                            {notification.metadata.userName.charAt(0)}
                          </Avatar>
                        )}
                        <Typography
                          sx={{
                            fontSize: '0.75rem',
                            color: 'var(--text-secondary)',
                          }}
                        >
                          {notification.metadata?.userName} • {dayjs(notification.timestamp).fromNow()}
                        </Typography>
                      </Box>
                    }
                  />
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {!notification.read && (
                      <Tooltip title="Marcar como leído">
                        <IconButton
                          size="small"
                          onClick={() => markAsRead(notification.id)}
                          sx={{
                            color: 'var(--text-secondary)',
                            '&:hover': {
                              backgroundColor: 'var(--hover-bg)',
                              color: '#30d158',
                            },
                          }}
                        >
                          <CheckCircle2 size={16} />
                        </IconButton>
                      </Tooltip>
                    )}
                    <Tooltip title="Eliminar">
                      <IconButton
                        size="small"
                        onClick={() => removeNotification(notification.id)}
                        sx={{
                          color: 'var(--text-secondary)',
                          '&:hover': {
                            backgroundColor: 'var(--hover-bg)',
                            color: '#ff2d55',
                          },
                        }}
                      >
                        <Trash2 size={16} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </ListItem>
                {index < notifications.length - 1 && (
                  <Divider sx={{ borderColor: 'var(--border-color)' }} />
                )}
              </React.Fragment>
            ))}
          </List>

          {/* Footer */}
          <Box
            sx={{
              p: 2,
              borderTop: '1px solid var(--border-color)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Button
              size="small"
              onClick={clearAllNotifications}
              startIcon={<Trash2 size={16} />}
              sx={{
                fontSize: '0.75rem',
                textTransform: 'none',
                color: '#ff2d55',
                '&:hover': {
                  backgroundColor: 'rgba(255, 45, 85, 0.1)',
                },
              }}
            >
              Limpiar todo
            </Button>
            <Button
              size="small"
              sx={{
                fontSize: '0.75rem',
                textTransform: 'none',
                color: '#0071e3',
                '&:hover': {
                  backgroundColor: 'rgba(0, 113, 227, 0.1)',
                },
              }}
            >
              Ver todas
            </Button>
          </Box>
        </>
      ) : (
        <Box
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography
            sx={{
              color: 'var(--text-secondary)',
              textAlign: 'center',
            }}
          >
            No hay notificaciones
          </Typography>
        </Box>
      )}
    </Box>
  );
});

NotificationPanel.displayName = 'NotificationPanel';
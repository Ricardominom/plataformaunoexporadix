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
import { motion } from 'framer-motion';
import {
  FileText,
  CheckSquare,
  Trash2,
  CheckCircle2,
  X,
  Check,
  List as ListIcon,
  Bell,
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Box
      sx={{
        width: 380,
        maxHeight: '80vh',
        backgroundColor: 'var(--surface-primary)',
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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Bell size={18} color="var(--text-primary)" />
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
            <Box
              sx={{
                backgroundColor: 'var(--status-info-bg)',
                color: 'var(--status-info-text)',
                borderRadius: '12px',
                px: 1,
                py: 0.25,
                fontSize: '0.75rem',
                fontWeight: 500,
                minWidth: 20,
                textAlign: 'center',
              }}
            >
              {unreadCount}
            </Box>
          )}
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {unreadCount > 0 && (
            <Button
              size="small"
              onClick={markAllAsRead}
              startIcon={<Check size={14} />}
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
          <List 
            component={motion.ul}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            sx={{ 
              flex: 1, 
              overflowY: 'auto', 
              py: 0,
              '&::-webkit-scrollbar': {
                width: '4px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'var(--text-tertiary)',
                borderRadius: '4px',
              },
            }}
          >
            {notifications.map((notification) => (
              <motion.div key={notification.id} variants={itemVariants}>
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
                    transition: 'background-color 0.2s ease',
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: getActionColor(notification.action) }}>
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
                            lineHeight: 1.4,
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
                      <Tooltip title="Marcar como leído" arrow placement="left">
                        <IconButton
                          size="small"
                          onClick={() => markAsRead(notification.id)}
                          sx={{
                            color: 'var(--text-secondary)',
                            '&:hover': {
                              backgroundColor: 'rgba(48, 209, 88, 0.1)',
                              color: '#30d158',
                            },
                            width: 28,
                            height: 28,
                          }}
                        >
                          <CheckCircle2 size={16} />
                        </IconButton>
                      </Tooltip>
                    )}
                    <Tooltip title="Eliminar" arrow placement="left">
                      <IconButton
                        size="small"
                        onClick={() => removeNotification(notification.id)}
                        sx={{
                          color: 'var(--text-secondary)',
                          '&:hover': {
                            backgroundColor: 'rgba(255, 45, 85, 0.1)',
                            color: '#ff2d55',
                          },
                          width: 28,
                          height: 28,
                        }}
                      >
                        <Trash2 size={16} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </ListItem>
                <Divider sx={{ borderColor: 'var(--border-color)' }} />
              </motion.div>
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
          <Box
            sx={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              backgroundColor: 'var(--surface-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2,
            }}
          >
            <Bell size={24} color="var(--text-secondary)" />
          </Box>
          <Typography
            sx={{
              color: 'var(--text-primary)',
              fontWeight: 500,
              textAlign: 'center',
            }}
          >
            No hay notificaciones
          </Typography>
          <Typography
            sx={{
              color: 'var(--text-secondary)',
              fontSize: '0.875rem',
              textAlign: 'center',
            }}
          >
            Las notificaciones aparecerán aquí cuando haya actividad en tu cuenta.
          </Typography>
        </Box>
      )}
    </Box>
  );
});

NotificationPanel.displayName = 'NotificationPanel';
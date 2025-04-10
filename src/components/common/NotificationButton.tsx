import React, { useState, useRef, useEffect } from 'react';
import { 
  IconButton, 
  Badge, 
  Popper, 
  Grow, 
  Paper, 
  ClickAwayListener,
  Box
} from '@mui/material';
import { Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotification } from '../../context/NotificationContext';
import { NotificationPanel } from '../notifications/NotificationPanel';

export const NotificationButton = () => {
  const { unreadCount } = useNotification();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  // Close if ESC pressed
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <IconButton
          ref={anchorRef}
          onClick={handleToggle}
          size="medium"
          className="nav-icon-bell"
          sx={{
            color: 'var(--text-secondary)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            animation: 'scaleIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.1s',
          }}
        >
          <Badge
            badgeContent={unreadCount}
            color="error"
            sx={{
              '& .MuiBadge-badge': {
                backgroundColor: '#ff2d55',
                minWidth: '18px',
                height: '18px',
                fontSize: '0.75rem',
                transition: 'all 0.3s ease',
                fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
              },
              '&:hover .MuiBadge-badge': {
                transform: 'scale(1.1)',
              },
            }}
          >
            <Bell size={20} />
          </Badge>
        </IconButton>
      </motion.div>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement="bottom-end"
        transition
        disablePortal
        style={{ zIndex: 1300 }}
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [0, 10],
            },
          },
        ]}
      >
        {({ TransitionProps }) => (
          <AnimatePresence>
            {open && (
              <Grow {...TransitionProps}>
                <Box
                  component={motion.div}
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <ClickAwayListener onClickAway={handleClose}>
                    <Paper
                      elevation={0}
                      sx={{
                        mt: 1,
                        transformOrigin: 'top right',
                        boxShadow: 'var(--shadow-lg)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '12px',
                        overflow: 'hidden',
                      }}
                    >
                      <NotificationPanel onClose={() => setOpen(false)} />
                    </Paper>
                  </ClickAwayListener>
                </Box>
              </Grow>
            )}
          </AnimatePresence>
        )}
      </Popper>
    </>
  );
};
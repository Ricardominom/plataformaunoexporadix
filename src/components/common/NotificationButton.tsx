import React, { useState, useRef, useEffect } from 'react';
import { IconButton, Badge, Popper, Grow, Paper, ClickAwayListener } from '@mui/material';
import { Bell } from 'lucide-react';
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
      <IconButton
        ref={anchorRef}
        onClick={handleToggle}
        size="medium"
        className="nav-icon-bell"
        sx={{
          color: 'var(--text-secondary)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          animation: 'scaleIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.1s',
          '&:hover': {
            backgroundColor: 'var(--hover-bg)',
            color: 'var(--text-primary)',
            transform: 'scale(1.1)',
          },
          '&:active': {
            transform: 'scale(0.95)',
          },
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
            },
            '&:hover .MuiBadge-badge': {
              transform: 'scale(1.1)',
            },
          }}
        >
          <Bell size={22} />
        </Badge>
      </IconButton>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement="bottom-end"
        transition
        disablePortal
        style={{ zIndex: 1300 }}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <div>
              <ClickAwayListener onClickAway={handleClose}>
                <Paper
                  elevation={0}
                  sx={{
                    mt: 1,
                    transformOrigin: 'top right',
                  }}
                >
                  <NotificationPanel onClose={() => setOpen(false)} />
                </Paper>
              </ClickAwayListener>
            </div>
          </Grow>
        )}
      </Popper>
    </>
  );
};
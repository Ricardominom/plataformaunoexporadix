import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Box, 
  Typography, 
  useMediaQuery,
  useTheme as useMuiTheme,
} from '@mui/material';
import { NotificationButton } from './NotificationButton';
import { useLocation } from 'react-router-dom';

export const TopBar: React.FC = () => {
  const location = useLocation();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));

  // Get page title based on current route
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/agreements')) return 'Acuerdos';
    if (path.includes('/todos')) return 'To-dos';
    if (path.includes('/toolbox')) return 'Toolbox';
    return 'Dashboard';
  };

  if (isMobile) return null;

  return (
    <AppBar
      position="fixed"
      sx={{
        background: 'transparent',
        boxShadow: 'none',
        height: 'var(--nav-height)',
        backdropFilter: 'saturate(180%) blur(20px)',
        backgroundColor: 'var(--glass-bg)',
        borderBottom: '1px solid var(--border-color)',
        ml: { md: '240px' }, // Adjust for sidebar width
        width: { md: 'calc(100% - 240px)' },
      }}
    >
      <Toolbar
        sx={{
          minHeight: 'var(--nav-height) !important',
          px: { xs: 2, sm: 3, md: 4 },
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: '1.25rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
          }}
        >
          {getPageTitle()}
        </Typography>

        {/* Right Side Controls */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <NotificationButton />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
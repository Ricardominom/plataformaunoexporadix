import React, { useMemo, useCallback, useState } from 'react';
import { AppBar, Toolbar, Button, IconButton, Badge, Box, Divider } from '@mui/material';
import { Bell, Moon, Sun, Building2, FileText, CheckSquare, Wrench } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { LogoutDialog } from './LogoutDialog';

interface NavbarProps {
  user: { name: string };
}

interface NavLink {
  path: string;
  label: string;
  icon: React.ReactNode;
}

export const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  // Memorizar los enlaces de navegación para evitar recreaciones innecesarias
  const navLinks: NavLink[] = useMemo(() => [
    { path: '/agreements', label: 'Acuerdos', icon: <FileText className="h-4 w-4 mr-2" /> },
    { path: '/todos', label: 'To-dos', icon: <CheckSquare className="h-4 w-4 mr-2" /> },
    { path: '/toolbox', label: 'Toolbox', icon: <Wrench className="h-4 w-4 mr-2" /> }
  ], []);

  // Estilos basados en el tema actual
  const styles = useMemo(() => ({
    buttonText: theme === 'dark' ? 'text-primary' : 'text-gray-800',
    buttonIcon: theme === 'dark' ? 'text-primary' : 'text-gray-800',
    appBarStyles: {
      background: 'transparent',
      boxShadow: 'none',
      height: 'var(--nav-height)',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backdropFilter: 'saturate(180%) blur(20px)',
        backgroundColor: 'var(--glass-bg)',
        borderBottom: '1px solid var(--border-color)',
        zIndex: -1,
      }
    },
    toolbarStyles: {
      minHeight: 'var(--nav-height) !important',
      px: { xs: 2, md: 4 },
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      gap: 2,
    },
    navLinksContainer: {
      display: 'flex',
      gap: 2,
      justifyContent: 'center',
      flex: 1,
    },
    rightContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: 3,
      minWidth: '300px',
      justifyContent: 'flex-end',
    },
    iconButtonStyles: {
      color: 'var(--text-secondary)',
      '&:hover': {
        color: 'var(--text-primary)',
        backgroundColor: 'transparent',
      }
    },
    badgeStyles: {
      '& .MuiBadge-badge': {
        backgroundColor: '#ff2d55',
        minWidth: '16px',
        height: '16px',
        fontSize: '0.75rem',
      }
    }
  }), [theme]);

  // Handlers
  const handleLogoClick = useCallback(() => navigate('/agreements'), [navigate]);

  const handleLogout = useCallback(() => {
    setIsLogoutOpen(false);
    navigate('/');
  }, [navigate]);

  // Componente para renderizar los enlaces de navegación
  const renderNavLinks = useCallback(() => (
    navLinks.map((item) => (
      <Button
        key={item.path}
        component={Link}
        to={item.path}
        sx={{
          color: location.pathname === item.path ? 'var(--text-primary)' : 'var(--text-secondary)',
          fontSize: '0.875rem',
          fontWeight: 400,
          textTransform: 'none',
          px: 2,
          minWidth: 0,
          display: 'flex',
          alignItems: 'center',
          '&:hover': {
            backgroundColor: 'transparent',
            color: 'var(--text-primary)',
          },
          transition: 'color 0.2s ease',
        }}
      >
        {item.icon}
        {item.label}
      </Button>
    ))
  ), [navLinks, location.pathname]);

  return (
    <AppBar position="fixed" sx={styles.appBarStyles}>
      <Toolbar sx={styles.toolbarStyles}>
        {/* Logo */}
        <button
          onClick={handleLogoClick}
          className={`flex-shrink-0 flex items-center hover:opacity-80 transition-opacity ${styles.buttonText}`}
          aria-label="Ir a inicio"
        >
          <Building2 className={`h-8 w-8 ${styles.buttonIcon}`} aria-hidden="true" />
          <span className={`ml-2 text-xl font-bold ${styles.buttonText}`}>Plataforma UNO</span>
        </button>

        {/* Navigation Links */}
        <Box sx={styles.navLinksContainer}>
          {renderNavLinks()}
        </Box>

        {/* Right Side Controls */}
        <Box sx={styles.rightContainer}>
          <Divider orientation="vertical" flexItem sx={{ borderColor: 'var(--border-color)' }} />

          <Box sx={{ display: 'flex', gap: 1.5 }}>
            {/* Theme Toggle */}
            <IconButton
              onClick={toggleTheme}
              size="small"
              sx={styles.iconButtonStyles}
              aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </IconButton>

            {/* Notifications */}
            <IconButton
              size="small"
              sx={styles.iconButtonStyles}
              aria-label="Ver notificaciones"
            >
              <Badge
                badgeContent={4}
                color="error"
                sx={styles.badgeStyles}
              >
                <Bell size={18} />
              </Badge>
            </IconButton>

            {/* Logout Dialog */}
            <LogoutDialog
              isOpen={isLogoutOpen}
              onOpenChange={setIsLogoutOpen}
              onLogout={handleLogout}
            />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

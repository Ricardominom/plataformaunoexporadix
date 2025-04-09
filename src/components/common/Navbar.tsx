import React, { useMemo, useState } from 'react';
import { AppBar, Toolbar, Button, IconButton, Badge, Box, Divider, Avatar, Menu, MenuItem, ListItemIcon, Typography } from '@mui/material';
import { Bell, Moon, Sun, Building2, FileText, CheckSquare, Wrench, LogOut, Settings, User } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { LogoutDialog } from './LogoutDialog';

interface NavbarProps {
  user?: { name: string; role: string };
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
  const { logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  const navLinks: NavLink[] = useMemo(() => [
    { path: '/agreements', label: 'Acuerdos', icon: <FileText className="h-5 w-5 mr-2" /> },
    { path: '/todos', label: 'To-dos', icon: <CheckSquare className="h-5 w-5 mr-2" /> },
    { path: '/toolbox', label: 'Toolbox', icon: <Wrench className="h-5 w-5 mr-2" /> }
  ], []);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    handleClose();
    setIsLogoutDialogOpen(true);
  };

  const handleLogout = () => {
    setIsLogoutDialogOpen(false);
    logout();
    navigate('/');
  };

  if (!user) {
    return null;
  }

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
          gap: 2,
        }}
      >
        {/* Logo */}
        <Link
          to="/agreements"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <Building2
            className="h-10 w-10"
            style={{
              color: theme === 'dark' ? '#ffffff' : '#1d1d1f'
            }}
          />
          <span className="text-2xl font-semibold tracking-tight" style={{ color: theme === 'dark' ? '#ffffff' : '#1d1d1f' }}>
            Plataforma UNO
          </span>
        </Link>

        {/* Navigation Links */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          {navLinks.map((item) => (
            <Button
              key={item.path}
              component={Link}
              to={item.path}
              sx={{
                color: location.pathname === item.path ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontSize: '1rem',
                fontWeight: 500,
                textTransform: 'none',
                px: 3,
                py: 2,
                borderRadius: '10px',
                '&:hover': {
                  backgroundColor: 'var(--hover-bg)',
                },
                transition: 'all 0.2s ease',
                height: 48,
              }}
            >
              {item.icon}
              {item.label}
            </Button>
          ))}
        </Box>

        {/* Right Side Controls */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            onClick={toggleTheme}
            size="large"
            sx={{
              color: 'var(--text-secondary)',
              '&:hover': {
                backgroundColor: 'var(--hover-bg)',
              },
              padding: 2,
            }}
          >
            {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
          </IconButton>

          <IconButton
            size="large"
            sx={{
              color: 'var(--text-secondary)',
              '&:hover': {
                backgroundColor: 'var(--hover-bg)',
              },
              padding: 2,
            }}
          >
            <Badge
              badgeContent={4}
              color="error"
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: '#ff2d55',
                  minWidth: '20px',
                  height: '20px',
                  fontSize: '0.75rem',
                },
              }}
            >
              <Bell size={24} />
            </Badge>
          </IconButton>

          <Divider orientation="vertical" flexItem sx={{ borderColor: 'var(--border-color)', height: 32 }} />

          <IconButton
            onClick={handleMenu}
            size="small"
            sx={{
              padding: 0.5,
              '&:hover': {
                backgroundColor: 'var(--hover-bg)',
              },
            }}
          >
            <Avatar
              sx={{
                width: 44,
                height: 44,
                backgroundColor: 'var(--status-info-bg)',
                color: 'var(--status-info-text)',
                fontSize: '1.125rem',
                fontWeight: 500,
              }}
            >
              {user.name.charAt(0)}
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              sx: {
                mt: 1,
                backgroundColor: theme === 'dark' ? '#1c1c1e' : '#ffffff',
                borderRadius: '12px',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-lg)',
                minWidth: 200,
                '& .MuiMenuItem-root': {
                  color: 'var(--text-primary)',
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <Box sx={{ px: 2, py: 1.5, backgroundColor: theme === 'dark' ? '#1c1c1e' : '#ffffff' }}>
              <Typography sx={{ fontSize: '0.875rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                {user.name}
              </Typography>
              <Typography sx={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                {user.role}
              </Typography>
            </Box>
            <Divider sx={{ borderColor: 'var(--border-color)' }} />
            <MenuItem
              onClick={handleClose}
              sx={{
                py: 1.5,
                px: 2,
                backgroundColor: theme === 'dark' ? '#1c1c1e' : '#ffffff',
                '&:hover': { backgroundColor: 'var(--hover-bg)' },
              }}
            >
              <ListItemIcon>
                <User size={18} className="text-gray-500" />
              </ListItemIcon>
              <Typography sx={{ fontSize: '0.875rem' }}>Mi Perfil</Typography>
            </MenuItem>
            <MenuItem
              onClick={handleClose}
              sx={{
                py: 1.5,
                px: 2,
                backgroundColor: theme === 'dark' ? '#1c1c1e' : '#ffffff',
                '&:hover': { backgroundColor: 'var(--hover-bg)' },
              }}
            >
              <ListItemIcon>
                <Settings size={18} className="text-gray-500" />
              </ListItemIcon>
              <Typography sx={{ fontSize: '0.875rem' }}>Configuración</Typography>
            </MenuItem>
            <Divider sx={{ borderColor: 'var(--border-color)' }} />
            <MenuItem
              onClick={handleLogoutClick}
              sx={{
                py: 1.5,
                px: 2,
                color: '#ff2d55',
                backgroundColor: theme === 'dark' ? '#1c1c1e' : '#ffffff',
                '&:hover': { backgroundColor: 'rgba(255, 45, 85, 0.1)' },
              }}
            >
              <ListItemIcon>
                <LogOut size={18} className="text-red-500" />
              </ListItemIcon>
              <Typography sx={{ fontSize: '0.875rem' }}>Cerrar Sesión</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>

      <LogoutDialog
        isOpen={isLogoutDialogOpen}
        onOpenChange={setIsLogoutDialogOpen}
        onConfirm={handleLogout}
      />
    </AppBar>
  );
};

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
    { path: '/agreements', label: 'Acuerdos', icon: <FileText className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" /> },
    { path: '/todos', label: 'To-dos', icon: <CheckSquare className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" /> },
    { path: '/toolbox', label: 'Toolbox', icon: <Wrench className="h-5 w-5 transition-transform duration-300 group-hover:-rotate-45" /> }
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
          className="nav-logo flex items-center gap-3 transition-all duration-300 hover:opacity-80"
        >
          <Building2
            className="nav-icon-logo h-6 w-6 transition-transform duration-300 hover:scale-110"
            style={{ color: theme === 'dark' ? '#ffffff' : '#1d1d1f' }}
          />
          <span
            className="text-lg font-semibold tracking-tight"
            style={{ color: theme === 'dark' ? '#ffffff' : '#1d1d1f' }}
          >
            Plataforma UNO
          </span>
        </Link>

        {/* Navigation Links */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          {navLinks.map((item, index) => (
            <Button
              key={item.path}
              component={Link}
              to={item.path}
              className={`nav-item group transition-all duration-300`}
              sx={{
                color: location.pathname === item.path ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontSize: '0.875rem',
                fontWeight: 500,
                textTransform: 'none',
                px: 2,
                py: 1,
                borderRadius: '8px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                animation: `slideIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s both`,
                '&:hover': {
                  backgroundColor: 'var(--hover-bg)',
                  color: 'var(--text-primary)',
                  transform: 'translateY(-2px)',
                  '& .MuiButton-startIcon': {
                    transform: 'scale(1.1)',
                  },
                },
                '&:active': {
                  transform: 'translateY(0)',
                },
                '& .MuiButton-startIcon': {
                  transition: 'transform 0.3s ease',
                  marginRight: '8px',
                  display: 'flex',
                  alignItems: 'center',
                },
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
            size="small"
            className="nav-icon-theme"
            sx={{
              color: 'var(--text-secondary)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              animation: 'scaleIn 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                backgroundColor: 'var(--hover-bg)',
                color: 'var(--text-primary)',
                transform: 'rotate(180deg)',
              },
            }}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </IconButton>

          <IconButton
            size="small"
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
              badgeContent={4}
              color="error"
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: '#ff2d55',
                  minWidth: '16px',
                  height: '16px',
                  fontSize: '0.75rem',
                  transition: 'all 0.3s ease',
                },
                '&:hover .MuiBadge-badge': {
                  transform: 'scale(1.1)',
                },
              }}
            >
              <Bell size={18} />
            </Badge>
          </IconButton>

          <Divider orientation="vertical" flexItem sx={{ borderColor: 'var(--border-color)', height: 32 }} />

          <IconButton
            onClick={handleMenu}
            size="small"
            className="nav-icon-avatar"
            sx={{
              padding: 0.5,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              animation: 'scaleIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
              '&:hover': {
                backgroundColor: 'var(--hover-bg)',
                transform: 'scale(1.1)',
              },
              '&:active': {
                transform: 'scale(0.95)',
              },
            }}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                backgroundColor: 'var(--status-info-bg)',
                color: 'var(--status-info-text)',
                fontSize: '0.875rem',
                fontWeight: 500,
                transition: 'all 0.3s ease',
              }}
            >
              {user?.name.charAt(0)}
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
                backgroundColor: 'var(--surface-primary)',
                borderRadius: '12px',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-lg)',
                minWidth: 200,
                '& .MuiMenuItem-root': {
                  transition: 'all 0.2s ease',
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <Box sx={{ px: 2, py: 1.5 }}>
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
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: 'var(--hover-bg)',
                  transform: 'translateX(4px)',
                },
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
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: 'var(--hover-bg)',
                  transform: 'translateX(4px)',
                },
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
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: 'rgba(255, 45, 85, 0.1)',
                  transform: 'translateX(4px)',
                },
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

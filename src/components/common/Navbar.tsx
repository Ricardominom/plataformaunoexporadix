import React, { useMemo, useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Button, 
  IconButton, 
  Badge, 
  Box, 
  Divider, 
  Avatar, 
  Menu, 
  MenuItem, 
  ListItemIcon, 
  Typography,
  useMediaQuery,
  useTheme as useMuiTheme,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse
} from '@mui/material';
import { 
  Bell, 
  Moon, 
  Sun, 
  Building2, 
  FileText, 
  CheckSquare, 
  Wrench, 
  LogOut, 
  Menu as MenuIcon,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { LogoutDialog } from './LogoutDialog';
import { NotificationButton } from './NotificationButton';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));

  const navLinks: NavLink[] = useMemo(() => [
    {
      path: '/agreements',
      label: 'Acuerdos',
      icon: <FileText className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
    },
    {
      path: '/todos',
      label: 'To-dos',
      icon: <CheckSquare className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
    },
    {
      path: '/toolbox',
      label: 'Toolbox',
      icon: <Wrench className="h-5 w-5 transition-transform duration-300 group-hover:-rotate-45" />
    }
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

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: 'transparent',
          boxShadow: 'none',
          height: 'var(--nav-height)',
          backdropFilter: 'saturate(180%) blur(20px)',
          backgroundColor: 'var(--glass-bg)',
          borderBottom: '1px solid var(--border-color)',
          zIndex: 1200,
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {isMobile && (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleMobileMenuToggle}
                sx={{
                  color: 'var(--text-primary)',
                  mr: 1,
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Link
              to="/agreements"
              className="nav-logo flex items-center gap-3 transition-all duration-300 hover:opacity-80"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Building2
                  className="nav-icon-logo h-7 w-7"
                  style={{ color: theme === 'dark' ? '#ffffff' : '#1d1d1f' }}
                />
              </motion.div>
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="text-xl font-semibold tracking-tight"
                style={{ color: theme === 'dark' ? '#ffffff' : '#1d1d1f' }}
              >
               Alpha Office team management
              </motion.span>
            </Link>
          </Box>

          {/* Navigation Links - Desktop */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {navLinks.map((item, index) => (
                <Button
                  key={item.path}
                  component={Link}
                  to={item.path}
                  className={`nav-item group transition-all duration-300`}
                  sx={{
                    color: location.pathname === item.path ? 'var(--text-primary)' : 'var(--text-secondary)',
                    fontSize: '0.9375rem',
                    fontWeight: 500,
                    textTransform: 'none',
                    px: 2.5,
                    py: 1.5,
                    borderRadius: '8px',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    animation: `slideIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s both`,
                    '&:hover': {
                      backgroundColor: 'var(--hover-bg)',
                      color: 'var(--text-primary)',
                      transform: 'translateY(-2px)',
                    },
                    '&:active': {
                      transform: 'translateY(0)',
                    },
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Button>
              ))}
            </Box>
          )}

          {/* Right Side Controls */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <IconButton
                onClick={toggleTheme}
                size="medium"
                className="nav-icon-theme"
                sx={{
                  color: 'var(--text-secondary)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  animation: 'scaleIn 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    backgroundColor: 'var(--hover-bg)',
                    color: 'var(--text-primary)',
                  },
                }}
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </IconButton>
            </motion.div>

            <NotificationButton />

            <Divider orientation="vertical" flexItem sx={{ borderColor: 'var(--border-color)', height: 32 }} />

            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <IconButton
                onClick={handleMenu}
                size="medium"
                className="nav-icon-avatar"
                sx={{
                  padding: 0.5,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  animation: 'scaleIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
                }}
              >
                <Avatar
                  sx={{
                    width: 38,
                    height: 38,
                    backgroundColor: 'var(--status-info-bg)',
                    color: 'var(--status-info-text)',
                    fontSize: '1rem',
                    fontWeight: 500,
                    transition: 'all 0.3s ease',
                    fontFamily: 'SF Pro Text, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
                  }}
                >
                  {user?.name.charAt(0)}
                </Avatar>
              </IconButton>
            </motion.div>

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
                  minWidth: 220,
                  '& .MuiMenuItem-root': {
                    transition: 'all 0.2s ease',
                  },
                  backdropFilter: 'none',
                  background: theme === 'dark' ? 'rgba(28, 28, 30, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <Box sx={{ px: 2, py: 1.5 }}>
                <Typography sx={{ fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                  {user.name}
                </Typography>
                <Typography sx={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  {user.role}
                </Typography>
              </Box>
              
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
                  <LogOut size={20} style={{ color: '#ff2d55' }} />
                </ListItemIcon>
                <Typography sx={{ fontSize: '0.9375rem' }}>Cerrar Sesión</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        PaperProps={{
          sx: {
            width: '80%',
            maxWidth: 300,
            backgroundColor: 'var(--surface-primary)',
            backdropFilter: 'saturate(180%) blur(20px)',
            border: 'none',
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Building2 size={24} color="var(--text-primary)" />
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'var(--text-primary)' }}>
            Alpha Office team management
          </Typography>
        </Box>
        
        <Divider sx={{ borderColor: 'var(--border-color)' }} />
        
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Avatar
              sx={{
                width: 40,
                height: 40,
                backgroundColor: 'var(--status-info-bg)',
                color: 'var(--status-info-text)',
              }}
            >
              {user.name.charAt(0)}
            </Avatar>
            <Box>
              <Typography sx={{ fontWeight: 500, color: 'var(--text-primary)' }}>
                {user.name}
              </Typography>
              <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
                {user.role}
              </Typography>
            </Box>
          </Box>
        </Box>
        
        <Divider sx={{ borderColor: 'var(--border-color)' }} />
        
        <List sx={{ p: 1 }}>
          {navLinks.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
                onClick={() => setMobileMenuOpen(false)}
                sx={{
                  borderRadius: '8px',
                  my: 0.5,
                  '&.Mui-selected': {
                    backgroundColor: 'var(--status-info-bg)',
                    color: 'var(--status-info-text)',
                    '&:hover': {
                      backgroundColor: 'var(--status-info-bg)',
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.label} 
                  primaryTypographyProps={{ 
                    fontSize: '0.9375rem',
                    fontWeight: location.pathname === item.path ? 500 : 400
                  }} 
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        
        <Divider sx={{ borderColor: 'var(--border-color)' }} />
        
        <List sx={{ p: 1 }}>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                setMobileMenuOpen(false);
                setIsLogoutDialogOpen(true);
              }}
              sx={{
                borderRadius: '8px',
                my: 0.5,
                color: '#ff2d55',
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                <LogOut size={20} />
              </ListItemIcon>
              <ListItemText 
                primary="Cerrar Sesión" 
                primaryTypographyProps={{ 
                  fontSize: '0.9375rem',
                  fontWeight: 500
                }} 
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      <LogoutDialog
        isOpen={isLogoutDialogOpen}
        onOpenChange={setIsLogoutDialogOpen}
        onConfirm={handleLogout}
      />
    </>
  );
};
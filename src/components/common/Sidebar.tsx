import React, { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Typography,
  Avatar,
  Tooltip,
  useMediaQuery,
  useTheme as useMuiTheme,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Building2,
  FileText,
  CheckSquare,
  Wrench,
  Moon,
  Sun,
  LogOut,
  Menu as MenuIcon,
  User,
  Settings,
  ChevronRight,
  Briefcase,
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { LogoutDialog } from './LogoutDialog';

interface SidebarProps {
  user?: { name: string; role: string };
}

interface NavLink {
  path: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState<null | HTMLElement>(null);
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));

  const navLinks: NavLink[] = [
    { path: '/agreements', label: 'Acuerdos', icon: <FileText size={20} /> },
    { path: '/todos', label: 'To-dos', icon: <CheckSquare size={20} /> },
    { path: '/toolbox', label: 'Toolbox', icon: <Wrench size={20} /> },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };

  const handleLogoutClick = () => {
    handleUserMenuClose();
    setIsLogoutDialogOpen(true);
  };

  const handleLogout = () => {
    setIsLogoutDialogOpen(false);
    logout();
    navigate('/');
  };

  const navigateToAgreements = () => {
    navigate('/agreements');
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  if (!user) {
    return null;
  }

  const drawerContent = (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      backgroundColor: 'var(--surface-primary)',
      color: 'var(--text-primary)',
    }}>
      {/* User Profile and Theme Toggle at Top */}
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              p: 1,
              borderRadius: '8px',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'var(--hover-bg)',
              },
              flex: 1,
            }}
            onClick={handleUserMenuOpen}
          >
            <Avatar
              sx={{
                width: 36,
                height: 36,
                backgroundColor: 'var(--status-info-bg)',
                color: 'var(--status-info-text)',
                fontSize: '1rem',
                fontWeight: 500,
              }}
            >
              {user.name.charAt(0)}
            </Avatar>
            <Box sx={{ flex: 1, overflow: 'hidden' }}>
              <Typography
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {user.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: '0.75rem',
                  color: 'var(--text-secondary)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {user.role}
              </Typography>
            </Box>
            <ChevronRight size={16} color="var(--text-secondary)" />
          </Box>

          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
          >
            <IconButton
              onClick={toggleTheme}
              size="small"
              sx={{
                color: 'var(--text-secondary)',
                '&:hover': {
                  backgroundColor: 'var(--hover-bg)',
                  color: 'var(--text-primary)',
                },
              }}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </IconButton>
          </motion.div>
        </Box>
      </Box>

      {/* Logo and Brand - Enhanced with animation and styling */}
      <Box
        component={motion.div}
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.2 }
        }}
        onClick={navigateToAgreements}
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: 2,
          cursor: 'pointer',
          borderRadius: '12px',
          mx: 2,
          mb: 2,
          background: 'transparent',
          border: '1px solid var(--border-color)',
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: 'var(--hover-bg)',
          }
        }}
      >
        <img
          src="https://raw.githubusercontent.com/Ricardominom/plataformaunoexporadix/refs/heads/main/logoalpha.png"
          alt="Alpha Office Logo"
          style={{
            height: '50px',
            objectFit: 'contain'
          }}
        />
        <Typography
          variant="h6"
          component={motion.h6}
          initial={{ opacity: 1 }}
          whileHover={{ y: -2 }}
          sx={{
            fontSize: '1rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            textAlign: 'center',
            letterSpacing: '-0.01em',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          Alpha Office
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 500,
            color: 'var(--text-secondary)',
            marginTop: '2px'
          }}>
            team management
          </span>
        </Typography>
      </Box>

      <Divider sx={{ borderColor: 'var(--border-color)', my: 1 }} />

      {/* Navigation Links */}
      <List sx={{ px: 1, flex: 1 }}>
        {navLinks.map((item) => {
          const isActive = location.pathname === item.path ||
            (item.path === '/agreements' && location.pathname.startsWith('/agreements')) ||
            (item.path === '/todos' && location.pathname.startsWith('/todos')) ||
            (item.path === '/toolbox' && location.pathname.startsWith('/toolbox'));

          return (
            <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={Link}
                to={item.path}
                sx={{
                  borderRadius: '8px',
                  py: 1,
                  backgroundColor: isActive ? 'var(--status-info-bg)' : 'transparent',
                  color: isActive ? 'var(--status-info-text)' : 'var(--text-primary)',
                  '&:hover': {
                    backgroundColor: isActive ? 'var(--status-info-bg)' : 'var(--hover-bg)',
                  },
                  transition: 'all 0.2s ease',
                }}
                onClick={() => isMobile && setMobileOpen(false)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 36,
                    color: 'inherit',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: '0.875rem',
                    fontWeight: isActive ? 600 : 400,
                  }}
                />
                {item.badge && (
                  <Box
                    sx={{
                      backgroundColor: 'var(--status-error-text)',
                      color: '#FFFFFF',
                      borderRadius: '10px',
                      px: 1,
                      py: 0.25,
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      minWidth: 20,
                      textAlign: 'center',
                    }}
                  >
                    {item.badge}
                  </Box>
                )}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* User Menu */}
      <Menu
        anchorEl={userMenuAnchorEl}
        open={Boolean(userMenuAnchorEl)}
        onClose={handleUserMenuClose}
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
              py: 1.5,
              px: 2,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >

        <Divider sx={{ my: 1, borderColor: 'var(--border-color)' }} />
        <MenuItem
          onClick={handleLogoutClick}
          sx={{
            color: 'var(--status-error-text)',
            '&:hover': {
              backgroundColor: 'var(--status-error-bg)',
            },
          }}
        >
          <ListItemIcon>
            <LogOut size={18} color="var(--status-error-text)" />
          </ListItemIcon>
          <ListItemText
            primary="Cerrar Sesión"
            primaryTypographyProps={{
              fontSize: '0.875rem',
              fontWeight: 500,
            }}
          />
        </MenuItem>
      </Menu>
    </Box>
  );

  return (
    <>
      {/* Mobile Header */}
      {isMobile && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: 'var(--nav-height)',
            backgroundColor: 'var(--glass-bg)',
            backdropFilter: 'saturate(180%) blur(20px)',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2,
            zIndex: 1100,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ color: 'var(--text-primary)' }}
            >
              <MenuIcon />
            </IconButton>
            <Box
              component={motion.div}
              whileHover={{ scale: 1.02 }}
              onClick={navigateToAgreements}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                cursor: 'pointer'
              }}
            >
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, var(--brand-primary) 0%, #40a9ff 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                }}
              >
                <Briefcase size={18} />
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    lineHeight: 1.2,
                  }}
                >
                  Alpha Office
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: '0.7rem',
                    fontWeight: 500,
                    color: 'var(--text-secondary)',
                    letterSpacing: '0.02em',
                    textTransform: 'uppercase',
                    lineHeight: 1.2,
                  }}
                >
                  team management
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}>
              <IconButton
                onClick={toggleTheme}
                size="small"
                sx={{
                  color: 'var(--text-secondary)',
                  '&:hover': {
                    backgroundColor: 'var(--hover-bg)',
                    color: 'var(--text-primary)',
                  },
                }}
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      )}

      {/* Sidebar for desktop */}
      {!isMobile && (
        <Box
          component="nav"
          sx={{
            width: { md: 240 },
            flexShrink: 0,
          }}
        >
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', md: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: 240,
                borderRight: '1px solid var(--border-color)',
                backgroundColor: 'var(--surface-primary)',
                backgroundImage: 'none',
              },
            }}
            open
          >
            {drawerContent}
          </Drawer>
        </Box>
      )}

      {/* Sidebar for mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 240,
            backgroundColor: 'var(--surface-primary)',
            backgroundImage: 'none',
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Logout Dialog */}
      <LogoutDialog
        isOpen={isLogoutDialogOpen}
        onOpenChange={setIsLogoutDialogOpen}
        onConfirm={handleLogout}
      />
    </>
  );
};
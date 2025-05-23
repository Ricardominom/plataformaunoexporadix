import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Paper
} from '@mui/material';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Moon, Sun } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../hooks/useTheme';

interface FormState {
  email: string;
  password: string;
}

export function Login() {
  const [formData, setFormData] = useState<FormState>({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === 'dark';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError(null);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const success = await login(email, password);
      if (success) {
        navigate('/agreements');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      component="div"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: isDark ? '#0A0B14' : '#e0e7ff',
        position: 'relative',
        overflow: 'hidden',
        px: { xs: 2, sm: 4, md: 6, lg: 8 }
      }}
    >
      {/* Animated background shapes */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          zIndex: 0,
          transition: 'all 0.5s ease'
        }}
      >
        {/* Large floating circles */}
        <Box
          sx={{
            position: 'absolute',
            width: '800px',
            height: '800px',
            backgroundColor: isDark
              ? 'rgba(26, 31, 77, 0.6)'
              : 'rgba(79, 70, 229, 0.3)',
            borderRadius: '50%',
            top: '-50%',
            left: '-25%',
            filter: 'blur(60px)',
            animation: 'float 10s infinite ease-in-out, moveXSlow 25s infinite ease-in-out',
            opacity: 0.8,
            transition: 'background-color 0.5s ease'
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            backgroundColor: isDark
              ? 'rgba(36, 41, 87, 0.6)'
              : 'rgba(99, 102, 241, 0.3)',
            borderRadius: '50%',
            bottom: '-25%',
            right: '-25%',
            filter: 'blur(50px)',
            animation: 'float 12s infinite ease-in-out, moveYFast 18s infinite ease-in-out',
            opacity: 0.8,
            transition: 'background-color 0.5s ease'
          }}
        />

        {/* Medium floating shapes */}
        <Box
          sx={{
            position: 'absolute',
            width: '500px',
            height: '500px',
            backgroundColor: isDark
              ? 'rgba(46, 52, 108, 0.6)'
              : 'rgba(129, 140, 248, 0.3)',
            borderRadius: '50%',
            top: '25%',
            left: '25%',
            filter: 'blur(40px)',
            animation: 'float 8s infinite ease-in-out, moveXFast 15s infinite ease-in-out',
            opacity: 0.7,
            transition: 'background-color 0.5s ease'
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            width: '450px',
            height: '450px',
            backgroundColor: isDark
              ? 'rgba(56, 62, 129, 0.6)'
              : 'rgba(165, 180, 252, 0.3)',
            borderRadius: '50%',
            bottom: '33%',
            right: '33%',
            filter: 'blur(40px)',
            animation: 'float 14s infinite ease-in-out, moveYSlow 22s infinite ease-in-out',
            opacity: 0.7,
            transition: 'background-color 0.5s ease'
          }}
        />

        {/* Small accent shapes */}
        <Box
          sx={{
            position: 'absolute',
            width: '300px',
            height: '300px',
            backgroundColor: isDark
              ? 'rgba(66, 72, 150, 0.6)'
              : 'rgba(79, 70, 229, 0.4)',
            borderRadius: '50%',
            top: '33%',
            right: '25%',
            filter: 'blur(30px)',
            animation: 'float 6s infinite ease-in-out, moveX 20s infinite ease-in-out',
            opacity: 0.7,
            transition: 'background-color 0.5s ease'
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            width: '250px',
            height: '250px',
            backgroundColor: isDark
              ? 'rgba(76, 82, 171, 0.6)'
              : 'rgba(99, 102, 241, 0.4)',
            borderRadius: '50%',
            bottom: '25%',
            left: '33%',
            filter: 'blur(30px)',
            animation: 'float 9s infinite ease-in-out, moveY 17s infinite ease-in-out',
            opacity: 0.7,
            transition: 'background-color 0.5s ease'
          }}
        />
      </Box>

      {/* Theme toggle button - outside the card */}
      <IconButton
        onClick={toggleTheme}
        sx={{
          position: 'absolute',
          top: 20,
          right: 20,
          color: isDark ? 'white' : '#1e293b',
          backgroundColor: isDark
            ? 'rgba(42, 46, 67, 0.6)'
            : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          border: isDark
            ? '1px solid rgba(255, 255, 255, 0.1)'
            : '1px solid rgba(0, 0, 0, 0.1)',
          '&:hover': {
            backgroundColor: isDark
              ? 'rgba(42, 46, 67, 0.8)'
              : 'rgba(255, 255, 255, 0.9)',
          }
        }}
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </IconButton>

      <Paper
        component={motion.div}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        elevation={0}
        sx={{
          maxWidth: '380px',
          width: '100%',
          backgroundColor: isDark
            ? 'rgba(42, 46, 67, 0.7)'
            : 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(20px)',
          p: { xs: 2, sm: 3 },
          borderRadius: '10px',
          boxShadow: isDark
            ? '0 10px 25px rgba(0, 0, 0, 0.3)'
            : '0 10px 25px rgba(0, 0, 0, 0.1)',
          border: isDark
            ? '1px solid rgba(255, 255, 255, 0.1)'
            : '1px solid rgba(255, 255, 255, 0.5)',
          transition: 'all 0.3s ease',
          position: 'relative',
          zIndex: 1,
          '&:hover': {
            boxShadow: isDark
              ? '0 15px 35px rgba(0, 0, 0, 0.4)'
              : '0 15px 35px rgba(0, 0, 0, 0.15)',
          }
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <img
              src="https://raw.githubusercontent.com/Ricardominom/plataformaunoexporadix/refs/heads/main/logoalpha.png"
              alt="Alpha Office Logo"
              style={{
                height: '50px',
                marginBottom: '12px',
                objectFit: 'contain'
              }}
            />
          </motion.div>

          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 300,
              fontSize: '1.5rem',
              textAlign: 'center',
              mb: 0.5,
              color: isDark ? 'white' : '#1e293b'
            }}
          >
            Bienvenido de nuevo
          </Typography>

          <Typography
            sx={{
              color: isDark ? 'rgba(156, 163, 175, 1)' : 'rgba(71, 85, 105, 1)',
              fontSize: '0.85rem',
              textAlign: 'center',
              mb: 0.5
            }}
          >
            Inicia sesión para continuar
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography
              sx={{
                mb: 0.25,
                fontWeight: 500,
                color: isDark ? 'rgba(156, 163, 175, 1)' : 'rgba(71, 85, 105, 1)',
                fontSize: '0.875rem'
              }}
            >
              Usuario
            </Typography>
            <Box sx={{ position: 'relative', className: 'group' }}>
              <Mail
                size={20}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: isDark ? 'rgba(156, 163, 175, 1)' : 'rgba(71, 85, 105, 1)'
                }}
              />
              <TextField
                fullWidth
                name="email"
                type="email"
                placeholder="Ingresa tu usuario"
                value={formData.email}
                onChange={handleInputChange}
                error={!!error}
                InputProps={{
                  sx: {
                    color: isDark ? 'white' : '#1e293b',
                    backgroundColor: isDark
                      ? 'rgba(42, 46, 67, 0.5)'
                      : 'rgba(255, 255, 255, 0.6)',
                    border: isDark
                      ? '1px solid rgba(107, 114, 128, 0.3)'
                      : '1px solid rgba(0, 0, 0, 0.1)',
                    borderRadius: '10px',
                    padding: '6px 6px 6px 40px',
                    height: '36px',
                    '&:hover': {
                      borderColor: isDark
                        ? 'rgba(107, 114, 128, 0.5)'
                        : 'rgba(0, 0, 0, 0.2)',
                    },
                    '&.Mui-focused': {
                      borderColor: isDark
                        ? 'rgba(107, 114, 128, 0.5)'
                        : 'rgba(0, 113, 227, 0.5)',
                    },
                    '& input::placeholder': {
                      color: isDark
                        ? 'rgba(107, 114, 128, 0.5)'
                        : 'rgba(100, 116, 139, 0.5)',
                    }
                  }
                }}
              />
            </Box>

            <Typography
              sx={{
                mb: 0.25,
                fontWeight: 500,
                color: isDark ? 'rgba(156, 163, 175, 1)' : 'rgba(71, 85, 105, 1)',
                fontSize: '0.875rem'
              }}
            >
              Contraseña
            </Typography>
            <Box sx={{ position: 'relative', className: 'group' }}>
              <Lock
                size={20}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: isDark ? 'rgba(156, 163, 175, 1)' : 'rgba(71, 85, 105, 1)'
                }}
              />
              <TextField
                fullWidth
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Ingresa tu contraseña"
                value={formData.password}
                onChange={handleInputChange}
                error={!!error}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePassword}
                        edge="end"
                        size="small"
                        sx={{
                          color: isDark ? 'rgba(156, 163, 175, 1)' : 'rgba(71, 85, 105, 1)',
                          '&:hover': {
                            color: isDark ? 'white' : '#1e293b'
                          }
                        }}
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: {
                    color: isDark ? 'white' : '#1e293b',
                    backgroundColor: isDark
                      ? 'rgba(42, 46, 67, 0.5)'
                      : 'rgba(255, 255, 255, 0.6)',
                    border: isDark
                      ? '1px solid rgba(107, 114, 128, 0.3)'
                      : '1px solid rgba(0, 0, 0, 0.1)',
                    borderRadius: '10px',
                    padding: '6px 6px 6px 40px',
                    height: '36px',
                    '&:hover': {
                      borderColor: isDark
                        ? 'rgba(107, 114, 128, 0.5)'
                        : 'rgba(0, 0, 0, 0.2)',
                    },
                    '&.Mui-focused': {
                      borderColor: isDark
                        ? 'rgba(107, 114, 128, 0.5)'
                        : 'rgba(0, 113, 227, 0.5)',
                    },
                    '& input::placeholder': {
                      color: isDark
                        ? 'rgba(107, 114, 128, 0.5)'
                        : 'rgba(100, 116, 139, 0.5)',
                    }
                  }
                }}
              />
            </Box>
          </Box>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{ marginTop: '-5px', marginBottom: '10px' }}
            >
              <Box
                sx={{
                  p: 1,
                  borderRadius: 2,
                  backgroundColor: isDark
                    ? 'rgba(239, 68, 68, 0.2)'
                    : 'rgba(239, 68, 68, 0.1)',
                  borderLeft: '4px solid #ef4444',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.75
                }}
              >
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#ef4444',
                    color: 'white',
                    fontSize: '0.875rem',
                    fontWeight: 'bold'
                  }}
                >
                  !
                </Box>
                <Typography
                  sx={{
                    color: '#fca5a5',
                    fontSize: '0.75rem',
                    fontWeight: 500
                  }}
                >
                  {error}
                </Typography>
              </Box>
            </motion.div>
          )}

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              sx={{
                py: 0.75,
                height: '36px',
                backgroundColor: isDark
                  ? 'rgba(42, 46, 67, 0.9)'
                  : 'rgba(79, 70, 229, 0.9)',
                color: isDark ? 'white' : 'white',
                borderRadius: '10px',
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '0.9rem',
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: isDark
                    ? 'rgba(42, 46, 67, 1)'
                    : 'rgba(79, 70, 229, 1)',
                },
                mb: 0
              }}
            >
              {isLoading ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    style={{ marginRight: '8px' }}
                  >
                    <Box
                      component="span"
                      sx={{
                        width: 16,
                        height: 16,
                        border: '2px solid rgba(255, 255, 255, 0.2)',
                        borderTop: '2px solid #ffffff',
                        borderRadius: '50%',
                        display: 'inline-block',
                      }}
                    />
                  </motion.div>
                  Iniciando sesión...
                </Box>
              ) : (
                'Iniciar sesión'
              )}
            </Button>
          </motion.div>
        </form>

        {/* Demo Credentials Section */}
        <Box
          sx={{
            pt: 1,
            mt: 1,
            borderTop: isDark
              ? '1px solid rgba(255, 255, 255, 0.1)'
              : '1px solid rgba(0, 0, 0, 0.1)'
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 0.5 }}>
            <Typography
              sx={{
                fontWeight: 600,
                color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(71, 85, 105, 1)',
                fontSize: '0.7rem',
                mb: 0.2
              }}
            >
              Demo Credentials
            </Typography>
            <Typography
              sx={{
                color: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(100, 116, 139, 1)',
                fontSize: '0.65rem',
                mb: 0.2
              }}
            >
              Contraseña: <span style={{ fontWeight: 600 }}>nombre123</span>
            </Typography>
            <Typography
              sx={{
                color: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(100, 116, 139, 1)',
                fontSize: '0.65rem',
                mb: 0.2
              }}
            >
              Usuarios:
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 0.5,
              mx: 'auto',
              maxWidth: '300px'
            }}
          >
            {[
              "presidente@empresa.com",
              "asistente@empresa.com",
              "pmo@empresa.com",
              "ssc@empresa.com",
              "comercial@empresa.com"
            ].map((username) => (
              <Box
                key={username}
                component={motion.div}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                sx={{
                  px: 0.75,
                  py: 0.15,
                  backgroundColor: isDark
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'rgba(79, 70, 229, 0.1)',
                  borderRadius: '6px',
                  fontSize: '0.65rem',
                  fontWeight: 500,
                  color: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(71, 85, 105, 1)',
                  border: isDark
                    ? '1px solid rgba(255, 255, 255, 0.1)'
                    : '1px solid rgba(79, 70, 229, 0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: isDark
                      ? 'rgba(255, 255, 255, 0.2)'
                      : 'rgba(79, 70, 229, 0.2)',
                    transform: 'translateY(-2px)',
                    boxShadow: isDark
                      ? '0 4px 8px rgba(0, 0, 0, 0.3)'
                      : '0 4px 8px rgba(0, 0, 0, 0.1)'
                  }
                }}
                onClick={() => setFormData({ ...formData, email: username })}
              >
                {username}
              </Box>
            ))}
          </Box>

          <Box sx={{ textAlign: 'center', mt: 0.5 }}>
            <Typography
              sx={{
                color: isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(100, 116, 139, 0.5)',
                fontSize: '0.65rem'
              }}
            >
              © 2025 Alpha Office. All rights reserved.
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
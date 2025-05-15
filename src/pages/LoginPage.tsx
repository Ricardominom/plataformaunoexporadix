import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Paper,
  Avatar
} from '@mui/material';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
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
  const { theme } = useTheme();

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
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: isDark ? '#121212' : '#f8fafc',
        backgroundImage: isDark
          ? 'linear-gradient(to bottom right, rgba(30, 30, 30, 0.8), rgba(20, 20, 20, 0.8))'
          : 'linear-gradient(to bottom right, #f8fafc, #e2e8f0)',
        px: { xs: 2, sm: 4, md: 6, lg: 8 }
      }}
    >
      <Paper
        component={motion.div}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        elevation={0}
        sx={{
          maxWidth: '400px',
          width: '100%',
          backgroundColor: isDark ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          p: { xs: 2.5, sm: 3 },
          borderRadius: '16px',
          boxShadow: isDark
            ? '0 10px 25px rgba(0, 0, 0, 0.3)'
            : '0 10px 25px rgba(0, 0, 0, 0.1)',
          border: isDark
            ? '1px solid rgba(255, 255, 255, 0.1)'
            : '1px solid rgba(255, 255, 255, 0.5)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: isDark
              ? '0 15px 35px rgba(0, 0, 0, 0.4)'
              : '0 15px 35px rgba(0, 0, 0, 0.15)',
          }
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
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
                height: '70px',
                marginBottom: '10px',
                objectFit: 'contain'
              }}
            />
          </motion.div>

          <Typography
            variant="h4"
            component="h1"
            align="center"
            sx={{
              fontWeight: 700,
              fontSize: '1.2rem',
              textAlign: 'center',
              mb: 0.5,
              background: isDark
                ? 'linear-gradient(to right, #ffffff, #cccccc)'
                : 'linear-gradient(to right, #1e293b, #475569)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Inicia sesión con tu cuenta
          </Typography>

          <Typography
            variant="body2"
            align="center"
            sx={{ color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)', fontSize: '0.7rem', mb: 0.5 }}
          >
            Escribe tus usuario y contraseña para acceder al dashboard
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="subtitle2"
              sx={{ mb: 0.25, fontWeight: 500, color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#475569', fontSize: '0.75rem' }}
            >
              Usuario
            </Typography>
            <TextField
              fullWidth
              name="email"
              type="email"
              placeholder="Escribe tu usuario"
              value={formData.email}
              onChange={handleInputChange}
              error={!!error}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Mail size={18} color={isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'} />
                  </InputAdornment>
                ),
                sx: {
                  color: isDark ? '#fff' : '#1e293b',
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.5)',
                  borderRadius: '8px',
                  height: '40px',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'transparent',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'transparent',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                  },
                  '& input::placeholder': {
                    color: isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
                  }
                }
              }}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography
              variant="subtitle2"
              sx={{ mb: 0.25, fontWeight: 500, color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#475569', fontSize: '0.75rem' }}
            >
              Contraseña
            </Typography>
            <TextField
              fullWidth
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Escribe tu contraseña"
              value={formData.password}
              onChange={handleInputChange}
              error={!!error}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock size={18} color={isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePassword}
                      edge="end"
                      size="small"
                      sx={{
                        color: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
                      }}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </IconButton>
                  </InputAdornment>
                ),
                sx: {
                  color: isDark ? '#fff' : '#1e293b',
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.5)',
                  borderRadius: '8px',
                  height: '40px',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'transparent',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'transparent',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                  },
                  '& input::placeholder': {
                    color: isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
                  }
                }
              }}
            />
          </Box>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Box
                sx={{
                  p: 1.5,
                  mb: 1.5,
                  borderRadius: 2,
                  backgroundColor: isDark ? 'rgba(239, 68, 68, 0.2)' : 'rgba(239, 68, 68, 0.1)',
                  borderLeft: '4px solid #ef4444',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
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
                    fontSize: '0.75rem',
                    fontWeight: 'bold'
                  }}
                >
                  !
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: isDark ? '#fca5a5' : '#ef4444',
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
            whileTap={{ scale: 0.98 }}
          >
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              sx={{
                py: 1,
                backgroundColor: isDark ? '#ffffff' : '#1e293b',
                color: isDark ? '#1e1e1e' : '#fff',
                borderRadius: '8px',
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.85rem',
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: isDark ? '#f0f0f0' : '#334155',
                },
                mb: 1.5
              }}
            >
              {isLoading ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Box
                      component="span"
                      sx={{
                        width: 16,
                        height: 16,
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        borderTop: isDark ? '2px solid #1e1e1e' : '2px solid #fff',
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
            pt: 0.5,
            borderTop: isDark
              ? '1px solid rgba(255, 255, 255, 0.1)'
              : '1px solid rgba(0, 0, 0, 0.1)'
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 0.5 }}>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 600,
                color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#475569',
                fontSize: '0.7rem',
                mb: 0
              }}
            >
              Demo Credentials
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: isDark ? 'rgba(255, 255, 255, 0.5)' : '#64748b',
                fontSize: '0.65rem',
                mb: 0
              }}
            >
              Contraseña: <span style={{ fontWeight: 600 }}>nombre123</span>
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: isDark ? 'rgba(255, 255, 255, 0.5)' : '#64748b',
                fontSize: '0.65rem',
                mb: 0
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
              maxWidth: '320px'
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
                sx={{
                  px: 0.75,
                  py: 0.15,
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)',
                  borderRadius: '6px',
                  fontSize: '0.65rem',
                  fontWeight: 500,
                  color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#475569',
                  border: isDark
                    ? '1px solid rgba(255, 255, 255, 0.1)'
                    : '1px solid rgba(0, 0, 0, 0.1)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)',
                    transform: 'translateY(-2px)',
                    boxShadow: isDark ? '0 4px 8px rgba(0, 0, 0, 0.3)' : '0 4px 8px rgba(0, 0, 0, 0.1)'
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
              variant="caption"
              sx={{
                color: isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
                fontSize: '0.6rem'
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
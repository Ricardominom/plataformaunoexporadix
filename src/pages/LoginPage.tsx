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
  Grid,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ChevronRight, Building2 } from 'lucide-react';
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
    <Grid container sx={{ height: '100vh' }}>
      {/* Left Side - Gradient Background with Text */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          position: 'relative',
          background: 'linear-gradient(135deg, #6e8efb 0%, #a777e3 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
          overflow: 'hidden'
        }}
      >
        {/* Animated Background Pattern */}
        <Box
          component={motion.div}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
            opacity: [0.3, 0.4, 0.3]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'linear'
          }}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            zIndex: 1
          }}
        />

        {/* Content Box */}
        <Paper
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          elevation={0}
          sx={{
            position: 'relative',
            zIndex: 2,
            maxWidth: 500,
            width: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            borderRadius: 4,
            p: 6,
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}
        >
          <Box sx={{ mb: 4 }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: 2,
                  gap: 2
                }}
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                >
                  <Building2 size={40} color="#fff" />
                </motion.div>
                <Typography
                  variant="h3"
                  component="h1"
                  sx={{
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                    lineHeight: 1.2,
                    letterSpacing: '-0.02em'
                  }}
                >
                  Alpha Office
                </Typography>
              </Box>
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontWeight: 300,
                  fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
                  lineHeight: 1.2,
                  mb: 3,
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase'
                }}
              >
                team management
              </Typography>
            </motion.div>
          </Box>
        </Paper>
      </Grid>

      {/* Right Side - Login Form */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
          backgroundColor: isDark ? 'var(--dark-surface)' : '#fff',
          transition: 'all 0.3s ease'
        }}
      >
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          sx={{
            maxWidth: 400,
            width: '100%',
            px: { xs: 2, sm: 0 }
          }}
        >
          {/* Welcome Text */}
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  fontWeight: 700,
                  color: isDark ? '#fff' : '#1a237e',
                  mb: 1,
                  transition: 'color 0.3s ease',
                  fontSize: '2rem',
                  letterSpacing: '-0.02em'
                }}
              >
                Welcome back! 👋
              </Typography>
            </motion.div>
            <Typography
              sx={{
                color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
                transition: 'color 0.3s ease',
                fontSize: '1rem',
                mt: 1
              }}
            >
              Sign in to continue to your workspace
            </Typography>
          </Box>

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                mb: 3,
                '& .MuiTextField-root': {
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                  transition: 'all 0.3s ease',
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
                  }
                }
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  mb: 1,
                  fontWeight: 500,
                  color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#334155',
                  transition: 'color 0.3s ease'
                }}
              >
                Email
              </Typography>
              <TextField
                fullWidth
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                error={!!error}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Mail size={18} color={isDark ? '#ffffff80' : '#64748b'} />
                    </InputAdornment>
                  ),
                  sx: {
                    color: isDark ? '#fff' : 'inherit',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#e2e8f0',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: isDark ? 'rgba(255, 255, 255, 0.2)' : '#cbd5e1',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#3b82f6',
                      borderWidth: 2
                    },
                    '& input::placeholder': {
                      color: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.4)',
                    }
                  }
                }}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  mb: 1,
                  fontWeight: 500,
                  color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#334155',
                  transition: 'color 0.3s ease'
                }}
              >
                Password
              </Typography>
              <TextField
                fullWidth
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                error={!!error}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock size={18} color={isDark ? '#ffffff80' : '#64748b'} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePassword}
                        edge="end"
                        size="small"
                        sx={{
                          color: isDark ? '#ffffff80' : '#64748b',
                          '&:hover': {
                            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                          }
                        }}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: {
                    color: isDark ? '#fff' : 'inherit',
                    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#e2e8f0',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: isDark ? 'rgba(255, 255, 255, 0.2)' : '#cbd5e1',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#3b82f6',
                      borderWidth: 2
                    },
                    '&:hover': {
                      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
                    },
                    '& input::placeholder': {
                      color: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.4)',
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
                    p: 2,
                    mb: 3,
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
                      width: 24,
                      height: 24,
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
                    variant="body2"
                    sx={{
                      color: isDark ? '#fca5a5' : '#ef4444',
                      fontSize: '0.875rem',
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
                  py: 1.5,
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  color: '#fff',
                  borderRadius: '12px',
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  boxShadow: isDark
                    ? '0 4px 12px rgba(59, 130, 246, 0.5)'
                    : '0 4px 12px rgba(59, 130, 246, 0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
                    boxShadow: isDark
                      ? '0 8px 20px rgba(59, 130, 246, 0.6)'
                      : '0 8px 20px rgba(59, 130, 246, 0.4)',
                    transform: 'translateY(-2px)',
                  },
                  '&:active': {
                    transform: 'translateY(0)',
                  },
                  mb: 3
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
                          borderTop: '2px solid #fff',
                          borderRadius: '50%',
                          display: 'inline-block',
                        }}
                      />
                    </motion.div>
                    Signing in...
                  </Box>
                ) : (
                  'Sign in'
                )}
              </Button>
            </motion.div>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography
                variant="body2"
                sx={{
                  color: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
                  fontSize: '0.875rem'
                }}
              >
                © 2025 Alpha Office. All rights reserved.
              </Typography>
            </Box>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}
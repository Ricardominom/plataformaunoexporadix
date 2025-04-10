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
import { Mail, Lock, Eye, EyeOff, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

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
        {/* Grid Overlay */}
        <Box 
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            opacity: 0.4,
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
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <ChevronRight size={24} color="#fff" />
                <Typography 
                  variant="h3" 
                  component="h1" 
                  sx={{ 
                    color: '#fff',
                    fontWeight: 300,
                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                    lineHeight: 1.2
                  }}
                >
                  Alpha Office
                </Typography>
              </Box>
              <Typography 
                variant="h3" 
                component="h1" 
                sx={{ 
                  color: '#fff',
                  fontWeight: 300,
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                  lineHeight: 1.2,
                  mb: 1
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
          backgroundColor: '#fff'
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
            <Typography 
              variant="h4" 
              component="h1" 
              sx={{ 
                fontWeight: 600, 
                color: '#1a237e',
                mb: 1
              }}
            >
              Hey, hello 👋
            </Typography>
          </Box>

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 3 }}>
              <Typography 
                variant="subtitle2" 
                sx={{ 
                  mb: 1, 
                  fontWeight: 500,
                  color: '#334155'
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
                      <Mail size={18} color="#64748b" />
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: '8px',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#e2e8f0',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#cbd5e1',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#3b82f6',
                    }
                  }
                }}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography 
                variant="subtitle2" 
                sx={{ 
                  mb: 1, 
                  fontWeight: 500,
                  color: '#334155'
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
                      <Lock size={18} color="#64748b" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePassword}
                        edge="end"
                        size="small"
                      >
                        {showPassword ? <EyeOff size={18} color="#64748b" /> : <Eye size={18} color="#64748b" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: '8px',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#e2e8f0',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#cbd5e1',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#3b82f6',
                    }
                  }
                }}
              />
            </Box>

            {error && (
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#ef4444', 
                  mb: 2,
                  fontSize: '0.875rem'
                }}
              >
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              sx={{
                py: 1.5,
                backgroundColor: '#3b82f6',
                color: '#fff',
                borderRadius: '8px',
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.95rem',
                boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.2), 0 2px 4px -1px rgba(59, 130, 246, 0.1)',
                '&:hover': {
                  backgroundColor: '#2563eb',
                  boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.3), 0 4px 6px -2px rgba(59, 130, 246, 0.1)',
                },
                mb: 3
              }}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}
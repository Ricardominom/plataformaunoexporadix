import React from 'react';
import { useAuth } from '../context/AuthContext';
import { PMOToolbox } from '../components/toolbox/PMOToolbox';
import { Box, Container, Paper, Typography } from '@mui/material';

export const ToolboxPage: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  // Renderizar el Toolbox específico para PMO
  if (user.role === 'PMO') {
    return <PMOToolbox />;
  }

  // Para otros roles, mostrar un Toolbox vacío
  return (
    <Box sx={{
      pt: 'calc(var(--nav-height) + 24px)',
      pb: 4,
      px: { xs: 2, sm: 3, md: 4 },
      minHeight: '100vh',
      backgroundColor: 'var(--app-bg)',
    }}>
      <Container maxWidth="xl">
        <Typography
          variant="h4"
          sx={{
            fontSize: '2rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            mb: 4,
          }}
        >
          Toolbox
        </Typography>
        <Paper
          sx={{
            p: 4,
            borderRadius: '12px',
            backgroundColor: 'var(--surface-primary)',
            textAlign: 'center',
          }}
          className="glass-effect"
        >
          <Typography
            sx={{
              color: 'var(--text-secondary)',
              fontSize: '1rem',
            }}
          >
            No hay herramientas disponibles en este momento.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

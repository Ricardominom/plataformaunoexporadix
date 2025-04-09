import React from 'react';
import { useAuth } from '../context/AuthContext';
import { PMOToolbox } from '../components/toolbox/PMOToolbox';
import { SSCToolbox } from '../components/toolbox/SSCToolbox';
import { PresidentToolbox } from '../components/toolbox/PresidentToolbox';
import { EsporaToolbox } from '../components/toolbox/EsporaToolbox';
import { MapaToolbox } from '../components/toolbox/MapaToolbox';
import { ComercialTool as ComercialToolbox } from '../components/toolbox/ComercialToolbox';
import { AssistantToolbox } from '../components/toolbox/AssistantToolbox';
import { InterlogisToolbox } from '../components/toolbox/InterlogisToolbox';
import { Box, Container, Paper, Typography } from '@mui/material';

export const ToolboxPage: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  // Render specific toolbox based on user role
  if (user.role === 'PMO') {
    return <PMOToolbox />;
  }

  if (user.role === 'Directora SSC') {
    return <SSCToolbox />;
  }

  if (user.role === 'Presidente') {
    return <PresidentToolbox />;
  }

  if (user.role === 'Director comercial') {
    return <ComercialToolbox />;
  }

  if (user.role === 'Director General de Espora') {
    return <EsporaToolbox />;
  }

  if (user.role === 'Director de Mapa') {
    return <MapaToolbox />;
  }

  if (user.role === 'Asistente') {
    return <AssistantToolbox />;
  }

  if (user.role === 'Gerente de Interlogis') {
    return <InterlogisToolbox />;
  }

  // For other roles, show empty toolbox
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

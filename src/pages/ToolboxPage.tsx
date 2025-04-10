import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { PMOToolbox } from '../components/toolbox/PMOToolbox';
import { SSCToolbox } from '../components/toolbox/SSCToolbox';
import { PresidentToolbox } from '../components/toolbox/PresidentToolbox';
import { EsporaToolbox } from '../components/toolbox/EsporaToolbox';
import { MapaToolbox } from '../components/toolbox/MapaToolbox';
import { ComercialTool } from '../components/toolbox/ComercialTool';
import { AssistantToolbox } from '../components/toolbox/AssitantToolbox';
import { InterlogisToolbox } from '../components/toolbox/InterlogisToolbox';
import { AdminInterlogisToolbox } from '../components/toolbox/AdminInterlogisToolbox';
import { ResearchDevToolbox } from '../components/toolbox/ResearchDevToolbox';

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
    return <ComercialTool />;
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

  if (user.role === 'Administrador de Interlogis') {
    return <AdminInterlogisToolbox />;
  }

  if (user.role === 'Research and Development') {
    return <ResearchDevToolbox />;
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
        <Box
          sx={{
            p: 4,
            borderRadius: '12px',
            backgroundColor: 'var(--surface-primary)',
            textAlign: 'center',
            border: '1px solid var(--border-color)',
          }}
          className="glass-effect"
        >
          <Typography
            sx={{
              color: 'var(--text-secondary)',
              fontSize: '1rem',
            }}
          >
            No hay herramientas disponibles para tu rol en este momento.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
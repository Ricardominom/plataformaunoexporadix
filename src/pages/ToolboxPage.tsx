import React from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  LinearProgress,
  Avatar,
  AvatarGroup,
  Chip,
} from '@mui/material';
import {
  BarChart3,
  Clock,
  FileCheck2,
  Users,
  AlertCircle,
  CheckCircle2,
  Calendar,
  TrendingUp,
} from 'lucide-react';

// Mock data for the dashboard
const metrics = {
  totalAgreements: 24,
  completedAgreements: 18,
  pendingReview: 6,
  totalTasks: 32,
  completedTasks: 25,
  upcomingDeadlines: 4,
  activeUsers: 8,
};

const recentActivity = [
  {
    id: 1,
    type: 'agreement',
    title: 'Contrato de Servicios Cloud',
    status: 'completed',
    date: '2024-02-20',
    user: 'Ana Martínez',
  },
  {
    id: 2,
    type: 'task',
    title: 'Actualizar documentación',
    status: 'in_progress',
    date: '2024-02-19',
    user: 'Carlos Ruiz',
  },
  {
    id: 3,
    type: 'agreement',
    title: 'Auditoría GDPR',
    status: 'pending_review',
    date: '2024-02-18',
    user: 'Miguel Torres',
  },
];

const users = [
  { name: 'Ana M', color: '#ff9500' },
  { name: 'Carlos R', color: '#30d158' },
  { name: 'Miguel T', color: '#0071e3' },
  { name: 'Laura S', color: '#5856d6' },
  { name: 'Juan P', color: '#ff2d55' },
];

export const ToolboxPage: React.FC = () => {
  return (
    <Box sx={{
      pt: 'calc(var(--nav-height) + 24px)',
      pb: 4,
      px: { xs: 2, sm: 3, md: 4 },
      minHeight: '100vh',
      backgroundColor: 'var(--app-bg)',
    }}>
      <Container maxWidth="xl">
        {/* Welcome Section */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h4"
            sx={{
              fontSize: '2rem',
              fontWeight: 600,
              color: '#1d1d1f',
              letterSpacing: '-0.025em',
              mb: 1,
            }}
          >
            ¡Buenos días, María!
          </Typography>
          <Typography
            sx={{
              fontSize: '1rem',
              color: '#86868b',
            }}
          >
            Aquí tienes un resumen de la actividad reciente y métricas importantes.
          </Typography>
        </Box>

        {/* Metrics Grid */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* Agreements Progress */}
          <Grid item xs={12} md={6} lg={3}>
            <Paper
              sx={{
                p: 3,
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
              }}
              className="glass-effect"
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '10px',
                    backgroundColor: 'rgba(0, 113, 227, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2,
                  }}
                >
                  <FileCheck2 size={20} color="#0071e3" />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontSize: '0.875rem',
                      color: '#86868b',
                      mb: 0.5,
                    }}
                  >
                    Acuerdos Completados
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '1.5rem',
                      fontWeight: 600,
                      color: '#1d1d1f',
                    }}
                  >
                    {metrics.completedAgreements}/{metrics.totalAgreements}
                  </Typography>
                </Box>
              </Box>
              <LinearProgress
                variant="determinate"
                value={(metrics.completedAgreements / metrics.totalAgreements) * 100}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: 'rgba(0, 113, 227, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#0071e3',
                    borderRadius: 3,
                  },
                }}
              />
            </Paper>
          </Grid>

          {/* Tasks Progress */}
          <Grid item xs={12} md={6} lg={3}>
            <Paper
              sx={{
                p: 3,
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
              }}
              className="glass-effect"
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '10px',
                    backgroundColor: 'rgba(48, 209, 88, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2,
                  }}
                >
                  <CheckCircle2 size={20} color="#30d158" />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontSize: '0.875rem',
                      color: '#86868b',
                      mb: 0.5,
                    }}
                  >
                    Tareas Completadas
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '1.5rem',
                      fontWeight: 600,
                      color: '#1d1d1f',
                    }}
                  >
                    {metrics.completedTasks}/{metrics.totalTasks}
                  </Typography>
                </Box>
              </Box>
              <LinearProgress
                variant="determinate"
                value={(metrics.completedTasks / metrics.totalTasks) * 100}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: 'rgba(48, 209, 88, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#30d158',
                    borderRadius: 3,
                  },
                }}
              />
            </Paper>
          </Grid>

          {/* Pending Reviews */}
          <Grid item xs={12} md={6} lg={3}>
            <Paper
              sx={{
                p: 3,
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
              }}
              className="glass-effect"
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '10px',
                    backgroundColor: 'rgba(255, 45, 85, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2,
                  }}
                >
                  <AlertCircle size={20} color="#ff2d55" />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontSize: '0.875rem',
                      color: '#86868b',
                      mb: 0.5,
                    }}
                  >
                    Pendientes de Revisión
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '1.5rem',
                      fontWeight: 600,
                      color: '#1d1d1f',
                    }}
                  >
                    {metrics.pendingReview}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <Clock size={14} color="#86868b" />
                <Typography
                  sx={{
                    fontSize: '0.75rem',
                    color: '#86868b',
                  }}
                >
                  2 requieren atención inmediata
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Active Users */}
          <Grid item xs={12} md={6} lg={3}>
            <Paper
              sx={{
                p: 3,
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
              }}
              className="glass-effect"
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '10px',
                    backgroundColor: 'rgba(88, 86, 214, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2,
                  }}
                >
                  <Users size={20} color="#5856d6" />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontSize: '0.875rem',
                      color: '#86868b',
                      mb: 0.5,
                    }}
                  >
                    Usuarios Activos
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '1.5rem',
                      fontWeight: 600,
                      color: '#1d1d1f',
                    }}
                  >
                    {metrics.activeUsers}
                  </Typography>
                </Box>
              </Box>
              <AvatarGroup
                max={5}
                sx={{
                  '& .MuiAvatar-root': {
                    width: 24,
                    height: 24,
                    fontSize: '0.75rem',
                    border: 'none',
                  },
                }}
              >
                {users.map((user, index) => (
                  <Avatar
                    key={index}
                    sx={{
                      bgcolor: user.color,
                    }}
                  >
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </Avatar>
                ))}
              </AvatarGroup>
            </Paper>
          </Grid>
        </Grid>

        {/* Recent Activity */}
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Paper
              sx={{
                p: 3,
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
              }}
              className="glass-effect"
            >
              <Typography
                sx={{
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  color: '#1d1d1f',
                  mb: 3,
                }}
              >
                Actividad Reciente
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {recentActivity.map((activity) => (
                  <Box
                    key={activity.id}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      p: 2,
                      borderRadius: '8px',
                      backgroundColor: 'rgba(0, 0, 0, 0.02)',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '8px',
                        backgroundColor: activity.type === 'agreement'
                          ? 'rgba(0, 113, 227, 0.1)'
                          : 'rgba(48, 209, 88, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2,
                      }}
                    >
                      {activity.type === 'agreement' ? (
                        <FileCheck2 size={16} color="#0071e3" />
                      ) : (
                        <CheckCircle2 size={16} color="#30d158" />
                      )}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        sx={{
                          fontSize: '0.875rem',
                          fontWeight: 500,
                          color: '#1d1d1f',
                          mb: 0.5,
                        }}
                      >
                        {activity.title}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '0.75rem',
                          color: '#86868b',
                        }}
                      >
                        {activity.user}
                      </Typography>
                    </Box>
                    <Chip
                      label={activity.status === 'completed' ? 'Completado' :
                        activity.status === 'in_progress' ? 'En Proceso' : 'Pendiente'}
                      size="small"
                      sx={{
                        backgroundColor: activity.status === 'completed'
                          ? 'rgba(48, 209, 88, 0.1)'
                          : activity.status === 'in_progress'
                            ? 'rgba(0, 113, 227, 0.1)'
                            : 'rgba(255, 45, 85, 0.1)',
                        color: activity.status === 'completed'
                          ? '#30d158'
                          : activity.status === 'in_progress'
                            ? '#0071e3'
                            : '#ff2d55',
                        fontSize: '0.75rem',
                        height: '24px',
                        borderRadius: '12px',
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>

          {/* Upcoming Deadlines */}
          <Grid item xs={12} lg={4}>
            <Paper
              sx={{
                p: 3,
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                height: '100%',
              }}
              className="glass-effect"
            >
              <Typography
                sx={{
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  color: '#1d1d1f',
                  mb: 3,
                }}
              >
                Próximos Vencimientos
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: 2,
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255, 149, 0, 0.1)',
                  }}
                >
                  <Calendar size={20} color="#ff9500" />
                  <Box sx={{ ml: 2 }}>
                    <Typography
                      sx={{
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        color: '#1d1d1f',
                      }}
                    >
                      {metrics.upcomingDeadlines} vencimientos esta semana
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '0.75rem',
                        color: '#86868b',
                        mt: 0.5,
                      }}
                    >
                      2 acuerdos y 2 tareas
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
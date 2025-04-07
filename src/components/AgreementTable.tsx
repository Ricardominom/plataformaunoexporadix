import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Box,
  Avatar,
  Chip,
} from '@mui/material';
import { Upload, ChevronRight, Edit2, Trash2 } from 'lucide-react';
import { Agreement, AgreementStatus } from '../types/agreement';

interface AgreementTableProps {
  agreements: Agreement[];
  onStatusChange: (id: string, status: AgreementStatus) => void;
  onEdit: (agreement: Agreement) => void;
  onDelete: (agreement: Agreement) => void;
}

const getStatusColor = (status: AgreementStatus): { bg: string; text: string } => {
  const colors = {
    not_started: { bg: 'rgba(0, 0, 0, 0.04)', text: '#1d1d1f' },
    in_progress: { bg: 'rgba(0, 113, 227, 0.1)', text: '#0071e3' },
    stuck: { bg: 'rgba(255, 45, 85, 0.1)', text: '#ff2d55' },
    sj_review: { bg: 'rgba(255, 149, 0, 0.1)', text: '#ff9500' },
    completed: { bg: 'rgba(48, 209, 88, 0.1)', text: '#30d158' },
  };
  return colors[status];
};

const getStatusLabel = (status: AgreementStatus): string => {
  const labels = {
    not_started: 'Sin comenzar',
    in_progress: 'En proceso',
    stuck: 'Estancado',
    sj_review: 'Para revisión de SJ',
    completed: 'Terminado',
  };
  return labels[status];
};

export const AgreementTable: React.FC<AgreementTableProps> = ({
  agreements,
  onStatusChange,
  onEdit,
  onDelete,
}) => {
  return (
    <TableContainer 
      component={Paper} 
      sx={{ 
        boxShadow: 'none',
        borderRadius: '12px',
        overflow: 'hidden',
        backgroundColor: '#fff',
      }}
      className="glass-effect"
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell 
              padding="checkbox" 
              sx={{ 
                width: 40,
                borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
              }}
            />
            {[
              'Elemento',
              'Responsable',
              'Estado',
              'Fecha solicitud',
              'Fecha entrega',
              'Relato',
              'Solicitud SJ',
              'Estado de solicitud',
              'Entregable',
              'Acciones'
            ].map((header) => (
              <TableCell 
                key={header}
                sx={{ 
                  borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                  fontSize: '0.75rem',
                  color: '#86868b',
                  fontWeight: 400,
                  py: 2,
                  ...(header === 'Acciones' && { width: 120, textAlign: 'center' })
                }}
              >
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {agreements.map((agreement) => (
            <TableRow 
              key={agreement.id}
              sx={{ 
                '&:hover': { 
                  backgroundColor: 'rgba(0, 0, 0, 0.02)',
                  '& .row-actions': {
                    opacity: 1,
                  }
                },
                '& td': {
                  borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                }
              }}
            >
              <TableCell padding="checkbox">
                <IconButton 
                  size="small"
                  sx={{
                    color: '#86868b',
                    '&:hover': {
                      backgroundColor: 'transparent',
                      color: '#1d1d1f',
                    }
                  }}
                >
                  <ChevronRight size={16} />
                </IconButton>
              </TableCell>
              <TableCell>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: '#1d1d1f',
                    fontSize: '0.875rem',
                  }}
                >
                  {agreement.element}
                </Typography>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar 
                    sx={{ 
                      width: 24, 
                      height: 24, 
                      fontSize: '0.75rem',
                      backgroundColor: 'rgba(0, 113, 227, 0.1)',
                      color: '#0071e3',
                    }}
                  >
                    {agreement.responsible.charAt(0)}
                  </Avatar>
                  <Typography 
                    variant="body2"
                    sx={{
                      color: '#1d1d1f',
                      fontSize: '0.875rem',
                    }}
                  >
                    {agreement.responsible}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Chip
                  label={getStatusLabel(agreement.status)}
                  size="small"
                  sx={{
                    backgroundColor: getStatusColor(agreement.status).bg,
                    color: getStatusColor(agreement.status).text,
                    fontSize: '0.75rem',
                    height: '24px',
                    borderRadius: '12px',
                    fontWeight: 400,
                  }}
                />
              </TableCell>
              <TableCell>
                <Typography 
                  variant="body2" 
                  sx={{
                    color: '#86868b',
                    fontSize: '0.875rem',
                  }}
                >
                  {new Date(agreement.requestDate).toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'short'
                  })}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography 
                  variant="body2" 
                  sx={{
                    color: '#86868b',
                    fontSize: '0.875rem',
                  }}
                >
                  {new Date(agreement.deliveryDate).toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'short'
                  })}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    maxWidth: 200,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    color: '#1d1d1f',
                    fontSize: '0.875rem',
                  }}
                >
                  {agreement.description}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography 
                  variant="body2"
                  sx={{ 
                    maxWidth: 200,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    color: '#1d1d1f',
                    fontSize: '0.875rem',
                  }}
                >
                  {agreement.sjRequest}
                </Typography>
              </TableCell>
              <TableCell>
                <Chip
                  label={getStatusLabel(agreement.sjStatus)}
                  size="small"
                  sx={{
                    backgroundColor: getStatusColor(agreement.sjStatus).bg,
                    color: getStatusColor(agreement.sjStatus).text,
                    fontSize: '0.75rem',
                    height: '24px',
                    borderRadius: '12px',
                    fontWeight: 400,
                  }}
                />
              </TableCell>
              <TableCell>
                <IconButton 
                  size="small"
                  sx={{ 
                    color: '#86868b',
                    '&:hover': { 
                      backgroundColor: 'transparent',
                      color: '#1d1d1f',
                    }
                  }}
                >
                  <Upload size={14} />
                </IconButton>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                  <IconButton 
                    size="small"
                    onClick={() => onEdit(agreement)}
                    sx={{ 
                      color: '#86868b',
                      '&:hover': {
                        backgroundColor: 'transparent',
                        color: '#1d1d1f',
                      }
                    }}
                  >
                    <Edit2 size={14} />
                  </IconButton>
                  <IconButton 
                    size="small"
                    onClick={() => onDelete(agreement)}
                    sx={{ 
                      color: '#86868b',
                      '&:hover': {
                        backgroundColor: 'transparent',
                        color: '#ff2d55',
                      }
                    }}
                  >
                    <Trash2 size={14} />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
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
    FormControl,
    Select,
    MenuItem,
    Tooltip,
} from '@mui/material';
import { FileDown, ChevronRight, Edit2, Trash2 } from 'lucide-react';
import { Agreement, AgreementStatus } from '../../types/agreement';

interface AgreementTableProps {
    agreements: Agreement[];
    onStatusChange: (id: string, status: AgreementStatus, isSJStatus?: boolean) => void;
    onEdit: (agreement: Agreement) => void;
    onDelete: (agreement: Agreement) => void;
    onResponsibleChange: (id: string, responsible: string) => void;
}

export const statusOptions: { value: AgreementStatus; label: string }[] = [
    { value: 'not_started', label: 'Sin comenzar' },
    { value: 'in_progress', label: 'En proceso' },
    { value: 'stuck', label: 'Estancado' },
    { value: 'sj_review', label: 'Para revisión de SJ' },
    { value: 'completed', label: 'Terminado' },
];

const getStatusColor = (status: AgreementStatus): { bg: string; text: string } => {
    const colors = {
        not_started: { bg: 'rgba(0, 0, 0, 0.04)', text: 'var(--text-primary)' },
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
    onResponsibleChange,
}) => {
    const handleDownload = (agreement: Agreement) => {
        // Aquí irá la lógica para descargar el documento
        console.log('Descargando documento:', agreement.id);
    };

    const handleSJStatusChange = (id: string, status: AgreementStatus) => {
        onStatusChange(id, status, true);
    };

    return (
        <TableContainer
            component={Paper}
            sx={{
                boxShadow: 'none',
                borderRadius: '12px',
                overflow: 'hidden',
                backgroundColor: 'var(--surface-primary)',
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
                                borderBottom: '1px solid var(--border-color)',
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
                                    borderBottom: '1px solid var(--border-color)',
                                    fontSize: '0.75rem',
                                    color: 'var(--text-secondary)',
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
                                    backgroundColor: 'var(--hover-bg)',
                                    '& .row-actions': {
                                        opacity: 1,
                                    }
                                },
                                '& td': {
                                    borderBottom: '1px solid var(--border-color)',
                                }
                            }}
                        >
                            <TableCell padding="checkbox">
                                <IconButton
                                    size="small"
                                    sx={{
                                        color: 'var(--text-secondary)',
                                        '&:hover': {
                                            backgroundColor: 'transparent',
                                            color: 'var(--text-primary)',
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
                                        color: 'var(--text-primary)',
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
                                            color: 'var(--text-primary)',
                                            fontSize: '0.875rem',
                                        }}
                                    >
                                        {agreement.responsible}
                                    </Typography>
                                </Box>
                            </TableCell>
                            <TableCell>
                                <FormControl
                                    size="small"
                                    sx={{
                                        minWidth: 120,
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                border: 'none',
                                            },
                                            '&:hover fieldset': {
                                                border: 'none',
                                            },
                                            '&.Mui-focused fieldset': {
                                                border: 'none',
                                            },
                                        },
                                    }}
                                >
                                    <Select
                                        value={agreement.status}
                                        onChange={(e) => onStatusChange(agreement.id, e.target.value as AgreementStatus)}
                                        sx={{
                                            fontSize: '0.875rem',
                                            color: getStatusColor(agreement.status).text,
                                            backgroundColor: getStatusColor(agreement.status).bg,
                                            borderRadius: '12px',
                                            height: '24px',
                                            '&:hover': {
                                                backgroundColor: getStatusColor(agreement.status).bg,
                                            },
                                            '&.Mui-focused': {
                                                backgroundColor: getStatusColor(agreement.status).bg,
                                            },
                                            '& .MuiSelect-select': {
                                                paddingTop: '2px',
                                                paddingBottom: '2px',
                                            },
                                        }}
                                    >
                                        {statusOptions.map((option) => (
                                            <MenuItem
                                                key={option.value}
                                                value={option.value}
                                                sx={{
                                                    fontSize: '0.875rem',
                                                }}
                                            >
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'var(--text-secondary)',
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
                                        color: 'var(--text-secondary)',
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
                                        color: 'var(--text-primary)',
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
                                        color: 'var(--text-primary)',
                                        fontSize: '0.875rem',
                                    }}
                                >
                                    {agreement.sjRequest}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <FormControl
                                    size="small"
                                    sx={{
                                        minWidth: 120,
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                border: 'none',
                                            },
                                            '&:hover fieldset': {
                                                border: 'none',
                                            },
                                            '&.Mui-focused fieldset': {
                                                border: 'none',
                                            },
                                        },
                                    }}
                                >
                                    <Select
                                        value={agreement.sjStatus}
                                        onChange={(e) => handleSJStatusChange(agreement.id, e.target.value as AgreementStatus)}
                                        sx={{
                                            fontSize: '0.875rem',
                                            color: getStatusColor(agreement.sjStatus).text,
                                            backgroundColor: getStatusColor(agreement.sjStatus).bg,
                                            borderRadius: '12px',
                                            height: '24px',
                                            '&:hover': {
                                                backgroundColor: getStatusColor(agreement.sjStatus).bg,
                                            },
                                            '&.Mui-focused': {
                                                backgroundColor: getStatusColor(agreement.sjStatus).bg,
                                            },
                                            '& .MuiSelect-select': {
                                                paddingTop: '2px',
                                                paddingBottom: '2px',
                                            },
                                        }}
                                    >
                                        {statusOptions.map((option) => (
                                            <MenuItem
                                                key={option.value}
                                                value={option.value}
                                                sx={{
                                                    fontSize: '0.875rem',
                                                }}
                                            >
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </TableCell>
                            <TableCell>
                                <Tooltip title="Descargar documento" arrow>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleDownload(agreement)}
                                        sx={{
                                            color: 'var(--text-secondary)',
                                            '&:hover': {
                                                backgroundColor: 'rgba(0, 113, 227, 0.1)',
                                                color: '#0071e3',
                                            },
                                            transition: 'all 0.2s ease',
                                        }}
                                    >
                                        <FileDown size={16} />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                            <TableCell>
                                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                                    <IconButton
                                        size="small"
                                        onClick={() => onEdit(agreement)}
                                        sx={{
                                            color: 'var(--text-secondary)',
                                            '&:hover': {
                                                backgroundColor: 'transparent',
                                                color: 'var(--text-primary)',
                                            }
                                        }}
                                    >
                                        <Edit2 size={14} />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        onClick={() => onDelete(agreement)}
                                        sx={{
                                            color: 'var(--text-secondary)',
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
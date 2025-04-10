import React, { memo } from 'react';
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
import { FileDown, MessageSquare, Edit2, Trash2 } from 'lucide-react';
import { Agreement, AgreementStatus } from '../../types/agreement';
import { statusOptions, getStatusColor } from '../../utils/statusUtils';

interface AgreementTableProps {
    agreements: Agreement[];
    onStatusChange: (id: string, status: AgreementStatus, isSJStatus?: boolean) => void;
    onEdit: (agreement: Agreement) => void;
    onDelete: (agreement: Agreement) => void;
    onResponsibleChange: (id: string, responsible: string) => void;
    onNewAgreement?: () => void;
}

const TableHeader = memo(() => {
    const headers = [
        'Elemento',
        'Responsable',
        'Estado',
        'Fecha solicitud',
        'Fecha entrega',
        'Relato',
        'Solicitud SJ',
        'Estado de solicitud',
        'Entregable',
        'Acciones',
    ];

    return (
        <TableHead>
            <TableRow>
                {headers.map((header) => (
                    <TableCell
                        key={header}
                        sx={{
                            borderBottom: '1px solid var(--border-color)',
                            fontSize: '0.75rem',
                            color: 'var(--text-secondary)',
                            fontWeight: 400,
                            py: 2,
                            ...(header === 'Acciones' && { width: 120, textAlign: 'center' }),
                        }}
                    >
                        {header}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
});

TableHeader.displayName = 'TableHeader';

const StatusSelect = memo<{
    value: AgreementStatus;
    onChange: (status: AgreementStatus) => void;
}>(({ value, onChange }) => (
    <FormControl
        size="small"
        sx={{
            minWidth: 120,
            '& .MuiOutlinedInput-root': {
                '& fieldset': { border: 'none' },
                '&:hover fieldset': { border: 'none' },
                '&.Mui-focused fieldset': { border: 'none' },
            },
        }}
    >
        <Select
            value={value}
            onChange={(e) => onChange(e.target.value as AgreementStatus)}
            sx={{
                fontSize: '0.875rem',
                color: getStatusColor(value).text,
                backgroundColor: getStatusColor(value).bg,
                borderRadius: '12px',
                height: '24px',
                '&:hover': { backgroundColor: getStatusColor(value).bg },
                '&.Mui-focused': { backgroundColor: getStatusColor(value).bg },
                '& .MuiSelect-select': { paddingTop: '2px', paddingBottom: '2px' },
            }}
        >
            {statusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value} sx={{ fontSize: '0.875rem' }}>
                    {option.label}
                </MenuItem>
            ))}
        </Select>
    </FormControl>
));

StatusSelect.displayName = 'StatusSelect';

const AgreementRow = memo<{
    agreement: Agreement;
    onStatusChange: (id: string, status: AgreementStatus, isSJStatus?: boolean) => void;
    onEdit: (agreement: Agreement) => void;
    onDelete: (agreement: Agreement) => void;
    onDownload: (agreement: Agreement) => void;
}>(({ agreement, onStatusChange, onEdit, onDelete, onDownload }) => (
    <TableRow
        sx={{
            '&:hover': {
                backgroundColor: 'var(--hover-bg)',
                '& .row-actions': { opacity: 1 },
            },
            '& td': { borderBottom: '1px solid var(--border-color)' },
        }}
    >
        <TableCell>
            <Typography variant="body2" sx={{ color: 'var(--text-primary)', fontSize: '0.875rem' }}>
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
                <Typography variant="body2" sx={{ color: 'var(--text-primary)', fontSize: '0.875rem' }}>
                    {agreement.responsible}
                </Typography>
            </Box>
        </TableCell>
        <TableCell>
            <StatusSelect value={agreement.status} onChange={(status) => onStatusChange(agreement.id, status)} />
        </TableCell>
        <TableCell>
            <Typography variant="body2" sx={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                {new Date(agreement.requestDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
            </Typography>
        </TableCell>
        <TableCell>
            <Typography variant="body2" sx={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                {new Date(agreement.deliveryDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
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
            <StatusSelect value={agreement.sjStatus} onChange={(status) => onStatusChange(agreement.id, status, true)} />
        </TableCell>
        <TableCell>
            <Tooltip title="Descargar documento" arrow>
                <IconButton
                    size="small"
                    onClick={() => onDownload(agreement)}
                    sx={{
                        color: 'var(--text-secondary)',
                        '&:hover': { backgroundColor: 'rgba(0, 113, 227, 0.1)', color: '#0071e3' },
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
                        '&:hover': { backgroundColor: 'transparent', color: 'var(--text-primary)' },
                    }}
                >
                    <Edit2 size={14} />
                </IconButton>
                <IconButton
                    size="small"
                    onClick={() => onDelete(agreement)}
                    sx={{
                        color: 'var(--text-secondary)',
                        '&:hover': { backgroundColor: 'transparent', color: '#ff2d55' },
                    }}
                >
                    <Trash2 size={14} />
                </IconButton>
            </Box>
        </TableCell>
    </TableRow>
));

AgreementRow.displayName = 'AgreementRow';

export const AgreementTable = memo<AgreementTableProps>(({
    agreements,
    onStatusChange,
    onEdit,
    onDelete,
    onResponsibleChange,
}) => {
    const handleDownload = (agreement: Agreement) => {
        console.log('Descargando documento:', agreement.id);
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
                <TableHeader />
                <TableBody>
                    {agreements.map((agreement) => (
                        <AgreementRow
                            key={agreement.id}
                            agreement={agreement}
                            onStatusChange={onStatusChange}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onDownload={handleDownload}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
});

AgreementTable.displayName = 'AgreementTable';
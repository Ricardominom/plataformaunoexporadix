import React, { useState } from 'react';
import {
    Box,
    Button,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
} from '@mui/material';
import { Plus } from 'lucide-react';
import { NewMoneyApprovalDialog } from '../Forms/NewMoneyApprovalDialog';
import { useNotification } from '../../../context/NotificationContext';
import { useMoneyApprovals } from '../../../hooks/useMoneyApprovals';

// Mock data for approved requests
const approvedRequests = [
    {
        id: '1',
        requestDate: '2025-03-01',
        approvalDate: '2025-03-05',
        category: 'Infraestructura',
        subcategory: 'Equipos',
        concept: 'Compra de servidores',
        requestedAmount: 120000,
        approvedAmount: 100000,
        approvedBy: 'Juan Pérez',
        status: 'Completo',
    },
    {
        id: '2',
        requestDate: '2025-03-03',
        approvalDate: '2025-03-08',
        category: 'Recursos Humanos',
        subcategory: 'Capacitación',
        concept: 'Taller de liderazgo',
        requestedAmount: 35000,
        approvedAmount: 35000,
        approvedBy: 'María Gómez',
        status: 'Completo',
    },
    {
        id: '3',
        requestDate: '2025-03-10',
        approvalDate: '2025-03-12',
        category: 'Ventas',
        subcategory: 'Marketing',
        concept: 'Campaña publicitaria',
        requestedAmount: 80000,
        approvedAmount: 75000,
        approvedBy: 'Carlos Rodríguez',
        status: 'Completo',
    },
];

const getStatusColor = (status: string) => {
    const colors = {
        'Pendiente': { bg: 'rgba(90, 200, 250, 0.1)', text: '#5ac8fa' },
        'En revisión': { bg: 'rgba(172, 142, 255, 0.1)', text: '#ac8eff' },
        'En proceso': { bg: 'rgba(255, 149, 0, 0.1)', text: '#ff9500' },
        'Completo': { bg: 'rgba(48, 209, 88, 0.1)', text: '#30d158' },
    };
    return colors[status as keyof typeof colors] || { bg: 'rgba(142, 142, 147, 0.1)', text: '#8e8e93' };
};

// Estilos comunes para tablas ultra compactas
const tableStyles = {
    size: 'small' as const,
    sx: { 
        '& .MuiTableCell-root': {
            padding: '4px 6px',  // Padding mínimo
            fontSize: '0.75rem',  // Tamaño de fuente mínimo
            lineHeight: '1.1',   // Altura de línea reducida
        },
        '& .MuiTableRow-root': {
            height: '32px',  // Altura de fila mínima
        }
    }
};

// Estilo para las cabeceras de tabla
const tableHeadStyles = {
    sx: {
        '& .MuiTableCell-head': {
            fontWeight: 600,
            backgroundColor: 'rgba(0, 0, 0, 0.02)',
            whiteSpace: 'nowrap',
            fontSize: '0.7rem',  // Aún más pequeño para cabeceras
            padding: '3px 6px',  // Padding reducido para cabeceras
        }
    }
};

// Estilo para los chips más pequeños
const chipStyles = {
    size: 'small' as const,
    sx: {
        height: '18px',  // Altura mínima
        fontSize: '0.65rem',  // Tamaño de texto mínimo
        '& .MuiChip-label': {
            padding: '0 6px',  // Padding horizontal reducido en etiquetas
        }
    }
};

// Estilo para texto monetario
const moneyTextStyles = {
    fontSize: '0.75rem',
    fontWeight: 400,
};

export const FinancialApprovals: React.FC = () => {
    const [isNewApprovalOpen, setIsNewApprovalOpen] = useState(false);
    const [approvedReqs, setApprovedReqs] = useState(approvedRequests);
    const { addNotification } = useNotification();

    // Use the money approvals hook
    const {
        pendingApprovals,
        approvedApprovals,
        rejectedApprovals,
        addPendingApproval
    } = useMoneyApprovals();

    const handleNewApproval = (approval: {
        urgent: boolean;
        paymentDate: string;
        category: string;
        subcategory: string;
        concept: string;
        sscComments: string;
        amount: number;
        transferToEspora: number;
        toDispatchForTransfer: number;
        transferToInterlogis: number;
        transferToDemotactica: number;
        transferToDotcom: number;
    }) => {
        addPendingApproval(approval);
        setIsNewApprovalOpen(false);
        addNotification('Aprobación agregada exitosamente');
    };

    return (
        <>
            {/* Aprobaciones Financieras Pendientes */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                <Typography variant="h6" sx={{ color: 'var(--text-primary)', fontSize: '1rem', fontWeight: 600 }}>
                    Aprobaciones Financieras Pendientes
                </Typography>
                <Button
                    startIcon={<Plus size={12} />}
                    variant="outlined"
                    onClick={() => setIsNewApprovalOpen(true)}
                    sx={{
                        color: '#ff2d55',
                        borderColor: '#ff2d55',
                        fontSize: '0.7rem',
                        fontWeight: 500,
                        textTransform: 'none',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: '4px',
                        minHeight: '24px',
                        '&:hover': {
                            borderColor: '#ff2d55',
                            backgroundColor: 'rgba(255, 45, 85, 0.1)',
                        },
                    }}
                >
                    Solicitud De Erogaciones
                </Button>
            </Box>
            <TableContainer sx={{ maxHeight: 250, overflowY: 'auto', mb: 2, border: '1px solid rgba(224, 224, 224, 0.5)', borderRadius: '4px' }}>
                <Table {...tableStyles} padding="none">
                    <TableHead {...tableHeadStyles}>
                        <TableRow>
                            <TableCell>Urgente</TableCell>
                            <TableCell>Fecha</TableCell>
                            <TableCell>Categoría</TableCell>
                            <TableCell>Subcategoría</TableCell>
                            <TableCell>Concepto</TableCell>
                            <TableCell>Comentarios</TableCell>
                            <TableCell>Suma</TableCell>
                            <TableCell>T. Espora</TableCell>
                            <TableCell>Despacho</TableCell>
                            <TableCell>T. Interlogis</TableCell>
                            <TableCell>T. Demotáctica</TableCell>
                            <TableCell>T. Dotcom</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pendingApprovals.map((approval) => (
                            <TableRow key={approval.id}>
                                <TableCell>
                                    <Chip
                                        label={approval.urgent ? 'Urgente' : 'Normal'}
                                        {...chipStyles}
                                        sx={{
                                            ...chipStyles.sx,
                                            backgroundColor: approval.urgent ? 'rgba(255, 45, 85, 0.1)' : 'rgba(0, 113, 227, 0.1)',
                                            color: approval.urgent ? '#ff2d55' : '#0071e3',
                                        }}
                                    />
                                </TableCell>
                                <TableCell>{new Date(approval.paymentDate).toLocaleDateString()}</TableCell>
                                <TableCell>{approval.category}</TableCell>
                                <TableCell>{approval.subcategory}</TableCell>
                                <TableCell>{approval.concept}</TableCell>
                                <TableCell>{approval.sscComments}</TableCell>
                                <TableCell>
                                    <Typography sx={{ ...moneyTextStyles, fontWeight: 500 }}>
                                        ${approval.amount.toLocaleString()}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography sx={moneyTextStyles}>
                                        ${approval.transferToEspora.toLocaleString()}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography sx={moneyTextStyles}>
                                        ${approval.toDispatchForTransfer.toLocaleString()}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography sx={moneyTextStyles}>
                                        ${approval.transferToInterlogis.toLocaleString()}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography sx={moneyTextStyles}>
                                        ${approval.transferToDemotactica.toLocaleString()}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography sx={moneyTextStyles}>
                                        ${approval.transferToDotcom.toLocaleString()}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                        {pendingApprovals.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={12} align="center" sx={{ py: 1.5 }}>
                                    <Typography sx={{ fontSize: '0.75rem' }}>No hay aprobaciones pendientes</Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            
            {/* NUEVA SECCIÓN: Solicitudes Aprobadas */}
            <Box sx={{ mt: 2 }}>
                <Typography variant="h6" sx={{ color: 'var(--text-primary)', mb: 1, fontSize: '1rem', fontWeight: 600 }}>
                    Solicitudes Aprobadas
                </Typography>
                <TableContainer sx={{ maxHeight: 250, overflowY: 'auto', border: '1px solid rgba(224, 224, 224, 0.5)', borderRadius: '4px' }}>
                    <Table {...tableStyles} padding="none">
                        <TableHead {...tableHeadStyles}>
                            <TableRow>
                                <TableCell>F. solicitud</TableCell>
                                <TableCell>F. aprobación</TableCell>
                                <TableCell>Categoría</TableCell>
                                <TableCell>Subcategoría</TableCell>
                                <TableCell>Concepto</TableCell>
                                <TableCell>M. solicitado</TableCell>
                                <TableCell>M. aprobado</TableCell>
                                <TableCell>Aprobado por</TableCell>
                                <TableCell>Estado</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {approvedReqs.map((request) => (
                                <TableRow key={request.id}>
                                    <TableCell>{new Date(request.requestDate).toLocaleDateString()}</TableCell>
                                    <TableCell>{new Date(request.approvalDate).toLocaleDateString()}</TableCell>
                                    <TableCell>{request.category}</TableCell>
                                    <TableCell>{request.subcategory}</TableCell>
                                    <TableCell>{request.concept}</TableCell>
                                    <TableCell>
                                        <Typography sx={moneyTextStyles}>
                                            ${request.requestedAmount.toLocaleString()}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography sx={{ ...moneyTextStyles, fontWeight: 500 }}>
                                            ${request.approvedAmount.toLocaleString()}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>{request.approvedBy}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={request.status}
                                            {...chipStyles}
                                            sx={{
                                                ...chipStyles.sx,
                                                backgroundColor: getStatusColor(request.status).bg,
                                                color: getStatusColor(request.status).text,
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                            {approvedReqs.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={9} align="center" sx={{ py: 1.5 }}>
                                        <Typography sx={{ fontSize: '0.75rem' }}>No hay solicitudes aprobadas</Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            
            <NewMoneyApprovalDialog
                open={isNewApprovalOpen}
                onClose={() => setIsNewApprovalOpen(false)}
                onSubmit={handleNewApproval}
            />
        </>
    );
};
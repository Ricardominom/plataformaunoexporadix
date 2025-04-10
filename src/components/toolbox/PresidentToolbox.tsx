import React from 'react';
import {
    Box,
    Container,
    Grid,
} from '@mui/material';
import { LegalStatus } from './dashboardComponents/LegalStatus';
import { RecentAgreements } from './dashboardComponents/RecentAgreements';
import { TodosOverview } from './dashboardComponents/TodosOverview';
import { AccountStatus } from './dashboardComponents/AccountStatus';
import { AccountProgress } from './dashboardComponents/AccountProgress';
import { PendingApprovals } from './dashboardComponents/PendingApprovals';
import { ActionPlansProgress } from './dashboardComponents/ActionPlansProgress';

// Mock data for account progress
const mockAccountProgress = [
    {
        name: "Cuenta 1",
        progress: {
            estrategia: 50,
            setup: 93.5,
            acompanamiento: 70,
            gerencia: 14,
            produccion: 20,
            difusion: 30,
        }
    },
    {
        name: "Cuenta 2",
        progress: {
            estrategia: 80,
            setup: 65,
            acompanamiento: 45,
            gerencia: 30,
            produccion: 55,
            difusion: 40,
        }
    },
];

// Mock data for action plans progress
const mockActionPlansProgress = [

    {
        indicator: "Optimización del SEO y rendimiento",
        goal: 100,
        achieved: 0,
        progress: 0
    },
    {
        indicator: "Lanzamiento y Monitoreo",
        goal: 100,
        achieved: 0,
        progress: 0
    }
];

// Mock data for legal status
const mockLegalStatus = [
    { category: 'Contratos', completed: 15, total: 20, growth: 25 },
    { category: 'Compliance', completed: 8, total: 10, growth: 15 },
    { category: 'Propiedad Intelectual', completed: 5, total: 8, growth: -10 },
    { category: 'Regulatorio', completed: 12, total: 15, growth: 8 },
];

// Mock data for agreements
const mockAgreements = [

    {
        title: 'Acuerdo de Confidencialidad',
        status: 'completed',
        owner: 'Juan Pérez',
        progress: 100,
    },
    {
        title: 'Términos y Condiciones App',
        status: 'pending',
        owner: 'Carlos Rodríguez',
        progress: 30,
    },
];

// Mock data for TO-DOs
const mockTodos = [
    {
        title: 'Revisión de presupuesto Q2',
        dueDate: '2024-03-15',
        priority: 'high',
        status: 'pending',
        assignee: 'María González',
    },
    {
        title: 'Reunión con inversores',
        dueDate: '2024-03-10',
        priority: 'high',
        status: 'completed',
        assignee: 'Juan Pérez',
    },
    {
        title: 'Aprobación de contratos',
        dueDate: '2024-03-20',
        priority: 'medium',
        status: 'in_progress',
        assignee: 'Carlos Rodríguez',
    },
];

// Mock data for account status
const mockAccountStatus = [
    {
        account: 'Cuenta Principal',
        balance: 1500000,
        pending: 250000,
        status: 'active',
        lastUpdate: '2024-03-01',
    },
    {
        account: 'Cuenta Operativa',
        balance: 800000,
        pending: 120000,
        status: 'active',
        lastUpdate: '2024-03-01',
    },
    {
        account: 'Cuenta Reserva',
        balance: 2000000,
        pending: 0,
        status: 'active',
        lastUpdate: '2024-03-01',
    },
];

export const PresidentToolbox: React.FC = () => {
    return (
        <Box sx={{
            pt: 'calc(var(--nav-height) + 24px)',
            pb: 4,
            px: { xs: 2, sm: 3, md: 4 },
            minHeight: '100vh',
            backgroundColor: 'var(--app-bg)',
        }}>
            <Container maxWidth="xl">
                <Grid container spacing={3}>
                    <PendingApprovals count={15} />

                    <LegalStatus items={mockLegalStatus} />

                    <RecentAgreements agreements={mockAgreements} />

                    <TodosOverview todos={mockTodos} />

                    <AccountProgress accounts={mockAccountProgress} />

                    <ActionPlansProgress plans={mockActionPlansProgress} />

                    <AccountStatus accounts={mockAccountStatus} />
                </Grid>
            </Container>
        </Box>
    );
};
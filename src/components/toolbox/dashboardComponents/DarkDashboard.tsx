import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '../../../context/ThemeContext';

// Import existing dashboard components
import { RecentAgreements } from './RecentAgreements';
import { LegalStatus } from './LegalStatus';
import { TodosOverview } from './TodosOverview';
import { AccountProgress } from './AccountProgress';
import { ActionPlansProgress } from './ActionPlansProgress';
import { AccountStatus } from './AccountStatus';
import { LeadsBoard } from './LeadsBoard';
import { PendingApprovals } from './PendingApprovals';

// Define interfaces for props
interface AccountProgressData {
    name: string;
    progress: {
        [key: string]: number;
    };
}

interface ActionPlan {
    indicator: string;
    goal: number;
    achieved: number;
    progress: number;
}

interface LegalStatusItem {
    category: string;
    completed: number;
    total: number;
    growth: number;
}

interface Agreement {
    title: string;
    status: string;
    owner: string;
    progress: number;
}

interface Todo {
    title: string;
    dueDate: string;
    priority: string;
    status: string;
    assignee: string;
}

interface AccountStatusItem {
    account: string;
    balance: number;
    pending: number;
    status: string;
    lastUpdate: string;
}

interface DarkDashboardProps {
    accountProgress: AccountProgressData[];
    actionPlans: ActionPlan[];
    legalStatus: LegalStatusItem[];
    agreements: Agreement[];
    todos: Todo[];
    accountStatus: AccountStatusItem[];
}

export const DarkDashboard: React.FC<DarkDashboardProps> = ({
    accountProgress,
    actionPlans,
    legalStatus,
    agreements,
    todos,
    accountStatus,
}) => {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12
            }
        }
    };

    return (
        <Box sx={{ 
            backgroundColor: isDarkMode ? '#000000' : '#f5f5f7', 
            color: isDarkMode ? '#FFFFFF' : '#1d1d1f', 
            pt: 2, 
            pb: 6,
            transition: 'background-color 0.3s ease, color 0.3s ease'
        }}>
            {/* Dashboard Title with Green Line Underneath */}
            <Box sx={{ mb: 4, px: 3 }}>
                <Typography
                    variant="h5"
                    sx={{
                        color: isDarkMode ? '#FFFFFF' : '#1d1d1f',
                        fontWeight: 600,
                        fontSize: '1.25rem',
                        mb: 1 // Add margin below the text
                    }}
                >
                    Dashboard General
                </Typography>
                {/* Green line below the text */}
                <Box 
                    sx={{ 
                        height: '4px',
                        backgroundColor: isDarkMode ? '#00CC88' : '#0071e3',
                        width: '100%',
                        borderRadius: '2px'
                    }}
                />
            </Box>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <Box sx={{ 
                    backgroundColor: isDarkMode ? '#000000' : '#f5f5f7', 
                    color: isDarkMode ? '#FFFFFF' : '#1d1d1f',
                    transition: 'background-color 0.3s ease, color 0.3s ease',
                    '& .MuiPaper-root': {
                        backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF',
                        border: isDarkMode ? '1px solid #333333' : '1px solid rgba(0, 0, 0, 0.1)',
                        color: isDarkMode ? '#FFFFFF' : '#1d1d1f',
                        transition: 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease',
                    },
                    '& .MuiTypography-root': {
                        color: isDarkMode ? '#FFFFFF' : '#1d1d1f',
                        transition: 'color 0.3s ease',
                    },
                    '& .MuiTypography-h6': {
                        color: isDarkMode ? '#00CC88' : '#0071e3',
                        transition: 'color 0.3s ease',
                    },
                    '& .MuiTableCell-head': {
                        color: isDarkMode ? '#BBBBBB' : '#86868b',
                        borderBottom: isDarkMode ? '1px solid #333333' : '1px solid rgba(0, 0, 0, 0.1)',
                        transition: 'color 0.3s ease, border-color 0.3s ease',
                    },
                    '& .MuiTableCell-body': {
                        color: isDarkMode ? '#FFFFFF' : '#1d1d1f',
                        borderBottom: isDarkMode ? '1px solid #333333' : '1px solid rgba(0, 0, 0, 0.1)',
                        transition: 'color 0.3s ease, border-color 0.3s ease',
                    },
                    '& .MuiTableRow-root:hover': {
                        backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05) !important' : 'rgba(0, 0, 0, 0.02) !important',
                        transition: 'background-color 0.3s ease',
                    },
                    '& .MuiLinearProgress-root': {
                        backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                        transition: 'background-color 0.3s ease',
                    },
                    '& .MuiLinearProgress-bar': {
                        backgroundColor: isDarkMode ? '#00CC88' : '#0071e3',
                        transition: 'background-color 0.3s ease',
                    },
                    '& .MuiDivider-root': {
                        borderColor: isDarkMode ? '#333333' : 'rgba(0, 0, 0, 0.1)',
                        transition: 'border-color 0.3s ease',
                    },
                    '& .MuiChip-root': {
                        borderColor: isDarkMode ? '#333333' : 'rgba(0, 0, 0, 0.1)',
                        transition: 'border-color 0.3s ease',
                    },
                    '& .MuiListItemButton-root:hover': {
                        backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                        transition: 'background-color 0.3s ease',
                    },
                    '& .MuiCheckbox-root': {
                        color: isDarkMode ? '#BBBBBB' : '#86868b',
                        transition: 'color 0.3s ease',
                    },
                }}>
                    <Grid container spacing={4}> {/* Increased spacing between grid items */}
                        {/* Row 1: First row with Agreements and Todos/PendingApprovals */}
                        <Grid item xs={12} lg={8}>
                            <motion.div variants={itemVariants} style={{ height: '100%' }}>
                                <RecentAgreements agreements={agreements} />
                            </motion.div>
                        </Grid>
                        <Grid item xs={12} lg={4}>
                            <Grid container spacing={4}> {/* Increased spacing between nested grid items */}
                                <Grid item xs={12}>
                                    <motion.div variants={itemVariants} style={{ height: '100%' }}>
                                        <TodosOverview todos={todos} />
                                    </motion.div>
                                </Grid>
                                <Grid item xs={12}>
                                    <motion.div variants={itemVariants} style={{ height: '100%' }}>
                                        <PendingApprovals count={15} />
                                    </motion.div>
                                </Grid>
                            </Grid>
                        </Grid>

                        {/* Row 2: Second row with AccountProgress and AccountStatus (swapped) */}
                        <Grid item xs={12} lg={6}>
                            <motion.div variants={itemVariants} style={{ height: '100%' }}>
                                <AccountProgress accounts={accountProgress} />
                            </motion.div>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <motion.div variants={itemVariants} style={{ height: '100%' }}>
                                <AccountStatus accounts={accountStatus} />
                            </motion.div>
                        </Grid>

                        {/* Row 3: Third row with ActionPlans/LegalStatus and LeadsBoard */}
                        <Grid item xs={12} lg={5}>
                            <Grid container spacing={4}> {/* Increased spacing between nested grid items */}
                                <Grid item xs={12}>
                                    <motion.div variants={itemVariants} style={{ height: '100%' }}>
                                        <ActionPlansProgress plans={actionPlans} />
                                    </motion.div>
                                </Grid>
                                <Grid item xs={12}>
                                    <motion.div variants={itemVariants} style={{ height: '100%' }}>
                                        <LegalStatus items={legalStatus} />
                                    </motion.div>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} lg={7}>
                            <motion.div variants={itemVariants} style={{ height: '100%' }}>
                                <LeadsBoard />
                            </motion.div>
                        </Grid>
                    </Grid>
                </Box>
            </motion.div>
        </Box>
    );
};
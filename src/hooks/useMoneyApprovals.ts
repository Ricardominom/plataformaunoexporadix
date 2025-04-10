import { useState, useEffect } from 'react';
import { useNotification } from '../context/NotificationContext';

// Import the initial data
import { moneyApprovals as initialData } from '../data/ssc';

// Define the MoneyApproval type
interface MoneyApproval {
    id: string;
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
    status?: 'pending' | 'approved' | 'rejected';
}

export const useMoneyApprovals = () => {
    // Initialize state with data from the SSC toolbox
    const [pendingApprovals, setPendingApprovals] = useState<MoneyApproval[]>(() => {
        const saved = localStorage.getItem('pendingApprovals');
        return saved ? JSON.parse(saved) : initialData.approvals.map(approval => ({
            ...approval,
            status: 'pending'
        }));
    });
    
    const [approvedApprovals, setApprovedApprovals] = useState<MoneyApproval[]>(() => {
        const saved = localStorage.getItem('approvedApprovals');
        return saved ? JSON.parse(saved) : [];
    });
    
    const [rejectedApprovals, setRejectedApprovals] = useState<MoneyApproval[]>(() => {
        const saved = localStorage.getItem('rejectedApprovals');
        return saved ? JSON.parse(saved) : [];
    });

    const { addNotification } = useNotification();

    // Save to localStorage whenever the data changes
    useEffect(() => {
        localStorage.setItem('pendingApprovals', JSON.stringify(pendingApprovals));
        localStorage.setItem('approvedApprovals', JSON.stringify(approvedApprovals));
        localStorage.setItem('rejectedApprovals', JSON.stringify(rejectedApprovals));
    }, [pendingApprovals, approvedApprovals, rejectedApprovals]);

    // Approve an expense
    const approveExpense = (id: string) => {
        const approvalToMove = pendingApprovals.find(approval => approval.id === id);
        
        if (approvalToMove) {
            // Remove from pending
            setPendingApprovals(prev => prev.filter(approval => approval.id !== id));
            
            // Add to approved with updated status
            setApprovedApprovals(prev => [
                { ...approvalToMove, status: 'approved' as const },
                ...prev
            ]);
            
            // Show notification
            addNotification('agreement', 'updated', {
                id: approvalToMove.id,
                element: `Aprobación: ${approvalToMove.concept}`,
                description: `Aprobación financiera por $${approvalToMove.amount.toLocaleString()} ha sido aprobada.`
            });
        }
    };

    // Reject an expense
    const rejectExpense = (id: string) => {
        const approvalToMove = pendingApprovals.find(approval => approval.id === id);
        
        if (approvalToMove) {
            // Remove from pending
            setPendingApprovals(prev => prev.filter(approval => approval.id !== id));
            
            // Add to rejected with updated status
            setRejectedApprovals(prev => [
                { ...approvalToMove, status: 'rejected' as const },
                ...prev
            ]);
            
            // Show notification
            addNotification('agreement', 'updated', {
                id: approvalToMove.id,
                element: `Rechazo: ${approvalToMove.concept}`,
                description: `Aprobación financiera por $${approvalToMove.amount.toLocaleString()} ha sido rechazada.`
            });
        }
    };

    // Add a new pending approval
    const addPendingApproval = (approval: Omit<MoneyApproval, 'id' | 'status'>) => {
        const newApproval: MoneyApproval = {
            ...approval,
            id: Date.now().toString(),
            status: 'pending'
        };
        
        setPendingApprovals(prev => [newApproval, ...prev]);
        
        // Show notification
        addNotification('agreement', 'created', {
            id: newApproval.id,
            element: `Nueva aprobación: ${newApproval.concept}`,
            description: `Nueva aprobación financiera por $${newApproval.amount.toLocaleString()} ha sido creada.`
        });
    };

    return {
        pendingApprovals,
        approvedApprovals,
        rejectedApprovals,
        approveExpense,
        rejectExpense,
        addPendingApproval,
        count: pendingApprovals.length
    };
};
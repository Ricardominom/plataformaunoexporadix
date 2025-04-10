import { AgreementStatus } from '../types/agreement';

export const statusOptions: { value: AgreementStatus; label: string }[] = [
    { value: 'not_started', label: 'Sin comenzar' },
    { value: 'in_progress', label: 'En proceso' },
    { value: 'stuck', label: 'Estancado' },
    { value: 'sj_review', label: 'Para revisión de SJ' },
    { value: 'completed', label: 'Terminado' },
];

export const getStatusColor = (status: AgreementStatus) => {
    const colors = {
        not_started: { 
            bg: 'var(--theme-not-started-bg)', 
            text: 'var(--theme-not-started-text)',
            border: 'var(--theme-not-started-border)'
        },
        in_progress: { 
            bg: 'var(--theme-in-progress-bg)', 
            text: 'var(--theme-in-progress-text)',
            border: 'var(--theme-in-progress-border)'
        },
        stuck: { 
            bg: 'var(--theme-stuck-bg)', 
            text: 'var(--theme-stuck-text)',
            border: 'var(--theme-stuck-border)'
        },
        sj_review: { 
            bg: 'var(--theme-sj-review-bg)', 
            text: 'var(--theme-sj-review-text)',
            border: 'var(--theme-sj-review-border)'
        },
        completed: { 
            bg: 'var(--theme-completed-bg)', 
            text: 'var(--theme-completed-text)',
            border: 'var(--theme-completed-border)'
        },
    };
    return colors[status];
};

export const getStatusLabel = (status: AgreementStatus): string => {
    return statusOptions.find(option => option.value === status)?.label || status;
};
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
        not_started: { bg: 'rgba(0, 0, 0, 0.04)', text: 'var(--text-primary)' },
        in_progress: { bg: 'rgba(0, 113, 227, 0.1)', text: '#0071e3' },
        stuck: { bg: 'rgba(255, 45, 85, 0.1)', text: '#ff2d55' },
        sj_review: { bg: 'rgba(255, 149, 0, 0.1)', text: '#ff9500' },
        completed: { bg: 'rgba(48, 209, 88, 0.1)', text: '#30d158' },
    };
    return colors[status];
};

export const getStatusLabel = (status: AgreementStatus): string => {
    return statusOptions.find(option => option.value === status)?.label || status;
};
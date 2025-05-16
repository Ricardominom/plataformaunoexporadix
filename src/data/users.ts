import { User, UserRole } from '../types/user';

// Mock users with hardcoded credentials
export const users: (User & { email: string; password: string })[] = [
    {
        id: '1',
        name: 'Juan Pérez',
        role: 'Presidente',
        email: 'presidente@empresa.com',
        password: 'presidente123'
    },
    {
        id: '2',
        name: 'María González',
        role: 'Asistente',
        email: 'asistente@empresa.com',
        password: 'asistente123'
    },
    {
        id: '3',
        name: 'Carlos Rodríguez',
        role: 'PMO',
        email: 'pmo@empresa.com',
        password: 'pmo123'
    },
    {
        id: '4',
        name: 'Ana Martínez',
        role: 'Directora SSC',
        email: 'ssc@empresa.com',
        password: 'ssc123'
    },
    {
        id: '5',
        name: 'Roberto Sánchez',
        role: 'Director comercial',
        email: 'comercial@empresa.com',
        password: 'comercial123'
    },
    {
        id: '6',
        name: 'Luis Torres',
        role: 'Director General de Espora',
        email: 'espora@empresa.com',
        password: 'espora123'
    },
    {
        id: '7',
        name: 'Patricia Díaz',
        role: 'Director de Mapa',
        email: 'mapa@empresa.com',
        password: 'mapa123'
    },
    {
        id: '8',
        name: 'Miguel Ángel Ruiz',
        role: 'Gerente de Interlogis',
        email: 'interlogis@empresa.com',
        password: 'interlogis123'
    },
    {
        id: '9',
        name: 'Fernando López',
        role: 'Administrador de Interlogis',
        email: 'admin.interlogis@empresa.com',
        password: 'admininterlogis123'
    },
    {
        id: '10',
        name: 'Diana Morales',
        role: 'Research and Development',
        email: 'rd@empresa.com',
        password: 'rd123'
    }
];

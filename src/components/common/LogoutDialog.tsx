import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

interface LogoutDialogProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}

export const LogoutDialog: React.FC<LogoutDialogProps> = ({ isOpen, onOpenChange }) => {
    const navigate = useNavigate();
    const { theme } = useTheme();

    const handleLogout = () => {
        console.log('Sesión cerrada');
        onOpenChange(false);
        navigate('/');
    };

    const overlayStyle = theme === 'dark' ? 'bg-black/70' : 'bg-black/30'; // Ajusta la opacidad en modo claro
    const contentStyle = theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black';
    const buttonTextStyle = theme === 'dark' ? 'text-primary' : 'text-gray-800';
    const buttonBgStyle = theme === 'dark' ? 'bg-secondary' : 'bg-white'; // Fondo blanco en modo claro

    return (
        <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
            <Dialog.Trigger asChild>
                <button
                    className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${buttonTextStyle} ${buttonBgStyle} hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                >
                    <LogOut className="h-4 w-4 mr-2" />
                    Cerrar Sesión
                </button>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className={`fixed inset-0 ${overlayStyle} z-40`} />
                <Dialog.Content className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 rounded-lg shadow-xl w-full max-w-sm z-50 ${contentStyle}`}>
                    <div className="flex justify-between items-center mb-4">
                        <Dialog.Title className="text-lg font-medium">
                            Confirmar Cierre de Sesión
                        </Dialog.Title>
                        <Dialog.Close asChild>
                            <button className="text-primary/70 hover:text-primary">
                                <X className="h-4 w-4" />
                            </button>
                        </Dialog.Close>
                    </div>

                    <p className="mb-6">
                        ¿Estás seguro de que deseas cerrar la sesión?
                    </p>

                    <div className="flex justify-end space-x-3">
                        <Dialog.Close asChild>
                            <button className="px-4 py-2 text-sm font-medium text-primary bg-secondary hover:bg-secondary/80 rounded-md transition-colors">
                                Cancelar
                            </button>
                        </Dialog.Close>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

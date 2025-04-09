import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Mail, Lock, Loader2, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../context/AuthContext';

interface FormState {
  email: string;
  password: string;
}

export function Login() {
  const [formData, setFormData] = useState<FormState>({
    email: '',
    password: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { login } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    setIsLoading(true);
    const success = await login(email, password);

    if (success) {
      setIsSuccess(true);
      // Simulate a loading sequence
      await new Promise(resolve => setTimeout(resolve, 800));
      navigate('/agreements');
    } else {
      setError('Credenciales incorrectas. Por favor, intenta de nuevo.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8" style={{
      background: theme === 'dark'
        ? 'radial-gradient(circle at center, #1c1c1e 0%, #000000 100%)'
        : 'radial-gradient(circle at center, #ffffff 0%, #f5f5f7 100%)',
      transition: 'background 0.3s ease'
    }}>
      <div className={`max-w-md w-full space-y-8 relative login-container ${isSuccess ? 'success-animation' : ''}`}>
        {/* Logo and Title */}
        <div className="text-center login-logo">
          <div className="flex justify-center mb-6">
            <div
              className={`relative p-3 rounded-2xl shadow-lg transform transition-all duration-300 ${isLoading ? 'scale-110' : 'hover:scale-105'
                }`}
              style={{
                background: isSuccess
                  ? '#30d158'
                  : theme === 'dark'
                    ? 'linear-gradient(135deg, #0071e3 0%, #0077ED 100%)'
                    : 'linear-gradient(135deg, #0071e3 0%, #40a9ff 100%)',
                boxShadow: isLoading
                  ? '0 0 20px rgba(0, 113, 227, 0.5)'
                  : '0 8px 16px rgba(0, 113, 227, 0.2)'
              }}
            >
              {isSuccess ? (
                <CheckCircle2 className="h-8 w-8 text-white animate-success" />
              ) : (
                <Building2
                  className={`h-8 w-8 text-white transition-transform ${isLoading ? 'animate-pulse' : ''
                    }`}
                />
              )}
              <div className={`absolute inset-0 rounded-2xl ${isLoading ? 'animate-ping-slow' : ''
                }`} style={{
                  background: 'inherit',
                  opacity: 0.2,
                }} />
            </div>
          </div>
          <h2 className="text-3xl font-bold tracking-tight transform transition-all duration-300"
            style={{
              color: 'var(--text-primary)',
              textShadow: theme === 'dark' ? '0 2px 4px rgba(0,0,0,0.2)' : 'none',
            }}
          >
            Plataforma UNO
          </h2>
          <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
            Gestión de Oficina Presidencial
          </p>
        </div>

        {/* Login Form */}
        <div className={`mt-8 p-8 rounded-xl shadow-xl login-form relative overflow-hidden ${isLoading ? 'opacity-50' : ''
          }`}
          style={{
            backgroundColor: 'var(--surface-primary)',
            border: '1px solid var(--border-color)',
            transition: 'all 0.3s ease',
            transform: isSuccess ? 'translateY(10px)' : 'none',
          }}
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="p-4 rounded-lg animate-shake" style={{
                backgroundColor: 'var(--status-error-bg)',
                border: '1px solid var(--status-error-text)',
                animation: 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
              }}>
                <p className="text-sm" style={{ color: 'var(--status-error-text)' }}>
                  {error}
                </p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                  Correo electrónico
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className={`h-5 w-5 transition-all duration-300 ${isLoading ? 'text-blue-500 animate-pulse' : ''
                      }`} style={{ color: 'var(--text-secondary)' }} />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    disabled={isLoading}
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`block w-full pl-10 pr-3 py-2 rounded-lg text-sm transition-all duration-300 ${isLoading ? 'cursor-not-allowed' : 'hover:border-blue-500'
                      }`}
                    style={{
                      backgroundColor: 'var(--surface-secondary)',
                      color: 'var(--text-primary)',
                      border: '1px solid var(--border-color)',
                      boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)',
                    }}
                    placeholder="nombre@empresa.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                  Contraseña
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className={`h-5 w-5 transition-all duration-300 ${isLoading ? 'text-blue-500 animate-pulse' : ''
                      }`} style={{ color: 'var(--text-secondary)' }} />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    disabled={isLoading}
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`block w-full pl-10 pr-3 py-2 rounded-lg text-sm transition-all duration-300 ${isLoading ? 'cursor-not-allowed' : 'hover:border-blue-500'
                      }`}
                    style={{
                      backgroundColor: 'var(--surface-secondary)',
                      color: 'var(--text-primary)',
                      border: '1px solid var(--border-color)',
                      boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)',
                    }}
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center items-center py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-300 transform ${isLoading
                  ? 'cursor-not-allowed opacity-90'
                  : 'hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg'
                }`}
              style={{
                background: isSuccess
                  ? '#30d158'
                  : 'linear-gradient(135deg, #0071e3 0%, #40a9ff 100%)',
                color: '#ffffff',
                boxShadow: '0 4px 6px rgba(0, 113, 227, 0.2)',
              }}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  <span>Iniciando sesión...</span>
                </div>
              ) : isSuccess ? (
                <div className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 mr-2" />
                  <span>¡Bienvenido!</span>
                </div>
              ) : (
                'Iniciar sesión'
              )}
            </button>
          </form>

          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-10 backdrop-blur-sm rounded-xl">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Building2 className="h-8 w-8 text-blue-600 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Success Overlay */}
          {isSuccess && (
            <div
              className="absolute inset-0 flex items-center justify-center bg-green-500 bg-opacity-20 backdrop-blur-sm rounded-xl"
              style={{
                animation: 'fadeIn 0.3s ease-out',
              }}
            >
              <div className="flex flex-col items-center space-y-4">
                <CheckCircle2 className="h-16 w-16 text-green-500 animate-success" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

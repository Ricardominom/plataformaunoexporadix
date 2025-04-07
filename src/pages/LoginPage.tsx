import React, { useState, FormEvent, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2 } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

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
  const navigate = useNavigate();
  const { theme } = useTheme();

  // Use memoization for styles calculation
  const styles = useMemo(() => {
    const isDark = theme === 'dark';
    return {
      container: isDark ? 'bg-gray-900' : 'bg-background',
      text: isDark ? 'text-gray-200' : 'text-gray-800',
      secondaryText: isDark ? 'text-gray-400' : 'text-gray-500',
      inputBg: 'bg-secondary', // Siempre bg-secondary
      inputBorder: isDark ? 'border-gray-600' : 'border-gray-300',
      formBg: isDark ? 'bg-gray-800' : 'bg-gray-100',
      placeholder: isDark ? 'placeholder-gray-500' : 'placeholder-gray-400',
      inputText: 'text-black', // Texto negro para evitar que se pierda en modo oscuro
    };
  }, [theme]);

  // Use callback for input change handling
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing again
    if (error) setError(null);
  }, [error]);

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    setError(null);
    navigate('/agreements');
  }, [formData, navigate]);

  return (
    <div className={`min-h-screen flex flex-col justify-center py-6 px-4 sm:px-6 lg:px-8 ${styles.container}`}>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Building2 className={`h-10 w-10 sm:h-12 sm:w-12 ${styles.text}`} aria-hidden="true" />
        </div>
        <h2 className={`mt-4 sm:mt-6 text-center text-2xl sm:text-3xl font-extrabold ${styles.text}`}>
          Plataforma UNO
        </h2>
        <p className={`mt-1 sm:mt-2 text-center text-sm ${styles.secondaryText}`}>
          Gestión de Oficina Presidencial
        </p>
      </div>

      <div className="mt-6 sm:mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className={`py-6 px-4 sm:py-8 sm:px-6 shadow sm:rounded-lg ${styles.formBg}`}>
          <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit} noValidate>
            {error && (
              <div className="text-red-500 text-sm" role="alert">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className={`block text-sm font-medium ${styles.text}`}>
                Correo electrónico
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`appearance-none block w-full px-3 py-2 ${styles.inputBg} ${styles.inputBorder} border rounded-md shadow-sm ${styles.placeholder} focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${styles.inputText}`}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className={`block text-sm font-medium ${styles.text}`}>
                Contraseña
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`appearance-none block w-full px-3 py-2 ${styles.inputBg} ${styles.inputBorder} border rounded-md shadow-sm ${styles.placeholder} focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${styles.inputText}`}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 sm:py-3 sm:px-6 border border-transparent rounded-md shadow-sm text-sm sm:text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Iniciar sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

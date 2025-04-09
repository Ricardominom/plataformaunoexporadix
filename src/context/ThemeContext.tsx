import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme');
    return (savedTheme as Theme) || 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);

    // Apply MUI theme overrides
    const style = document.createElement('style');
    style.textContent = `
      .MuiTypography-root {
        color: var(--text-primary) !important;
      }
      .MuiInputBase-input {
        color: var(--text-primary) !important;
      }
      .MuiInputLabel-root {
        color: var(--text-secondary) !important;
      }
      .MuiTableCell-root {
        color: var(--text-primary) !important;
      }
      .MuiTableCell-head {
        color: var(--text-secondary) !important;
      }
      .MuiMenuItem-root {
        color: var(--text-primary) !important;
      }
      .MuiListItemText-primary {
        color: var(--text-primary) !important;
      }
      .MuiListItemText-secondary {
        color: var(--text-secondary) !important;
      }
      .MuiButton-text {
        color: var(--text-primary) !important;
      }
      .MuiSelect-select {
        color: var(--text-primary) !important;
      }
      .MuiSelect-icon {
        color: var(--text-secondary) !important;
      }
      .MuiTab-root {
        color: var(--text-secondary) !important;
      }
      .MuiTab-root.Mui-selected {
        color: var(--status-info-text) !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

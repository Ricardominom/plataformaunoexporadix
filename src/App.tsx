import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Navbar } from './components/common/Navbar';
import { AgreementsPage } from './pages/AgreementsPage';
import { TodosPage } from './pages/TodosPage';
import { ToolboxPage } from './pages/ToolboxPage';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { Login } from './pages/LoginPage';
import { useAuth } from './context/AuthContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <>
              <Navbar user={user} />
              <Routes>
                <Route path="/agreements" element={<AgreementsPage />} />
                <Route path="/todos" element={<TodosPage />} />
                <Route path="/toolbox" element={<ToolboxPage />} />
              </Routes>
            </>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <NotificationProvider>
          <BrowserRouter>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <CssBaseline />
              <div className="min-h-screen">
                <AppRoutes />
              </div>
            </LocalizationProvider>
          </BrowserRouter>
        </NotificationProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
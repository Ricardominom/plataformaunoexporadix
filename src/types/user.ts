export type UserRole = 
  | 'Presidente'
  | 'Asistente'
  | 'PMO'
  | 'Directora SSC'
  | 'Director comercial'
  | 'Director General de Espora'
  | 'Director de Mapa'
  | 'Gerente de Interlogis'
  | 'Administrador de Interlogis'
  | 'Research and Development';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  isSuperuser: boolean;
  isAuthenticated: boolean;
}
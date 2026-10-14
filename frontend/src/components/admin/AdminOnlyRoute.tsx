import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Telas exclusivas do nível "admin" (ex.: gestão de usuários). Usuário comum volta ao Dashboard.
// A API também bloqueia essas rotas (403), então isto é só a camada de interface.
export const AdminOnlyRoute: React.FC = () => {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
};

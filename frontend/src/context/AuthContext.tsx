import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('pressurize_token');
  });

  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('pressurize_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem('pressurize_token', token);
    } else {
      localStorage.removeItem('pressurize_token');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('pressurize_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('pressurize_user');
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<{ success: boolean; message?: string }> => {
    // 1. Tentar autenticação real no backend Laravel se disponível
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.token && data.user) {
          setToken(data.token);
          setUser(data.user);
          return { success: true };
        }
      }
    } catch (e) {
      console.error(e);
      return {
        success: false,
        message: 'Erro de conexão com o servidor. O backend pode estar offline.'
      };
    }

    return {
      success: false,
      message: 'E-mail ou senha incorretos. Verifique suas credenciais de acesso.'
    };
  };

  const logout = () => {
    // Tenta avisar o backend de forma assíncrona
    if (token) {
      fetch('/api/admin/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }).catch(() => {});
    }

    setToken(null);
    setUser(null);
    localStorage.removeItem('pressurize_token');
    localStorage.removeItem('pressurize_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser utilizado dentro de um AuthProvider');
  }
  return context;
};

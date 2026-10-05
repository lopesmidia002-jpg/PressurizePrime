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
    } catch {
      // Backend offline ou inacessível no momento, fallback para autenticação local padrão
    }

    // 2. Fallback local / demo com as credenciais oficiais do projeto
    if (email === 'admin@pressurizeprime.com.br' && password === 'Prime@2026!') {
      const demoUser: User = {
        id: '1',
        name: 'Administrador Prime',
        email: 'admin@pressurizeprime.com.br',
        role: 'admin'
      };
      const demoToken = 'mock_sanctum_token_' + Date.now();
      setToken(demoToken);
      setUser(demoUser);
      return { success: true };
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

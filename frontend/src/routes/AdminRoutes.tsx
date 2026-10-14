import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const AdminLayout = lazy(() => import('../components/admin/AdminLayout').then(m => ({ default: m.AdminLayout })));
const ProtectedRoute = lazy(() => import('../components/admin/ProtectedRoute').then(m => ({ default: m.ProtectedRoute })));
const LoginPage = lazy(() => import('../pages/admin/LoginPage').then(m => ({ default: m.LoginPage })));
const DashboardPage = lazy(() => import('../pages/admin/DashboardPage').then(m => ({ default: m.DashboardPage })));
const SettingsPage = lazy(() => import('../pages/admin/SettingsPage').then(m => ({ default: m.SettingsPage })));
const PagesManagerPage = lazy(() => import('../pages/admin/PagesManagerPage').then(m => ({ default: m.PagesManagerPage })));
const ServicesManagerPage = lazy(() => import('../pages/admin/ServicesManagerPage').then(m => ({ default: m.ServicesManagerPage })));
const SeoManagerPage = lazy(() => import('../pages/admin/SeoManagerPage').then(m => ({ default: m.SeoManagerPage })));
const LeadsPage = lazy(() => import('../pages/admin/LeadsPage').then(m => ({ default: m.LeadsPage })));
const FooterManagerPage = lazy(() => import('../pages/admin/FooterManagerPage').then(m => ({ default: m.FooterManagerPage })));
const UsersPage = lazy(() => import('../pages/admin/UsersPage').then(m => ({ default: m.UsersPage })));
const AdminOnlyRoute = lazy(() => import('../components/admin/AdminOnlyRoute').then(m => ({ default: m.AdminOnlyRoute })));

export const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="pages" element={<PagesManagerPage />} />
          <Route path="services" element={<ServicesManagerPage />} />
          <Route path="seo" element={<SeoManagerPage />} />
          <Route path="footer" element={<FooterManagerPage />} />
          <Route path="leads" element={<LeadsPage />} />
          {/* Somente nível "admin" */}
          <Route element={<AdminOnlyRoute />}>
            <Route path="users" element={<UsersPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SiteDataProvider } from './context/SiteDataContext';
import { AuthProvider } from './context/AuthContext';
import { HomePage } from './pages/HomePage';
import { ServiceLPPage } from './pages/ServiceLPPage';
import { AboutPage } from './pages/AboutPage';
import { DiferenciaisPage } from './pages/DiferenciaisPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { FaqPage } from './pages/FaqPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsOfUsePage } from './pages/TermsOfUsePage';
import { AdminLayout, ProtectedRoute } from './components/admin';
import {
  LoginPage,
  DashboardPage,
  SettingsPage,
  PagesManagerPage,
  ServicesManagerPage,
  SeoManagerPage,
  LeadsPage,
  FooterManagerPage
} from './pages/admin';
import { WhatsAppButton, LeadModal } from './components/common';

export default function App() {
  return (
    <BrowserRouter>
      <SiteDataProvider>
        <AuthProvider>
          <Routes>
            {/* Rotas Públicas do Site Institucional */}
            <Route path="/" element={<HomePage />} />
            <Route path="/sobre" element={<AboutPage />} />
            <Route path="/diferenciais" element={<DiferenciaisPage />} />
            <Route path="/como-funciona" element={<HowItWorksPage />} />
            <Route path="/duvidas" element={<FaqPage />} />
            <Route path="/contato" element={<ContactPage />} />
            <Route path="/privacidade" element={<PrivacyPolicyPage />} />
            <Route path="/termos" element={<TermsOfUsePage />} />

            {/* Landing Pages Especializadas com Rotas Dedicadas */}
            <Route path="/pressurizador" element={<ServiceLPPage pageSlug="pressurizador" />} />
            <Route path="/aquecedor-a-gas" element={<ServiceLPPage pageSlug="aquecedor-a-gas" />} />
            <Route path="/aquecedor-solar" element={<ServiceLPPage pageSlug="aquecedor-solar" />} />
            <Route path="/aquecedor-eletrico" element={<ServiceLPPage pageSlug="aquecedor-eletrico" />} />

            {/* Rota de Login Administrativo */}
            <Route path="/admin/login" element={<LoginPage />} />

            {/* Rotas Protegidas do Painel Administrativo CMS */}
            <Route path="/admin" element={<ProtectedRoute />}>
              <Route element={<AdminLayout />}>
                <Route index element={<DashboardPage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="pages" element={<PagesManagerPage />} />
                <Route path="services" element={<ServicesManagerPage />} />
                <Route path="seo" element={<SeoManagerPage />} />
                <Route path="footer" element={<FooterManagerPage />} />
                <Route path="leads" element={<LeadsPage />} />
              </Route>
            </Route>

            {/* Fallback de rotas de serviços */}
            <Route path="/:slug" element={<ServiceLPPage />} />
          </Routes>
          <WhatsAppButton />
          <LeadModal />
        </AuthProvider>
      </SiteDataProvider>
    </BrowserRouter>
  );
}

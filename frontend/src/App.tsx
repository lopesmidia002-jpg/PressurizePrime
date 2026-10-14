import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SiteDataProvider } from './context/SiteDataContext';
import { AuthProvider } from './context/AuthContext';
import { HomePage } from './pages/HomePage';
import { WhatsAppButton } from './components/common/WhatsAppButton';

// Lazy loading do LeadModal (aberto apenas sob demanda pelo usuário)
const LeadModal = lazy(() => import('./components/common/LeadModal').then(m => ({ default: m.LeadModal })));

// Lazy loading das páginas institucionais secundárias
const ServiceLPPage = lazy(() => import('./pages/ServiceLPPage').then(m => ({ default: m.ServiceLPPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const DiferenciaisPage = lazy(() => import('./pages/DiferenciaisPage').then(m => ({ default: m.DiferenciaisPage })));
const HowItWorksPage = lazy(() => import('./pages/HowItWorksPage').then(m => ({ default: m.HowItWorksPage })));
const FaqPage = lazy(() => import('./pages/FaqPage').then(m => ({ default: m.FaqPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage').then(m => ({ default: m.PrivacyPolicyPage })));
const TermsOfUsePage = lazy(() => import('./pages/TermsOfUsePage').then(m => ({ default: m.TermsOfUsePage })));

// Lazy loading completo e isolado do Painel Administrativo CMS
const AdminRoutes = lazy(() => import('./routes/AdminRoutes').then(m => ({ default: m.AdminRoutes })));

const PageLoader = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="w-8 h-8 border-3 border-primary/20 border-t-primary rounded-full animate-spin" />
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <SiteDataProvider>
        <AuthProvider>
          <Suspense fallback={<PageLoader />}>
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

              {/* Rotas do Painel Administrativo CMS (Totalmente isoladas) */}
              <Route path="/admin/*" element={<AdminRoutes />} />

              {/* Fallback de rotas de serviços */}
              <Route path="/:slug" element={<ServiceLPPage />} />
            </Routes>
          </Suspense>
          <WhatsAppButton />
          <Suspense fallback={null}>
            <LeadModal />
          </Suspense>
        </AuthProvider>
      </SiteDataProvider>
    </BrowserRouter>
  );
}

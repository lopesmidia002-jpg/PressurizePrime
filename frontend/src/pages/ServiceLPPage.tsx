import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { TopBar, Header, Footer, WhatsAppButton, LeadModal } from '../components/common';
import { landingPagesData } from '../services/lpData';
import {
  LPHero,
  LPTrustBadges,
  LPSymptoms,
  LPWhatWeDo,
  LPWhyUs,
  LPSteps,
  LPObjections,
  LPFaq,
  LPLeadSection,
  LPFinalCta
} from '../components/lp';

interface ServiceLPPageProps {
  pageSlug?: string;
}

export const ServiceLPPage: React.FC<ServiceLPPageProps> = ({ pageSlug }) => {
  const params = useParams<{ slug: string }>();
  const activeSlug = pageSlug || params.slug;

  const lp = activeSlug ? landingPagesData[activeSlug] : undefined;

  // Atualização Dinâmica de SEO (Meta Title e Description) por página individual
  useEffect(() => {
    if (lp?.seo) {
      document.title = lp.seo.meta_title;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', lp.seo.meta_description);
      }
    }
    // Scroll para o topo ao trocar de rota
    window.scrollTo(0, 0);
  }, [lp]);

  if (!lp) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Barra de Horário */}
      <TopBar />

      {/* Header Completo com Menus */}
      <Header />

      <main className="flex-1">
        {/* 1. Hero com H1 Dinâmico e Alerta de Segurança */}
        <LPHero lp={lp} />

        {/* 2. Faixa de Confiança */}
        <LPTrustBadges lp={lp} />

        {/* 3. Sintomas */}
        <LPSymptoms lp={lp} />

        {/* 4. O que Fazemos */}
        <LPWhatWeDo lp={lp} />

        {/* 5. Por que a Pressurize Prime */}
        <LPWhyUs lp={lp} />

        {/* 6. Como Funciona */}
        <LPSteps lp={lp} />

        {/* 7. Objeções Respondidas */}
        <LPObjections lp={lp} />

        {/* 8. Perguntas Frequentes Dedicadas */}
        <LPFaq lp={lp} />

        {/* 9. Formulário Integrado de Captação com Default Service */}
        <LPLeadSection lp={lp} />

        {/* 10. CTA Final */}
        <LPFinalCta lp={lp} />
      </main>

      <Footer />
      <WhatsAppButton customMessage={`Olá! Estou na página de ${lp.name} e gostaria de um orçamento técnico.`} />
      <LeadModal />
    </div>
  );
};

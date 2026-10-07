import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { TopBar, Header, Footer, WhatsAppButton, LeadModal } from '../components/common';
import { landingPagesData } from '../services/lpData';
import { useSiteData } from '../context/SiteDataContext';
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

  const lpBase = activeSlug ? landingPagesData[activeSlug] : undefined;
  const { pages } = useSiteData();
  const cmsPage = activeSlug ? pages[activeSlug] : undefined;

  const lp = React.useMemo(() => {
    if (!lpBase) return undefined;
    if (!cmsPage || !cmsPage.sections) return lpBase;

    const s = cmsPage.sections as any;
    const validItems = (arr: any) => arr && arr.length > 0 && arr[0] && (arr[0].title || arr[0].question || arr[0].desc || arr[0].answer);

    return {
      ...lpBase,
      trustBadges: validItems(s.trustBadges?.items) ? s.trustBadges.items.map((i: any) => ({ title: i.title, subtitle: i.desc || i.subtitle })) : lpBase.trustBadges,
      symptomsTitle: s.symptoms?.title || lpBase.symptomsTitle,
      symptomsIntro: s.symptoms?.intro || lpBase.symptomsIntro,
      symptomsClosing: s.symptoms?.subtitle || lpBase.symptomsClosing,
      symptoms: validItems(s.symptoms?.items) ? s.symptoms.items : lpBase.symptoms,
      whatWeDoTitle: s.whatWeDo?.title || lpBase.whatWeDoTitle,
      whatWeDoIntro: s.whatWeDo?.subtitle || lpBase.whatWeDoIntro,
      whatWeDo: validItems(s.whatWeDo?.items) ? s.whatWeDo.items : lpBase.whatWeDo,
      whyUsTitle: s.whyUs?.title || lpBase.whyUsTitle,
      whyUsIntro: s.whyUs?.subtitle || lpBase.whyUsIntro,
      whyUs: validItems(s.whyUs?.items) ? s.whyUs.items : lpBase.whyUs,
      processo: validItems(s.processo?.items) ? s.processo : { title: 'Como Funciona o Conserto ou Instalação', subtitle: 'Três etapas diretas para resolver a pressão ou aquecimento da sua casa.', items: [
        { title: 'Chame no WhatsApp', desc: 'Conte o sintoma e envie foto ou vídeo do equipamento. Agilizamos a triagem em minutos.' },
        { title: 'Vistoria e Orçamento', desc: 'O técnico avalia no local e passa o valor antes de começar. Aprovou o serviço? A taxa de vistoria não é cobrada.' },
        { title: 'Problema Resolvido', desc: 'Conserto executado na hora (ou instalação). Serviço finalizado, garantia de 3 meses emitida.' }
      ]},

      objectionsTitle: s.objections?.title || lpBase.objectionsTitle,
      objectionsIntro: s.objections?.subtitle || lpBase.objectionsIntro,
      objections: validItems(s.objections?.items) ? s.objections.items : lpBase.objections,
      faqsTitle: s.faqs?.title || lpBase.faqsTitle,
      faqsIntro: s.faqs?.subtitle || lpBase.faqsIntro,
      faqs: validItems(s.faqs?.items) ? s.faqs.items.map((i: any) => ({ question: i.title || i.question, answer: i.desc || i.answer })) : lpBase.faqs,
      leadSectionTitle: s.leadSection?.title || lpBase.leadSectionTitle,
      leadSectionSubtitle: s.leadSection?.subtitle || lpBase.leadSectionSubtitle,
      leadSectionIntro: s.leadSection?.intro || lpBase.leadSectionIntro,
      leadSectionBadge: s.leadSectionBadge || lpBase.leadSectionBadge,
      leadSection: validItems(s.leadSection?.items) ? s.leadSection.items : lpBase.leadSection,
      ctaTitle: s.finalCta?.title || lpBase.ctaTitle,
      ctaText: s.finalCta?.subtitle || lpBase.ctaText,
      image_url: s.image_url || lpBase.image_url,
      safetyAlert: s.safetyAlert_text !== undefined && s.safetyAlert_text !== '' ? s.safetyAlert_text : lpBase.safetyAlert,
    };
  }, [lpBase, cmsPage]);

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

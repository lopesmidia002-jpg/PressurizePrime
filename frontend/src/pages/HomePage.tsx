import React, { useEffect } from 'react';
import { useSiteData } from '../context/SiteDataContext';
import { TopBar, Header, Footer, WhatsAppButton, LeadModal } from '../components/common';
import {
  HeroSection,
  TrustBadges,
  ServicesGrid,
  AboutSection,
  WhyUsSection,
  HowItWorksSection,
  CoverageSection,
  CommitmentsSection,
  FaqSection,
  HomeLeadSection,
  FinalCtaSection
} from '../components/home';

export const HomePage: React.FC = () => {
  const { pages } = useSiteData();
  const pageData = pages.home;

  useEffect(() => {
    if (pageData?.seo) {
      document.title = pageData.seo.meta_title || 'Pressurize Prime | Pressurizador e Aquecedores em São Paulo';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc && pageData.seo.meta_description) {
        metaDesc.setAttribute('content', pageData.seo.meta_description);
      }
    }
  }, [pageData]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <TopBar />
      <Header />

      <main className="flex-1">
        <HeroSection />
        <TrustBadges />
        <ServicesGrid />
        <AboutSection />
        <WhyUsSection />
        <HowItWorksSection />
        <CoverageSection />
        <CommitmentsSection />
        <FaqSection />
        <HomeLeadSection />
        <FinalCtaSection />
      </main>

      <Footer />
      <WhatsAppButton />
      <LeadModal />
    </div>
  );
};

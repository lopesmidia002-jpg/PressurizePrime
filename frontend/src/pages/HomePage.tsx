import React, { useEffect, lazy, Suspense } from 'react';
import { useSiteData } from '../context/SiteDataContext';
import { TopBar } from '../components/common/TopBar';
import { Header } from '../components/common/Header';
import { HeroSection } from '../components/home/HeroSection';
import { TrustBadges } from '../components/home/TrustBadges';

// Lazy loading das seções secundárias e de rodapé para máxima performance no Mobile
const HomeBelowTheFold = lazy(() =>
  import('../components/home/HomeBelowTheFold').then(m => ({ default: m.HomeBelowTheFold }))
);

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
        <Suspense fallback={<div className="min-h-[160px] bg-slate-50" aria-hidden="true" />}>
          <HomeBelowTheFold />
        </Suspense>
      </main>
    </div>
  );
};

import React from 'react';
import { ServicesGrid } from './ServicesGrid';
import { AboutSection } from './AboutSection';
import { WhyUsSection } from './WhyUsSection';
import { HowItWorksSection } from './HowItWorksSection';
import { CoverageSection } from './CoverageSection';
import { CommitmentsSection } from './CommitmentsSection';
import { FaqSection } from './FaqSection';
import { HomeLeadSection } from './HomeLeadSection';
import { FinalCtaSection } from './FinalCtaSection';
import { Footer } from '../common/Footer';

export const HomeBelowTheFold: React.FC = () => {
  return (
    <>
      <ServicesGrid />
      <AboutSection />
      <WhyUsSection />
      <HowItWorksSection />
      <CoverageSection />
      <CommitmentsSection />
      <FaqSection />
      <HomeLeadSection />
      <FinalCtaSection />
      <Footer />
    </>
  );
};

import React from 'react';
import type { LPPageDetail } from '../../services/lpData';
import { Award, Clock, CreditCard, ShieldCheck } from 'lucide-react';

interface LPTrustBadgesProps {
  lp: LPPageDetail;
}

export const LPTrustBadges: React.FC<LPTrustBadgesProps> = ({ lp }) => {
  const getBadgeIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Award className="w-5 h-5 text-secondary" />;
      case 1:
        return <Clock className="w-5 h-5 text-primary" />;
      case 2:
        return <CreditCard className="w-5 h-5 text-secondary" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-primary" />;
    }
  };

  return (
    <section className="bg-white py-6 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {lp.trustBadges.map((badge, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50"
            >
              <div className="w-10 h-10 rounded-lg bg-white shadow-2xs border border-slate-200 flex items-center justify-center shrink-0">
                {getBadgeIcon(idx)}
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-slate-900 text-sm leading-snug">{badge.title}</h4>
                <p className="text-xs text-slate-500 font-normal leading-normal mt-0.5">{badge.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

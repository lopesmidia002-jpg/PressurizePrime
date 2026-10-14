import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSiteData } from '../../context/SiteDataContext';
import { injectGa4, injectGtm } from '../../services/tracking';

// Carrega Google Analytics 4 e Google Tag Manager com os IDs configurados no painel (Configurações).
// - Espera a resposta da API (settingsReady) para não injetar um ID antigo guardado no localStorage.
// - Não carrega nas rotas /admin, para os acessos do painel não entrarem nas métricas.
// - Adiado para não competir com o carregamento da página (GTM + gtag ≈ 460 KB de JS): injeta na
//   primeira interação do visitante ou, sem interação, 3,5 s após o evento load. A visita continua
//   sendo contada; só o momento do disparo muda.
// - Mudanças de rota do SPA: GA4 via "medição otimizada > alterações de histórico"; no GTM,
//   acionador "Alteração no histórico".
const INTERACTION_EVENTS = ['pointerdown', 'keydown', 'touchstart', 'scroll'] as const;
const FALLBACK_DELAY_MS = 3500;

export const TrackingScripts: React.FC = () => {
  const { settings, settingsReady } = useSiteData();
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/admin');
  const { gtm_container_id: gtmId, ga4_measurement_id: ga4Id } = settings;

  useEffect(() => {
    if (!settingsReady || isAdmin || (!gtmId && !ga4Id)) return;

    let done = false;
    let timer: number | undefined;

    const cleanup = () => {
      INTERACTION_EVENTS.forEach(evt => window.removeEventListener(evt, load));
      window.removeEventListener('load', scheduleFallback);
      if (timer) window.clearTimeout(timer);
    };

    function load() {
      if (done) return;
      done = true;
      cleanup();
      if (gtmId) injectGtm(gtmId);
      if (ga4Id) injectGa4(ga4Id);
    }

    function scheduleFallback() {
      timer = window.setTimeout(load, FALLBACK_DELAY_MS);
    }

    INTERACTION_EVENTS.forEach(evt => window.addEventListener(evt, load, { once: true, passive: true }));
    if (document.readyState === 'complete') scheduleFallback();
    else window.addEventListener('load', scheduleFallback, { once: true });

    return cleanup;
  }, [settingsReady, isAdmin, gtmId, ga4Id]);

  return null;
};

import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSiteData } from '../../context/SiteDataContext';
import { injectGa4, injectGtm } from '../../services/tracking';

// Carrega Google Analytics 4 e Google Tag Manager com os IDs configurados no painel (Configurações).
// - Espera a resposta da API (settingsReady) para não injetar um ID antigo guardado no localStorage.
// - Não carrega nas rotas /admin, para os acessos do painel não entrarem nas métricas.
// - Os scripts são injetados uma única vez; mudanças de rota do SPA são detectadas pelo GA4
//   (medição otimizada > alterações de histórico) e, no GTM, pelo acionador "Alteração no histórico".
export const TrackingScripts: React.FC = () => {
  const { settings, settingsReady } = useSiteData();
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/admin');

  useEffect(() => {
    if (!settingsReady || isAdmin) return;
    if (settings.gtm_container_id) injectGtm(settings.gtm_container_id);
    if (settings.ga4_measurement_id) injectGa4(settings.ga4_measurement_id);
  }, [settingsReady, isAdmin, settings.gtm_container_id, settings.ga4_measurement_id]);

  return null;
};

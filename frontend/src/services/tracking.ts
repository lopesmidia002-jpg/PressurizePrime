// Injeção do Google Analytics 4 (gtag.js) e do Google Tag Manager a partir dos IDs salvos no CMS.
// Os IDs são sempre validados antes de virar URL/script, então o painel nunca injeta código arbitrário.

const GA4_ID_REGEX = /\bG-[A-Z0-9]{4,20}\b/i;
const GTM_ID_REGEX = /\bGTM-[A-Z0-9]{4,20}\b/i;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Aceita o ID puro ("G-XXXX") ou o snippet inteiro colado do Google e devolve só o ID, ou '' se inválido. */
export const extractGa4Id = (input?: string): string => {
  const match = (input || '').match(GA4_ID_REGEX);
  return match ? match[0].toUpperCase() : '';
};

/** Aceita o ID puro ("GTM-XXXX") ou qualquer um dos snippets (head/body) do GTM e devolve só o ID. */
export const extractGtmId = (input?: string): string => {
  const match = (input || '').match(GTM_ID_REGEX);
  return match ? match[0].toUpperCase() : '';
};

const ensureDataLayer = () => {
  window.dataLayer = window.dataLayer || [];
};

export const injectGa4 = (measurementId: string) => {
  const id = extractGa4Id(measurementId);
  if (!id || document.getElementById('pp-ga4-script')) return;

  ensureDataLayer();
  // O gtag.js exige o objeto `arguments` (não um array), igual ao snippet oficial
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', id);

  const script = document.createElement('script');
  script.id = 'pp-ga4-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(script);
};

export const injectGtm = (containerId: string) => {
  const id = extractGtmId(containerId);
  if (!id || document.getElementById('pp-gtm-script')) return;

  // Equivalente ao snippet <head> oficial do GTM
  ensureDataLayer();
  window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
  const script = document.createElement('script');
  script.id = 'pp-gtm-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(script);
  // O snippet <body> (noscript) não é injetado: <noscript> criado via JS nunca é executado,
  // e sem JS este SPA não renderiza nada. Ele só teria efeito escrito no index.html estático.
};

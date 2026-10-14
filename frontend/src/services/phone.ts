// Monta o link tel: no formato internacional (+55...), que funciona em qualquer celular.
// Aceita o número em qualquer formato: "(11) 99390-2319", "11993902319", "5511993902319" ou "+55 11 ...".

/** Só os dígitos, já com o 55 do Brasil quando vier apenas DDD + número (10 ou 11 dígitos). */
export const normalizePhoneDigits = (input?: string): string => {
  const digits = (input || '').replace(/\D/g, '');
  if (digits.length === 10 || digits.length === 11) return `55${digits}`;
  return digits;
};

/** href para <a>: "tel:+5511993902319". */
export const telHref = (input?: string): string => {
  const digits = normalizePhoneDigits(input);
  return digits ? `tel:+${digits}` : 'tel:';
};

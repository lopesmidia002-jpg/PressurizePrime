// Imagens responsivas para URLs do Unsplash (usadas no CMS). O Unsplash redimensiona pela própria URL,
// então pedimos só a largura necessária em vez da versão de 1920 px. Outras URLs passam sem alteração.

const UNSPLASH_HOST = 'images.unsplash.com';
const WIDTHS = [640, 960, 1280, 1920];

const isUnsplash = (url?: string) => !!url && url.includes(UNSPLASH_HOST);

/** Mesma imagem do Unsplash na largura pedida, em formato automático (WebP/AVIF) e qualidade 70. */
export const unsplashAt = (url: string, width: number): string => {
  if (!isUnsplash(url)) return url;
  try {
    const u = new URL(url);
    u.searchParams.set('w', String(width));
    u.searchParams.set('q', '70');
    u.searchParams.set('auto', 'format');
    u.searchParams.set('fit', 'crop');
    return u.toString();
  } catch {
    return url;
  }
};

/** Atributos src/srcSet/sizes para um <img> de largura total da tela. */
export const responsiveImgProps = (url: string, sizes = '100vw') => {
  if (!isUnsplash(url)) return { src: url };
  return {
    src: unsplashAt(url, 1280),
    srcSet: WIDTHS.map(w => `${unsplashAt(url, w)} ${w}w`).join(', '),
    sizes,
  };
};

/** URL de fundo (CSS background-image) adequada à largura atual da janela. */
export const backgroundUrlFor = (url: string): string => {
  if (!isUnsplash(url) || typeof window === 'undefined') return url;
  const needed = window.innerWidth * Math.min(window.devicePixelRatio || 1, 2);
  const width = WIDTHS.find(w => w >= needed) || WIDTHS[WIDTHS.length - 1];
  return unsplashAt(url, width);
};

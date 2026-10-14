import re
import os

dist_html_path = os.path.join(os.path.dirname(__file__), '..', 'dist', 'index.html')

if os.path.exists(dist_html_path):
    with open(dist_html_path, 'r', encoding='utf-8') as f:
        html = f.read()

    # 1. Injeta CSS Preload de alta prioridade se necessário
    m = re.search(r'href="(/assets/index-[^"]+\.css)"', html)
    if m:
        css_path = m.group(1)
        preload_tag = f'<link rel="preload" as="style" href="{css_path}" fetchpriority="high">\n    '
        if f'as="style" href="{css_path}"' not in html:
            target = '<meta name="viewport" content="width=device-width, initial-scale=1.0" />'
            if target in html:
                html = html.replace(target, f'{target}\n    {preload_tag}')
                print(f'Successfully injected CSS preload: {css_path}')

    # 2. Pré-renderização do Header e Hero da Home dentro de <div id="root">
    # Isso garante FCP imediato (< 1s) e LCP veloz (< 1.8s) no mobile sem esperar o bundle JS do React.
    pre_rendered_dom = """<div class="min-h-screen bg-slate-50 flex flex-col font-sans">
      <header class="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm transition-all">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-20 gap-4 lg:gap-8">
            <a href="/" aria-label="Página Inicial - Pressurize Prime" class="flex items-center gap-2 shrink-0 group">
              <img src="/logo.webp" alt="Pressurize Prime" width="210" height="56" class="h-10 md:h-14 w-auto object-contain transition-transform group-hover:scale-[1.02]" />
            </a>
            <div class="flex lg:hidden items-center gap-2">
              <a href="https://wa.me/551134567890?text=Ol%C3%A1!%20Preciso%20de%20atendimento%20t%C3%A9cnico." target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 bg-secondary hover:bg-secondary-dark text-slate-950 font-bold px-3 py-2 rounded-lg text-sm transition-all whitespace-nowrap" aria-label="Chamar no WhatsApp">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-square w-4 h-4 shrink-0" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                <span>WhatsApp</span>
              </a>
              <button type="button" class="p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/30" aria-label="Abrir menu de navegação">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu w-6 h-6" aria-hidden="true"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main class="flex-1">
        <section role="banner" aria-label="Seção principal - Pressurize Prime" class="relative overflow-hidden pt-28 pb-16 md:pt-32 md:pb-28 border-b border-slate-200 min-h-[65vh] md:min-h-[70vh] flex flex-col justify-center transition-all duration-700">
          <div class="absolute inset-0 overflow-hidden pointer-events-none opacity-100">
            <picture>
              <source media="(max-width: 640px)" srcset="/images/pressurizador-sm.webp" type="image/webp" width="480" height="358" />
              <img src="/images/pressurizador.webp" alt="Conserto e Instalação de Pressurizador de Água - Pressurize Prime, especialistas em pressurização e aquecimento" width="1280" height="720" loading="eager" fetchpriority="high" decoding="sync" class="w-full h-full object-cover object-center block" />
            </picture>
            <div class="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-900/30 to-slate-950/90 sm:from-slate-900/80 sm:via-slate-900/50 sm:to-slate-900/90"></div>
          </div>

          <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center text-center">
            <div class="flex flex-col items-center gap-6">
              <div class="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm text-white/90 text-xs font-semibold px-4 py-1.5 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield-check w-3.5 h-3.5 text-secondary" aria-hidden="true"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>
                <span>Especialistas em Aquecedores e Pressurizadores</span>
              </div>

              <h1 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] text-balance drop-shadow-lg">
                Água na temperatura certa e na pressão que você merece.
              </h1>

              <p class="text-lg text-white/90 font-medium max-w-2xl leading-relaxed drop-shadow-md">
                Conserto, venda e instalação de pressurizadores e aquecedores a gás, solar e elétrico em São Paulo. Atendimento rápido, peças originais e garantia formal em todos os serviços.
              </p>

              <div class="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md mt-4">
                <a href="https://wa.me/551134567890?text=Ol%C3%A1!%20Gostaria%20de%20um%20or%C3%A7amento." target="_blank" rel="noopener noreferrer" aria-label="Solicitar orçamento pelo WhatsApp - Pressurize Prime" class="relative overflow-hidden bg-secondary hover:bg-secondary-dark text-slate-950 font-bold px-7 py-4 rounded-xl shadow-xl transition-all flex items-center justify-center gap-2 text-sm group hover:scale-[1.03] active:scale-[0.97] w-full sm:w-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-square w-4 h-4 shrink-0" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  <span>Chamar no WhatsApp</span>
                </a>
                <a href="tel:1134567890" aria-label="Ligar agora para a Pressurize Prime: 1134567890" class="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/30 font-semibold px-7 py-4 rounded-xl transition-all flex items-center justify-center gap-2 text-sm hover:scale-[1.03] active:scale-[0.97] w-full sm:w-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone w-4 h-4 shrink-0" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <span>Ligar agora</span>
                </a>
              </div>

              <div class="flex flex-col sm:flex-row items-center justify-center gap-4 text-white/90 text-sm mt-4 font-medium">
                <span>Atendimento técnico de segunda a sexta, das 8h às 19h. Conserto em até 24 horas.</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>"""

    # Injetar o DOM estático dentro de <div id="root"></div> se estiver vazio
    if '<div id="root"></div>' in html:
        html = html.replace('<div id="root"></div>', f'<div id="root">{pre_rendered_dom}</div>')
        print("Successfully injected static pre-rendered Hero markup into <div id='root'>!")

    with open(dist_html_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print("dist/index.html updated successfully!")
else:
    print('dist/index.html not found')

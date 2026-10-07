import re

with open('src/pages/admin/PagesManagerPage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

sobre_block = """
            {selectedKey === 'sobre' && (
              <div className="pt-6 border-t border-slate-200 mt-6 space-y-8">
                <DynamicSectionEditor
                  sectionKey="historia"
                  label="Quem Somos / História"
                  sectionData={formData.sections?.historia}
                  onChange={(data) => handleChange('sections', { ...formData.sections, historia: data } as any)}
                />
                <div className="flex justify-end mt-4">
                  <button type="submit" className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors shadow-sm">
                    <Save className="w-4 h-4" />
                    Salvar História
                  </button>
                </div>

                <div className="pt-6 border-t border-slate-200">
                  <DynamicSectionEditor
                    sectionKey="proposito"
                    label="Missão, Visão e Valores"
                    sectionData={formData.sections?.proposito}
                    onChange={(data) => handleChange('sections', { ...formData.sections, proposito: data } as any)}
                  />
                  <div className="flex justify-end mt-4">
                    <button type="submit" className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors shadow-sm">
                      <Save className="w-4 h-4" />
                      Salvar Propósito
                    </button>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-200">
                  <DynamicSectionEditor
                    sectionKey="numeros"
                    label="Estatísticas e Números"
                    sectionData={formData.sections?.numeros}
                    onChange={(data) => handleChange('sections', { ...formData.sections, numeros: data } as any)}
                  />
                  <div className="flex justify-end mt-4">
                    <button type="submit" className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors shadow-sm">
                      <Save className="w-4 h-4" />
                      Salvar Números
                    </button>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-200">
                  <DynamicSectionEditor
                    sectionKey="finalCta"
                    label="Chamada para Ação (Rodapé)"
                    sectionData={formData.sections?.finalCta}
                    onChange={(data) => handleChange('sections', { ...formData.sections, finalCta: data } as any)}
                  />
                  <div className="flex justify-end mt-4">
                    <button type="submit" className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors shadow-sm">
                      <Save className="w-4 h-4" />
                      Salvar Rodapé
                    </button>
                  </div>
                </div>

                {/* IMAGENS DA PÁGINA SOBRE */}
                <div className="space-y-6 pt-6 border-t border-slate-200">
                  <div>
                    <span className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">🖼️ Imagens da Página</span>
                    <h3 className="text-md font-bold text-slate-800 mt-1">Fotos do Hero (carrossel) e CTA</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">Recomendado: 1920×1080px.</p>
                  </div>
                  {(['hero1','hero2','hero3','cta'] as const).map((key, idx) => {
                    const labels = ['Hero Foto 1', 'Hero Foto 2', 'Hero Foto 3', 'Foto de Fundo CTA'];
                    const val = (formData.sections?.images as any)?.[key] || '';
                    return (
                      <div key={key} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-[10px] font-bold text-slate-700 uppercase">{labels[idx]}</label>
                          {val && <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">✓ Configurada</span>}
                        </div>
                        {val && <img src={val} alt={labels[idx]} className="w-full h-20 object-cover rounded-lg border border-slate-200" /> || null}
                        <div className="flex gap-2 items-end">
                          <input type="text" value={val} onChange={e => { const s = { ...formData.sections }; if (!s.images) s.images = {} as any; (s.images as any)[key] = e.target.value; handleChange('sections', s as any); }} placeholder="URL ou base64" className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg" />
                          <ImageUploadButton buttonText="Upload" onUpload={(url) => { const s = { ...formData.sections }; if (!s.images) s.images = {} as any; (s.images as any)[key] = url; handleChange('sections', s as any); }} />
                        </div>
                      </div>
                    );
                  })}
                  <div className="flex justify-end mt-4">
                    <button type="submit" className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors shadow-sm">
                      <Save className="w-4 h-4" />
                      Salvar Imagens
                    </button>
                  </div>
                </div>
              </div>
            )}
"""

target = "{selectedKey === 'duvidas' && ("

idx = content.find(target)
if idx != -1:
    new_content = content[:idx] + sobre_block + "\n            " + content[idx:]
    with open('src/pages/admin/PagesManagerPage.tsx', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Injected 'sobre' successfully.")
else:
    print("Could not find target.")

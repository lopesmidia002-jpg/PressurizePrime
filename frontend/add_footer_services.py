import re

with open('src/pages/admin/FooterManagerPage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace settings destructuring
content = content.replace(
    "const { settings, updateSettings } = useSiteData();",
    "const { settings, updateSettings, services } = useSiteData();"
)

# Replace formData init to add footer_services_links
init_str = """      institutional_links: settings.footer?.institutional_links || [
        { label: 'Sobre', url: '/sobre' },
        { label: 'Diferenciais', url: '/diferenciais' },
        { label: 'Como funciona', url: '/como-funciona' },
        { label: 'Dúvidas', url: '/duvidas' },
        { label: 'Contato', url: '/contato' },
        { label: 'Privacidade', url: '/privacidade' },
        { label: 'Termos de Uso', url: '/termos' },
      ],"""
      
new_init = init_str + """
      footer_services_links: settings.footer?.footer_services_links || services.map(s => ({ label: s.title, url: `/${s.slug}` })),"""

content = content.replace(init_str, new_init)

# Replace handleSubmit to include footer_services_links
submit_str = """        institutional_links: formData.institutional_links,"""
new_submit = submit_str + """
        footer_services_links: formData.footer_services_links,"""
        
content = content.replace(submit_str, new_submit)

# Add the UI block for Links de Serviços right below Serviços e Contato
ui_target = """          <SaveButton label="Salvar Serviços e Contato" />
        </div>"""
        
ui_new = ui_target + """

        {/* Links de Serviços (Coluna do Rodapé) */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 mb-6">
            <div className="p-2 rounded-xl bg-orange-50 text-orange-600">
              <LinkIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Links de Serviços Especializados</h2>
              <p className="text-xs text-slate-500">Personalize quais serviços aparecem listados na coluna de Serviços do rodapé.</p>
            </div>
          </div>

          <div className="space-y-3">
            {formData.footer_services_links.map((link: any, idx: number) => (
              <div key={idx} className="flex gap-3">
                <input type="text" value={link.label} onChange={e => {
                  const newLinks = [...formData.footer_services_links];
                  newLinks[idx].label = e.target.value;
                  handleChange('footer_services_links', newLinks);
                }} placeholder="Nome do Serviço" className="w-1/3 px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl" />
                <input type="text" value={link.url} onChange={e => {
                  const newLinks = [...formData.footer_services_links];
                  newLinks[idx].url = e.target.value;
                  handleChange('footer_services_links', newLinks);
                }} placeholder="URL (Ex: /pressurizador)" className="flex-1 px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl" />
                <button type="button" onClick={() => {
                  const newLinks = formData.footer_services_links.filter((_, i) => i !== idx);
                  handleChange('footer_services_links', newLinks);
                }} className="px-3 py-2 text-red-600 bg-red-50 rounded-xl hover:bg-red-100 font-medium text-sm">
                  Remover
                </button>
              </div>
            ))}
            <button type="button" onClick={() => {
              handleChange('footer_services_links', [...formData.footer_services_links, { label: '', url: '' }]);
            }} className="text-sm font-bold text-primary hover:text-primary-dark">
              + Adicionar Serviço
            </button>
          </div>
          <SaveButton label="Salvar Links de Serviços" />
        </div>"""

content = content.replace(ui_target, ui_new)

with open('src/pages/admin/FooterManagerPage.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

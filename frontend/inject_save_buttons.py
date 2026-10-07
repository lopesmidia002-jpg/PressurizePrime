content = open('src/pages/admin/PagesManagerPage.tsx', 'r', encoding='utf-8').read()

SAVE_BTN = '''
                <div className="flex justify-center sm:justify-end pt-4 mt-6">
                  <button type="submit" className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors shadow-sm">
                    <Save className="w-4 h-4" />
                    {LABEL}
                  </button>
                </div>'''

# ---- diferenciais: insert before the closing of the images div / outer div ----
OLD_DIFER = '''                {/* IMAGENS DA PÁGINA DIFERENCIAIS */}'''
NEW_DIFER = SAVE_BTN.replace('{LABEL}', 'Salvar Diferenciais') + '\n\n                {/* IMAGENS DA PÁGINA DIFERENCIAIS */}'
content = content.replace(OLD_DIFER, NEW_DIFER, 1)

# ---- como-funciona: insert before the closing of the images div / outer div ----
OLD_COMO = '''                {/* IMAGENS DA PÁGINA COMO FUNCIONA */}'''
NEW_COMO = SAVE_BTN.replace('{LABEL}', 'Salvar Como Funciona') + '\n\n                {/* IMAGENS DA PÁGINA COMO FUNCIONA */}'
content = content.replace(OLD_COMO, NEW_COMO, 1)

# ---- duvidas: insert before the closing of the images div / outer div ----
OLD_DUV = '''                {/* IMAGENS DA PÁGINA DÚVIDAS */}'''
NEW_DUV = SAVE_BTN.replace('{LABEL}', 'Salvar Dúvidas') + '\n\n                {/* IMAGENS DA PÁGINA DÚVIDAS */}'
content = content.replace(OLD_DUV, NEW_DUV, 1)

open('src/pages/admin/PagesManagerPage.tsx', 'w', encoding='utf-8').write(content)
print('Done! Buttons added.')

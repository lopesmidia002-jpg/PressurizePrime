content = open('src/pages/admin/PagesManagerPage.tsx', 'r', encoding='utf-8').read()

SAVE_IMG_BTN = '''
                  <div className="flex justify-center sm:justify-end pt-4 mt-6">
                    <button type="submit" className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors shadow-sm">
                      <Save className="w-4 h-4" />
                      Salvar Imagens
                    </button>
                  </div>'''

# Diferenciais images block - ends with })}\n                </div>\n              </div>\n            )}\n\n            {selectedKey === 'como-funciona'
OLD_DIFER = '''                  })}\n                </div>\n              </div>\n            )}\n\n            {selectedKey === 'como-funciona\''''
NEW_DIFER = '''                  })}''' + SAVE_IMG_BTN + '''\n                </div>\n              </div>\n            )}\n\n            {selectedKey === 'como-funciona\''''
content = content.replace(OLD_DIFER, NEW_DIFER, 1)

print("Diferenciais:", "OK" if OLD_DIFER in open('src/pages/admin/PagesManagerPage.tsx', 'r', encoding='utf-8').read() else "NOT FOUND before edit")

open('src/pages/admin/PagesManagerPage.tsx', 'w', encoding='utf-8').write(content)
print('Done!')

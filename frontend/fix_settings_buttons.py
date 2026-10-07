content = open('src/pages/admin/SettingsPage.tsx', 'r', encoding='utf-8').read()

content = content.replace(
    'className="flex justify-end pt-2 border-t border-slate-100 mt-6"',
    'className="flex justify-center sm:justify-end pt-2 border-t border-slate-100 mt-6"'
)
content = content.replace(
    'className="flex justify-end pt-4 mt-6"',
    'className="flex justify-center sm:justify-end pt-4 mt-6"'
)
content = content.replace(
    'className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-lg shadow-md transition-all flex items-center gap-2 text-sm"',
    'className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-lg shadow-md transition-all flex items-center justify-center gap-2 text-sm w-full sm:w-auto"'
)

open('src/pages/admin/SettingsPage.tsx', 'w', encoding='utf-8').write(content)
print('Done!')

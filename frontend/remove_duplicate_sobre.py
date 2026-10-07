import re

filepath = r'c:\Users\Nilto\OneDrive\Documentos\Projetos out26\PressurizePrime\frontend\src\pages\admin\PagesManagerPage.tsx'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern to find the second (duplicate) 'sobre' block
# It has "label="Quem Somos / História"" which distinguishes it from the first one "label="História e Diferenciais (Quem Somos)""
pattern = r"            \{selectedKey === 'sobre' && \(\n              <div className=\"pt-6 border-t border-slate-200 mt-6 space-y-8\">\n                <DynamicSectionEditor\n                  sectionKey=\"historia\"\n                  label=\"Quem Somos / História\".*?            \)\}\n"

new_content = re.sub(pattern, "", content, flags=re.DOTALL)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Duplicate removed.")

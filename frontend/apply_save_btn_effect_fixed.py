import os
import re

files_to_check = [
    'src/pages/admin/PagesManagerPage.tsx',
    'src/pages/admin/FooterManagerPage.tsx',
    'src/pages/admin/ServicesManagerPage.tsx',
    'src/pages/admin/HomeManagerPage.tsx',
    'src/pages/admin/SettingsPage.tsx',
    'src/pages/admin/SeoManagerPage.tsx'
]

# Revert previous buggy changes (by pulling from git for the files we touched)
os.system("git checkout src/pages/admin/PagesManagerPage.tsx src/pages/admin/FooterManagerPage.tsx")

# Now re-apply properly
import_regex = re.compile(r'import\s+\{([^}]+)\}\s+from\s+[\'"]lucide-react[\'"];')

button_pattern = re.compile(
    r'<button\s+type="submit"\s+className="([^"]*?bg-primary[^"]*?hover:bg-primary-dark[^"]*?)"\s*>\s*'
    r'<Save\s+className="([^"]+)"\s*/>\s*'
    r'([^<]+?)\s*'
    r'</button>',
    re.MULTILINE | re.DOTALL
)

def fix_buttons_in_file(filepath):
    if not os.path.exists(filepath):
        return

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    lucide_imports_match = import_regex.search(content)
    if lucide_imports_match:
        imports = lucide_imports_match.group(1)
        if 'CheckCircle2' not in imports:
            new_imports = imports + ', CheckCircle2'
            content = content[:lucide_imports_match.start(1)] + new_imports + content[lucide_imports_match.end(1):]

    def replacer(match):
        orig_classes = match.group(1)
        icon_classes = match.group(2)
        button_text = match.group(3).strip()
        
        if '{savedSuccess' in button_text:
            text_part = button_text
        else:
            text_part = f"{{savedSuccess ? 'Salvo!' : '{button_text}'}}"
            
        # PROPER REPLACEMENT: replace hover:bg-primary-dark FIRST, then bg-primary
        base_classes = orig_classes.replace('hover:bg-primary-dark', '').replace('bg-primary', '')
        base_classes = re.sub(r'\s+', ' ', base_classes).strip()
        
        new_classes = f"{{`{base_classes} ${{savedSuccess ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-primary hover:bg-primary-dark'}}`}}"
        
        new_btn = (
            f'<button type="submit" className={new_classes}>\n'
            f'  {{savedSuccess ? <CheckCircle2 className="{icon_classes}" /> : <Save className="{icon_classes}" />}}\n'
            f'  {text_part}\n'
            f'</button>'
        )
        return new_btn

    new_content = button_pattern.sub(replacer, content)
    
    save_component_pattern = re.compile(
        r'const\s+SaveButton\s*=\s*\([^)]*\)\s*=>\s*\(\s*<div[^>]*>\s*<button type="submit" className="([^"]*bg-primary[^"]*hover:bg-primary-dark[^"]*)"\s*>\s*<Save className="([^"]+)" />\s*\{label\}\s*</button>\s*</div>\s*\)',
        re.MULTILINE | re.DOTALL
    )
    def replacer_component(match):
        orig_classes = match.group(1)
        icon_classes = match.group(2)
        base_classes = orig_classes.replace('hover:bg-primary-dark', '').replace('bg-primary', '')
        base_classes = re.sub(r'\s+', ' ', base_classes).strip()
        
        new_classes = f"{{`{base_classes} ${{savedSuccess ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-primary hover:bg-primary-dark'}}`}}"
        
        return (
            f'const SaveButton = ({{ label = \'Salvar\' }}) => (\n'
            f'  <div className="flex justify-center sm:justify-end pt-4 mt-6">\n'
            f'    <button type="submit" className={new_classes}>\n'
            f'      {{savedSuccess ? <CheckCircle2 className="{icon_classes}" /> : <Save className="{icon_classes}" />}}\n'
            f'      {{savedSuccess ? \'Salvo!\' : label}}\n'
            f'    </button>\n'
            f'  </div>\n'
            f')'
        )
    new_content = save_component_pattern.sub(replacer_component, new_content)

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for fp in files_to_check:
    fix_buttons_in_file(fp)


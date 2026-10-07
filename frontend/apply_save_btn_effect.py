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

# We need to make sure CheckCircle2 is imported if we are going to use it
import_regex = re.compile(r'import\s+\{([^}]+)\}\s+from\s+[\'"]lucide-react[\'"];')

# Regex to match the save buttons
# Looking for something like:
# <button type="submit" className="...bg-primary...hover:bg-primary-dark...">
#   <Save className="w-4 h-4" />
#   Salvar [Alguma coisa]
# </button>

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

    # Make sure CheckCircle2 is in the import from lucide-react
    lucide_imports_match = import_regex.search(content)
    if lucide_imports_match:
        imports = lucide_imports_match.group(1)
        if 'CheckCircle2' not in imports:
            new_imports = imports + ', CheckCircle2'
            content = content[:lucide_imports_match.start(1)] + new_imports + content[lucide_imports_match.end(1):]
    else:
        # Just in case there is no lucide import at all, add it at the top
        content = "import { CheckCircle2 } from 'lucide-react';\n" + content

    def replacer(match):
        orig_classes = match.group(1)
        icon_classes = match.group(2)
        button_text = match.group(3).strip()
        
        # If the button text already contains a ternary for savedSuccess, skip modifying the text
        if '{savedSuccess' in button_text:
            text_part = button_text
        else:
            text_part = f"{{savedSuccess ? 'Salvo!' : '{button_text}'}}"
            
        # Replace bg-primary and hover:bg-primary-dark in orig_classes with dynamic ones
        base_classes = orig_classes.replace('bg-primary', '').replace('hover:bg-primary-dark', '')
        base_classes = re.sub(r'\s+', ' ', base_classes).strip()
        
        new_classes = f"{{`{base_classes} ${{savedSuccess ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-primary hover:bg-primary-dark'}}`}}"
        
        # Build the new button
        new_btn = (
            f'<button type="submit" className={new_classes}>\n'
            f'  {{savedSuccess ? <CheckCircle2 className="{icon_classes}" /> : <Save className="{icon_classes}" />}}\n'
            f'  {text_part}\n'
            f'</button>'
        )
        return new_btn

    new_content = button_pattern.sub(replacer, content)
    
    # Also fix buttons that use SaveButton component in FooterManagerPage or similar
    # e.g., const SaveButton = ({ label = 'Salvar' }) => ...
    # We can use a specific regex for that.
    save_component_pattern = re.compile(
        r'const\s+SaveButton\s*=\s*\([^)]*\)\s*=>\s*\(\s*<div[^>]*>\s*<button type="submit" className="([^"]*bg-primary[^"]*hover:bg-primary-dark[^"]*)"\s*>\s*<Save className="([^"]+)" />\s*\{label\}\s*</button>\s*</div>\s*\)',
        re.MULTILINE | re.DOTALL
    )
    def replacer_component(match):
        orig_classes = match.group(1)
        icon_classes = match.group(2)
        base_classes = orig_classes.replace('bg-primary', '').replace('hover:bg-primary-dark', '')
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


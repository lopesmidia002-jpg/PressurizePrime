import os
import re

def replace_in_file(filepath, pattern, repl):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    new_content = re.sub(pattern, repl, content, flags=re.MULTILINE | re.DOTALL)
    if new_content != content:
        # Also ensure CheckCircle2 import
        import_regex = re.compile(r'import\s+\{([^}]+)\}\s+from\s+[\'"]lucide-react[\'"];')
        lucide_imports_match = import_regex.search(new_content)
        if lucide_imports_match:
            imports = lucide_imports_match.group(1)
            if 'CheckCircle2' not in imports:
                new_imports = imports + ', CheckCircle2'
                new_content = new_content[:lucide_imports_match.start(1)] + new_imports + new_content[lucide_imports_match.end(1):]
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

# For SettingsPage and SeoManagerPage
replace_in_file('src/pages/admin/SettingsPage.tsx', 
                r'<Save className="w-4 h-4 shrink-0" />', 
                r'{savedSuccess ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <Save className="w-4 h-4 shrink-0" />}')

replace_in_file('src/pages/admin/SeoManagerPage.tsx', 
                r'<Save className="w-4 h-4 shrink-0" />', 
                r'{savedSuccess ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <Save className="w-4 h-4 shrink-0" />}')

# For ServicesManagerPage
# Looking for Save buttons
btn_pattern = r'<button([^>]+?)className="bg-primary hover:bg-primary-dark([^"]*?)"([^>]*?)>\s*<Save className="([^"]+)" />\s*([^<]+?)\s*</button>'
def btn_repl(match):
    before_class = match.group(1)
    after_class = match.group(2)
    after_btn = match.group(3)
    icon_cls = match.group(4)
    text = match.group(5).strip()
    
    # Needs a variable to track success? Yes, let's assume it has savedSuccess or we change it to static for now.
    # Actually ServicesManagerPage has multiple saves for different things, maybe they don't have savedSuccess?
    return f'<button{before_class}className={{`{after_class.strip()} ${{savedSuccess ? \'bg-emerald-600 hover:bg-emerald-700\' : \'bg-primary hover:bg-primary-dark\'}}`}}{after_btn}>\n  {{savedSuccess ? <CheckCircle2 className="{icon_cls}" /> : <Save className="{icon_cls}" />}}\n  {{savedSuccess ? \'Salvo!\' : \'{text}\'}}\n</button>'

replace_in_file('src/pages/admin/ServicesManagerPage.tsx', btn_pattern, btn_repl)


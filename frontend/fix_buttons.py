import os

files_to_fix = [
    'src/pages/admin/PagesManagerPage.tsx',
    'src/pages/admin/FooterManagerPage.tsx',
]

for filepath in files_to_fix:
    full_path = filepath
    with open(full_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Center buttons on mobile, align right on sm+
    content = content.replace(
        'className="flex justify-end pt-4 mt-6"',
        'className="flex justify-center sm:justify-end pt-4 mt-6"'
    )
    # Also fix button width on mobile - make them full width on mobile
    content = content.replace(
        'className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors shadow-sm"',
        'className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors shadow-sm"'
    )

    with open(full_path, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f'Fixed: {filepath}')

print('All done!')

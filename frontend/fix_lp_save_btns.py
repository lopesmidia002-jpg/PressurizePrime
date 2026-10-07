content = open('src/pages/admin/PagesManagerPage.tsx', 'r', encoding='utf-8').read()

SAVE_BTN_TEMPLATE = """
                <div className="flex justify-center sm:justify-end pt-4">
                  <button type="submit" className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors shadow-sm">
                    <Save className="w-4 h-4" />
                    {LABEL}
                  </button>
                </div>"""

# The LP services block: after each DynamicSectionEditor inside the LP section, add a save button.
# Sections to handle:
# 1. heroOverlay -> already merged with trustBadges into one save btn "Salvar Textos do Hero"
#    but user wants EACH section to have its own btn.
# So we need individual save buttons after each DynamicSectionEditor within the LP block.

# The approach: find each closing of DynamicSectionEditor within the LP block and add a save btn.
# Pattern: inside the LP block (after 'pressurizador'...'aquecedor-eletrico'), each `/>\n\n` that follows
# a DynamicSectionEditor closing should get a save btn.

# More surgical approach: replace each DynamicSectionEditor closing tag followed by blank line 
# within the LP block (lines 1186-end of LP block)
# with the editor + save btn.

# Map of sectionKey -> label
section_labels = {
    'heroOverlay': 'Salvar Hero Overlay',
    'trustBadges': 'Salvar Faixa de Confiança',
}

for sectionKey, label in section_labels.items():
    # Find the DynamicSectionEditor for this sectionKey and add save btn after it
    # The pattern: sectionKey="heroOverlay".../>
    # We search for the specific closing /> of each editor (they all end with />)
    old = f'  sectionKey="{sectionKey}"'
    # Find position of the editor
    idx = content.find(old)
    if idx == -1:
        print(f"Not found: {sectionKey}")
        continue
    # Find the closing /> after this position
    close_idx = content.find('/>', idx)
    if close_idx == -1:
        print(f"No closing /> for: {sectionKey}")
        continue
    close_idx += 2  # include />
    # Insert save btn after the closing
    save_btn = SAVE_BTN_TEMPLATE.replace('{LABEL}', label)
    content = content[:close_idx] + save_btn + content[close_idx:]
    print(f"Added save btn for: {sectionKey}")

# Also remove the existing combined "Salvar Textos do Hero" button (now redundant)
# Keep it - user said "each section", so having individual ones per DynamicSectionEditor is enough
# We just keep the existing combined ones too

open('src/pages/admin/PagesManagerPage.tsx', 'w', encoding='utf-8').write(content)
print('Done!')

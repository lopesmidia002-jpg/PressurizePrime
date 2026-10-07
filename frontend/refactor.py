import re
import sys

with open('src/pages/admin/PagesManagerPage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# We need to find the start of {/* ABOUT SECTION */} up to the end of {/* FINAL CTA SECTION */}
start_marker = "{/* ABOUT SECTION */}"

start_idx = content.find(start_marker)
end_idx = content.find("</div>\n            )}", start_idx) # End of the home block

if start_idx == -1 or end_idx == -1:
    print("Could not find markers")
    sys.exit(1)

pre_content = content[:start_idx]
post_content = content[end_idx:]
home_block = content[start_idx:end_idx]

# We will split home_block into the different sections
section_markers = [
    ("ABOUT", "{/* ABOUT SECTION */}"),
    ("SERVICES", "{/* SERVICES SECTION */}"),
    ("WHY_US", "{/* WHY US SECTION */}"),
    ("HOW_IT_WORKS", "{/* HOW IT WORKS SECTION */}"),
    ("COMMITMENTS", "{/* COMMITMENTS SECTION */}"),
    ("COVERAGE", "{/* COVERAGE SECTION */}"),
    ("FAQ", "{/* FAQ SECTION */}"),
    ("HOME_LEAD", "{/* HOME LEAD SECTION */}"),
    ("FINAL_CTA", "{/* FINAL CTA SECTION */}"),
]

# Extract each section text
sections = {}
indices = []
for name, marker in section_markers:
    idx = home_block.find(marker)
    if idx != -1:
        indices.append((idx, name))

indices.sort(key=lambda x: x[0])

for i in range(len(indices)):
    idx, name = indices[i]
    if i < len(indices) - 1:
        next_idx = indices[i+1][0]
        sections[name] = home_block[idx:next_idx]
    else:
        sections[name] = home_block[idx:]


# Helper to inject a save button
def inject_save_button(section_text, btn_label):
    btn_html = f"""
                  <div className="flex justify-end pt-4 mt-6">
                    <button type="submit" className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors shadow-sm">
                      <Save className="w-4 h-4" />
                      {btn_label}
                    </button>
                  </div>
"""
    # If it's a DynamicSectionEditor, wrap it
    if "DynamicSectionEditor" in section_text:
        return f"""                <div className="pt-6 border-t border-slate-200">
{section_text.replace("pt-6 border-t border-slate-200", "")}{btn_html}                </div>
"""
    else:
        # It's a div. Find the last closing div of the section and inject before it.
        # usually ends with "</div>\n" or "</div>\n\n"
        # We can just append the button before the last </div>
        last_div_idx = section_text.rfind("</div>")
        if last_div_idx != -1:
            return section_text[:last_div_idx] + btn_html + section_text[last_div_idx:]
        return section_text

# Define the new order
new_order = [
    ("SERVICES", "Salvar Serviços"),
    ("ABOUT", "Salvar Quem Somos"),
    ("WHY_US", "Salvar Diferenciais"),
    ("HOW_IT_WORKS", "Salvar Processo"),
    ("COVERAGE", "Salvar Regiões"),
    ("COMMITMENTS", "Salvar Compromissos"),
    ("FAQ", "Salvar Dúvidas"),
    ("HOME_LEAD", "Salvar Formulário"),
    ("FINAL_CTA", "Salvar Rodapé"),
]

new_home_block = ""
for name, label in new_order:
    if name in sections:
        new_home_block += inject_save_button(sections[name], label)

# Write back
new_content = pre_content + new_home_block + post_content
with open('src/pages/admin/PagesManagerPage.tsx', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Successfully reordered and injected buttons!")

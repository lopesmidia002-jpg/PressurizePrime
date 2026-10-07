import re

filepath = r'c:\Users\Nilto\OneDrive\Documentos\Projetos out26\PressurizePrime\frontend\src\services\initialData.ts'

with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# The second `sobre:` block is at line 310, ending at line 359.
# We will delete lines 310 through 359 (0-indexed: 309 through 358).

# Verify that the line 310 actually has '  sobre: {'
if "sobre: {" in lines[309]:
    del lines[309:359]
    with open(filepath, 'w', encoding='utf-8') as f:
        f.writelines(lines)
    print("Deleted lines 310 to 359.")
else:
    print("Error: line 310 does not match 'sobre: {'.")
    print("Line 310 is:", lines[309])

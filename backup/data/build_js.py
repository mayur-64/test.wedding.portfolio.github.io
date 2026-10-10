import json

with open('/root/wedding-portfolio/data/portfolio_data.json', 'r', encoding='utf-8') as f:
    content = f.read()

with open('/root/wedding-portfolio/data/portfolio_data.js', 'w', encoding='utf-8') as f:
    f.write('window.EMBEDDED_PORTFOLIO_DATA = ' + content + ';\n')

print("Created /root/wedding-portfolio/data/portfolio_data.js successfully.")

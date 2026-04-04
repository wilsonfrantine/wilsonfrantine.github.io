import os

README_DIR = "temp/readmes"
SUMMARY_FILE = "temp/REPOS_SUMMARY.md"

if not os.path.exists(README_DIR):
    print(f"Diretório {README_DIR} não encontrado.")
    exit(1)

files = sorted(os.listdir(README_DIR))
summary_content = "# 📝 Resumo Consolidado de Repositórios (Deep Context)\n\n"
summary_content += "Este documento contém a essência técnica extraída de cada README para guiar a automação de conteúdo.\n\n---\n\n"

for filename in files:
    if not filename.endswith(".md"): continue
    
    repo_name = filename.replace(".md", "")
    try:
        with open(os.path.join(README_DIR, filename), "r", encoding="utf-8") as f:
            content = f.read()
            lines = content.split('\n')
            snippet = "\n".join(lines[:30])
            
            summary_content += f"## 📦 {repo_name}\n"
            summary_content += f"**ID**: `{repo_name}`\n\n"
            summary_content += "### Fragmento de Documentação:\n"
            summary_content += f"```markdown\n{snippet}\n```\n"
            summary_content += "\n---\n\n"
    except Exception as e:
        print(f"Erro ao processar {filename}: {e}")

with open(SUMMARY_FILE, "w", encoding="utf-8") as f:
    f.write(summary_content)

print(f"Sucesso! Resumo consolidado criado em {SUMMARY_FILE}")

import os
import requests
import json

USERNAME = "wilsonfrantine"
BASE_URL = "https://api.github.com"
TEMP_DIR = "temp"
README_DIR = os.path.join(TEMP_DIR, "readmes")

os.makedirs(README_DIR, exist_ok=True)

def fetch_repos():
    print(f"--- Coletando lista de repositórios de {USERNAME} ---")
    url = f"{BASE_URL}/users/{USERNAME}/repos?per_page=100&sort=updated"
    response = requests.get(url)
    if response.status_code != 200:
        print(f"Erro ao acessar API: {response.status_code}")
        return []
    return response.json()

def fetch_readme(repo_name):
    # A API de README do GitHub é inteligente: ela tenta README.md, README.txt, etc.
    url = f"{BASE_URL}/repos/{USERNAME}/{repo_name}/readme"
    headers = {"Accept": "application/vnd.github.raw+json"}
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.text
    return None

repos = fetch_repos()
summary_data = []

for repo in repos:
    if repo['fork']: continue # Ignora forks
    
    name = repo['name']
    description = repo['description'] or "Sem descrição"
    topics = repo['topics']
    stars = repo['stargazers_count']
    
    print(f"Baixando README de: {name}...")
    content = fetch_readme(name)
    
    if content:
        file_path = os.path.join(README_DIR, f"{name}.md")
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
        
        summary_data.append({
            "name": name,
            "description": description,
            "topics": topics,
            "stars": stars,
            "has_readme": True
        })
    else:
        summary_data.append({
            "name": name,
            "description": description,
            "topics": topics,
            "stars": stars,
            "has_readme": False
        })

# Criar o INDEX_REPOS.md
index_path = os.path.join(TEMP_DIR, "INDEX_REPOS.md")
with open(index_path, "w", encoding="utf-8") as f:
    f.write(f"# 🗂️ Index de Repositórios - {USERNAME}\n\n")
    f.write(f"Gerado em: {USERNAME}'s TATAbox Hub Intelligence\n\n")
    f.write("| Projeto | Descrição | Tópicos | Estrelas | README |\n")
    f.write("|--- |--- |--- |--- |--- |\n")
    for item in summary_data:
        readme_status = "✅" if item['has_readme'] else "❌"
        topics_str = ", ".join(item['topics'])
        f.write(f"| **{item['name']}** | {item['description']} | `{topics_str}` | {item['stars']} | {readme_status} |\n")

print(f"\n--- Concluído! Index gerado em {index_path} ---")

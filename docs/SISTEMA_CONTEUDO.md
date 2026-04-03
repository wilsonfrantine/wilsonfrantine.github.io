# 🗺️ Guia de Conteúdo: Trilhas, Snippets e Playlists

O TATAbox organiza o conhecimento em três níveis: **Snippets**, **Tutoriais** e **Séries (Playlists)**.

## 1. Snippets (Dicas Rápidas) ⚡
Dicas pontuais e one-liners focados em comandos ou funções específicas.
- **Local**: `src/content/snippets/`
- **Formato**: Markdown (.md)
- **Quando usar?** Quando quiser documentar algo rápido (ex: um comando de samtools, um script R de uma linha).

## 2. Tutoriais (Trilhas) 📚
Conteúdos longos, didáticos e estruturados.
- **Local**: `src/content/tutorials/`
- **Formato**: Markdown (.md)
- **Quando usar?** Cursos, aulas completas, apostilas.

## 3. Séries (Playlists) 📼
O motor que une os dois acima em uma jornada de aprendizagem.
- **Local**: `src/content/series/`
- **Formato**: JSON (.json)
- **Como funciona?** Um arquivo JSON lista a sequência exata de IDs que o usuário deve seguir.

**Exemplo de Playlist (`r-para-bioinfo.json`):**
```json
{
  "title": "R para Bioinformática",
  "description": "Do zero ao ggplot2 para dados genômicos",
  "items": [
    { "id": "intro-r", "collection": "tutorials" },
    { "id": "grep-dna", "collection": "snippets" }
  ]
}
```

## 🚀 Como Adicionar Novo Conteúdo?
1. Crie o arquivo `.md` na pasta correspondente.
2. Preencha o `frontmatter` (título, descrição, data...).
3. Se quiser que faça parte de uma Playlist, adicione o ID do arquivo na lista do JSON em `src/content/series/`.
